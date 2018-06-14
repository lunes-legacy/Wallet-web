import { errorPattern } from 'Utils/functions';
import { coins } from 'lunes-lib';
import { decrypt } from 'Utils/crypt';
import { MoneyClass } from './Money';
import { TESTNET } from 'Config/constants';

export class LeasingClass {
    constructor(){
        //this.leasehistory = [];
    }

    getLeasingValues = async () => {
      try {
        let walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));

        const lunesValue = await coins.services.balance({
          network: 'LNS',
          address: walletInfo.addresses.LNS, // Para testar deve-se substituir por um endereço válido
          testnet: TESTNET
        });

        const leaseValue = await coins.services.leaseBalance({
          address: walletInfo.addresses.LNS,
          testnet: TESTNET
        });

        const availableBalance = lunesValue.data.confirmed - leaseValue.data.leaseBalance;

        const money = new MoneyClass;

        return {
          totalBalance: await money.convertToBtc(lunesValue.data.confirmed),
          leaseBalance: await money.convertToBtc(leaseValue.data.leaseBalance),
          availableBalance: await money.convertToBtc(availableBalance)
        };
      } catch (err) {
        return errorPattern(`Error on trying to get price`, 500, "COINGETPRICE_ERROR", err);
      }
    }

    //getLeaseHistory = async({address, network, testnet = true}) => {
    getLeaseHistory = async() => { // parametros fixo para teste
        let consultLeasing = await coins.services.leaseHistory({
            address: '37aF3eL4tsZ6YpqViXpYAmRQAi7ehtDdBmG',
            network: 'LNS',
            testnet: true
        }); 

        //console.log(JSON.stringify(this.leasehistory));

        return consultLeasing;
        // try {
        //     this.leasehistory = await coins.services.leaseHistory({
        //         address: '37aF3eL4tsZ6YpqViXpYAmRQAi7ehtDdBmG',
        //         network: 'LNS',
        //         testnet: true
        //     }); 

        //     return this.leasehistory
        //     // .then((e) => {
        //     //     console.log(e);
        //     //     done();
        //     // }).catch((e) => {
        //     //     done(e);
        //     // });
        // }catch(e){
        //     return errorPattern(`An error ocurred on trying to get LNS`,500,'LEASEHISTORY_ERROR',e)
        // }
    }

    // acao de cancelar o leasing
    cancelLease = async() => {

    }
}
