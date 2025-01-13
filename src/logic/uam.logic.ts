import Response from 'src/models/response.model';
import {
  webfrestIdentityServicePublic,
  webfrestSubscriptionServicePublic,
} from 'src/boot/axios';
import { LocalStorage } from 'quasar';

export default class UAMLogic {
  public async getToken() {
    const token = LocalStorage.getItem('token');
    return token;
  }

  public async resetPassword(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/reset_password',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllUsers_() {
    const token = LocalStorage.getItem('token');
    const response = await webfrestIdentityServicePublic.post(
      'user/get_users',
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllUsers(payload: any) {
    const token = LocalStorage.getItem('token');
    const response = await webfrestIdentityServicePublic.post(
      'user/get-users',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createUser(payload: unknown) {
    const token = LocalStorage.getItem('token');
    const response = await webfrestIdentityServicePublic.post(
      'user/add-user',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateUser(payload: unknown) {
    const token = LocalStorage.getItem('token');
    const response = await webfrestIdentityServicePublic.post(
      'user/edit-user',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async blockUser(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/update-user-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async unblockUser(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/update-user-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async generateInvitationCode(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/generate-invitation-code',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async verifyInvitationCode(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/verify-invitation-code',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getInvitationCode(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/get-invitation-code',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async changePassword(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'user/change_password',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllRequests() {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'Requests/GetAllRequests',
      '',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllAttachment(payload: any) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'Attachments/GetAttachmentById',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAssignedApps(payload: any) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/get_assigned_apps',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createRequest(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'Requests/CreateRequest',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async downloadAttachment(payload: unknown) {
    const token = LocalStorage.getItem('token');
    const response = await webfrestIdentityServicePublic.post(
      'Attachments/DownloadFile',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateRequest(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'Requests/UpdateRequest',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateApp(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/edit-app',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enableApp(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/update-app-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disableApp(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/update-app-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async assignAppToUser(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/assign_app_to_user',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async retractAppFromUser(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'app/retract_app_from_user',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllRoles(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'role/get-roles',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createRole(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'role/add-role',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateRole(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'role/edit-role',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enableRole(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'role/update-role-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disableRole(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'role/update-role-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  // PERMISSIONS

  public async getAllPermissions(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'permission/get-permissions',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createPermission(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'permission/add-permission',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updatePermission(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'permission/edit-permission',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enablePermission(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'permission/update-permission-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disablePermission(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'permission/update-permission-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  // CATEGORIES

  public async getAllCategory(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'category/get-categories',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createCategory(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'category/add-category',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateCategory(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'category/edit-category',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enableCategory(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'category/update-category-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disableCategory(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'category/update-category-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllInstitution(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'institution/get-institutions',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createInstitution(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'institution/add-institution',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateInstitution(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'institution/edit-institution',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enableInstitution(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'institution/update-institution-status',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disableInstitution(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestIdentityServicePublic.post(
      'institution/update-institution-status',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  // SUBSCRIPTION

  public async createInstitutionSubscription(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/add-subscription',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllSubscriptionTypes(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/get-subscription-types',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createSubscriptionPlan(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/add-subscription-type',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateSubscriptionPlan(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/edit-subscription-type',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async enableSubscriptionPlan(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/update-subscription-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async disableSubscriptionPlan(payload: unknown) {
    const token = LocalStorage.getItem('token');

    const response = await webfrestSubscriptionServicePublic.post(
      'subscription/update-subscription-status',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }
}
