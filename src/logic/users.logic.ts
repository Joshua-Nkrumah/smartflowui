import Response from 'src/models/response.model';
import { cleverchapUAMApi } from 'src/boot/axios';
import { AllUsers, Users } from 'src/models/user/all_users.model';
import { UserRoles, UserRole } from 'src/models/user/user_roles.model';
import NewApp from 'src/models/user/new_item_response.model';
import FetchDataResponse from 'src/models/FetchDataResponse.model';

export default class UserLogic {
  // public async getAllUsers() {
  //   const response = await cleverchapUAMApi.get('/user/all-users');
  //   const result = response.data;
  //   return new Response<FetchDataResponse<AllUsers>>(
  //     result.status,
  //     result.message,
  //     result.data
  //   );
  // }
  public async getAllUsers(payload: unknown) {
    const { data: roleData } = await cleverchapUAMApi.post<AllUsers>(
      '/user/all-users',
      payload
    );

    console.log(roleData);

    const { status, message, data } = roleData;

    return new Response<Users[]>(String(status), message, data);
  }

  public async getAllUserRoles(payload: unknown) {
    const { data: roleData } = await cleverchapUAMApi.post<UserRoles>(
      '/role/get-all-user-roles',
      payload
    );
    const { status, message, data } = roleData;

    return new Response<UserRole[]>(String(status), message, data.Roles);
  }

  public async addNewItem(payload: unknown) {
    const response = await cleverchapUAMApi.post(
      'user-menu/add-user-menu',
      payload
    );
    const result = response.data;
    return new Response<FetchDataResponse<NewApp>>(
      result.status,
      result.message,
      result.data
    );
  }
}
