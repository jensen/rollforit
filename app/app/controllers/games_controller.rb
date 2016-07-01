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
        if session[:current_player]
            render template: "games/show"
        else
            @game = Game.find(params[:id])
            redirect_to new_game_player_path @game.id
        end
    end

    def start
        @game = Game.find(params[:game_id])

        if @game.waiting_for_players?
            draw_deck = Card.all.shuffle.map { |card| card[:id] }
            cards = draw_deck.shift(@game.players.count < 5 ? 3 : 4)

            @game.cards = Card.find(cards)
            @game.players.map { |player| player.initialize_dice }
            @game.draw_deck = draw_deck
            @game.in_progress!
            @game.save
        end

        respond_to do |format|
            format.html { head :no_content, status: :ok }
        end
    end

    def store
        @game = Game.find(session[:current_game])

        @store = {}
        @store[:game_id] = @game.id
        @store[:cards] = game_cards(@game.cards)
        @store[:players] = game_players(@game.players.order(:id))
        @store[:current_player] = @game.players.current
        @store[:local_player] = Player.find(session[:current_player])

        respond_to do |format|
            format.json do
                render json: @store.to_json
            end
        end
    end

    private

    def game_params
        params.require(:game).permit(players_attributes: [:name, :slot])
    end

    def game_cards(cards)
        return cards.map { |card| card.dice }
    end

    def game_players(players)
        return players.map { |player| {
            :id => player.id,
            :slot => player.slot,
            :name => player.name,
            :score => player.score,
            :dice => {
                :available => player.dice_available,
                :assigned => player.dice_assigned
            },
            :is_current => player.is_current
        } }
    end
end
