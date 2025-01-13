export interface AllUsers {
  status: number;
  message: string;
  data: Users[];
}

export interface Users {
  id: string;
  name: string;
  username: string;
  fcube_username: string;
  branch: string | string;
  emp_id: string | null;
  grade: string | null;
  department: string | null;
  job_title: string | null;
  email: string;
  soft_access: string | null;
  deleted: string | null;
  short_name: string;
  code: string;
  branchname: string;
}

// const response = {
//   Status: 1,
//   Message: 'Request was successful',
//   Data: [
//     {
//       id: '1',
//       name: 'HO',
//       username: 'eaasare',
//       fcube_username: 'eadu-asare',
//       branch: '001',
//       emp_id: null,
//       grade: null,
//       department: null,
//       job_title: null,
//       email: 'eaasare@myfidelitybank.net',
//       soft_access: null,
//       deleted: null,
//       short_name: 'HO',
//       code: '001',
//       branchname: 'HO',
//     },
//     {
//       id: '1',
//       name: 'HO',
//       username: 'eaasare1',
//       fcube_username: 'eadu-asare1',
//       branch: '001',
//       emp_id: null,
//       grade: null,
//       department: null,
//       job_title: null,
//       email: 'eaasare@myfidelitybank.net',
//       soft_access: null,
//       deleted: null,
//       short_name: 'HO',
//       code: '001',
//       branchname: 'HO',
//     },
//   ],
// };
