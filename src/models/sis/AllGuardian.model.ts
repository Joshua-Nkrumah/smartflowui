export interface AllGuardian {
  status?: string;
  message?: string;
  data?: AllGuardianData;
}

export interface AllGuardianData {
  records?: AllGuardianRecord[];
  total?: number;
  summary?: AllGuardianSummary;
}

export interface AllGuardianRecord {
  id?: string;
  tenantId?: string;
  guardianNumber?: string;
  firstName?: string;
  surName?: string;
  guardianGroup?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  nationality?: string;
  residentialAddress?: string;
  homeTownAddress?: string;
  dateOfBirth?: null;
  status?: string;
  photoPath?: null;
  country?: string;
  postalCode?: string;
  state?: string;
  city?: string;
  emergencyContact?: string;
  createdBy?: string;
  updatedBy?: null;
  createdAt?: Date;
  updatedAt?: null;
}

export interface AllGuardianSummary {
  totalMales?: number;
  totalFemales?: number;
  activeGuardians?: number;
  inactiveGuardians?: number;
  totalParents?: number;
  totalGuardians?: number;
}
