class Player < ActiveRecord::Base
    # serialization

    # association
    belongs_to :game

    # validation
    validates :name, presence: true
    validates :slot, presence: true
    validates :game, presence: true

    validates_associated :game

    # callbacks

    # enums
end
