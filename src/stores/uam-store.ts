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
import {
  InvitationCodeData,
  UAMUserData,
  UAMUserRecord,
} from 'src/models/uam/Users.model';
import { UAMAppRecord } from 'src/models/uam/Apps.model';
import { UAMRecord } from 'src/models/uam/Roles.model';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { UAMAssignedRecord } from 'src/models/uam/AssignedApps.model';
import { InstitutionRecord } from 'src/models/uam/Institutions.model';
import { PermissionRecord } from 'src/models/uam/Permissions.model';
import { CategoryRecord } from 'src/models/uam/Category.model';
import { SubscriptionPlanRecord } from 'src/models/uam/SubscriptionPlan.model';
import { AllRequestData } from 'src/models/smartflow/Requests.model';
import { AttachmentData } from 'src/models/smartflow/Attachments.model';

export const useUAMStore = defineStore('uam', {
  state: () => ({
    /** @type {TokenModel} */
    token: new TokenModel(),

    /** @type {FetchDataResponse<UAMUserRecord>} */
    listOfUsers: new FetchDataResponse<UAMUserRecord>(),

    /** @type {InvitationCodeData} */
    institutionInvitationCode: new InvitationCodeData(),

    /** @type {InvitationCodeData} */
    registerInvitationCode: new InvitationCodeData(),

    /** @type {FetchDataResponse<AllRequestData>} */
    listOfRequests: new FetchDataResponse<AllRequestData>(),

    /** @type {FetchDataResponse<AttachmentData>} */
    listOfAttachment: new FetchDataResponse<AttachmentData>(),

    /** @type {FetchDataResponse<InstitutionRecord>} */
    listOfInstitutions: new FetchDataResponse<InstitutionRecord>(),

    /** @type {FetchDataResponse<SubscriptionPlanRecord>} */
    listOfSubcriptionPlans: new FetchDataResponse<SubscriptionPlanRecord>(),

    /** @type {FetchDataResponse<PermissionRecord>} */
    listOfPermissions: new FetchDataResponse<PermissionRecord>(),

    /** @type {FetchDataResponse<CategoryRecord>} */
    listOfCategories: new FetchDataResponse<CategoryRecord>(),

    /** @type {FetchDataResponse<UAMRecord>} */
    listOfRoles: new FetchDataResponse<UAMRecord>(),

    /** @type {FetchDataResponse<UAMAssignedRecord>} */
    listOfAssignedApps: new FetchDataResponse<UAMAssignedRecord>(),

    /** @type {FetchDataResponse<MemberYearSummaryData>} */
    listOfMembersSummary: new FetchDataResponse<MemberYearSummaryData>(),

    /** @type {AuthLogic} */
    logic: new UAMLogic(),

    userRole: [
      {
        label: 'CSO-TELLER',
        value: 'CSO-TELLER',
      },
      {
        label: 'BSSM',
        value: 'BSSM',
      },
    ],

    approvalStatus: [
      {
        label: 'INITIATOR',
        value: 'INITIATOR',
      },
      {
        label: 'AUTHORIZER',
        value: 'AUTHORIZER',
      },
    ],

    branches: [
      {
        branchCode: '012',
        branchName: 'A AND C MALL',
      },
      {
        branchCode: '038',
        branchName: 'ABEKA',
      },
      {
        branchCode: '005',
        branchName: 'ABOSSEY OKAI',
      },
      {
        branchCode: '032',
        branchName: 'ABOSSEY OKAI MAIN',
      },
      {
        branchCode: '017',
        branchName: 'ACCRA CENTRAL POSTBANK',
      },
      {
        branchCode: '025',
        branchName: 'ACHIMOTA',
      },
      {
        branchCode: '011',
        branchName: 'ACTION CHAPEL',
      },
      {
        branchCode: '',
        branchName: 'Adabraka',
      },
      {
        branchCode: '018',
        branchName: 'ADENTAN',
      },
      {
        branchCode: '054',
        branchName: 'ADJEN KOTOKU',
      },
      {
        branchCode: '602',
        branchName: 'ADUM',
      },
      {
        branchCode: '606',
        branchName: 'ADUM POSTBANK',
      },
      {
        branchCode: '611',
        branchName: 'ADUM PZ',
      },
      {
        branchCode: '609',
        branchName: 'ADUM SAGOE LANE',
      },
      {
        branchCode: '605',
        branchName: 'AHODWO',
      },
      {
        branchCode: '029',
        branchName: 'AIRPORT',
      },
      {
        branchCode: '055',
        branchName: 'AMASAMAN',
      },
      {
        branchCode: '028',
        branchName: 'ASHAIMAN',
      },
      {
        branchId: '35b25d30-db5d-4b42-bc89-21ccb9c19c1b',
        branchCode: '042',
        branchName: 'ASHAIMAN MARKET',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'ASH MARK',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'fa1388e7-0893-46f9-acce-a1c8b2f9e492',
        branchCode: '053',
        branchName: 'Ashaley Botwe',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '18188096-9351-4b67-8614-1ddb4f87386e',
        branchCode: '301',
        branchName: 'ASSIN-FOSU POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'AS FO',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '17760146-f59d-4952-b1f8-40e7afcd18f9',
        branchCode: '604',
        branchName: 'ATONSU',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'ATON',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '7190e356-69fe-4b52-9743-5240cc771171',
        branchCode: '702',
        branchName: 'BEREKUM',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'BERE',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'ea2f5011-a868-46e4-af87-a3ffc0dad6a5',
        branchCode: '409',
        branchName: 'BIBIANI',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'BIBIANI',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '3f996be1-9e32-4822-92e6-70dd62fe26ff',
        branchCode: '901',
        branchName: 'BOLGA POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'BOL',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'd64ede97-58e8-4967-81bb-929cd80f6968',
        branchCode: '302',
        branchName: 'CAPE COAST',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'CC',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '0bc1f0c6-8f9f-45cd-acd6-a99d308ed074',
        branchCode: '303',
        branchName: 'CAPE COAST MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '335de685-f372-4eaf-8c50-55c82b9c4f06',
        branchCode: '050',
        branchName: 'COMMUNITY 25',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '58c23e6d-b931-4025-ab70-ac369b030257',
        branchCode: '009',
        branchName: 'COMMUNITY ONE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '3fffb92e-8098-4316-8657-b5a2365b3fe0',
        branchCode: '036',
        branchName: 'DANSOMAN MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'DAN M',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '9f61dc74-ee79-4004-88c5-2f2c1b82d3d8',
        branchCode: '045',
        branchName: 'DOME',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'DOM',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'efff0ff6-15a8-4a1b-a701-a1607e1cf21e',
        branchCode: '022',
        branchName: 'DZORWULU',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'DZOR',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '4df7df32-3443-4d34-9905-17969bcc50e0',
        branchCode: '052',
        branchName: 'EAST LEGON',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '97db452d-c21d-4666-a87c-98b15d2d899a',
        branchCode: '707',
        branchName: 'GOASO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '02fdd3ce-288e-4a71-996f-ae12ea8adb85',
        branchCode: '026',
        branchName: 'GWBLAPAZ',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'GWB',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'ce9ad0b8-dbce-4398-a3ff-68d858bdb779',
        branchCode: '015',
        branchName: 'HAATSO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'HAATSO',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchCode: '000',
        branchName: 'HEAD OFFICE',
      },
      {
        branchCode: '003',
        branchName: 'HIGH STREET',
      },
      {
        branchCode: '501',
        branchName: 'HO POSTBANK',
      },
      {
        branchCode: '191',
        branchName: 'HOHOE POSTBANK',
      },
      {
        branchCode: '019',
        branchName: 'IPS LEGON',
      },
      {
        branchCode: '046',
        branchName: 'KANESHIE MARKET',
      },
      {
        branchCode: '007',
        branchName: 'KANTAMANTO',
      },
      {
        branchCode: '044',
        branchName: 'KASOA',
      },
      {
        branchCode: '614',
        branchName: 'KEJETIA',
      },
      {
        branchCode: '613',
        branchName: 'KNUST',
      },
      {
        branchCode: '203',
        branchName: 'KOFORIDUA',
      },
      {
        branchCode: '031',
        branchName: 'KOKOMLEMLE',
      },
      {
        branchCode: '607',
        branchName: 'KOMETHODIST',
      },
      {
        branchId: '44d57900-e2d0-4fce-9bcc-5ca5d5d82b58',
        branchCode: '024',
        branchName: 'KWAME NKRUMAH AVENUE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'K NKRU',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '82f91566-3a9e-497b-9ff7-159cf607eaf4',
        branchCode: '026',
        branchName: 'Lapaz',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'GWB LAZ',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'd0b84569-9e7c-4f67-9a9e-0025825d9ba8',
        branchCode: '030',
        branchName: 'MAAMOBI',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'MAMOBI',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'b69113ae-c2e6-4380-b7cc-0104757d15f3',
        branchCode: '047',
        branchName: 'MADINA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'MAD',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'ca5c4454-b787-48cb-a611-8d25a984a1e2',
        branchCode: '034',
        branchName: 'MADINA MARKET',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'MAD MAR',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '9d7734fd-e22c-45bc-94a0-349511c9801e',
        branchCode: '123',
        branchName: 'MAMPROBI POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'MAMP',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '20842cf1-ae3c-4c36-b0d4-0b096d5a58fd',
        branchCode: '401',
        branchName: 'MARKET CIRCLE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TADI MC',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'cc4f5f48-3ace-45af-8b94-f7f126f42e65',
        branchCode: '201',
        branchName: 'NKAWKAW POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'NKAW',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'bb6eeacc-97fb-445f-9224-b237076c2a04',
        branchCode: '027',
        branchName: 'NUNGUA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'NUG',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '16e9daca-6463-4c01-8754-4ba184280ec5',
        branchCode: '049',
        branchName: 'NUNGUA BRIGADE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'NUG BR',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'd82e1b20-44e5-4749-9639-e1b334e88af2',
        branchCode: '615',
        branchName: 'Obuasi',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '57b7d3b6-820a-45c8-b63c-89e5e2f78dd1',
        branchCode: '010',
        branchName: 'OKAISHIE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'OKAISHIE',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '60e811db-0531-46a7-87c2-ba4c9fdacd58',
        branchCode: '048',
        branchName: 'OSU DANQUAH CIRCLE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'OSU DAN',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '32ff0d9e-8fff-4a1d-890b-b8afd3264819',
        branchCode: '004',
        branchName: 'OSU OXFORD STREET',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'OSU OX',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '87b76a82-fb5a-4376-bffb-e8f9246ed51f',
        branchCode: '056',
        branchName: 'OYARIFA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '427181e1-58b2-45d1-af97-8d5086686666',
        branchCode: '001',
        branchName: 'RIDGE TOWER',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'RIDGE',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'bc5f5cd4-62fb-456b-994c-4c59a5b23fc1',
        branchCode: '014',
        branchName: 'RING ROAD CENTRAL',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'RRC',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'adaf5e1b-6ab9-4cba-b236-90259901b763',
        branchCode: '082',
        branchName: 'RRC REMITTANCE CENTRE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'RRC',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '0e54a830-aa30-4814-ac57-a2d52b282f38',
        branchCode: '705',
        branchName: 'SAMPA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SAMPA',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'de233877-480c-4078-9d12-953898b5fe9b',
        branchCode: '608',
        branchName: 'SANTASI ROUNDABOUT',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SANT',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '41bf9612-a244-4c2b-a7dc-cebdd431b695',
        branchCode: '408',
        branchName: 'SEFWI WIAWSO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'd30e8760-6f99-4a62-b4d9-7a631c367035',
        branchCode: '002',
        branchName: 'SPINTEX ROAD',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SPIN',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '2e46f35f-224d-4194-a3ff-759bf9c3ebb6',
        branchCode: '601',
        branchName: 'STADIUM POSTBANK BRANCH',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'ADUM SP',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'd02d0e78-35f6-4e35-bc45-618457021a14',
        branchCode: '612',
        branchName: 'SUAME MAAKRO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '0e7ab6be-bd95-4816-b210-6d3141ffce74',
        branchCode: '610',
        branchName: 'SUAME MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SUA M',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '02a04c21-683d-46e2-af49-ca686361139d',
        branchCode: '704',
        branchName: 'SUNYANI',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SUN',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '20b11162-b2f6-4dd3-b2f5-29e2d8ead8dc',
        branchCode: '701',
        branchName: 'SUNYANI POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'SUN P',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '2677324c-30ef-477d-b5de-31840bee2650',
        branchCode: '617',
        branchName: 'TAFO PANKRONO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '6ef06247-0b0f-47a2-937b-d44e70ab8a4b',
        branchCode: '406',
        branchName: 'TAKORADI EFFIEKUMA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TADI EFF',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'c58af67d-d8fc-4233-9e97-e38f54a00f3c',
        branchCode: '403',
        branchName: 'TAKORADI POSTBANK',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TADI P',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '6eb6648d-a347-4188-bbe8-20a3d6b58959',
        branchCode: '801',
        branchName: 'TAMALE',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TAM',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'a0511684-ffcf-4f9f-b308-7a8b0f32e440',
        branchCode: '616',
        branchName: 'TANOSO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '1d4c362e-1a29-4449-a06d-0d5e41330a60',
        branchCode: '405',
        branchName: 'TARKWA MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TAR M',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '6faee21b-26a3-44fb-8fcd-5154cd6d0630',
        branchCode: '703',
        branchName: 'TECHIMAN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TECH',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '1ed0408b-a8e5-4839-8082-d2211bcecdcf',
        branchCode: '033',
        branchName: 'TEMA COMM. 1 MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TM1',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '6c26e0ef-35b9-4ce2-a341-f53968788530',
        branchCode: '016',
        branchName: 'TEMA COMMUNITY TWO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TM2',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'ec39d601-c3a2-4b7d-b851-52b04dd075bd',
        branchCode: '006',
        branchName: 'TEMA SAFEBOND',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TM SAF',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '2fa7dba6-77bd-4557-9402-3402236debcd',
        branchCode: '021',
        branchName: 'TESANO',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TESANO',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: '60bbea88-adb5-4cea-9bde-febe5354194f',
        branchCode: '020',
        branchName: 'TRADE FAIR LA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TRAD FAIR',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'cae6cf6f-4ba4-4786-84b5-346d286a81a0',
        branchCode: '035',
        branchName: 'TUDU MAIN',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: 'TUDU M',
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'eba38303-cda2-4e81-a33f-57dd6bd78824',
        branchCode: '090',
        branchName: 'WA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
      {
        branchId: 'f5013776-28a8-4d67-b405-09aa615d3f3d',
        branchCode: '051',
        branchName: 'WEIJA',
        iprange: null,
        email: null,
        tellerLimit: 100000,
        status: 1,
        location: null,
        dateCreated: '2024-12-04T16:09:30.4208407+00:00',
      },
    ],

    requestType: [
      {
        label: 'DEPOSIT',
        value: 'DEPOSIT',
      },
      {
        label: 'WITHDRAWAL',
        value: 'WITHDRAWAL',
      },
    ],

    unit: [
      {
        label: 'CPU',
        value: 'CPU',
      },
      {
        label: 'OPS CONTROL',
        value: 'OPS CONTROL',
      },
      {
        label: 'TRADE',
        value: 'TRADE',
      },
      {
        label: 'E-BANKING',
        value: 'E-BANKING',
      },
    ],

    paymentType: [
      {
        label: 'CASH',
        value: 'CASH',
      },
      {
        label: 'FUNDS TRANSFER',
        value: 'FUNDS TRANSFER',
      },
    ],

    status: AuthConstants.LOGOUT,
  }),
  getters: {
    isAuthenticated: (state) => state.status === AuthConstants.LOGIN,
  },
  actions: {
    async logout() {
      const authStore = useAuthStore();
      const router = useRouter();
      authStore.logout();
      router.push({ name: 'login' });
    },

    async createUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createUser(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateUser(payload);
        return ResponseUtil.minimal(response);
      });
    },
    async blockUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.blockUser(payload);
        return ResponseUtil.minimal(response);
      });
    },
    async unblockUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.unblockUser(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async generateInvitationCode(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.generateInvitationCode(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async verifyInvitationCode(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.verifyInvitationCode(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.registerInvitationCode = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getInvitationCode(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getInvitationCode(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.institutionInvitationCode = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllUsers(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllUsers(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfUsers.records = response.data.records;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async resetPassword(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.resetPassword(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async changePassword(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.changePassword(payload);
        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- APPS -------- //////////

    async getAllRequests() {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllRequests();
        if (
          response.status === AAStatusConstants.SUCCESS ||
          (<boolean>(<unknown>response.status) == true && response.data)
        ) {
          this.listOfRequests.records = response.data;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async getAllAttachment(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllAttachment(payload);
        if (
          response.status === AAStatusConstants.SUCCESS ||
          (<boolean>(<unknown>response.status) == true && response.data)
        ) {
          this.listOfAttachment.records = response.data;
          console.log('response.data', response.data);
          console.log(
            'this.listOfAttachment.records',
            this.listOfAttachment.records
          );
        }
        return ResponseUtil.minimal(response);
      });
    },

    async downloadAttachment(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.downloadAttachment(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async getAssignedApps(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAssignedApps(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfAssignedApps.records = response.data.records;
        }
        return ResponseUtil.minimal(response);
      });
    },

    async createRequest(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createRequest(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateRequest(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateRequest(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateApp(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateApp(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enableApp(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enableApp(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disableApp(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disableApp(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async assignAppToUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.assignAppToUser(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async retractAppFromUser(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.retractAppFromUser(payload);

        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- ROLES -------- //////////

    async getAllRoles(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllRoles(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfRoles.records = response.data.records;
        }

        return ResponseUtil.minimal(response);
      });
    },

    async createRole(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createRole(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async updateRole(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateRole(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enableRole(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enableRole(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disableRole(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disableRole(payload);

        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- PERMISSIONS -------- //////////

    async getAllPermissions(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllPermissions(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfPermissions.records = response.data.records;
        }

        return ResponseUtil.minimal(response);
      });
    },

    async createPermission(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createPermission(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async updatePermission(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updatePermission(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enablePermission(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enablePermission(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disablePermission(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disablePermission(payload);

        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- CATEGORY -------- //////////

    async getAllCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllCategory(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfCategories.records = response.data.records;
        }

        return ResponseUtil.minimal(response);
      });
    },

    async createCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createCategory(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async updateCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateCategory(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enableCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enableCategory(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disableCategory(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disableCategory(payload);

        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- INSTITUTION -------- //////////

    async getAllInstitution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllInstitution(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfInstitutions.records = response.data.records;
        }

        return ResponseUtil.minimal(response);
      });
    },

    async createInstitution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createInstitution(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async updateInstitution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateInstitution(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enableInstitution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enableInstitution(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disableInstitution(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disableInstitution(payload);

        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- SUBSCRIPTION -------- //////////
    async createInstitutionSubscription(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createInstitutionSubscription(
          payload
        );
        return ResponseUtil.minimal(response);
      });
    },

    ///// --------- SUBSCRIPTION PLAN -------- //////////

    async getAllSubscriptionTypes(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.getAllSubscriptionTypes(payload);
        if (response.status === AAStatusConstants.SUCCESS && response.data) {
          this.listOfSubcriptionPlans.records = response.data.records;
          this.listOfSubcriptionPlans.total = response.data.total;
        }

        return ResponseUtil.minimal(response);
      });
    },
    async createSubscriptionPlan(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.createSubscriptionPlan(payload);
        return ResponseUtil.minimal(response);
      });
    },

    async updateSubscriptionPlan(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.updateSubscriptionPlan(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async enableSubscriptionPlan(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.enableSubscriptionPlan(payload);

        return ResponseUtil.minimal(response);
      });
    },

    async disableSubscriptionPlan(payload: any) {
      return ResponseUtil.handleAxiosCall(async () => {
        const response = await this.logic.disableSubscriptionPlan(payload);

        return ResponseUtil.minimal(response);
      });
    },
  },
});
