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
  }
  return state;
}

export default privacyReducer;
