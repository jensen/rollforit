# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class StoreChannel < ApplicationCable::Channel
    def subscribed
        stop_all_streams
        stream_from "store_notification_update"
    end

    def unsubscribed
        stop_all_streams
    end

    def update
    end
end
