class GameController < ApplicationController
    def index
        render template: "game/index"
    end
end
