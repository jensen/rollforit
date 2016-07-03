class CreatePlayers < ActiveRecord::Migration
    def change
        create_table :players do |t|
            t.string :name

            t.integer :slot
            t.integer :score, default: 0

            t.string :dice_available, default: []
            t.string :dice_pending, default: []
            t.string :dice_assigned, default: []

            t.boolean :has_rolled, default: false

            t.boolean :is_admin, default: false
            t.boolean :is_current, default: false

            t.belongs_to :game, index: true, foreign_key: true

            t.timestamps null: false
        end
    end
end
