export let initialState = {
	user: userReducer,
	wallet: walletReducer,
	walletInfo: privacyReducer,
	config: {
		interface: {
			language: 'portuguese',
			timezone: 'BRT'
		} 
	},
	currencies: {
		default: 'BRL',
		price: {
			BRL: { USD: 0.3, EUR: 0.2 },
			USD: { BRL: 3, EUR: 1.2 },
			EUR: { USD: 0.8, BRL: 4 }
		}
	},
	cryptocurrencies: {
		default: 'BTC',
		price: {
			BTC: { USD: 10000, BRL: 30000, EUR: 8000 },
			ETH: { USD: 400,   BRL: 1200,  EUR: 380  },
			LNS: { USD: 2,     BRL: 6,     EUR: 1.8  }
		}
	},
	balance: { 
		BTC: { 
			total_confirmed: 2.9, 
			total_unconfirmed: 1,
			total_amount: 3.9
		},
		ETH: { 
			total_confirmed: 1.2, 
			total_unconfirmed: 1,
			total_amount: 2.2
		},
		LNS: {
			total_confirmed: 100, 
			total_unconfirmed: 0,
			total_amount: 100
		}
	},
	component: {
		wallet: {
			'//':'Deve vir dinamicamente, conforme o usuário clica na moeda, veja a action: getTxHistory()',
			current_network: 'BTC',
			current_tx_history: [
				{
					type: 'RECEIVED',
					otherParams: {},
					txid: '.......',
					date: 1517446725,
					blockHeight: 1261725,
					nativeAmount: 200000000,
					networkFee: 100000
				}
			]
		}
	}
}
