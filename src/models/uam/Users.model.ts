export interface UAMUsers {
  status?: string;
  message?: string;
  data?: UAMUserData;
}

export interface UAMUserData {
  records?: UAMUserRecord[];
  total?: number;
}

export interface UAMUserRecord {
  userId?: string;
  username?: string;
  email?: string;
  status?: number;
  statusLabel?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: string;
  createdBy?: string;
  createdAt?: Date;
}

export class InvitationCode {
  status?: string;
  message?: string;
  data?: InvitationCodeData;
}

export class InvitationCodeData {
  startDate?: Date;
  endDate?: Date;
  invitationCode?: string;
  token?: string;
  institutionId?: string;
  status?: string;
  id?: string;
  createdBy?: string;
  modifiedBy?: string;
  modifiedAt?: string;
}
