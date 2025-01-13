export interface TotalContributionAmount {
  status?:  string;
  message?: string;
  data?:    TotalContributionAmountData;
}

export interface TotalContributionAmountData {
  total?: number;
  records?: any[];
}
