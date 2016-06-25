class CreatePlayers < ActiveRecord::Migration
    def change
        create_table :players do |t|
            t.string :name
            t.integer :slot

            t.belongs_to :game, index: true, foreign_key: true

            t.timestamps null: false
        end
    end
end
