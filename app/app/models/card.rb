class Card < ActiveRecord::Base
    serialize :dice, Array

    belongs_to :game

    def how_many_dice_of_value(dice_value)
        total = self.dice.select { |n| n == dice_value }
        return total.length
    end
end
