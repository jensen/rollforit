class Player < ApplicationRecord
    # serialization
    serialize :dice_available, Array
    serialize :dice_pending, Array
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
        self.dice_pending = []
        self.dice_assigned = game.cards.map { |card| Array.new(card.dice.length, 0) }

        self.save
    end

    def roll_dice
        rollable = self.dice_available.length

        if !dice_rolled? and self.is_current
            self.dice_available = rollable.times.map { |n| 1 + Random.rand(5) }
            self.has_rolled = true
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

    def increase_score(points)
        self.score += points
        self.save
    end

    def retrieve_dice(card_index)
        assigned = self.dice_assigned[card_index].select { |n| n != 0 }
        assigned.length.times do
            self.dice_pending.push(0)
        end

        self.save
    end

    def update_assigned(card_index, count)
        self.dice_assigned.delete_at(card_index)
        self.dice_assigned.push(Array.new(count, 0))
        self.save
    end

    def clear_assigned
        self.dice_assigned = self.dice_assigned.map do |card|
            Array.new(card.length, 0)
        end
        self.save
    end

    def resolve_pending
        self.dice_available.concat(self.dice_pending)
        self.dice_pending = []
        self.save
    end

    def start_turn
        self.is_current = true
        self.has_rolled = false
        resolve_pending
        self.save
    end

    def end_turn
        self.is_current = false
        self.dice_available = self.dice_available.map { |v| 0 }
        self.save
    end

    def dice_assigned?
        return self.dice_available.length < 6
    end

    def no_dice?
        return self.dice_available.length == 0
    end

    def dice_rolled?
        return self.has_rolled
    end

    def filled_card?
        result = self.dice_assigned.map do |card|
            card.find_index(0) == nil
        end

        return result.find_index(true) != nil
    end
end
