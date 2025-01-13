export interface StudentGuardian {
  status?: string;
  message?: string;
  data?: StudentGuardianData;
}

export interface StudentGuardianData {
  total?: number;
  records?: StudentGuardianRecord[];
}

export interface StudentGuardianRecord {
  id?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  guardian_id_number?: string;
  password?: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone_number1?: string;
  phone_number2?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  nationality?: string;
  relationship_to_child?: string;
  guardian_status?: string;
  photo_path?: null;
  created_by?: string;
  updated_by?: null;
  deleted_at?: null;
  created_at?: Date;
  updated_at?: Date;
}
