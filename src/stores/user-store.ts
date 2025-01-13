/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import ResponseUtil from 'src/utils/response.utils';
import TokenModel from 'src/models/auth/Token.model';
import AuthConstants from 'src/constants/auth.constants';
import StatusConstants from 'src/constants/status.constants';
import FetchDataResponse from 'src/models/FetchDataResponse.model';
import { Users } from 'src/models/user/all_users.model';
import { useQuasar } from 'quasar';
import WelfareLogic from 'src/logic/welfare.logic';
import AAStatusConstants from 'src/constants/aa-status.constants';
import { MemberData } from 'src/models/member/AllMembers.model';
import { MemberYearSummaryData } from 'src/models/member/MemberYearSummary.model';
import { ErrorResponseData, UserErrorResponse } from 'src/models/auth/UserErrorResponse.model';
import { UsersData } from 'src/models/auth/AllUsers.model';

export const useUserStore = defineStore('user', {
  state: () => ({
      /** @type {TokenModel} */
      token: new TokenModel(),

      /** @type {ErrorResponseData} */
      UserErrorResponse: new ErrorResponseData(),

      /** @type {FetchDataResponse<UsersData>} */
      listOfUsers: new FetchDataResponse<UsersData>(),

      /** @type {FetchDataResponse<MemberYearSummaryData>} */
      listOfMembersSummary: new FetchDataResponse<MemberYearSummaryData>(),

      /** @type {AuthLogic} */
          logic: new WelfareLogic(),
    status: AuthConstants.LOGOUT,
  }),

  getters: {
    isAuthenticated: (state) => state.status === AuthConstants.LOGIN,
  },
  actions: {
    async registerUserWithoutPassword(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.registerUserWithoutPassword(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.UserErrorResponse = response.data;
          console.log('this.UserErrorResponse', this.UserErrorResponse);
        }
        if (response.status === AAStatusConstants.FAILED && response.data) {
          this.UserErrorResponse = response.data;
          console.log('this.UserErrorResponse', this.UserErrorResponse);
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllUsers(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllUsers(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfUsers = response.data;
          console.log('this.listOfUsers', this.listOfUsers);
        }
        return ResponseUtil.minimal(response);
      });
    },
  },
});
