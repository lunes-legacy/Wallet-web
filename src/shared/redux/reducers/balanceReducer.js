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
    total_unconfirmed: 0,
    status: {type:'loading',message:''}
  },
  BTC: {
    coinName: "Bitcoin",
    img: "btc.svg",
    total_amount: 0,
    total_confirmed: 0,
    total_unconfirmed: 0,
    status: {type:'loading',message:''}
  },
  ETH: {
  	coinName: 'Ethereum',
    img: 'eth.svg',
  	total_amount: 0,
  	total_confirmed: 0,
  	total_unconfirmed: 0,
    status: {type:'loading',message:''}
  },
  LTC: {
  	coinName: 'Litecoin',
  	img: 'ltc.svg',
  	total_amount: 0,
  	total_confirmed: 0,
  	total_unconfirmed: 0,
    status: {type:'loading',message:''}
  },
  DASH: {
  	total_confirmed: 0,
  	total_unconfirmed: 0,
  	total_amount: 0,
  	img: 'dash.svg',
  	coinName: 'Dashcoin',
    status: {type:'loading',message:''}
  },
  BCH: {
  	total_confirmed: 0,
  	total_unconfirmed: 0,
  	total_amount: 0,
  	img: 'bch.svg',
  	coinName: 'Bitcoin Cash',
    status: {type:'loading',message:''}
  },
  USDT: {
    total_confirmed: 0,
    total_unconfirmed: 0,
    total_amount: 0,
    img: 'nano.svg',
    coinName: 'Tether',
    status: {type:'loading',message:''}
  }
  // NANO: {
  // 	total_confirmed: 100,
  // 	total_unconfirmed: 0,
  // 	total_amount: 100,
  // 	img: 'nano.svg',
  // 	coinName: 'Nano'
  // }
};
const arrangeUniqueNetworkBalance = (balance, state) => {
  let { network } = balance;
  let { confirmed, unconfirmed } = balance.data;
  let upperCasedNetwork = network.toUpperCase();
  console.log('balance2',balance);
  return {
    coinName: state[upperCasedNetwork].coinName,
    img: state[upperCasedNetwork].img,
    total_confirmed: money.convertCoin(network, confirmed),
    total_amount: money.convertCoin(network, confirmed),
    total_unconfirmed: unconfirmed ? money.convertCoin(network, unconfirmed) : 0,
  }
}

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WALLET_SET_BALANCE":
      return state;
    case 'WALLET_SET_UNIQUE_BALANCE_REJECTED':
      let message = action.payload.message ? action.payload.message : JSON.stringify(action.payload)
      return { ...state, status: { type: 'error', message: message } };
    case 'WALLET_SET_UNIQUE_BALANCE_FULFILLED':
      let balance = arrangeUniqueNetworkBalance(action.payload, state);
      console.log('balance', balance);
      state = {
        ...state,
        [action.payload.network]: {
          ...balance,
          status: {type:'completed',message:''}
        }
      }
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
              total_confirmed: parseFloat(money.conevertCoin(coinKey, balance.confirmed)),
              total_amount: parseFloat(money.conevertCoin(coinKey, balance.confirmed)),
              total_unconfirmed: balance.unconfirmed ? parseFloat(money.conevertCoin(coinKey, balance.unconfirmed)) : 0,
            }
          };
        }
      }

      return state;
  }

  return state;
};

export default balanceReducer;
