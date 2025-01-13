export interface CategoryStudentMapping {
  status?: string;
  message?: string;
  data?: CategoryStudentMappingData;
}

export interface CategoryStudentMappingData {
  records?: CategoryStudentMappingRecord[];
  total?: number;
  summary?: null;
}

export interface CategoryStudentMappingRecord {
  mappingId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tenant?: CategoryStudentMappingTenant;
  category?: CategoryMappingStudent;
  student?: StudentMappingCategory;
}

export interface CategoryMappingStudent {
  id?: string;
  categoryName?: string;
  description?: string;
  categoryGroup?: string;
  code?: string;
  status?: string;
}

export interface StudentMappingCategory {
  id?: string;
  firstName?: string;
  surName?: string;
  email?: string;
  studentNumber?: string;
  status?: string;
  gender?: string;
}

export interface CategoryStudentMappingTenant {
  id?: string;
  name?: string;
  createdAt?: Date;
}
