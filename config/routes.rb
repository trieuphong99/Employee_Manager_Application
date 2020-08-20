# frozen_string_literal: true

Rails.application.routes.draw do
  resources :invoices
  resources :projects
  resources :customers
  resources :dayoffs

  scope module: "api" do
    namespace :v1 do
      devise_for :accounts, defaults: { format: :json },
                        class_name: "ApiAccount",
                        skip: [:registrations, :invitations,
                               :passwords, :confirmations,
                               :unlocks],
                        path: "",
                        path_names: { sign_in: "login", sign_out: "logout"}
                                    
      devise_scope :account do
        get "login", to: "devise/sessions#new"
        delete "logout", to: "devise/sessions#destroy"
      end
    end
  end
  
  devise_for :accounts, skip: [:session, :password]
  as :account do
    get "login", to: "sessions#new", as: :new_account_session
    post "login", to: "sessions#create", as: :account_session
    delete "logout", to: "sessions#destroy", as: :destroy_account_session
    get "forgot_password", to: "passwords#new", as: :new_account_password
    post "forgot_password", to: "passwords#create", as: :account_password
    get "reset_password", to: "passwords#edit", as: :edit_account_password
    put "forgot_password", to: "passwords#update"
    get "confirmation", to: "confirmations#show"
    put "confirmation", to: "confirmations#update"
  end

  root to: "dashboards#dashboard"
  resources :timesheets do
    collection do
      get "get_rooms"
      get "profile"
      patch "edit_reason"
    end
  end
  get "/auth/chatwork/callback", to: "timesheets#chatwork_callback"
  get "/auth/slack/callback", to: "timesheets#slack_callback"
  resources :accounts, only: %i(index show) do
    collection do
      get "profile"
      get "connection"
    end
  end
  resources :salaries
  resources :dashboards, only: [:index]
  resources :compensations
  resources :profile, only: [:index]
  resources :timesheet_requests

  namespace :admin do
    resources :users, controller: "accounts"
    resources :accounts, controller: "accounts", only: [:index]
    resources :user_compensations, controller: "compensation"
    resources :user_overtimes, controller: "overtime", only: %i(index update edit)
    resources :user_dayoffs, controller: "dayoffs"
    resources :user_timesheets, controller: "timesheets"
    resources :dashboards, only: :index do
      collection do
        get "pie_chart"
        get "bar_chart"
      end
    end
    post "users_csv", to: "accounts#import_csv"
    resources :timesheet_requests
  end

  resources :users, controller: "accounts", only: [:show, :update]

  post "change_password", to: "accounts#change_password"
  resources :overtimes, only: %i(index create update)

  post "/checkin", to: "timesheets#create"
  patch "/checkout", to: "timesheets#update"
  mount ActionCable.server => "/cable"
end
