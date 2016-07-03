require 'test_helper'

class PlayerTest < ActiveSupport::TestCase
    test "should allow player to initialize dice" do
        @player = players(:malloy)

        assert sum(@player.dice_available) == 0

        @player.initialize_dice

        assert sum(@player.dice_available)
    end

    test "should allow player to roll dice" do
        @player = players(:malloy)
        @player.initialize_dice
        @player.roll_dice

        assert sum(@player.dice_available)
    end

    test "should not allow player to roll dice" do
        @player = players(:susan)
        @player.dice_available = [1, 1, 1, 1, 1, 1]
        @player.roll_dice

        assert sum(@player.dice_available) == 6
    end

    test "should return that user has filled card" do
        @player = players(:malloy)
        @player.dice_available = [1, 1, 1, 1]
        @player.dice_assigned = [[1, 1], [0, 0, 0, 0], [0, 0]];

        assert @player.filled_card?
    end

    test "should add dice to pending when taking card" do
        setup_take_card

        @player.retrieve_dice(0)

        assert @player.dice_pending.length == 2, "dice wasn't added back to the dice pending"
    end

    test "should increase score after taking card" do
        setup_take_card

        @player.increase_score(2)

        assert @player.score == 2, "score wasn't increased by card"
    end

    test "should update assigned after taking card" do
        setup_take_card

        @player.update_assigned(0, cards(:card_2).max_dice)

        assert @player.dice_assigned.last[0] == 0 && @player.dice_assigned.last[1]
    end

    test "should clear assigned" do
        setup_take_card

        @player.clear_assigned

        assert @player.dice_assigned[0][0] == 0 && @player.dice_assigned[0][1] == 0
    end

    private

    def setup_take_card
        @game = games(:game)
        @game.cards = [cards(:card_1)]
        @game.save

        @player = players(:malloy)
        @player.dice_available = [1, 1, 1, 1]
        @player.dice_assigned = [[1, 1], [0, 0, 0, 0], [0, 0]];
        @player.score = 0
    end
end
