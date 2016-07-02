require 'test_helper'

class PlayersControllerTest < ActionController::TestCase
    test "should get create player form" do
        get :new, game_id: games(:game).id

        assert_response :success
    end

    test "should fail to create player with invalid data" do
        post :create, game_id: games(:game).id, player: { :name => "", :slot => nil, :game_id => nil }

        assert_response :success
        assert_select 'h2', "Error"
    end

    test "should create new player via html request" do
        post :create, game_id: games(:game).id,
            player: {
                :name => players(:malloy).name,
                :slot => players(:malloy).slot,
                :game_id => games(:game).id }

        assert_redirected_to game_path(assigns(:game))
    end
end
