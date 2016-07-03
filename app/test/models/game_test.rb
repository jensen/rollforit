require 'test_helper'

class GameTest < ActiveSupport::TestCase
    setup do
        @game = games(:game)
    end

    test "should initialize draw_deck" do
        assert @game.draw_deck.length == 0, "draw deck should be empty"

        @game.initialize_draw_deck

        assert @game.draw_deck.length == 30, "draw deck should have 30 cards"
    end

    test "should fill deck with three new cards" do
        @game.initialize_draw_deck

        assert_difference '@game.draw_deck.length', -3, "draw deck should have lost 3 cards" do
            draw_three_cards
        end

        assert @game.cards.length == 3, "card deck should have gained 3 cards"
    end

    private

    def draw_three_cards
        3.times do |i|
            @game.draw_card(i)
        end
    end
end
