require 'test_helper'

class GamesControllerTest < ActionController::TestCase
    test "should get create game form" do
        get :new
        assert_response :success
    end
end
