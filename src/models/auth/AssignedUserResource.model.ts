// export class AssignedUserResource {
//   status?: string;
//   message?: string;
//   data?: AssignedUserResourceData;
// }

// export class AssignedUserResourceData {
//   username?: string;
//   accessToken?: string;
//   expiration?: Date;
//   refreshToken?: null;
//   userResource?: UserResource;
// }

// export class UserResource {
//   id?: string;
//   userName?: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   fullName?: string;
//   phoneNumber?: string;
//   role?: string;
//   status?: string;
//   createdBy?: string;
//   institution_id?: string;
// }

export class User {
  userId!: string;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  username!: string;
  userRole!: null;
  branch!: null;
  branchCode!: null;
  department!: null;
  userUnit!: null;
  mobile!: null;
  email!: string;
  dateCreated!: null;
  accountStatus!: null;
  lastLogin!: null;
  authToken!: null;
  createdBy!: null;
  authStatus!: null;
  authDate!: null;
  authUser!: null;
  dateModified!: null;
  modifiedBy!: null;
  modifiedCount!: number;
}

export class AssignedUserResource {
  status?: string;
  message?: string;
  data?: AssignedUserResourceData;
}

export class AssignedUserResourceData {
  userResource?: UserResource;
  userAccess?: UserAccess;
  UserApps?: UserApps;
}

export class UserAccess {
  token?: string;
  type?: string;
  expiryDate?: string;
  expiryTime?: string;
}

export class UserResource {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  email?: string;
  normalizedEmail?: string;
  normalizedUsername?: string;
  photoPath?: string;
  phoneNumber?: string;
  approvalStatus?: string;
  branchCode?: string;
  role?: string;
  createdBy?: string;
  createdAt?: string;
  status?: string;
  statusLabel?: string;
}

export default class UserApps {
  public id!: string;
  public subscriptionTypeId!: string;
  public categoryId!: string;
  public settingId!: string;
  public appName!: string;
  public brandName!: string;
  public caption!: string;
  public description!: string;
  public rank!: string;
  public isActive!: string;
  public status!: string;
  public statusLabel!: string;
  public appUrl!: string;
  public logoUrl!: string;
  public appIcon!: string;
  public version!: string;
  public appOwner!: string;
  public createdBy!: string;
  public createdAt!: string;
  public modifiedBy!: string;
  public modifiedAt!: string;
  public releaseDate!: string;
}
