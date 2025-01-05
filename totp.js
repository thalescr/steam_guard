import { generateCode } from "./services/steamGuard.js";
import { getSecret } from "./services/secrets.js";

const retrieveTotpCode = () => {
  const secret = getSecret("1");
  return secret ? generateCode(secret) : undefined;
};

console.log(retrieveTotpCode());
