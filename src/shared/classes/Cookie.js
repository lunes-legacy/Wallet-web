export default class CookieClass {
	static cookies;
	get = (name) => {
		if (this.cookies)
			return this.cookies;

		if (!window)
			return null;

		let cookies    = document.cookie;
		if (!cookies)
			return null;

		let rawCookies   = cookies.split('/');
		let readyCookies = {};
		rawCookies.map((nameValue) => {
			let arrCookie = nameValue.split('=');
			readyCookies[arrCookie[0]] = arrCookie[1];
		});
		this.cookies = readyCookies;
		return this.cookies;
	}
	set = ({ name, value, expires }) => {
		if (!window) { return null }
		document.cookie = `${name}=${value}; expires=${expires}`;
	}
}
