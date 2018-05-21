export default (coin) => {
	let coins = ['btc', 'eth'];

	if (coins.indexOf(coin) !== -1)
		return true;
	else
		return false;
}