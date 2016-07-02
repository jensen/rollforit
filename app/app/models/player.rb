class Player < ActiveRecord::Base
    # serialization
    serialize :dice_available, Array
    serialize :dice_assigned, Array

    # association
    belongs_to :game

    # validation
    validates :name, presence: true
    validates :slot, presence: true
    validates :game, presence: true

    validates_associated :game

    # callbacks

    # enums

    def initialize_dice
        game = Game.find(self.game_id)

        self.dice_available = 6.times.map { |n| 0 }

        self.dice_assigned = game.cards.map { |card| Array.new(card.dice.length, 0) }
        self.save
    end

    def roll_dice
        rollable = self.dice_available.length
        sum = self.dice_available.inject(0) { | sum, n | sum + n }

        # when all dice are 0 we know we can roll
        # you still have to be the current player
        if sum == 0 and self.is_current
            self.dice_available = rollable.times.map { |n| 1 + Random.rand(5) }
            self.save

            return true
        end

        return false
    end

    def assign_dice(dice_index, card_index)
        dice_value = self.dice_available[dice_index]

        # remove the dice from the available pool
        self.dice_available.delete_at(dice_index)

        total = dice_assigned_to_card(dice_value, card_index) + 1
        dice = Game.find(self.game_id).cards[card_index].dice

        dice.each_with_index do |value, index|
            if value == dice_value and total > 0
                self.dice_assigned[card_index][index] = dice_value
                total = total - 1
            end
        end

        self.save
    end

    def dice_assigned_to_card(dice_value, card_index)
        total = self.dice_assigned[card_index].select { |n| n == dice_value }
        return total.length
    end
end
