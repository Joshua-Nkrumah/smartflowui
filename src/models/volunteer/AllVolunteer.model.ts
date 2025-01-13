export interface Volunteers {
  status?:  string;
  message?: string;
  data?:    VolunteerData;
}

export interface VolunteerData {
  total?:   number;
  records?: VolunteerRecords[];
}

export interface VolunteerRecords {
  memberId?:              string;
  firstName?:             string;
  middleName?:            string;
  lastName?:              string;
  photograph?:            string;
  age?:                   string;
  dateOfBirth?:           Date;
  gender?:                string;
  emailAddress?:          string;
  location?:              string;
  phoneNumber?:           string;
  emergencyContact?:      string;
  dateJoined?:            Date;
  maritalStatus?:         string;
  membershipStatus?:      string;
  children?:              string;
  occupation?:            string;
  membershipType?:        string;
  additionalInformation?: Date;
  createdBy?:             string;
  isDeleted?:             null;
  deletedAt?:             null;
  createdAt?:             Date;
  updatedAt?:             Date;
}




