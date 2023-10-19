Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }

  resources :users do
    resources :certificates, only: [:create, :update, :index, :show, :destroy]
  end
end
