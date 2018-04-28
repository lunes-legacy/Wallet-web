import { users } from 'lunes-lib';
import CookieClass from 'Classes/Cookie';

export default class UserClass {
	login = async ({ email, password }) => {
		let user = await users.login({
			email: 'marcelosmtp@gmail.com',
			password: '123123123'
		});
		if (window && document) {
			let cookie = new CookieClass;
			cookie.setCookie({
				name: 'user',
				value: JSON.stringify(user),
				expires: new Date().setHours(new Date().getHours + 1)
			});
		}
		return user;
	}
}