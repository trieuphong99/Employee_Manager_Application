class ConfirmationsController < Devise::ConfirmationsController
  #   skip_before_action :authenticate_user!

  # PUT /resource/confirmation
  def update
    with_unconfirmed_confirmable do
      @confirmable.attempt_set_password(params[:account])
      if @confirmable.valid? && @confirmable.password_match?
        do_confirm
      else
        do_show
        @confirmable.errors.clear
      end
    end

    unless @confirmable.errors.empty?
      self.resource = @confirmable
      render "devise/confirmations/show"
    end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    with_unconfirmed_confirmable do
      do_show
    end
    unless @confirmable.errors.empty?
      self.resource = @confirmable
      render "devise/confirmations/new" # Change this if you don't have the views on default path
    end
  end

  protected

  def with_unconfirmed_confirmable
    @confirmable = Account.find_or_initialize_with_error_by(:confirmation_token, params[:confirmation_token])
    @confirmable.only_if_unconfirmed {yield} unless @confirmable.new_record?
  end

  def do_show
    @confirmation_token = params[:confirmation_token]
    @requires_password = true
    self.resource = @confirmable
    render "devise/confirmations/show"
  end

  def do_confirm
    @confirmable.confirm
    set_flash_message :notice, :confirmed
    sign_in_and_redirect(resource_name, @confirmable)
  end
end
