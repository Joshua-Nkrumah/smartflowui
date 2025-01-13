export interface UserRoles {
  status: string;
  message: string;
  data: UserRoleData;
}

export interface UserRoleData {
  user: User;
  Roles: UserRole[];
}

export interface User {
  id: null;
  name: string;
  username: string;
  fcube_username: null;
  branch: string;
  emp_id: string;
  grade: string | null;
  department: string | null;
  job_title: string | null;
  email: string;
  soft_access: string | null;
  deleted: string | null;
  short_name: string | null;
  code: string;
  branchname: string;
}

export interface UserRole {
  RoleID: string;
  RoleName: string;
  Description: string;
}

// const response = {
//   Status: 1,
//   Message: 'Request was successful',
//   Data: {
//     user: {
//       id: null,
//       name: 'eaasare',
//       username: 'eaasare',
//       fcube_username: null,
//       branch: '001',
//       emp_id: '0002',
//       grade: null,
//       department: null,
//       job_title: null,
//       email: 'eaasare@myfidelitybank.net',
//       soft_access: null,
//       deleted: null,
//       short_name: null,
//       code: '001',
//       branchname: 'Head Office',
//     },
//     Roles: [
//       {
//         RoleID: 'd7cdd736-a9ef-468d-a823-5425bbfb242a',
//         RoleName: 'Solution Delivery',
//         Description: 'Solution Delivery',
//       },
//     ],
//   },
// };
