/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import ResponseUtil from 'src/utils/response.utils';
import TokenModel from 'src/models/auth/Token.model';
import AuthConstants from 'src/constants/auth.constants';
import FetchDataResponse from 'src/models/FetchDataResponse.model';
import WelfareLogic from 'src/logic/welfare.logic';
import AAStatusConstants from 'src/constants/aa-status.constants';
import { MemberData } from 'src/models/member/AllMembers.model';
import { MemberYearSummaryData } from 'src/models/member/MemberYearSummary.model';
import { VolunteerData } from 'src/models/volunteer/AllVolunteer.model';
import { VolunteerYearSummaryData } from 'src/models/volunteer/VolunteerYearSummary.model';
import {  DonationRecord } from 'src/models/donation/AllDonation.model';
import { DonationYearSummaryData } from 'src/models/donation/DonationYearSummary.model';
import { TotalDonationAmountData } from 'src/models/donation/TotalAmountMonthYear.model';
import {  ContributionRecord } from 'src/models/contribution/AllContribution.model';
import { ContributionYearSummaryData } from 'src/models/contribution/ContributionYearSummary.model';
import { TotalContributionAmountData } from 'src/models/contribution/TotalAmountMonthYear.model';

export const useWelfareStore = defineStore('welfare', {
  state: () => ({
    /** @type {TokenModel} */
    token: new TokenModel(),

      /** @type {FetchDataResponse<MemberData>} */
      listOfMembers: new FetchDataResponse<MemberData>(),

      /** @type {FetchDataResponse<MemberYearSummaryData>} */
      listOfMembersSummary: new FetchDataResponse<MemberYearSummaryData>(),


      /** @type {FetchDataResponse<VolunteerData>} */
      listOfVolunteers: new FetchDataResponse<VolunteerData>(),


      /** @type {FetchDataResponse<VolunteerYearSummaryData>} */
      listOfVolunteerSummary: new FetchDataResponse<VolunteerYearSummaryData>(),

       /** @type {FetchDataResponse<DonationData>} */
       listOfDonations: new FetchDataResponse<DonationRecord>(),

       /** @type {FetchDataResponse<DonationYearSummaryData>} */
       listOfDonationSummary: new FetchDataResponse<DonationYearSummaryData>(),

      /** @type {FetchDataResponse<TotalDonationAmountData>} */
      listOfDonationYearMonthTotal: new FetchDataResponse<TotalDonationAmountData>(),

        /** @type {FetchDataResponse<ContributionData>} */
        listOfContributions: new FetchDataResponse<ContributionRecord>(),

        /** @type {FetchDataResponse<ContributionYearSummaryData>} */
        listOfContributionSummary: new FetchDataResponse<ContributionYearSummaryData>(),

         /** @type {FetchDataResponse<TotalContributionAmountData>} */
         listOfContributionYearMonthTotal: new FetchDataResponse<TotalContributionAmountData>(),

 /** @type {AuthLogic} */
    logic: new WelfareLogic(),

    status: AuthConstants.LOGOUT,
  }),
  getters: {
    isAuthenticated: (state) => state.status === AuthConstants.LOGIN,
  },
  actions: {

    async createMember(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createMember(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async editMember(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.editMember(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async softDeleteMember(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.softDeleteMember(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async deleteMember(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.deleteMember(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getMember(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getMember(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllMembers(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllMembers(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfMembers = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllMembersSummary(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllMembersSummary(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfMembersSummary = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },



    ////////// ------- START VOLUNTEERS ---------- //////////////


    async createVolunteer(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createVolunteer(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async editVolunteer(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.editVolunteer(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async softDeleteVolunteer(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.softDeleteVolunteer(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async deleteVolunteer(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.deleteVolunteer(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getVolunteer(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getVolunteer(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllVolunteers(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllVolunteers(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfVolunteers = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllVolunteerSummary(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllVolunteerSummary(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfVolunteerSummary = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },


    ////////// ------- END VOLUNTEERS ---------- //////////////




    ////////// ------- START DONATIONS ---------- //////////////


    async createDonation(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createDonation(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async editDonation(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.editDonation(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async softDeleteDonation(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.softDeleteDonation(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async deleteDonation(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.deleteDonation(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getDonation(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getDonation(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllDonations(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllDonations(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          console.log(response.data);
          this.listOfDonations = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },


    async getAllDonationSummary(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllDonationSummary(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfDonationSummary = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllDonationMonthYearTotal(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllDonationMonthYearTotal(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfDonationYearMonthTotal = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async sendDonationReceiptAsMail(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.sendDonationReceiptAsMail(payload);
        // if (response.status === AAStatusConstants.SUCCESS && response.data) {
        //   this.listOfDonationYearMonthTotal = response.data;
        // }
        return ResponseUtil.minimal(response);
      });
    },

    ////////// ------- END DONATIONS ---------- //////////////



        ////////// ------- START CONTRIBUTIONS ---------- //////////////



    async createContribution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createContribution(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async editContribution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.editContribution(payload);
        return ResponseUtil.minimal(response);
      });
    },


    async softDeleteContribution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.softDeleteContribution(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async deleteContribution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.deleteContribution(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          // this.AddPayment = response.data as APData;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getContribution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getContribution(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          // this.AddPayment = response.data as APData;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllContributions(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllContributions(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          console.log(response.data);
          this.listOfContributions = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },


    async getAllContributionSummary(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllContributionSummary(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfContributionSummary = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllContributionMonthYearTotal(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllContributionMonthYearTotal(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfContributionYearMonthTotal = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async sendContributionReceiptAsMail(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.sendContributionReceiptAsMail(payload);
        // if (response.status === AAStatusConstants.SUCCESS && response.data) {
        // }
        return ResponseUtil.minimal(response);
      });
    },


    ////////// ------- END CONTRIBUTIONS ---------- //////////////

  },
});
