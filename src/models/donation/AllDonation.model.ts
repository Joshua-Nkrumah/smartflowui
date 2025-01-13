export interface Donations {
  status?:  string;
  message?: string;
  data?:    AllDonationData;
}

export interface AllDonationData {
  total?:   number;
  records?: DonationRecord[];
}

export interface DonationRecord {
  members?: MemberData;
  donation?: DonationData;
}

export interface MemberData {
  memberId?:              string;
  firstName?:             string;
  middleName?:            string;
  lastName?:              string;
  photograph?:            string;
  age?:                   string;
  dateOfBirth?:           Date;
  gender?:                string;
  emailAddress?:          string;
  phoneNumber?:           string;
  emergencyContact?:      string;
  dateJoined?:            Date;
  maritalStatus?:         string;
  membershipStatus?:      string;
  children?:              string;
  occupation?:            string;
  membershipType?:        string;
  additionalInformation?: Date;
  createdBy?:             null;
  createdAt?:             Date;
  updatedAt?:             Date;
  deletedAt?:             null;
  isDeleted?:             null;
  location?:              string;
}

export interface DonationData {
  cmberId?:       string;
  amount?:         number;
  description?:    string;
  donationStatus?: null;
  createdBy?:      string;
  donationDate?:   Date;
  createdAt?:      Date;
  updatedAt?:      Date;
  isDeleted?:      null;
  deletedAt?:      null;
  remarks?:        string;
}



