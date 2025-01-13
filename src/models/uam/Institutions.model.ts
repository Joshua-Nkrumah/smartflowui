export interface Institution {
  status?: string;
  message?: string;
  data?: InstitutionData;
}

export interface InstitutionData {
  total?: number;
  records?: InstitutionRecord[];
}

export interface InstitutionRecord {
  id?: string;
  insCode?: string;
  name?: string;
  shortName?: string;
  domainName?: string;
  websiteUrl?: string;
  institutionLogo?: null;
  city?: string;
  state?: string;
  country?: string;
  contacts?: string[];
  emailAddresses?: string[];
  status?: string;
  statusLabel?: string;
  rank?: string;
  zipCode?: string;
  address?: string;
  description?: string;
  createdBy?: string;
  modifiedBy?: null;
  createdAt?: Date;
  modifiedAt?: null;
  subscriptionId?: null;
  appId?: null;
  settingsId?: null;
  mfaSettingsId?: null;
}
