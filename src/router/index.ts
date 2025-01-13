import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from 'src/stores/auth-store';
import { LocalStorage } from 'quasar';
import { computed, ref } from 'vue';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const auth = useAuthStore();

  const isAuthenticated = ref(LocalStorage.getItem('isAuthenticated') ?? false);

  // const isAuthenticated = computed(() => {
  //   // const isAuthenticated_ = auth.isAuthenticated;
  //   const isAuthenticated_  = LocalStorage.getItem('isAuthenticated');
  //   return isAuthenticated_;
  // });

  // Navigation guard to check authentication status before accessing protected routes
  Router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      // Check if the route requires authentication
      if (to.meta.requiresAuth && !isAuthenticated.value) {
        // If the route requires authentication and the user is not authenticated, redirect to the login page
        next({ name: 'login' });
        // next({ name: 'login', query: { redirect: to.fullPath } });
      } else if (to.name === 'login' && isAuthenticated.value) {
        // If the user is authenticated and trying to access the login page, redirect to the dashboard
        next({ name: 'dashboard' });
      } else {
        // Proceed to the requested route
        next();
      }
    }
  );

  return Router;
});
