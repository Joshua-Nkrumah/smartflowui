import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// const baseUrl = process.env.AXIOS_BASEURL;

const api = axios.create({ baseURL: 'https://api.example.com' });

const webfrestIdentityServicePublic = axios.create({
  baseURL: process.env.WEBFREST_IDENTITY_SERVICE_BASE_URL,
});

const webfrestSubscriptionServicePublic = axios.create({
  baseURL: process.env.WEBFREST_SUBSCRIPTION_SERVICE_BASE_URL,
});

const cleverchapSISPublic = axios.create({
  baseURL: process.env.CLEVERCHAP_SIS_SERVICE_BASE_URL,
});

const cleverchapUAMApiPublic = axios.create({
  baseURL: 'http://localhost/uam/public/api',
});

const cleverchapUAMApi = axios.create({
  baseURL: 'http://localhost/uam/public/api',
  // headers: {'Authorization': 'Bearer '+token}
});

const cleverchapApiPublic = axios.create({
  baseURL: 'http://localhost/cleverchap-api/public/api',
});

const cleverchapApi = axios.create({
  baseURL: 'http://localhost/cleverchap-api/public/api',
  // headers: {'Authorization': 'Bearer '+token}
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api;

  app.config.globalProperties.$apiPublic = webfrestIdentityServicePublic;
  app.config.globalProperties.$api = cleverchapApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export {
  api,
  webfrestIdentityServicePublic,
  webfrestSubscriptionServicePublic,
  cleverchapUAMApi,
  cleverchapUAMApiPublic,
  cleverchapApi,
  cleverchapApiPublic,
  cleverchapSISPublic,
};
