class PlayersController < ApplicationController
    def create
        @game = Game.find(params[:game_id])
        @player = @game.players.create(player_params)

        if @player.valid?
            # the first player added to the game becomes the admin and has the first turn
            # TODO: change how we determine starting player to make it more fair
            if @game.players.count == 1
                @player.is_admin = true
                @player.is_current = true
            end

            @game.slots.delete(params[:player][:slot].to_i)
            @game.save

            session[:current_game] = @game.id
            session[:current_player] = @player.id

            redirect_to game_path @game
        else
            render 'new'
        end
    end

    def new
        @game = Game.find(params[:game_id])
        @player = Player.new
    end

    def roll
        respond_to do |format|
            if Player.find(params[:player_id]).roll_dice
                format.html { head :no_content, status: :ok }
            else
                format.html { head :no_content, status: :error }
            end
        end
    end

    def assign
        @game = Game.find(params[:game_id])
        @player = Player.find(params[:player_id])

        dice_index = params[:dice_index].to_i
        card_index = params[:card_index].to_i

        dice_value = @player.dice_available[dice_index]

        respond_to do |format|
            if card_can_accept_dice(@game, @player, card_index, dice_value)
                @player.assign_dice(dice_index, card_index)
                StoreRelayJob.perform_now
                format.html { head :no_content, status: :ok }
            else
                format.html { head :no_content, status: :error }
            end
        end
    end

    def take
        @game = Game.find(params[:game_id])
        @player = Player.find(params[:player_id])

        is_card_filled = @player.dice_assigned.map { |card| card.find_index(0) == nil }

        is_card_filled.each_with_index do |value, index|
            if value == true
                @player.increase_score(@game.cards[index].point_value)
                @game.draw_card(index)

                Player.where(game_id: @game.id).each do |player|
                    player.retrieve_dice(index)
                    player.update_assigned(index, @game.cards.last.max_dice)
                end
            end
        end

        respond_to do |format|
            StoreRelayJob.perform_now
            format.html { head :no_content, status: :ok }
        end
    end

    def retrieve
        @game = Game.find(params[:game_id])
        @player = Player.find(params[:player_id])

        @game.cards.each_with_index do |card, index|
            @player.retrieve_dice(index)
        end

        @player.resolve_pending
        @player.clear_assigned

        respond_to do |format|
            StoreRelayJob.perform_now
            format.html { head :no_content, status: :ok }
        end
    end

    def turn
        @game = Game.find(params[:game_id])

        current_player = @game.players.current

        # TODO: not sure if order is deterministic, may need to order by :id
        current_index = @game.players.find_index { |player| player.id == current_player.id }
        total_index = @game.players.count

        current_player.end_turn

        next_player = Player.find(@game.players[(current_index + 1 + total_index) % total_index].id);
        next_player.start_turn

        respond_to do |format|
            StoreRelayJob.perform_now
            format.html { head :no_content, status: :ok }
        end
    end

    private

    def player_params
        params.require(:player).permit(:name, :slot, :game_id)
    end

    def card_can_accept_dice(game, player, card_index, dice_value)
        # TODO: duplicated functionality between this and the games controller
        on_card = game.cards[card_index].dice_of_value(dice_value)
        assigned = player.dice_assigned_to_card(dice_value, card_index)
        return assigned < on_card
    end
end
