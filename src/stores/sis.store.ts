/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import ResponseUtil from 'src/utils/response.utils';
import TokenModel from 'src/models/auth/Token.model';
import AuthConstants from 'src/constants/auth.constants';
import FetchDataResponse from 'src/models/FetchDataResponse.model';
import { Users } from 'src/models/user/all_users.model';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import { MemberYearSummaryData } from 'src/models/member/MemberYearSummary.model';
import UAMLogic from 'src/logic/uam.logic';
import { UAMUserData } from 'src/models/uam/Users.model';
import { cleverchapUAMApi } from 'src/boot/axios';
import SISLogic from 'src/logic/sis.logic';
import {
  AllStudentRecord,
  StudentRecord,
  StudentRecordSummary,
} from 'src/models/sis/AllStudents.model';
import { NewStudentRecords } from 'src/models/sis/NewStudent.model';
import {
  AllGuardianRecord,
  AllGuardianSummary,
} from 'src/models/sis/AllGuardian.model';
import { StudentGuardianRecord } from 'src/models/sis/StudentGuardian.model';
import { StudentProfile } from 'src/models/sis/StudentSummary.model';
import StudentCategory from 'src/pages/sis/StudentCategory.vue';
import {
  StudentCategoryRecord,
  StudentCategorySummary,
} from 'src/models/sis/StudentCategory.model';
import { CategoryStudentMappingRecord } from 'src/models/sis/CategoryStudentMapping.model';
import { GuardianStudentMappingRecord } from 'src/models/sis/GuardianStudentMapping.model';

export const useSISStore = defineStore('sis', {
  state: () => ({
    /** @type {TokenModel} */
    token: new TokenModel(),

    /** @type {FetchDataResponse<AllStudentRecord>} */
    listofStudents: new FetchDataResponse<AllStudentRecord>(),

    /** @type {FetchDataResponse<StudentCategoryRecord>} */
    listofStudentCategory: new FetchDataResponse<StudentCategoryRecord>(),

    /** @type {FetchDataResponse<CategoryStudentMappingRecord>} */
    listOfCategoryStudentMapping:
      new FetchDataResponse<CategoryStudentMappingRecord>(),

    /** @type {FetchDataResponse<GuardianStudentMappingRecord>} */
    listOfGuardianStudentMapping:
      new FetchDataResponse<GuardianStudentMappingRecord>(),

    /** @type {StudentProfile} */
    studentProfile: new StudentProfile(),

    /** @type {FetchDataResponse<AllStudentRecord>} */
    listofGuardians: new FetchDataResponse<AllGuardianRecord>(),

    /** @type {FetchDataResponse<StudentRecord>} */
    studentDetails: new FetchDataResponse<StudentRecord>(),

    /** @type {NewStudentRecords} */
    newStudentDetails: new NewStudentRecords(),

    /** @type {NewStudentRecords} */
    listOfAllGuardians: new NewStudentRecords(),

    /** @type {FetchDataResponse<StudentGuardianRecord>} */
    listOfStudentGuardians: new FetchDataResponse<StudentGuardianRecord>(),

    /** @type {AuthLogic} */
    logic: new SISLogic(),

    status: AuthConstants.LOGOUT,
  }),
  getters: {
    isAuthenticated: (state) => state.status === AuthConstants.LOGIN,
  },
  actions: {
    async createStudent(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createStudent(payload);
        this.newStudentDetails = response.data.records;
        return ResponseUtil.minimal(response);
      });
    },

    async uploadStudentPhoto(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.uploadStudentPhoto(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateStudent(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateStudent(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateStudentStatus(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateStudentStatus(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async getAllStudents(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllStudents(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listofStudents.records = response.data.records;
          this.listofStudents.total = response.data.total;
          this.listofStudents.summary = response.data
            .summary as StudentRecordSummary;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getFullStudentProfile(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getFullStudentProfile(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.studentProfile = response.data.profile;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getStudent(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getStudent(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.studentDetails.records = response.data.records;
        }
        return ResponseUtil.minimal(response);
      });
    },

    // STUDENT CATEGORY

    async createStudentCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createStudentCategory(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateStudentCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateStudentCategory(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async getAllStudentCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllStudentCategory(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listofStudentCategory.records = response.data.records;
          this.listofStudentCategory.total = response.data.total;
          this.listofStudentCategory.summary = response.data
            .summary as StudentCategorySummary;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async applyCategoryStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.applyCategoryStudentMapping(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async removeCategoryStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.removeCategoryStudentMapping(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async getAllCategoryStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllCategoryStudentMapping(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfCategoryStudentMapping.records = response.data.records;
          this.listOfCategoryStudentMapping.total = response.data.total;
          this.listOfCategoryStudentMapping.summary = response.data
            .summary as any;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllGuardianStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllGuardianStudentMapping(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfGuardianStudentMapping.records = response.data.records;
          this.listOfGuardianStudentMapping.total = response.data.total;
          this.listOfGuardianStudentMapping.summary = response.data
            .summary as any;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async createGuardian(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createGuardian(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async createAndLinkGuardian(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createAndLinkGuardian(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateGuardian(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateGuardian(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async mapGuardianStudent(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.mapGuardianStudent(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async getAllGuardians(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllGuardians(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listofGuardians.records = response.data.records;
          this.listofGuardians.total = response.data.total;
          this.listofGuardians.summary = response.data.summary;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllStudentGuardians(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllStudentGuardians(payload);
        if (response.status != AAStatusConstants.SUCCESS) {
          this.listOfStudentGuardians.records = [];
        }
        //  (response.status === AAStatusConstants.SUCCESS && response.data){
        else {
          this.listOfStudentGuardians.records = response.data.records;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async applyGuardianStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.applyGuardianStudentMapping(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async removeGuardianStudentMapping(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.removeGuardianStudentMapping(payload);
        return ResponseUtil.minimal(response);
      });
    },
  },
});
