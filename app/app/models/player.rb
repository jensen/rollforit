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

        self.dice_available = rollable.times.map { |n| 1 + Random.rand(5) }
        self.save
    end
end
