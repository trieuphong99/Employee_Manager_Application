# frozen_string_literal: true

class SalariesController < ApplicationController
  before_action :authenticate_account!

  def index; end

  def new; end

  def create
    file = salary_params[:file]
    @staffs = Salary::Importer.new(file).run
  end

  private

  def salary_params
    params.require(:salary).permit(:file)
  end
end
