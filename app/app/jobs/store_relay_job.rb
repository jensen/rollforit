class StoreRelayJob < ApplicationJob
    def perform
        ActionCable.server.broadcast "store_notification_update", {}
    end
end
