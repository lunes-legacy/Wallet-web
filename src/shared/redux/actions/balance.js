import { WalletClass } from "Classes/Wallet";
const Wallet = new WalletClass();

export const setBalance = data => {
  return {
    // addresses = { LNS: lunes addrees, BTC: bitcoin address... }
    // data: { LNS: '37RThBWionPuAbr8H4pzZJM6HYP2U6Y9nLr', BTC: '2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF' }
    type: "WALLET_SET_BALANCE",
    payload: Wallet.getAddressesBalance(data)
  };
};
