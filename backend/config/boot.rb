ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
# require 'bootsnap/setup' # Speed up boot time by caching expensive operations.

require 'bootsnap'

env = ENV['RAILS_ENV'] || 'development'

Bootsnap.setup(
  cache_dir: 'tmp/cache',
  development_mode: env == 'development'
)
