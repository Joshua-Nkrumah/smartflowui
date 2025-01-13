export interface VolunteerYearSummary {
  status?:  string;
  message?: string;
  data?:    VolunteerYearSummaryData;
}

export interface VolunteerYearSummaryData {
  total?:   number;
  records?: VolunteerYearSummaryRecords[];
}

export interface VolunteerYearSummaryRecords {
  year?:               number;
  month?:              number;
  totalRecords?: number;
}
