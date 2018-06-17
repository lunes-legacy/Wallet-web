import CookieClass from 'Classes/Cookie';
import { users } from 'lunes-lib';
import { LUNES_LIB_ENV, LUNES_LIB_LOGIN } from 'Config/constants';

export default class UserClass {
	login = async ({ email, password }) => {
		let user;
		if (LUNES_LIB_LOGIN !== 'auto') {
			user = await users.login({email, password});
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
