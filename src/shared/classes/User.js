import CookieClass from 'Classes/Cookie';
import { users } from 'lunes-lib';

export default class UserClass {
	login = async ({ email, password }) => {
		let user = await users.login({email:'wandyer1@lunes.io', password:'Lunes123#@!'});
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
