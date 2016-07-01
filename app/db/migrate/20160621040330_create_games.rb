class CreateGames < ActiveRecord::Migration
    def change
        create_table :games do |t|
            t.integer :state, default: 0 # waiting_for_players
            t.string :slots, default: [*0..5]
            t.text :draw_deck, default: []

            t.string :share_link

            t.timestamps null: false
        end
    end
end
