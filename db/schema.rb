# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_23_135811) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
    t.date "joining_date"
    t.date "official_date"
    t.string "contract_type"
    t.string "position"
    t.boolean "status", default: true
    t.string "id_card"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "jti", null: false
    t.index ["code"], name: "index_accounts_on_code", unique: true
    t.index ["confirmation_token"], name: "index_accounts_on_confirmation_token", unique: true
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["id_card"], name: "index_accounts_on_id_card", unique: true
    t.index ["jti"], name: "index_accounts_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token", unique: true
  end

  create_table "accounts_roles", id: false, force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "role_id"
    t.index ["account_id", "role_id"], name: "index_accounts_roles_on_account_id_and_role_id"
    t.index ["account_id"], name: "index_accounts_roles_on_account_id"
    t.index ["role_id"], name: "index_accounts_roles_on_role_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "back_accounts", force: :cascade do |t|
    t.string "bank_name"
    t.string "branch"
    t.string "swift_code"
    t.string "account_number"
    t.string "account_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "compensations", force: :cascade do |t|
    t.date "date"
    t.time "start_at"
    t.time "end_at"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_status", default: "waiting"
    t.date "for_date"
    t.index ["account_id"], name: "index_compensations_on_account_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "short_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dayoffs", force: :cascade do |t|
    t.string "reason"
    t.string "status"
    t.boolean "is_paid", default: false
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_status", default: "waiting"
    t.date "request_date"
    t.date "from_date"
    t.date "to_date"
    t.index ["account_id"], name: "index_dayoffs_on_account_id"
  end

  create_table "invoice_items", force: :cascade do |t|
    t.integer "invoice_id"
    t.string "name"
    t.decimal "quantity", precision: 15, scale: 2
    t.integer "unit", default: 0
    t.decimal "price_unit", precision: 15, scale: 2
    t.decimal "total", precision: 15, scale: 2
    t.integer "currency", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.integer "project_id"
    t.decimal "amount", precision: 15, scale: 2
    t.integer "currency", default: 1
    t.date "invoice_date"
    t.date "payment_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "state", default: 0
  end

  create_table "overtimes", force: :cascade do |t|
    t.date "date"
    t.time "start_at"
    t.time "end_at"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_status", default: "waiting"
    t.string "reason"
    t.index ["account_id"], name: "index_overtimes_on_account_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name"
    t.string "phone_number"
    t.string "address"
    t.string "sex"
    t.date "date_of_birth"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_profiles_on_account_id"
    t.index ["phone_number"], name: "index_profiles_on_phone_number", unique: true
  end

  create_table "projects", force: :cascade do |t|
    t.integer "customer_id"
    t.string "name"
    t.date "start_date"
    t.date "end_date"
    t.integer "invoice_type"
    t.decimal "amount", precision: 15, scale: 2
    t.integer "currency", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "providers", force: :cascade do |t|
    t.integer "uid"
    t.integer "type_id"
    t.text "credentials"
    t.text "info"
    t.string "rooms"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "timesheet_requests", force: :cascade do |t|
    t.date "date"
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "reason_in"
    t.string "reason_out"
    t.string "confirmation_status", default: "waiting"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reason"
    t.bigint "account_id"
    t.index ["account_id"], name: "index_timesheet_requests_on_account_id"
  end

  create_table "timesheets", force: :cascade do |t|
    t.date "date"
    t.datetime "start_at"
    t.datetime "end_at"
    t.text "note"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "report_content"
    t.string "report_room"
    t.integer "provider_id"
    t.string "reason"
    t.string "status", default: "work"
    t.boolean "is_allowed", default: true
    t.boolean "is_paid", default: true
    t.string "request_approving", default: "Confirmed"
    t.string "reason_in"
    t.string "reason_out"
    t.index ["account_id", "date"], name: "index_timesheets_on_account_id_and_date"
    t.index ["account_id"], name: "index_timesheets_on_account_id"
    t.index ["date"], name: "index_timesheets_on_date"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "compensations", "accounts"
  add_foreign_key "dayoffs", "accounts"
  add_foreign_key "overtimes", "accounts"
  add_foreign_key "profiles", "accounts"
  add_foreign_key "timesheet_requests", "accounts"
end
