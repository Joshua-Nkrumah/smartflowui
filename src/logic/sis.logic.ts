import Response from 'src/models/response.model';
import { cleverchapSISPublic, cleverchapUAMApi } from 'src/boot/axios';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';

export default class SISLogic {
  private institutionId: string | null;
  private token: string | null;

  constructor() {
    this.institutionId = LocalStorage.getItem('institution_id');
    this.token = LocalStorage.getItem('token');
  }

  async logout() {
    const router = useRouter();
    LocalStorage.remove('username');
    LocalStorage.remove('result');
    LocalStorage.remove('isAuthenticated');
    LocalStorage.remove('email');
    LocalStorage.remove('firstName');
    LocalStorage.remove('lastName');
    LocalStorage.remove('fullName');
    LocalStorage.remove('phoneNumber');
    LocalStorage.remove('role');
    LocalStorage.remove('status');
    LocalStorage.remove('token');
    LocalStorage.remove('institution_id');
    router.push({ name: 'login' });
  }

  async checkIfTokenExpired(error: any) {
    if (
      (error as any)?.response?.status == '401' ||
      (error as any)?.response?.message == 'Unauthenticated'
    ) {
      // console.error('Error fetching users, logging out:', error);
      this.logout();
    }
  }

  public async createStudent(payload: unknown) {
    const headers = {
      // Authorization: `Bearer ${token}`,
      TenantId: this.institutionId,
    };

    const response = await cleverchapSISPublic.post(
      'sis/add-student',
      payload
      // {
      //   headers,
      // }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async uploadStudentPhoto(payload: unknown) {
    const headers = {
      // Authorization: `Bearer ${token}`,
      TenantId: this.institutionId,
    };

    const response = await cleverchapSISPublic.post(
      'sis/upload_student_photo',
      payload,
      {
        headers,
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateStudent(payload: unknown) {
    // const headers = {
    //   TenantId: this.institutionId,
    // };
    const response = await cleverchapSISPublic.post(
      'sis/edit-student',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }
  public async updateStudentStatus(payload: unknown) {
    const headers = {
      TenantId: this.institutionId,
    };
    const response = await cleverchapSISPublic.post(
      'sis/update_student_status',
      payload,
      {
        headers,
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllStudents(payload: any) {
    const headers = {
      TenantId: this.institutionId, // Assuming payload has a property named institutionId
    };

    const response = await cleverchapSISPublic.post(
      'sis/get-students',
      payload,
      {
        headers, // Pass headers as a separate argument
      }
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getStudent(payload: unknown) {
    const headers = {
      TenantId: this.institutionId,
    };

    const response = await cleverchapSISPublic.post(
      'sis/get_student',
      payload,
      {
        headers,
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getFullStudentProfile(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/get-student-summary',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  // STUDENT CATEGORY

  public async createStudentCategory(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/add-student-category',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateStudentCategory(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/edit-student-category',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllStudentCategory(payload: any) {
    const response = await cleverchapSISPublic.post(
      'sis/get-student-categories',
      payload
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllCategoryStudentMapping(payload: any) {
    const response = await cleverchapSISPublic.post(
      'sis/get-category-student-mappings',
      payload
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async removeCategoryStudentMapping(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/remove-category-student-mapping',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async applyCategoryStudentMapping(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/apply-category-student-mapping',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllGuardianStudentMapping(payload: any) {
    const response = await cleverchapSISPublic.post(
      'sis/get-guardian-student-mappings',
      payload
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createGuardian(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/add-guardian',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async removeGuardianStudentMapping(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/remove-guardian-student-mapping',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async applyGuardianStudentMapping(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/apply-guardian-student-mapping',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async createAndLinkGuardian(payload: unknown) {
    const headers = {
      // Authorization: `Bearer ${token}`,
      TenantId: this.institutionId,
    };

    const response = await cleverchapSISPublic.post(
      'sis/create_link_guardian',
      payload,
      {
        headers,
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async updateGuardian(payload: unknown) {
    const response = await cleverchapSISPublic.post(
      'sis/edit-guardian',
      payload
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async mapGuardianStudent(payload: unknown) {
    const headers = {
      TenantId: this.institutionId,
    };
    const response = await cleverchapSISPublic.post(
      'sis/map_guardian_to_student',
      payload,
      {
        headers,
      }
    );
    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllGuardians(payload: any) {
    const response = await cleverchapSISPublic.post(
      'sis/get-guardians',
      payload
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }

  public async getAllStudentGuardians(payload: any) {
    const headers = {
      TenantId: this.institutionId, // Assuming payload has a property named institutionId
    };

    const response = await cleverchapSISPublic.post(
      'sis/get_all_student_guardians',
      payload,
      {
        headers, // Pass headers as a separate argument
      }
    );

    const result = response.data;
    return new Response(result.status, result.message, result.data);
  }
}
