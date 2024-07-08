import jwt from "jsonwebtoken";

const authenticate = async (authorizationHeader) => {
  if (!authorizationHeader.startsWith("Bearer ")) {
    return false;
  }

  const secretKey = process.env.SECRET_KEY || "unsafe";
  const token = authorizationHeader.slice(7);

  try {
    jwt.verify(token, secretKey);
  } catch (err) {
    return false;
  }

  return true;
};

export default authenticate;
