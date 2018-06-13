import { coins } from "lunes-lib";

export const setBalance = () => {
	return {
		type: 'WALLET_SET_BALANCE',
		payload: coins.services.balance({ network: 'lns', address: '37jxbsXCjQJ1cvzG3DdMC5xMxT73ab6DLDM' })
	}
}
