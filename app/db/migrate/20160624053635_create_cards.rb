class CreateCards < ActiveRecord::Migration
    def change
        create_table :cards do |t|
            t.integer :point_value
            t.integer :max_dice
            t.text :dice

            t.timestamps null: false
        end
    end
end
