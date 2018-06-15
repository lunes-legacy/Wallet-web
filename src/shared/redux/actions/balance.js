import { WalletClass } from "Classes/Wallet";
const Wallet = new WalletClass();

export const setBalance = data => {
  return {
    type: "WALLET_SET_BALANCE",
    payload: Wallet.getAddressesBalance(data.addresses.LNS)
  };
};
