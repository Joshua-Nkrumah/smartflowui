export interface DonationYearSummary {
  status?:  string;
  message?: string;
  data?:    DonationYearSummaryData;
}

export interface DonationYearSummaryData {
  total?:   number;
  records?: DonationYearSummaryRecords[];
}

export interface DonationYearSummaryRecords {
  year?:               number;
  month?:              number;
  totalRecords?: number;
}
