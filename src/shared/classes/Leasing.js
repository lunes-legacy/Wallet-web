import { errorPattern } from 'Utils/functions';
import { encrypt, decrypt } from '../utils/crypt';
import { coins } from 'lunes-lib';
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
    
    getLeaseHistory = async(data) => {
        let wallet_info = JSON.parse(decrypt(data));
        
        let consultLeasing = await coins.services.leaseHistory({ 
            address: wallet_info.addresses.LNS, 
            network: 'LNS', 
            testnet: TESTNET 
        }).then((e)=>{
            //console.log(e);
            if(e.length>0){
                return e
            }else{
                return false
            }
        }).catch((e)=>{
            //console.log(e);
            return false
        }); 
        return consultLeasing;
    }

    cancelLease = async(data) => {
        let wallet_info = JSON.parse(decrypt(data.wallet_info));
        
        const cancelLeasingData = { 
            mnemonic: wallet_info.seed, 
            txID: data.key, 
            fee: "100000", 
            testnet: TESTNET //TESTNET 
        }; 

        const cancelLeaseResult = await coins.services.leaseCancel(cancelLeasingData).then((e)=>{
            return e
        }).catch((e)=>{
            //console.log(e);
            return false
        });

        return cancelLeaseResult;
    }
}
