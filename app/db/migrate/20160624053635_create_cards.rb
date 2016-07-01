class CreateCards < ActiveRecord::Migration
    def change
        create_table :cards do |t|
            t.integer :point_value
            t.integer :max_dice
            t.text :dice

            t.belongs_to :game, index: true, foreign_key: true

            t.timestamps null: false
        end
    end
end
