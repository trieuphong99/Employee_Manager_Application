Warden::JWTAuth.configure do |config|
  config.secret = ENV['DEVISE_JWT_SECRET_KEY']
  config.dispatch_requests = [
                               ['POST', %r{^/v1/login$}],
                               ['POST', %r{^/v1/login.json$}]
                             ]
  config.revocation_requests = [
                                 ['DELETE', %r{^/v1/logout$}],
                                 ['DELETE', %r{^/v1/logout.json$}]
                               ]
end