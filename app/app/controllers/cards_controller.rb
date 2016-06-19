class CardsController < ApplicationController
  def index
      render json: "[ [1, 3], [1, 2, 5, 6], [3, 3, 3], [1, 1, 3, 3, 6, 6] ]" 
  end
end
