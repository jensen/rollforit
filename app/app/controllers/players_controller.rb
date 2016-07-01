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
        Player.find(params[:player_id]).roll_dice

        respond_to do |format|
            format.html { head :no_content, status: :ok }
        end
    end

    def turn
        @game = Game.find(params[:game_id])

        # TODO: not sure if order is deterministic, may need to order by :id
        current_player = @game.players.current
        current_index = @game.players.find_index { |player| player.id == current_player.id }
        total_index = @game.players.count

        next_player = @game.players[(current_index + 1 + total_index) % total_index];

        current_player.is_current = false
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
end
