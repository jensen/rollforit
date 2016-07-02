require 'test_helper'

class GameStatesTest < ActionDispatch::IntegrationTest
    setup do
        start_game(games(:game).id)
    end

    test "can start game with more than one player" do
        # just runs start_game
    end

    test "player who starts game is current" do
        assert games(:game).players.current == players(:malloy)
    end

    test "can roll dice as current player" do
        assert sum(games(:game).players.current.dice_available) == 0

        roll_dice(games(:game).id, players(:malloy).id)
        assert sum(games(:game).players.current.dice_available) > 0
    end

    test "can't roll dice if not current player" do
        assert sum(players(:susan).dice_available) == 0
        roll_dice(games(:game).id, players(:susan).id)

        @player = Player.find(players(:susan).id)
        assert sum(@player.dice_available) == 0
    end

    test "can assign dice to card" do
        # lucky roll
        @player = players(:malloy)
        @player.dice_available = [1, 1, 1, 1, 1, 1]
        @player.save

        assign_dice(games(:game).id, @player.id, 0, 0)

        assert games(:game).players.current.dice_available.length < 6, "dice wasn't removed from pool"
        assert games(:game).players.current.dice_assigned[0][0] == 1, "dice wasn't assigned"
    end

    test "shouldn't be able to assign dice to card" do
        @player = players(:malloy)
        @player.dice_available = [2, 1, 1, 1, 1, 1]
        @player.save

        assign_dice(games(:game).id, @player.id, 0, 0)

        assert games(:game).players.current.dice_available.length == 6, "dice was removed from pool"
        assert games(:game).players.current.dice_assigned[0][0] == 0, "dice was assigned"
    end

    test "can end turn as current player" do
        @player = players(:malloy)

        assert games(:game).players.current == @player, "current player isn't first"

        roll_dice(games(:game).id, @player.id)
        end_turn(games(:game).id, @player.id)

        @player = Player.find(@player.id)

        assert sum(@player.dice_available) == 0, "dice were not reset after turn end"
        assert games(:game).players.current == players(:susan), "current player isn't second"
    end

    private

    def start_game(game_id)
        put "/games/#{game_id}/start"
        assert_response :success
    end

    def roll_dice(game_id, player_id)
        put "/games/#{game_id}/players/#{player_id}/roll"
        assert_response :success
    end

    def assign_dice(game_id, player_id, dice_index, card_index)
        put "/games/#{game_id}/players/#{player_id}/assign/#{dice_index}/#{card_index}"
        assert_response :success
    end

    def end_turn(game_id, player_id)
        put "/games/#{game_id}/players/#{player_id}/turn"
        assert_response :success
    end
end
