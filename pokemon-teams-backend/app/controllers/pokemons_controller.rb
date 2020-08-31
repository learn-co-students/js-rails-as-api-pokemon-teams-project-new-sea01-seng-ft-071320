class PokemonsController < ApplicationController
  def destroy
    Pokemon.find(params[:id]).destroy
    render json: { message: "Pokemon with ID of #{params[:id]} deleted." }
  end

  def create
    pokemon = Pokemon.generateRandom
    pokemon.trainer_id = params[:trainer_id]
    pokemon.save

    render json: pokemon
  end
end
