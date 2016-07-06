# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160703213725) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.integer  "point_value"
    t.integer  "max_dice"
    t.string   "dice"
    t.integer  "game_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["game_id"], name: "index_cards_on_game_id", using: :btree
  end

  create_table "games", force: :cascade do |t|
    t.integer  "state",      default: 0
    t.string   "slots",      default: "---\n- 0\n- 1\n- 2\n- 3\n- 4\n- 5\n"
    t.text     "draw_deck",  default: "--- []\n"
    t.string   "share_link"
    t.datetime "created_at",                                                 null: false
    t.datetime "updated_at",                                                 null: false
  end

  create_table "players", force: :cascade do |t|
    t.string   "name"
    t.integer  "slot"
    t.integer  "score",          default: 0
    t.string   "dice_available", default: "--- []\n"
    t.string   "dice_pending",   default: "--- []\n"
    t.string   "dice_assigned",  default: "--- []\n"
    t.boolean  "has_rolled",     default: false
    t.boolean  "is_admin",       default: false
    t.boolean  "is_current",     default: false
    t.boolean  "is_last",        default: false
    t.integer  "game_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["game_id"], name: "index_players_on_game_id", using: :btree
  end

  add_foreign_key "cards", "games"
  add_foreign_key "players", "games"
end
