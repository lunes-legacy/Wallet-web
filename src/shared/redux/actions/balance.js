import { WalletClass } from "Classes/Wallet";
const Wallet = new WalletClass();

// addresses = { LNS: lunes addrees, BTC: bitcoin address... }
export const setBalance = data => {
  return {
    type: "WALLET_SET_BALANCE",
    payload: Wallet.getAddressesBalance(data.addresses)
  };
};
