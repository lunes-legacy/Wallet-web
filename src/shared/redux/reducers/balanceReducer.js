let initialState = {
  BTC: {
    coinName: "Bitcoin",
    img: "btc.svg",
    total_amount: 3,
    total_confirmed: 3,
    total_unconfirmed: 0
  },
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
      console.log("payload pending", action.payload);
      return state;

    case "WALLET_SET_BALANCE_FULFILLED":
      console.log("payload full", action.payload);
      let balance = action.payload;
      return (state = {
        ...state
        // LNS: {
        //   coinName: "Lunes",
        //   img: "lns.svg",
        //   total_confirmed: balance.confirmed / 100000000,
        //   total_amount: balance.confirmed
        // }
      });
  }

  return state;
};

export default balanceReducer;
