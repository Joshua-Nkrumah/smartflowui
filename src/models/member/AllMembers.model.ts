export interface Members {
  status?:  string;
  message?: string;
  data?:    MemberData;
}

export interface MemberData {
  total?:   number;
  records?: MemberRecords[];
}

export interface MemberRecords {
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




