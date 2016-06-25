class PlayersController < ApplicationController
    def create
        @game = Game.find(params[:game_id])
        @player = @game.players.create(player_params)

        if @player.valid?
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

    private

    def player_params
        params.require(:player).permit(:name, :slot, :game_id)
    end
end
