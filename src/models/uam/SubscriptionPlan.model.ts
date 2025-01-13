export interface SubscriptionPlan {
  status?: string;
  message?: string;
  data?: SubscriptionPlanData;
}

export interface SubscriptionPlanData {
  records?: SubscriptionPlanRecord[];
  total?: number;
}

export interface SubscriptionPlanRecord {
  id?: string;
  brandName?: string;
  name?: string;
  apps?: App[];
  roles?: Role[];
  description?: string;
  monthlyAmount?: number;
  quartelyAmount?: null;
  midYearAmount?: null;
  annualAmount?: null;
  terminalAmount?: null;
  currency?: null;
  statusLabel?: null;
  status?: null;
  createdBy?: string;
  createdAt?: null;
}

export interface App {
  id?: string;
  subscriptionTypeId?: null;
  categoryId?: null;
  settingId?: null;
  appName?: string;
  brandName?: string;
  caption?: string;
  description?: string;
  rank?: string;
  isActive?: null;
  status?: string;
  statusLabel?: string;
  appUrl?: string;
  logoUrl?: null;
  appIcon?: null;
  version?: string;
  appOwner?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: null;
  modifiedAt?: Date;
  releaseDate?: null;
}

export interface Role {
  id?: string;
  roleName?: string;
  normalizedName?: string;
  description?: string;
  status?: string;
  statusLabel?: string;
  createdBy?: string;
  modifiedBy?: null;
  createdAt?: Date;
  modifiedAt?: Date | null;
}
