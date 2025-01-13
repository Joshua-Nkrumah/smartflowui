export class NewStudent {
  status?: string;
  message?: string;
  data?: NewStudentData;
}

export class NewStudentData {
  total?: string;
  records?: NewStudentRecords;
}

export class NewStudentRecords {
  id?: string;
  class_id?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  student_id_number?: null;
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
  current_semester?: null;
  student_status?: null;
  progress_status?: null;
  student_role?: null;
  created_by?: string;
  updated_by?: string;
  updated_at?: Date;
  created_at?: Date;
}
