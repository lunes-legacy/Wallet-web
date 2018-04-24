let initialState = { 
	status: 'initial',
	logged: false
}
const userReducer = (state = initialState, action) => {
	if (action.type === 'USER_LOGIN_PENDING') {
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
	} else if (action.type === 'USER_CREATE_PENDING') {
		return {
			status: 'pending',
			logged: false
		}
	} else if (action.type === 'USER_CREATE_FULFILLED') {
		return {
			status: 'fulfilled',
			token: action.payload,
			logged: true
		}
	} else if (action.type === 'USER_CREATE_REJECTED') {
		return {
			status: 'rejected',
			logged: false
		}
	} else if (action.type === 'USER_RESET_PENDING') {
		return {
			status: 'pending'
		}
	} else if (action.type === 'USER_RESET_FULFILLED') {
		return {
			status: 'fulfilled',
			result: action.payload
		}
	} else if (action.type === 'USER_RESET_REJECTED') {
		return {
			status: 'rejected'
		}
	}
	return state;
}

export default userReducer;