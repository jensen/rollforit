ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

module CardSeedHelper
    def card_within_range(index, first, last)
        return index >= first && index < last
    end
end

class ActiveSupport::TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def sum(list)
        return list.inject(0) { | sum, x | sum + x }
    end

    ActiveRecord::FixtureSet.context_class.send :include, CardSeedHelper
end
