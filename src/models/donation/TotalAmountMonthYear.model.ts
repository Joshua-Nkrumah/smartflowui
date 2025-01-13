export interface TotalDonationAmount {
  status?:  string;
  message?: string;
  data?:    TotalDonationAmountData;
}

export interface TotalDonationAmountData {
  total?: number;
  records?: any[];
}
