export interface GuardianStudentMappingResponse {
  status?: string;
  message?: string;
  data?: GuardianStudentMappingData;
}

export interface GuardianStudentMappingData {
  records?: GuardianStudentMappingRecord[];
  total?: number;
  summary?: null;
}

export interface GuardianStudentMappingRecord {
  id?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  relationshipToChild?: string;
  tenant?: GuardianStudentMappingTenant;
  guardian?: GuardianStudentMappingGuardian;
  student?: GuardianStudentMappingStudent;
}

export interface GuardianStudentMappingGuardian {
  id?: string;
  firstName?: string;
  surName?: string;
  gender?: string;
  guardianGroup?: string;
  guardianNumber?: string;
  phoneNumber?: string;
  status?: string;
}

export interface GuardianStudentMappingStudent {
  id?: string;
  firstName?: string;
  surName?: string;
  email?: string;
  studentNumber?: string;
  gender?: string;
  country?: string;
  status?: string;
}

export interface GuardianStudentMappingTenant {
  id?: string;
  name?: string;
  createdAt?: Date;
}
