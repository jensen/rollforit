class GamesController < ApplicationController
    def index
        if session[:current_game].nil?
            @games = Game.all

            slots = [*0..5]
            @joinable = @games.map { |game| { :id => game.id, :buttons => slots.map { |index| join_info(game, index) } } }
            @new = slots.map { |index| { :slot => index } }

            render :index
        else
            redirect_to "show"
        end
    end

    def create
        @game = Game.create()
        @player = create_player(@game, true)
        if @player
            redirect_to @game
        else
            redirect_to "index"
        end
    end

    def join
        @game = Game.find(params[:game_id])
        @player = create_player(@game, false)
        if @player
            redirect_to @game
        else
            redirect_to "index"
        end
    end

    def new
        @game = Game.new
    end

    def show
        @game = Game.find(params[:id])
        render template: "games/show"
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
        game = Game.find(session[:current_game])

        players = {
            :local => Player.find(session[:current_player]),
            :current => game.players.current
        }

        @store = {
            :game_id => game.id,
            :cards => game_cards(game.cards),
            :players => game_players(game.players.order(:id)),
            :current_player => players[:current],
            :local_player => players[:local],
            :validation => {
                :dice => validation_dice(game, players[:local]),
                :actions => validation_actions(game, players[:local])
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

    def player_params
        params.permit(:name, :slot)
    end

    def create_player(game, fresh_game)
        player = game.players.create(player_params)
        player.game_id = @game.id

        if player.valid?
            # the first player added to the game becomes the admin and has the first turn
            # TODO: change how we determine starting player to make it more fair
            if fresh_game
                player.is_admin = true
                player.is_current = true
            end

            game.slots.delete(player.slot)
            game.save

            session[:current_game] = game.id
            session[:current_player] = player.id

            player.save

            return player
        end
        return false
    end

    def join_info(game, slot)
        player = game.players.find_by(slot: slot)
        if player
            return { :name => player.name, :slot => slot, :link => '#' }
        else
            return { :name => '', :slot => slot, :link => '/join/' + game.id.to_s }
        end
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
            :start_game => player.is_admin && game.players.count > 1 && game.waiting_for_players?,
            :roll_dice => player.is_current && !player.no_dice? && !player.dice_rolled? && game.in_progress?,
            :take_card => player.is_current && player.filled_card? && game.in_progress?,
            :retrieve_dice => player.is_current && player.dice_assigned? && !player.dice_rolled? && game.in_progress?,
            :end_turn => player.is_current && player.dice_rolled? && !player.filled_card? && game.in_progress?
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
        end

        return []
    end
end
