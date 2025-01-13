export interface AllRequests {
  status?: boolean;
  message?: string;
  data?: AllRequestData[];
}

export interface AllRequestData {
  requestId?: number;
  requestType?: string;
  paymentType?: string;
  amount?: number;
  customerName?: string;
  exceptionTitle?: string;
  unit?: string;
  description?: string;
  sourceAccount?: string;
  destinationAccount?: string;
  status?: null | string;
  requestedBy?: string;
  approvedBy?: null | string;
  branchCode?: string;
  approvalStatus?: null | string;
  comments?: null | string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: null | string;
}
