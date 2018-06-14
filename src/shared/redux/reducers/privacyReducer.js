let initialState = { 
  addresses: {
    LNS: null,
    BTC: null
  }
}

const privacyReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'WALLET_SET_INFO':
      return {
        addresses: {
          LNS: '37jxbsXCjQJ1cvzG3DdMC5xMxT73ab6DLDM',
          BTC: '17JzE6xsyu4kZbLosvAKUXHdbU9arAp8Uf'
        }
        // addresses:  action.payload,
      }
  }
  return state;
}

export default privacyReducer;
