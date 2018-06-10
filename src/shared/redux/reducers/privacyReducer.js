let initialState = { 
  seed: null,
  addresses: {
    LNS: null,
  }
}

const privacyReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'WALLET_SET_INFO':
      return {
        seed:  action.payload.seed,
        addresses:  action.payload.addresses,
      }

    case 'WALLET_GET_INFO':
      let walletInfo = JSON.parse(localStorage.getItem('WALLET-INFO'));

      if (walletInfo) {
        console.log('1')
        return {
          seed:  walletInfo.seed,
          addresses:  walletInfo.addresses
        }  
      } else {
        console.log('2')
        return {
          seed:  null,
          addresses:  {}
        } 
      }
  }
  return state;
}

export default privacyReducer;
