export interface AllStudents {
  status?: string;
  message?: string;
  data?: AllStudentData;
}

export interface AllStudentData {
  records?: AllStudentRecord[];
  total?: number;
  summary?: StudentRecordSummary;
}

export interface AllStudentRecord {
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

export interface StudentRecordSummary {
  totalMales?: number;
  totalFemales?: number;
  activeStudents?: number;
  inactiveStudents?: number;
}

// export interface AllStudents {
//   status?: string;
//   message?: string;
//   data?: AllStudentData;
// }

// export interface AllStudentData {
//   total?: number;
//   records?: AllStudentRecord[];
// }

// export interface AllStudentRecord {
//   id?: string;
//   class_id?: string;
//   first_name?: string;
//   last_name?: string;
//   middle_name?: string;
//   student_id_number?: null;
//   password?: null;
//   date_of_birth?: string;
//   gender?: string;
//   email?: string;
//   phone_number?: string;
//   emergency_contact?: string;
//   address_line1?: string;
//   address_line2?: string;
//   city?: string;
//   state?: string;
//   postal_code?: string;
//   country?: string;
//   nationality?: string;
//   admission_date?: string;
//   graduation_date?: string;
//   student_role?: null;
//   current_semester?: null;
//   student_status?: null;
//   progress_status?: null;
//   photo_path?: string;
//   created_by?: string;
//   updated_by?: string;
//   deleted_at?: null;
//   created_at?: Date;
//   updated_at?: Date;
// }

export interface StudentDetails {
  status?: string;
  message?: string;
  data?: StudentData;
}
export interface StudentData {
  total?: number;
  records?: StudentRecord;
}

export interface StudentRecord {
  id?: string;
  class_id?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  student_id_number?: null;
  password?: null;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  emergency_contact?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  nationality?: string;
  admission_date?: string;
  graduation_date?: string;
  student_role?: null;
  current_semester?: null;
  student_status?: null;
  progress_status?: null;
  photo_path?: string;
  created_by?: string;
  updated_by?: string;
  deleted_at?: null;
  created_at?: Date;
  updated_at?: Date;
}
