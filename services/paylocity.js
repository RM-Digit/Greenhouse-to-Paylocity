require("dotenv").config();
const axios = require("axios");

const URL_ROOT = process.env.PAYLOCITY_URL;

const apiKey = process.env.PAYLOCITY_KEY;
const secret = process.env.PAYLOCITY_SECRET;

const getToken = async () => {
  const auth_URL = `${URL_ROOT}/IdentityServer/connect/token`;

  const authorizationTokenInBase64 = Buffer.from(`${apiKey}:${secret}`).toString("base64");

  const body = "grant_type=client_credentials&scope=WebLinkAPI";

  let config = {
    headers: {
      Authorization: `Basic ${authorizationTokenInBase64}`,
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  };

  const response = await axios.post(auth_URL, body, config);

  if (!response.data) return null;

  const token = response.data.access_token;

  return token;
};

const createEmployee = async (token, companyId, data) => {
  const post_URL = (cId) => `${URL_ROOT}/api/v1/companies/${cId}/onboarding/employees`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const create = await axios.post(post_URL(companyId), data, config);
    return create.data;
  } catch (error) {
    return error.response.data;
  }
};

module.exports = {
  getToken,
  createEmployee,
};
