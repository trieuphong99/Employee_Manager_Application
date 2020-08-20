# frozen_string_literal: true

class InvoicesController < ApplicationController
  before_action :load_project, only: [:new]
  before_action :set_invoice, only: %i(show edit update destroy)

  # GET /invoices
  # GET /invoices.json
  def index
    today = Date.today
    start_date = Date.new(today.year, 1, 1)
    end_date = Date.new(today.year + 1, 12, 31)
    @projects = Project.all
    @project_infos = @projects.group_by(&:customer)
    @invoices = Invoice.where(project_id: @projects.map(&:id)).includes(project: :customer)
      .where("invoice_date > ? and invoice_date < ?", start_date, end_date)
    @invoice_infos = {}
    @invoices.each do |invoice|
      @invoice_infos[invoice.project.id] ||= {}
      @invoice_infos[invoice.project.id][invoice.invoice_date.strftime("%-m-%Y")] = invoice
    end
  end

  # GET /invoices/1
  # GET /invoices/1.json
  def show; end

  # GET /invoices/new
  def new
    month, year = params[:month].split("-").map(&:to_i)
    invoice_date = Date.new(year, month, 1).end_of_month
    payment_date = (Date.new(year, month, 1).end_of_month + 1).end_of_month
    @invoice = Invoice.new(project: @project, invoice_date: invoice_date, payment_date: payment_date)
    @invoice.invoice_items.build
  end

  # GET /invoices/1/edit
  def edit
    @project = @invoice.project
  end

  # POST /invoices
  # POST /invoices.json
  def create
    @invoice = Invoice.new(invoice_params)

    respond_to do |format|
      if @invoice.save
        format.html { redirect_to invoices_url, notice: "Invoice was successfully created." }
        format.json { render :show, status: :created, location: @invoice }
      else
        @project = @invoice.project
        format.html { render :new }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /invoices/1
  # PATCH/PUT /invoices/1.json
  def update
    respond_to do |format|
      if @invoice.update(invoice_params)
        format.html { redirect_to invoices_url, notice: "Invoice was successfully updated." }
        format.json { render :show, status: :ok, location: @invoice }
      else
        @project = @invoice.project
        format.html { render :edit }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /invoices/1
  # DELETE /invoices/1.json
  def destroy
    @invoice.destroy
    respond_to do |format|
      format.html { redirect_to invoices_url, notice: "Invoice was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def load_project
    @project = Project.find_by(id: params[:project_id])
    redirect_to invoices_path unless @project
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_invoice
    @invoice = Invoice.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def invoice_params
    params.require(:invoice).permit(
      :project_id,
      :amount,
      :invoice_date,
      :payment_date,
      :currency,
      invoice_items_attributes: {}
    )
  end
end
