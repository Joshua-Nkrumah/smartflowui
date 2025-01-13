export interface UAMRoles {
  status?: string;
  message?: string;
  data?: UAMRoleData;
}

export interface UAMRoleData {
  total?: number;
  records?: UAMRecord[];
}

export interface UAMRecord {
  id?: string;
  roleName?: string;
  normalizedName?: string;
  status?: string;
  statusLabel?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
