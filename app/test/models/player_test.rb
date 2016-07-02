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
end
