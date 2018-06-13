export const setLunesPriceMiddleware = () => {
	return ({dispatch, getState}) => next => action => {
		if (action.type === 'CURRENCIES_SET_PRICE_FULFILLED') {
			dispatch({
				type: 'CRYPTO_SET_LUNES_PRICE',
				payload: action.payload
			});
			dispatch({
				type: 'CURRENCIES_SET_PRICE_COMPLETED',
				payload: action.payload
			})
			return;
		}
		next(action);
	}	
}