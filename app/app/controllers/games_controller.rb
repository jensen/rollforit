class GamesController < ApplicationController
    def index
        if session[:current_game]
            @game = Game.find(session[:current_game])
            redirect_to game_path @game.id
        else
            @game = Game.new
            redirect_to new_game_path
        end
    end

    def create
        @game = Game.create()

        session[:current_game] = @game.id

        redirect_to @game
    end

    def new
        @game = Game.new
    end

    def show
        @game = Game.find(params[:id])

        if session[:current_player]
            render template: "games/show"
            #redirect_to action: 'show_share_link', share_link: @game.share_link
        else
            redirect_to new_game_player_path @game.id
        end
    end

    def update
        @game = Game.find(params[:id])

        if @game.waiting_for_players?
            draw_deck = Card.all.shuffle.map { |card| card[:id] }

            cards = @game.players.count < 5 ? 3 : 4
            cards.times do
                @game.cards.push(draw_deck.shift)
            end

            @game.draw_deck = draw_deck

            @game.in_progress!

            @game.save
        end

        redirect_to game_path @game.id
    end

    private

    def game_params
        params.require(:game).permit(players_attributes: [:name, :slot])
    end
end
