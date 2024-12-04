const credentials = () => {
  const users = {};
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith("AUTH_")) {
      const account_id = key.slice(5);
      users[account_id] = process.env[key];
    }
  });
  return users;
};

export default credentials;
