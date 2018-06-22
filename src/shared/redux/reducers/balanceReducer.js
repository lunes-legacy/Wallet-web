// CLASSES
import { MoneyClass } from 'Classes/Money';
const money = new MoneyClass;

// ENABLE COINS
let initialState = {
  LNS: {
    coinName: "Lunes",
    img: "lns.svg",
    total_amount: 0,
    total_confirmed: 0,
    total_unconfirmed: 0
  },
  BTC: {
    coinName: "Bitcoin",
    img: "btc.svg",
    total_amount: 0,
    total_confirmed: 0,
    total_unconfirmed: 0
  },
  // ETH: {
  //   img: 'eth.svg',
  // 	coinName: 'Ethereum',
  // 	total_confirmed: 0,
  // 	total_unconfirmed: 0,
  // 	total_amount: 0,

  // },
  // LTC: {
  // 	total_confirmed: 100,
  // 	total_unconfirmed: 0,
  // 	total_amount: 100,
  // 	img: 'ltc.svg',
  // 	coinName: 'Litecoin'

  // },
  // DASH: {
  // 	total_confirmed: 100,
  // 	total_unconfirmed: 0,
  // 	total_amount: 100,
  // 	img: 'dash.svg',
  // 	coinName: 'Dashcoin'
  // },
  // NANO: {
  // 	total_confirmed: 100,
  // 	total_unconfirmed: 0,
  // 	total_amount: 100,
  // 	img: 'nano.svg',
  // 	coinName: 'Nano'
  // }
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WALLET_SET_BALANCE":
      return state;

    case "WALLET_SET_BALANCE_FULFILLED":
      let coins = action.payload;
      for (const coinKey in coins) {
        let balance = action.payload[coinKey].data;
        let coinKeyUpperCase = coinKey.toUpperCase();
        if (state[coinKeyUpperCase]) {
          state = {
            ...state,
            [coinKeyUpperCase]: {
              coinName: state[coinKeyUpperCase].coinName,
              img: state[coinKeyUpperCase].img,
              total_confirmed: money.conevertCoin(coinKey, balance.confirmed),
              total_amount: money.conevertCoin(coinKey, balance.confirmed),
              total_unconfirmed: balance.unconfirmed ? money.conevertCoin(coinKey, balance.unconfirmed) : 0,
            }
          };   
        }
      }

      return state;
  }

  return state;
};

export default balanceReducer;
