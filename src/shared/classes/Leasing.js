//import { errorPattern } from 'Utils/functions';
import { encrypt, decrypt } from '../utils/crypt';
import { coins } from 'lunes-lib';
import { TESTNET } from 'Config/constants'; //usar testnet, porem tem que ver se esta correto esta variavel

export default class Leasing {
    
    getLeaseHistory = async(data) => {
        let wallet_info = JSON.parse(decrypt(data));

        let consultLeasing = await coins.services.leaseHistory({ 
            address: wallet_info.addresses.LNS, 
            network: 'LNS', 
            testnet: true 
        }).then((e)=>{
            //console.log(e);
            return e
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
            testnet: true //TESTNET 
        }; 

        const cancelLeaseResult = await coins.services.leaseCancel(cancelLeasingData).then((e)=>{
            return e
        }).catch((e)=>{
            console.log(e);
            return false
        });

        return cancelLeaseResult;
    }
}