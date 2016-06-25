class Card < ActiveRecord::Base
    serialize :dice, Array
end
