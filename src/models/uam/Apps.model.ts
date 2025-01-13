export interface UAMApps {
  status?: string;
  message?: string;
  data?: UAMAppData;
}

export interface UAMAppData {
  records?: UAMAppRecord[];
  total?: number;
}

export interface UAMAppRecord {
  id?: string;
  subscriptionTypeId?: null;
  categoryId?: string;
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
  modifiedAt?: null;
  releaseDate?: null;
}

// export interface UAMApps {
//   status?:  string;
//   message?: string;
//   data?:    UAMAppData;
// }

// export interface UAMAppData {
//   total?:   number;
//   records?: UAMAppRecord[];
// }

// export interface UAMAppRecord {
//   app?:   UAMAppInfo;
//   roles?: UAMRoleInfo[];
// }

// export interface UAMAppInfo {
//   id?:          string;
//   app_name?:    string;
//   app_key?:     string;
//   caption?:     string;
//   endpoint?: string;
//   description?: string;
//   rank?:        string;
//   status?:      string;
//   created_by?:  string;
//   created_at?:  Date;
//   updated_at?:  Date;
// }

// export interface UAMRoleInfo {
//   id?:              string;
//   role_name?:       string;
//   normalized_name?: string;
//   app_id?:          string;
//   status?:          string;
//   created_by?:      string;
//   created_at?:      Date;
//   updated_at?:      Date;
// }
