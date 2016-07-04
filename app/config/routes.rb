Rails.application.routes.draw do
    resources :games do
        put :start
        resources :players do
            put :roll
            put :take
            put :retrieve
            put :turn

            put '/assign/:dice_index/:card_index', to: 'players#assign'
        end
    end

    get '/store' => 'games#store'

    root 'games#index'

    # Serve websocket cable requests in-process
    mount ActionCable.server => '/cable'
end
