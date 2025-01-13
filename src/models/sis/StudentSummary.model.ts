export class StudentSummary {
  status?: string;
  message?: string;
  data?: StudentSummaryData;
}

export class StudentSummaryData {
  profile?: StudentProfile;
}

export class StudentProfile {
  id?: string;
  tenantId?: string;
  classId?: string;
  studentNumber?: string;
  firstName?: string;
  surName?: string;
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
