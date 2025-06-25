/**
 * environment uat
 */

const apiUrl = `http://49.0.80.15:5566/awa-workshop-api`;
const apiAuthenticationUrl = '/token/authenticate';
export const environment = {
  production: true,
  api_url: apiUrl,
  api_authentication_url: apiUrl + apiAuthenticationUrl,
};
