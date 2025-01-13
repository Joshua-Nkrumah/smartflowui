export interface Category {
  status?: string;
  message?: string;
  data?: CategoryData;
}

export interface CategoryData {
  records?: CategoryRecord[];
  total?: number;
}

export interface CategoryRecord {
  id?: string;
  name?: string;
  description?: string;
  createdBy?: string;
  createdAt?: Date;
  modifiedBy?: null;
  modifiedAt?: null;
}
