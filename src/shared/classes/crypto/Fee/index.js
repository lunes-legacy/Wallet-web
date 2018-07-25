// import { estimateBTC, estimateETH } from './families';
import { coins } from 'lunes-lib';
import { errorPattern } from 'Utils/functions';
import { TESTNET, LUNES_TRANSACTION_FEE } from 'Config/constants';
import { decrypt } from 'Utils/crypt';
import { MoneyClass } from 'Classes/Money';

export default class FeeClass {
	static staticNetworkFees;

	constructor(){
		this.families = {
			BTC: 'BTCFamily',
			ETH: 'ETHFamily'
		}
	}

	getStaticNetworkFees = () => {
		return this.staticNetworkFees;
	}

	setStaticNetworkFees = (value) => {
		this.staticNetworkFees = value;
	}

	/*
	return  {
		network: 'LNS',
		data: {
			high: 30,
			medium: 20,
			low: 10
		}
	}
	*/
	getNetworkFees = async ({network, testnet = TESTNET}) => {
		try {
			if (!network)
				throw errorPattern("Network parameter is pending",500,"FEE_NETWORKFEES_ERROR");
			if (this.getStaticNetworkFees() !== undefined) {
				return this.getStaticNetworkFees();
			}

			return coins.services.networkFees({ network, testnet: TESTNET });
		} catch (err) {
			throw errorPattern(`An error ocurred on trying to get ${network}'s network fees`, 500, "FEE_NETWORKFEES_ERROR", err);
		}
	}

	estimate = async (data) => {
        try {
            // Verifica se foi passada rede
            if (!data.network) {
            throw errorPattern('No network name was found', 500, 'FEE_ESTIMATE_ERROR');
        }

        // Se não for passado o parâmetro testnet: true || false, seta o valor padrão da constant TESTNET
        if (!data.testnet) {
            data.testnet = TESTNET;
        }

        // Instancia a classe Money para converter os valores quando necessário
        const money = new MoneyClass;

		//THIS ENTIRE CONDITIONAL WILL BE REMOVED
		if (data.network.search(/ltc/i) !== -1) {
			if (!data.networkFees) {
				data.networkFees = await this.getNetworkFees({...data});

				if (!data.networkFees) {
					throw errorPattern(`We've tried to get ${data.network}'s network fees, but it have resulted in error`, 500, 'FEE_ESTIMATE_ERROR');
				}
			}

			if (window || document) {
				data.accessToken = JSON.parse(decrypt(localStorage.getItem('ACCESS-TOKEN'))).accessToken;
			} else {
				throw errorPattern("We can't estimate the fee, without the user's access token", 500,'FEE_ESTIMATE_ERROR');
			}

			data.feePerByte = data.networkFees.data.medium;

			data.amount = money.conevertCoin('satoshi', data.amount).toString();

			let tmp = await coins.services.estimateFee({...data}, data.accessToken);

			return {
				low: {data:{fee:0}},
				medium: tmp,
				high: {data:{fee:0}}
			};
		}
		//_________________________________________


		if (data.network.search(/(lns)|(lunes)/i) !== -1) {
			return {
				low: {
					network: data.network,
					data: {
						fee: LUNES_TRANSACTION_FEE * 100000000
					}
				},
				medium: {
					network: data.network,
					data: {
						fee: LUNES_TRANSACTION_FEE * 100000000
					}
				},
				high: {
					network: data.network,
					data: {
						fee: LUNES_TRANSACTION_FEE * 100000000
					}
				}
			}
		}

		if (!data.networkFees) {
			data.networkFees = await this.getNetworkFees({...data});

			if (!data.networkFees) {
				throw errorPattern(`We've tried to get ${data.network}'s network fees, but it have resulted in error`, 500, 'FEE_ESTIMATE_ERROR');
			}

			data.networkFees = data.networkFees.data;
		} else {
			data.networkFees = data.networkFees.data;
		}

		if (!data.toAddress || !data.fromAddress) {
			throw errorPattern('You should pass through a valid address', 500, 'FEE_ESTIMATE_ERROR')
		}

		if (!data.accessToken) {
			if (window || document) {
				data.accessToken = JSON.parse(decrypt(localStorage.getItem('ACCESS-TOKEN'))).accessToken;
			} else {
				throw errorPattern('We can\'t estimate the fee, without the user\'s access token', 500,'FEE_ESTIMATE_ERROR');
			}
		}

		let params = {
			low:    {},
			medium: {},
			high:   {},
		};

		let result = {
			low:    {},
			medium: {},
			high:   {}
		}

		let { networkFees } = data;
		delete data.networkFees;

        // Se for ETH converte para Wei (menor unidade do ETH), senão, converte para Satoshi (menor unidade do BTC)
        data.amount = data.network.toUpperCase() === "ETH" ?
        money.conevertCoin('wei', data.amount).toString() :
        money.conevertCoin('satoshi', data.amount).toString();

        const feeLevels = [];

        for (let level in params) {
            if (data.network.search(/(eth)/i) !== -1) {
              params[level] = {
                ...data,
                gasLimit: '37393',
                gasPrice: networkFees[level]
              }
            } else {
              params[level] = {
                ...data,
                feePerByte: networkFees[level]
              }
            }

            // Ạdiciona no array os dados para consultar cada nível de taxa
            feeLevels.push(params[level]);
        }

        // Chama o método responsável por acessar a lunes-lib e consultar as taxas
        const fees = await this.getEstimateFees(feeLevels, data.accessToken);

        return {
            low: {
              ...fees[0] || undefined
            },
            medium: {
              ...fees[1] || undefined
            },
            high: {
              ...fees[2] || undefined
            },
        };
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  // Método para consultar as taxas na lunes-lib de forma assíncrona
  getEstimateFees = async (feeLevels, accessToken) => {
    const promises = feeLevels.map(feeLevel => coins.services.estimateFee({...feeLevel}, accessToken));

    // Executa todas as promises e aguarda elas serem resolvidas para retornar o resultado
    return await Promise.all(promises);
  }
}
