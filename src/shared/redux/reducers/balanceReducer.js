let initialState = {
  // BTC: {
  //   coinName: "Bitcoin",
  //   img: "btc.svg",
  //   total_amount: 0,
  //   total_confirmed: 0,
  //   total_unconfirmed: 0
  // },
  // ETH: {
  // 	total_confirmed: 1.02,
  // 	total_unconfirmed: 1,
  // 	total_amount: 2.2,
  // 	img: 'eth.svg',
  // 	coinName: 'Ethereum'

  // },
  LNS: {
    coinName: "Lunes",
    img: "lns.svg",
    total_amount: 0,
    total_confirmed: 0,
    total_unconfirmed: 0
  }
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
        state = {
          ...state,
          [coinKey]: {
            coinName: state[coinKey].coinName,
            img: state[coinKey].img,
            total_confirmed: balance.confirmed / 100000000,
            total_amount: balance.confirmed / 100000000
          }
        };
      }

      return state;
  }

  return state;
};

export default balanceReducer;
