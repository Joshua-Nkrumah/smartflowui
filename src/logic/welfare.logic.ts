import FetchDataResponse from 'src/models/FetchDataResponse.model';
import Response from 'src/models/response.model';
import { cleverchapUAMApiPublic } from 'src/boot/axios';

export default class WelfareLogic {
  public async registerUserWithoutPassword(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'auth/register-without-password',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllUsers(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'auth/all-users',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  ////////////////////////////////////////////--------/////////////////////////////////////////////////////////////

  public async createMember(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/create-member',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async editMember(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/update-member',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async softDeleteMember(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/soft-delete-member',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async deleteMember(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/delete-member',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getMember(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/get-member',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllMembers(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/get-all-members',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllMembersSummary(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'member/year-summary',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createContribution(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/create-contribution',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async editContribution(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/update-contribution',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async softDeleteContribution(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/soft-delete-contribution',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async deleteContribution(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/delete-contribution',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getContribution(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/get-contribution',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllContributions(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/get-all-contributions',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllContributionSummary(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/year-summary',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllContributionMonthYearTotal(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/total-amount-per-month-year',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async sendContributionReceiptAsMail(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/send-receipt-mail',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  ////////////////////////////////////////////////////////////////

  public async createDonation(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/create-donation',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async editDonation(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/update-donation',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async softDeleteDonation(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/soft-delete-donation',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async deleteDonation(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'contribution/delete-donation',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getDonation(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/get-donation',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllDonations(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/get-all-donations',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllDonationSummary(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/year-summary',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllDonationMonthYearTotal(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/total-amount-per-month-year',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async sendDonationReceiptAsMail(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'donation/send-receipt-mail',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  ////////////////////////////////////////////////////////////////

  public async createVolunteer(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/create-volunteer',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async editVolunteer(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/update-volunteer',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async softDeleteVolunteer(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/soft-delete-volunteer',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async deleteVolunteer(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/delete-volunteer',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getVolunteer(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/get-volunteer',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllVolunteers(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/get-all-volunteers',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllVolunteerSummary(payload: unknown) {
    const response = await cleverchapUAMApiPublic.post(
      'volunteer/year-summary',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }
}
