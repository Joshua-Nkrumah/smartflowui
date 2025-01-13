export class AllUsers {
  status?:  string;
  message?: string;
  data?:    UsersData;
}

export class UsersData {
  total?:   number;
  records?: UsersRecord[];
}

export class UsersRecord {
  userName?:    string;
  email?:       string;
  firstName?:   string;
  lastName?:    string;
  fullName?:    string;
  phoneNumber?: string;
  role?:        string | null;
  activeStatus?:  boolean;
  deletedStatus?: boolean;
}
