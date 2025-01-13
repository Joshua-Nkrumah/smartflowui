import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register/:invitation_code',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgotpassword',
        component: () => import('pages/auth/ForgotPasswordPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/SmartFlowLayout.vue'),
    meta: { requiresAuth: true }, // Protect dashboard route
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('src/pages/smartflow/DashboardPage.vue'),
      },
      {
        path: 'branches',
        name: 'branches',
        component: () => import('src/pages/smartflow/BranchPage.vue'),
      },
      {
        path: 'requests',
        name: 'requests',
        component: () => import('src/pages/smartflow/RequestPage.vue'),
      },
      {
        path: 'approvals',
        name: 'approvals',
        component: () => import('src/pages/smartflow/ApprovalPage.vue'),
      },
      {
        path: 'attachments/:requestId',
        name: 'attachments',
        component: () => import('src/pages/smartflow/AttachmentPage.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/smartflow/UserPage.vue'),
      },
    ],
  },
  // Athentication and Authorization
  {
    path: '/uam',
    component: () => import('layouts/UAMSubLayout.vue'),
    meta: { requiresAuth: true }, // Protect dashboard route
    children: [
      {
        path: 'user-manager',
        component: () => import('src/pages/uam/UserManager.vue'),
      },
      {
        path: 'user_activity',
        component: () => import('src/pages/uam/UserActivity.vue'),
      },
      {
        path: 'roles',
        component: () => import('src/pages/uam/RoleManager.vue'),
      },
      {
        path: 'permissions',
        component: () => import('src/pages/uam/PermissionsManager.vue'),
      },
      {
        path: 'user_roles/:userId',
        component: () => import('src/pages/uam/UserRoles.vue'),
      },
      {
        path: 'role-users/:roleId',
        component: () => import('src/pages/uam/RoleUsers.vue'),
      },
      {
        path: 'role-permissions/:roleId',
        component: () => import('src/pages/uam/RolePermissions.vue'),
      },
      {
        path: 'role-apps/:roleId',
        component: () => import('src/pages/uam/RoleApps.vue'),
      },
      {
        path: 'category',
        component: () => import('src/pages/uam/AppCategory.vue'),
      },
      {
        path: 'apps',
        component: () => import('src/pages/uam/AppManager.vue'),
      },
      {
        path: 'institutions',
        component: () => import('src/pages/uam/InstitutionManager.vue'),
      },
      {
        path: 'subscription-plans',
        component: () => import('src/pages/uam/SubscriptionPlan.vue'),
      },
      {
        path: 'institution-subscriptions',
        component: () => import('src/pages/uam/InsSubscriptionManager.vue'),
      },
      {
        path: 'subscriptions',
        component: () => import('src/pages/uam/SubscriptionManager.vue'),
      },
      {
        path: 'activity_logs',
        component: () => import('src/pages/uam/AppLogs.vue'),
      },
      {
        path: 'services',
        component: () => import('src/pages/uam/ServiceManager.vue'),
      },
      {
        path: 'account',
        component: () => import('src/pages/uam/ProfileManager.vue'),
      },
      {
        path: 'assigned_apps/:user_id',
        component: () => import('src/pages/uam/AssignedApps.vue'),
      },
      {
        path: 'app_roles/:app_id',
        component: () => import('src/pages/uam/AppRoles.vue'),
      },
    ],
  },
  // Institution Athentication and Authorization
  {
    path: '/admin-console',
    component: () => import('layouts/UAMSubLayout.vue'),
    meta: { requiresAuth: true }, // Protect dashboard route
    children: [
      {
        path: 'user-manager',
        component: () => import('src/pages/admin-console/UserManager.vue'),
      },
      {
        path: 'user_activity',
        component: () => import('src/pages/admin-console/UserActivity.vue'),
      },
      {
        path: 'roles',
        component: () => import('src/pages/admin-console/RoleManager.vue'),
      },
      {
        path: 'permissions',
        component: () =>
          import('src/pages/admin-console/PermissionsManager.vue'),
      },
      {
        path: 'user_roles/:userId',
        component: () => import('src/pages/admin-console/UserRoles.vue'),
      },
      {
        path: 'role-users/:roleId',
        component: () => import('src/pages/admin-console/RoleUsers.vue'),
      },
      {
        path: 'role-permissions/:roleId',
        component: () => import('src/pages/admin-console/RolePermissions.vue'),
      },
      {
        path: 'role-apps/:roleId',
        component: () => import('src/pages/admin-console/RoleApps.vue'),
      },
      {
        path: 'category',
        component: () => import('src/pages/admin-console/AppCategory.vue'),
      },
      {
        path: 'apps',
        component: () => import('src/pages/admin-console/AppManager.vue'),
      },
      {
        path: 'institutions',
        component: () =>
          import('src/pages/admin-console/InstitutionManager.vue'),
      },
      {
        path: 'subscription-plans',
        component: () => import('src/pages/admin-console/SubscriptionPlan.vue'),
      },
      {
        path: 'institution-subscriptions',
        component: () =>
          import('src/pages/admin-console/InsSubscriptionManager.vue'),
      },
      {
        path: 'subscriptions',
        component: () =>
          import('src/pages/admin-console/SubscriptionManager.vue'),
      },
      {
        path: 'activity_logs',
        component: () => import('src/pages/admin-console/AppLogs.vue'),
      },
      {
        path: 'services',
        component: () => import('src/pages/admin-console/ServiceManager.vue'),
      },
      {
        path: 'account',
        component: () => import('src/pages/admin-console/ProfileManager.vue'),
      },
      {
        path: 'assigned_apps/:user_id',
        component: () => import('src/pages/admin-console/AssignedApps.vue'),
      },
      {
        path: 'app_roles/:app_id',
        component: () => import('src/pages/admin-console/AppRoles.vue'),
      },
    ],
  },
  // Student Management
  {
    path: '/sis',
    // component: () => import('layouts/SISMainLayout.vue'),
    component: () => import('layouts/UAMSubLayout.vue'),
    meta: { requiresAuth: true }, // Protect dashboard route
    children: [
      {
        path: 'dashboard',
        component: () => import('src/pages/sis/StudentDashboard.vue'),
      },
      {
        path: 'student-profiles',
        component: () => import('src/pages/sis/StudentProfiles.vue'),
      },
      {
        path: 'student-profile/:studentId',
        component: () => import('src/pages/sis/StudentSummary.vue'),
      },
      {
        path: 'student-category',
        component: () => import('src/pages/sis/StudentCategory.vue'),
      },
      {
        path: 'linked-category-students/:categoryId',
        component: () => import('src/pages/sis/LinkedCategoryStudents.vue'),
      },
      {
        path: 'guardian-profile',
        component: () => import('src/pages/sis/GuardianProfiles.vue'),
      },
      {
        path: 'guardian-profile/:guardianId',
        component: () => import('src/pages/sis/StudentSummary.vue'),
      },
      {
        path: 'guardian-students/:guardianId',
        component: () => import('src/pages/sis/GuardianStudents.vue'),
      },
      {
        path: 'student-guardian/:student_id',
        component: () => import('src/pages/sis/StudentGuardian.vue'),
      },
      {
        path: 'student-report',
        component: () => import('src/pages/sis/StudentReport.vue'),
      },
      {
        path: 'classroom-enrollment',
        component: () => import('src/pages/sis/ClassEnrollment.vue'),
      },
      {
        path: 'course-enrollment',
        component: () => import('src/pages/sis/CourseEnrollment.vue'),
      },
      {
        path: 'academic-calendar',
        component: () => import('src/pages/sis/AcademicCalendar.vue'),
      },
      {
        path: 'student-reporting',
        component: () => import('src/pages/sis/StudentReporting.vue'),
      },
      // {
      //   path: 'admissions',
      //   component: () => import('src/pages/sis/AdmissionManager.vue'),
      // },
      // {
      //   path: 'activity_logs',
      //   component: () => import('src/pages/uam/AppLogs.vue'),
      // },
      // {
      //   path: 'services',
      //   component: () => import('src/pages/uam/ServiceManager.vue'),
      // },
      // {
      //   path: 'account',
      //   component: () => import('src/pages/uam/ProfileManager.vue'),
      // },
      // {
      //   path: 'assigned_apps/:user_id',
      //   component: () => import('src/pages/uam/AssignedApps.vue'),
      // },
      // {
      //   path: 'app_roles/:app_id',
      //   component: () => import('src/pages/uam/AppRoles.vue'),
      // },
    ],
  },
  {
    path: '/welfare',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'members',
        component: () => import('src/pages/welfare/MemberManagerPage.vue'),
      },
      {
        path: 'members-history/:memberId',
        component: () => import('src/pages/welfare/MemberHistoryPage.vue'),
      },
      {
        path: 'print-contribution-receipt/:memberId/:contributionId',
        component: () => import('src/pages/welfare/PrintReceiptPage.vue'),
      },
      {
        path: 'print-donation-receipt/:memberId/:donationId',
        component: () => import('src/pages/welfare/PrintReceiptPage.vue'),
      },
      {
        path: 'contributions',
        component: () =>
          import('src/pages/welfare/ContributionManagerPage.vue'),
      },
      {
        path: 'volunteers',
        component: () => import('src/pages/welfare/VolunteerManagerPage.vue'),
      },
      {
        path: 'donations',
        component: () => import('src/pages/welfare/DonationManagerPage.vue'),
      },
      {
        path: 'membership-report',
        component: () => import('src/pages/welfare/WelfareDashboardPage.vue'),
      },
      {
        path: 'donations-report',
        component: () => import('src/pages/welfare/WelfareDashboardPage.vue'),
      },
      {
        path: 'contributions-report',
        component: () => import('src/pages/welfare/WelfareDashboardPage.vue'),
      },
      {
        path: 'manage-account',
        component: () => import('src/pages/welfare/AccountSettingsPage.vue'),
      },
      {
        path: 'volunteers',
        component: () => import('src/pages/welfare/WelfareDashboardPage.vue'),
      },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('src/pages/LogoutPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
