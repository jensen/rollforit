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

        @players = {
            :local => Player.find(session[:current_player]),
            :current => @game.players.current
        }

        @store = {
            :game_id => @game.id,
            :cards => game_cards(@game.cards),
            :players => game_players(@game.players.order(:id)),
            :current_player => @players[:current],
            :local_player => @players[:local],
            :validation => {
                :dice => validation_dice(@game, @players[:local]),
                :actions => validation_actions(@game, @players[:local])
            }
        }

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

    def validation_actions(game, player)


        return actions = {
            :start_game => player.is_admin && game.waiting_for_players?,
            :roll_dice => player.is_current && !player.dice_rolled? && game.in_progress?,
            :end_turn => player.is_current && game.in_progress?
        }
    end

    def validation_dice(game, player)
        if player.is_current
            return player.dice_available.map do |dice|
                game.cards.map.with_index do |card, index|
                    possible = card.dice_of_value(dice)
                    available = player.dice_assigned_to_card(dice, index)

                    possible - available
                end
            end
        else
            return []
        end
    end
end
