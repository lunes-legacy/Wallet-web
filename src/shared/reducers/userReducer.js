

let initialState = { 
	status:'pending',
	logged: false
}
const userReducer = (state = initialState, action) => {
	if (action.type === 'USER_LOGIN') {
		return {
			status: 'pending',
			logged: false
		};
	} else if (action.type === 'USER_LOGIN_FULFILLED') {
		return {
			status: 'fulfilled',
			token: action.payload,
			logged: true
		}
	} else if (action.type === 'USER_LOGIN_REJECTED') {
		return {
			status: 'rejected',
			message: action.payload,
			logged: false
		}
	}
	return state;
}

export {
	userReducer
}