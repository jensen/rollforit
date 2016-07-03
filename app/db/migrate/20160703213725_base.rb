class Base < ActiveRecord::Migration[5.0]
  def change
      create_table :games do |t|
          t.integer :state, default: 0 # waiting_for_players
          t.string :slots, default: [*0..5].to_yaml
          t.text :draw_deck, default: [].to_yaml

          t.string :share_link

          t.timestamps
      end

      create_table :players do |t|
          t.string :name

          t.integer :slot
          t.integer :score, default: 0

          t.string :dice_available, default: [].to_yaml
          t.string :dice_pending, default: [].to_yaml
          t.string :dice_assigned, default: [].to_yaml

          t.boolean :has_rolled, default: false

          t.boolean :is_admin, default: false
          t.boolean :is_current, default: false

          t.belongs_to :game, foreign_key: true

          t.timestamps
      end

      create_table :cards do |t|
          t.integer :point_value
          t.integer :max_dice
          t.string :dice

          t.belongs_to :game, foreign_key: true

          t.timestamps
      end
  end
end
