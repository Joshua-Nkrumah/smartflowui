export interface StudentCategory {
  status?: string;
  message?: string;
  data?: StudentCategoryData;
}

export interface StudentCategoryData {
  records?: StudentCategoryRecord[];
  total?: number;
  summary?: StudentCategorySummary;
}

export interface StudentCategoryRecord {
  id?: string;
  categoryName?: string;
  code?: string;
  description?: string;
  categoryGroup?: string;
  status?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: null;
  updatedAt?: null;
}

export interface StudentCategorySummary {
  activeCategory?: number;
  inactiveCategory?: number;
}
