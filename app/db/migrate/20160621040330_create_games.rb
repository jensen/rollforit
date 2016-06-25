class CreateGames < ActiveRecord::Migration
    def change
        create_table :games do |t|
            t.string :share_link
            t.integer :admin_player
            t.integer :current_player

            t.text :draw_deck, default: []
            t.text :discard_deck, default: []

            t.string :slots, default: [*0..5]
            t.string :cards, default: []

            t.integer :state, default: 0 # waiting_for_players

            t.timestamps null: false
        end
    end
end
