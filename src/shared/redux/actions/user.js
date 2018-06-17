import { users } from 'lunes-lib';
import UserClass from "Classes/User";

export const userReset = email => {
  return {
    type: "USER_RESET",
    payload: users.resetPassword({
      email
    })
  }
}

export const userLogin = (data) => {
	let email    = data.email;
	let password = data.password;
	return {
		type: "USER_LOGIN",
		payload: new UserClass().login({ email, password })
	}
}

export const userCreate = (data) => {
	return {
		type: 'USER_CREATE',
		payload: users.create({
		  email: data.email,
		  password: data.password,
		  fullname: data.fullname
		})
	}
}

export const userClear = email => {
  return {
    type: "USER_CLEAR",
    payload: {}
  }
}
