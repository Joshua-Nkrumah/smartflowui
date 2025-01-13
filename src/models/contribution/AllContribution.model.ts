export interface Contributions {
  status?:  string;
  message?: string;
  data?:    AllContributionData;
}

export interface AllContributionData {
  total?:   number;
  records?: ContributionRecord[];
}

export interface ContributionRecord {
  members?: MemberData;
  contribution?: ContributionData;
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

export interface ContributionData {
  contributionId?:     string;
  amount?:             number;
  description?:        string;
  contributionStatus?: string;
  createdBy?:          string;
  remarks?:            string;
  isDeleted?:          null;
  memberId?:           string;
  deletedAt?:          null;
  contributionDate?:   Date;
  createdAt?:          Date;
  updatedAt?:          Date;
  receiptId?:          string;
}




