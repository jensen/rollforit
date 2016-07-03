require 'digest/md5'

class Game < ActiveRecord::Base
    # serialization
    serialize :draw_deck, Array
    serialize :discard_deck, Array
    serialize :cards, Array
    serialize :slots, Array

    # association
    has_many :players do
        def admin
            where(:is_admin => true).first
        end
        def current
            where(:is_current => true).first
        end
    end

    has_many :cards

    accepts_nested_attributes_for :players

    # validations

    # callbacks
    after_create :update_share_link

    # enums
    enum state: [ :waiting_for_players, :in_progress, :completed ]

    def initialize_draw_deck
        self.draw_deck = Card.all.shuffle.map { |card| card[:id] }
    end

    def draw_card(card_index)
        card = Card.find(self.draw_deck.shift)

        if self.cards[card_index] != nil
            self.cards.delete(self.cards[card_index])
        end

        self.cards.push(card)

        self.save
    end

    private

    def update_share_link
        self.share_link = Digest::MD5.hexdigest(self.id.to_s + ' ' + self.created_at.to_s)
        self.save
    end
end
