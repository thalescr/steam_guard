import SteamTotp from "steam-totp";

export const generateCode = (sharedCode) =>
  SteamTotp.generateAuthCode(sharedCode);
