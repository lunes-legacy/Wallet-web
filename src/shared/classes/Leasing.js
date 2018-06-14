import { errorPattern } from 'Utils/functions';
import { coins } from 'lunes-lib';

export default class Leasing {
    constructor(){
        //this.leasehistory = [];
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