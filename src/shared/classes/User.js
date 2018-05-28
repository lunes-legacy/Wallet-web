import CookieClass from 'Classes/Cookie';
import { users } from 'lunes-lib';
import { LUNES_LIB_ENV, LUNES_LIB_LOGIN } from 'Config/constants';

let defaultEmail    = 'wandyer1@lunes.io';
let defaultPassword = 'Lunes123#@!';
if (LUNES_LIB_ENV === 'production') {
	defaultEmail    = 'marcelosmtp@gmail.com';
	defaultPassword = '123123123';
} else if (LUNES_LIB_ENV === 'staging') {
	defaultEmail    = 'wandyer1@lunes.io';
	defaultPassword = 'Lunes123#@!';
}

export default class UserClass {
	login = async ({ email, password }) => {
		let user;
		if (LUNES_LIB_LOGIN !== 'auto') {
			user = await users.login({email, password});
		} else {
			user = await users.login({email:defaultEmail, password:defaultPassword});
		}
		if (window && document) {
			let cookie = new CookieClass;
			cookie.set({
				name: 'user',
				value: JSON.stringify(user),
				expires: new Date().setHours(new Date().getHours + 1)
			});
		}
		return user;
	}
}
