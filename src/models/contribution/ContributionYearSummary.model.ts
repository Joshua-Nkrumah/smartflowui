export interface ContributionYearSummary {
  status?:  string;
  message?: string;
  data?:    ContributionYearSummaryData;
}

export interface ContributionYearSummaryData {
  total?:   number;
  records?: ContributionYearSummaryRecords[];
}

export interface ContributionYearSummaryRecords {
  year?:               number;
  month?:              number;
  totalRecords?: number;
}
