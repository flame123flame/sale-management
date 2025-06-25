/**
 * environment
 */

/* ==== Dev ==== */
const apiUrl = `http://49.0.80.15:5566/awa-workshop-api`;
const apiAuthenticationUrl = '/authenticate/login';

export const environment = {
  production: false,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
