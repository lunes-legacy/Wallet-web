import { errorPattern } from 'Utils/functions';
import { encrypt, decrypt } from '../utils/crypt';
import { coins } from 'lunes-lib';
import { MoneyClass } from 'Classes/Money';
import { WalletClass } from 'Classes/Wallet';
import { TESTNET } from 'Config/constants';

export class LeasingClass {
    constructor(){
        //this.leasehistory = [];
    }

    getLeasingValues = async () => {
      try {
        let walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));

        const lunesValue = await coins.services.balance(
          'LNS',
          walletInfo.addresses.lns, // Para testar deve-se substituir por um endereço válido
          TESTNET
        );

        const leaseValue = await coins.services.leaseBalance({
          address: walletInfo.addresses.lns,
          testnet: TESTNET
        });

        //const availableBalance = lunesValue.data.confirmed - leaseValue.data.leaseBalance;

        const money = new MoneyClass;
        
        const totalBalance = lunesValue.data.confirmed + leaseValue.data.leaseBalance;

        return {
          totalBalance: await money.convertToBtc(totalBalance),
           
          leaseBalance: await money.convertToBtc(leaseValue.data.leaseBalance),
          availableBalance: await money.convertToBtc(lunesValue.data.confirmed)
        };
      } catch (err) {
        return errorPattern(`Error on trying to get lease balance`, 500, "GETLEASEBALANCE_ERROR", err);
      }
    }

    getLeaseHistory = async (data) => {
        let wallet_info = JSON.parse(decrypt(data));

        let consultLeasing = await coins.services.leaseHistory({
            address: wallet_info.addresses.lns,
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

    /**
     * @return the transaction id
          network:
          data: {
            txID:
          }
    */
    startLease = async (data) => {
      try {
        const money = new MoneyClass();

        const walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));

        const { toAddress, amount, fee, testnet } = data;

        const leaseData = {
          toAddress,
          fee,
          testnet,
          amount: await money.convertToSatoshi(amount),
          mnemonic: walletInfo.seed
        }

        let lease = await coins.services.lease(leaseData);

        return lease;
      } catch (err) {
        return errorPattern(`Error on trying to start lease`, 500, "STARTLEASE_ERROR", err);
      }
    }

    cancelLease = async (data) => {
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
