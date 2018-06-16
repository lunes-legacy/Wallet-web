import { WalletClass } from "Classes/Wallet";
const Wallet = new WalletClass();

// addresses = { LNS: lunes addrees, BTC: bitcoin address... }
export const setBalance = data => {
  // data = { LNS: '37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr', BTC: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF' }
  return {
    type: "WALLET_SET_BALANCE",
    payload: Wallet.getAddressesBalance(data.addresses)
  };
};
