class TrainersController < ApplicationController
  def index
    trainers = Trainer.includes(:pokemons).all

    render json: trainers, include: [ :pokemons ];
  end
end
