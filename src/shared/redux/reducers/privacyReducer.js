import { decrypt } from '../../utils/crypt'

let initialState = { 
  addresses: {
    LNS: null,
  }
}

const privacyReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'WALLET_SET_INFO':
      return {
        addresses:  action.payload,
      }
  }
  return state;
}

export default privacyReducer;
