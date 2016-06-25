# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

num_cards = [
    { number: 6, point_value: 2, dice_count: 2},
    { number: 12, point_value: 5, dice_count: 3},
    { number: 8, point_value: 10, dice_count: 4},
    { number: 4, point_value: 15, dice_count: 6}
]

def new_card(options)
    dice = options[:dice_count].times.map { 1 + Random.rand(5) }
    Card.create(point_value: options[:point_value], max_dice: options[:dice_count], dice: dice)
end

num_cards.each do |type|
    type[:number].times do
        new_card(type)
    end
end
