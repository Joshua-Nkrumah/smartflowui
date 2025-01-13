export interface Permissions {
  status?: string;
  message?: string;
  data?: PermissionData;
}

export interface PermissionData {
  records?: PermissionRecord[];
  total?: number;
}

export interface PermissionRecord {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  statusLabel?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: null;
  modifiedAt?: null;
}
