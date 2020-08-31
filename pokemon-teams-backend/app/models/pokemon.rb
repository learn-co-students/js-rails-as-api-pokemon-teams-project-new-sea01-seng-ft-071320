class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.generateRandom
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    
    Pokemon.new(nickname: nickname, species: species)
  end
end
