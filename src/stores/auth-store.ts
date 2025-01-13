/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import Response from 'src/models/response.model';
import ResponseUtil from 'src/utils/response.utils';
import TokenModel from 'src/models/auth/Token.model';
import AuthLogic from 'src/logic/auth.logic';
import AuthConstants from 'src/constants/auth.constants';
import StatusConstants from 'src/constants/status.constants';
import { cleverchapUAMApi } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import UserApps, {
  User,
  UserAccess,
  UserResource,
} from 'src/models/auth/AssignedUserResource.model';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** @type {TokenModel} */
    token: new TokenModel(),

    /** @type {AuthLogic} */
    authLogin: new AuthLogic(),

    /** @type {UserResource} */
    userInfo: new UserResource(),

    /** @type {UserAccess} */
    userAccess: new UserAccess(),

    /** @type {UserApps} */
    UserApps: new UserApps(),

    /** @type {User} */
    listOfUserInfo: new User(),
    u: '',
    p: '',

    status: AuthConstants.LOGOUT,
  }),
  getters: {
    isAuthenticated: (state) => state.status === AuthConstants.LOGIN,
  },
  actions: {
    async login(model: any): Promise<Response<void>> {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.authLogin.login(model);
        if (response.status === StatusConstants.SUCCESS) {
          this.status = AuthConstants.LOGIN;

          LocalStorage.set('result', JSON.stringify(response.data));
          const result = JSON.parse(LocalStorage.getItem('result') ?? '{}');

          this.token.username = result?.username || '';
          this.token.accessToken = result?.accessToken || '';

          this.userInfo = result?.userResource;
          this.userAccess = result?.userAccess;
          this.UserApps = result?.UserApps;

          console.log('response', response);

          LocalStorage.set('isAuthenticated', this.isAuthenticated);
          LocalStorage.set('username', this.userInfo.username);
          LocalStorage.set('email', this.userInfo.email);
          LocalStorage.set('firstName', this.userInfo.firstName);
          LocalStorage.set('lastName', this.userInfo.lastName);
          LocalStorage.set('fullName', this.userInfo.fullName);
          LocalStorage.set('phoneNumber', this.userInfo.phoneNumber);
          LocalStorage.set('role', this.userInfo.role);
          LocalStorage.set('approvalStatus', this.userInfo.approvalStatus);
          LocalStorage.set('branchCode', this.userInfo.branchCode);
          LocalStorage.set('status', this.userInfo.status);
          LocalStorage.set('token', this.userAccess.token);
          LocalStorage.set('userId', this.userInfo.userId);
          LocalStorage.set('expiryDate', this.userAccess.expiryDate);
          LocalStorage.set('expiryTime', this.userAccess.expiryTime);

          cleverchapUAMApi.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${result?.accessToken}`;
        }

        return ResponseUtil.minimal(response);
      });
    },

    async remainInside(): Promise<void> {
      const result = JSON.parse(LocalStorage.getItem('result') ?? '{}');
      LocalStorage.set(
        'isAuthenticated',
        LocalStorage.getItem('isAuthenticated')
      );
      // LocalStorage.set('username', this.token.username);
      // LocalStorage.set('listOfMenus', this.listOfMenus);
      // LocalStorage.set('listOfMenuItems', this.listOfMenuItems);
      // LocalStorage.set('listOfApps', this.listOfApps);

      cleverchapUAMApi.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result?.accessToken}`;

      this.status = AuthConstants.LOGIN;
    },

    logout(): void {
      this.token = new TokenModel();
      this.authLogin = new AuthLogic();
      this.status = AuthConstants.LOGOUT;

      LocalStorage.remove('isAuthenticated');
      LocalStorage.remove('username');
      LocalStorage.remove('email');
      LocalStorage.remove('firstName');
      LocalStorage.remove('lastName');
      LocalStorage.remove('fullName');
      LocalStorage.remove('phoneNumber');
      LocalStorage.remove('role');
      LocalStorage.remove('approvalStatus');
      LocalStorage.remove('branchCode');
      LocalStorage.remove('status');
      LocalStorage.remove('token');
      LocalStorage.remove('userId');
      LocalStorage.remove('expiryDate');
      LocalStorage.remove('expiryTime');
    },

    setIsAuthenticated(): void {
      this.status = AuthConstants.LOGIN;
    },

    // async logout(): Promise<Response<void>> {
    //   return ResponseUtil.handleAxiosCall(async () => {
    //     const response = await this.authLogin.logout();
    //     if (response.status === StatusConstants.SUCCESS) {
    //       this.status = AuthConstants.LOGOUT;
    //       cleverchapUAMApi.defaults.headers.push('authentication', null);
    //     }
    //     router.push({ name: 'login' });
    //     return ResponseUtil.minimal(response);
    //   });
    // },

    async refreshToken(): Promise<Response<void>> {
      return ResponseUtil.handleAxiosCall(async () => {
        if (this.status !== AuthConstants.LOGIN) {
          return new Response(
            StatusConstants.FAILED,
            'Not authenticated',
            null
          );
        }
        const response = await this.authLogin.refreshToken();

        return ResponseUtil.minimal(response);
      });
    },

    // async registerUserWithoutPassword(payload: any) {
    //   return ResponseUtil.handleAxiosCall(async () => {
    //     const response = await this.logic.createMember(payload);
    //     // if (response.status === AAStatusConstants.SUCCESS && response.data) {
    //     //   this.AddPayment = response.data as APData;
    //     // }
    //     return ResponseUtil.minimal(response);
    //   });
    // },
  },
});
