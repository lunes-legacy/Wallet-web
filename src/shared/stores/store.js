import userReducer from 'Reducers/userReducer';
import walletReducer from 'Reducers/walletReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

let store = createStore(
	combineReducers({
		user: userReducer,
		wallet: walletReducer
	}), 
	{},
	applyMiddleware(createLogger(), thunk, promise())
);

export {
	store
};