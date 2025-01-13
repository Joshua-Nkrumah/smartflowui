import { AssignedUserResource } from './../models/auth/AssignedUserResource.model';
import Response from 'src/models/response.model';
import {
  cleverchapUAMApiPublic,
  webfrestIdentityServicePublic,
} from 'src/boot/axios';
import TokenModel from 'src/models/auth/Token.model';
import LoginRequestModel from 'src/models/auth/LoginRequest.model';
// import { Branch } from 'src/models/vteller/BranchList.model';

export default class AuthLogic {
  // public async login(payload: unknown) {
  //   const response = await cleverchapUAMApiPublic.post(
  //     '/auth/login',
  //     payload
  //   );
  //   const result = response.data;
  //   console.log(response.data);
  //   return new Response<AssignedUserResource>(
  //     result.status,
  //     result.message,
  //     result.data
  //   );
  // }

  public async login(
    model: LoginRequestModel
  ): Promise<Response<AssignedUserResource>> {
    const response = await webfrestIdentityServicePublic.post(
      '/auth/login',
      model
    );

    const result = response.data;

    return new Response<AssignedUserResource>(
      result.status,
      result.message,
      result.data
    );
  }

  public async logout(): Promise<Response<void>> {
    const response = await cleverchapUAMApiPublic.post('/auth/logout');
    const result = response.data;
    return new Response<void>(result.status, result.message, null);
  }

  public async refreshToken(): Promise<Response<TokenModel>> {
    const response = await cleverchapUAMApiPublic.get('/auth/refresh-token');
    const result = response.data;
    return new Response<TokenModel>(result.status, result.message, result.data);
  }

  // Branches
  // public async GetBranches(payload: unknown) {
  //   const response = await cleverchapUAMApi.post(
  //     'bulkCash/GetBranches',
  //     payload
  //   );

  //   const result = response.data;
  //   return new Response<Branch[]>(result.status, result.message, result.data);
  // }
}
