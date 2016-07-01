class Card < ActiveRecord::Base
    serialize :dice, Array

    belongs_to :game
end
