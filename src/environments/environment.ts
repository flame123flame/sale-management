/**
 * environment
 */

/* ==== Dev ==== */
const apiUrl = `http://localhost:9000/awa-workshop-api`;
const apiAuthenticationUrl = '/authenticate/login';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
