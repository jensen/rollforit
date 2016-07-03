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

                format.html { head :no_content, status: :ok }
            else
                format.html { head :no_content, status: :error }
            end
        end

    end

    def turn
        @game = Game.find(params[:game_id])

        current_player = @game.players.current

        # TODO: not sure if order is deterministic, may need to order by :id
        current_index = @game.players.find_index { |player| player.id == current_player.id }
        total_index = @game.players.count

        next_player = @game.players[(current_index + 1 + total_index) % total_index];

        current_player.is_current = false
        current_player.dice_available = current_player.dice_available.map { |v| 0 }
        current_player.save

        next_player.is_current = true;
        next_player.save

        respond_to do |format|
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
