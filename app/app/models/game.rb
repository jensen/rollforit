require 'digest/md5'

class Game < ActiveRecord::Base
    # serialization
    serialize :draw_deck, Array
    serialize :discard_deck, Array
    serialize :cards, Array
    serialize :slots, Array

    # association
    has_many :players
    accepts_nested_attributes_for :players

    # validations

    # callbacks
    after_create :update_share_link

    # enums
    enum state: [ :waiting_for_players, :in_progress, :completed ]

    private

    def update_share_link
        self.share_link = Digest::MD5.hexdigest(self.id.to_s + ' ' + self.created_at.to_s)
        self.save
    end
end
