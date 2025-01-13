// // import { route } from 'quasar/wrappers';
// // import {
// //   createMemoryHistory,
// //   createRouter,
// //   createWebHashHistory,
// //   createWebHistory,
// // } from 'vue-router';

// // import routes from './routes';
// // import { useAuthStore } from 'src/stores/auth-store';
// // import { startSessionTimer, clearSessionTimer } from 'src/utils/sessionTimer';

// // /*
// //  * If not building with SSR mode, you can
// //  * directly export the Router instantiation;
// //  *
// //  * The function below can be async too; either use
// //  * async/await or return a Promise which resolves
// //  * with the Router instance.
// //  */

// // export default route(function (/* { store, ssrContext } */) {
// //   const createHistory = process.env.SERVER
// //     ? createMemoryHistory
// //     : process.env.VUE_ROUTER_MODE === 'history'
// //     ? createWebHistory
// //     : createWebHashHistory;

// //   const Router = createRouter({
// //     scrollBehavior: () => ({ left: 0, top: 0 }),
// //     routes,

// //     // Leave this as is and make changes in quasar.conf.js instead!
// //     // quasar.conf.js -> build -> vueRouterMode
// //     // quasar.conf.js -> build -> publicPath
// //     history: createHistory(process.env.VUE_ROUTER_BASE),
// //   });

// //   const auth = useAuthStore();
// //   Router.beforeEach((to, from, next) => {
// //     if (to.name !== 'login' && !auth.isAuthenticated) next({ name: 'login' });
// //     else if (to.name === 'login' && auth.isAuthenticated)
// //       next({ name: 'dashboard' });
// //     else next();
// //   });
// //   return Router;
// // });

// import { route } from 'quasar/wrappers';
// import {
//   createMemoryHistory,
//   createRouter,
//   createWebHashHistory,
//   createWebHistory,
//   RouteLocationNormalized,
// } from 'vue-router';

// import routes from './routes';
// import { useAuthStore } from 'src/stores/auth-store';
// import { startSessionTimer, clearSessionTimer } from 'src/utils/sessionTimer';

// export default route(function (/* { store, ssrContext } */) {
//   const createHistory = process.env.SERVER
//     ? createMemoryHistory
//     : process.env.VUE_ROUTER_MODE === 'history'
//     ? createWebHistory
//     : createWebHashHistory;

//   const Router = createRouter({
//     scrollBehavior: () => ({ left: 0, top: 0 }),
//     routes,
//     history: createHistory(process.env.VUE_ROUTER_BASE),
//   });

//   const auth = useAuthStore();

//   Router.beforeEach(async (to, from, next) => {
//     if (to.name !== 'login' && !auth.isAuthenticated) {
//       next({ name: 'login' });
//     } else if (to.name === 'login' && auth.isAuthenticated) {
//       next({ name: 'dashboard' });
//     } else {
//       resetTimer(Router, to);
//       next();
//     }
//   });

//   function resetTimer(router: any, to: RouteLocationNormalized) {
//     clearSessionTimer();
//     startSessionTimer(() => {
//       // Logout logic here
//       auth.logout();
//       // router.push({ name: 'login' });
//       // Example: redirect to login page
//       router.push('/auth/login');
//     });
//   }

//   // Call setupTimers to start monitoring user activity
//   setupTimers(Router);

//   return Router;
// });

// function setupTimers(router: any) {
//   document.addEventListener('keypress', () => resetTimer(router), false);
//   document.addEventListener('mousemove', () => resetTimer(router), false);
//   document.addEventListener('mousedown', () => resetTimer(router), false);
//   document.addEventListener('touchmove', () => resetTimer(router), false);
// }

// function resetTimer(router: any) {
//   const auth = useAuthStore();

//   clearSessionTimer();
//   startSessionTimer(() => {
//     // Logout logic here
//     auth.logout();
//     // router.push({ name: 'login' });
//     // Example: redirect to login page
//     router.push('/auth/login');
//   });
// }
