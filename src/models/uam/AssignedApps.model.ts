export interface UAMAssignedApps {
  status?:  string;
  message?: string;
  data?:    UAMAssignedAppsData[];
}

export interface UAMAssignedAppsData {
  total?:   number;
  records?: UAMAssignedRecord[];
}

export interface UAMAssignedRecord {
  id?:         number;
  user_id?:    string;
  app_id?:     string;
  role_id?:    string;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  app?:        UAMAssignedApp;
  role?:       UAMAssignedRole;
}

export interface UAMAssignedApp {
  id?:          string;
  app_name?:    string;
  app_key?:     string;
  caption?:     string;
  endpoint?: string;
  description?: string;
  rank?:        string;
  status?:      string;
  created_by?:  string;
  created_at?:  Date;
  updated_at?:  Date;
}

export interface UAMAssignedRole {
  id?:              string;
  role_name?:       string;
  normalized_name?: string;
  app_id?:          string;
  status?:          string;
  created_by?:      string;
  created_at?:      Date;
  updated_at?:      Date;
}
