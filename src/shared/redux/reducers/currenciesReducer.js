import { store } from 'Redux/stores';
// ENABLE COINS
let initialState = {
	default: 'BRL',
	locale: 'en', // this used for numeral lib - pt-br, en ...
	currencies: {
		BRL: { USD: 0, EUR: 0, status: { type: 'loading', message: '' } },
		USD: { BRL: 0, EUR: 0, status: { type: 'loading', message: '' } },
		EUR: { USD: 0, BRL: 0, status: { type: 'loading', message: '' } }
	},
	crypto: {
		BTC: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
		BCH: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
		ETH: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
		LNS: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
		LTC: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
    DASH: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
		USDT: { USD: 0, BRL: 0, EUR: 0, status: { type: 'loading', message: '' }  },
	},
	cryptoTx: {
		LNS: { high: 0, medium: 0, low: 0 },
		BTC: { high: 0, medium: 0, low: 0 },
		BCH: { high: 0, medium: 0, low: 0 },
		ETH: { high: 0, medium: 0, low: 0 },
		LTC: { high: 0, medium: 0, low: 0 },
    DASH: { high: 0, medium: 0, low: 0 },
		USDT: { high: 0, medium: 0, low: 0 },
	}
}
const currenciesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CURRENCIES_SET_PRICE_REJECTED':
      let { message } = action.payload.data;
      state.currencies.BRL.status = {type: 'error', message: message || 'Unknown error'}
      state.currencies.EUR.status = {type: 'error', message: message || 'Unknown error'}
      state.currencies.USD.status = {type: 'error', message: message || 'Unknown error'}
      return state;
    case 'CURRENCIES_SET_PRICE_FULFILLED':
			state = {
				...state,
				currencies: action.payload.data
			}
      state.currencies.BRL.status = { type:'completed',message: '' }
      state.currencies.EUR.status = { type:'completed',message: '' }
      state.currencies.USD.status = { type:'completed',message: '' }
      return state;
    case 'CRYTPO_SET_PRICE_REJECTED':
      {
        let { message } = action.payload.data;
        Object.keys(state.crypto).map((key) => {
          let { message } = action.payload.data[key];
          state.crypto[key].status = { type:'error',message: message || 'Unknown error' }
        });
        return state;
      }
		case 'CRYTPO_SET_PRICE_FULFILLED':
      {
        let { message } = action.payload.data;
        state = {
          ...state,
          crypto: action.payload.data
        }
        Object.keys(state.crypto).map((key) => {
          if (!(action.payload.data[key] instanceof Object)) {
            console.error(`Error on trying to set ${key} price`);
            state.crypto[key].status = { type:'error', message: action.payload[key] || 'Unknown error' }
            return;
          }
          state.crypto[key].status = { type:'completed', message:'' }
        });
        console.log('STATE:::::::::;',state);
        return state;
      }
		case 'CRYTPO_SET_TX_FULFILLED':
			return {
				...state,
				cryptoTx: action.payload
			}
	}

	return state;
}

export default currenciesReducer;
