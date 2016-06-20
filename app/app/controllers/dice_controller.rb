class DiceController < ApplicationController
    def index
        render json: "[ 1, 2, 0, 4, 5, 6 ]"
    end
end
