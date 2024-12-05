export const getSecret = (accountId) => {
  return process.env[`AUTH_${accountId}`];
};
