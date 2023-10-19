class CertificatesController < ApplicationController
  before_action :authenticate_user! 
  before_action :set_user
  before_action :set_certificate, only: [:show, :update, :destroy]

  def index
    @certificates = @user.certificates
    render json: @certificates
  end

  def show
    @certificate = @user.certificates.find(params[:id]) 
    render json: @certificate
  end


  def create
    @certificate = @user.certificates.build(name: params[:certificate][:name], description: params[:certificate][:description], user_id: params[:certificate][:userID])
    @certificate.user_id = params[:certificate][:userID]
      
    if @certificate.save
      render json: @certificate, status: :created
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @certificate.user_id = params[:certificate][:userID]
    @certificate.name = params[:certificate][:name]
    @certificate.description = params[:certificate][:description]
    if @certificate.save
      render json: @certificate, status: :ok
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @certificate = Certificate.find_by(id: params[:id])
  
    if @certificate
      if @certificate.destroy
        @certificates = @user.certificates
        render json: @certificates, status: :ok
      else
        render json: @certificate.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Certyfikat nie istnieje" }, status: :not_found
    end
  end
  
  

  


  private

  def certificate_params
    params.require(:certificate).permit(:name, :description, :userID)
  end
  
  

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_certificate
    @certificate = @user.certificates.find(params[:id])
  end

end
