import { users } from 'lunes-lib';

export const userReset = email => {
  return {
    type: "USER_RESET",
    payload: users.resetPassword({
      email
    })
  }
}

export const userLogin = (data) => {
	return {
		
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
