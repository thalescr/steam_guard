const credentials = () => {
  const users = {};
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith("AUTH_")) {
      const userName = key.slice(5);
      users[userName] = process.env[key];
    }
  });
  return users;
};

export default credentials;
