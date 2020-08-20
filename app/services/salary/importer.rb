# frozen_string_literal: true

module Salary
  class Importer
    attr_accessor :filepath

    def initialize filepath
      @filepath = filepath
    end

    def run
      xlsx = Roo::Spreadsheet.open(filepath)
      sheet = xlsx.sheet(0)

      result = []
      sheet.each(headers) do |row|
        next unless /\AB\d{6}\z/.match?(row["id"])

        result << row
      end

      result
    end

    private

    def headers
      {
        "stt" => "STT",
        "id" => "ID",
        "name" => "NAME",
        "position" => "POSITION",
        "base_salary" => "BASE_SALARY",
        "lunch" => "LUNCH",
        "house" => "HOUSE",
        "gas" => "GAS",
        "children" => "CHILDREN",
        "language" => "LANGUAGE",
        "phu_cap_tn" => "PHU_CAP_TN",
        "base_total" => "BASE_TOTAL",
        "days" => "DAYS",
        "total" => "TOTAL",
        "total_with_tax" => "TOTAL_WITH_TAX",
        "tn1" => "TN1",
        "tn2" => "TN2",
        "luong_bao_hiem" => "LUONG_BAO_HIEM",
        "bhxh" => "BHXH",
        "bh_tnld" => "BH_TNLD",
        "bhyt" => "BHYT",
        "bhtn" => "BHTN",
        "kpcd" => "KPCD",
        "sub_total_bh" => "SUB_TOTAL_BH",
        "nv_bhxh" => "NV_BHXH",
        "nv_bhyt" => "NV_BHYT",
        "nv_bhtn" => "NV_BHTN",
        "nv_sub_total_bh" => "NV_SUB_TOTAL_BH",
        "tong_bao_hiem" => "TONG_BAO_HIEM",
        "giam_tru" => "GIAM_TRU",
        "nguoi_phu_thuoc" => "NGUOI_PHU_THUOC",
        "real_total_with_tax" => "REAL_TOTAL_WITH_TAX",
        "tax" => "TAX",
        "tmp" => "TMP",
        "real_total" => "REAL_TOTAL",
        "signing" => "SIGNING"
      }
    end
  end
end
