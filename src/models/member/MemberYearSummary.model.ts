export interface MemberYearSummary {
  status?:  string;
  message?: string;
  data?:    MemberYearSummaryData;
}

export interface MemberYearSummaryData {
  total?:   number;
  records?: MemberYearSummaryRecords[];
}

export interface MemberYearSummaryRecords {
  year?:               number;
  month?:              number;
  totalRecords?: number;
}


