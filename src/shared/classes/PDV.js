import axios from 'axios';
import { errorPattern } from 'Utils/functions';

const Axios = axios.create({
  baseURL: 'http://apiw.lunes.io/pdv/',
  headers: { 'Content-Type': 'application-json' }
});
const Fake = {
  redeem: (type) => {
    if (type === 'error') {
      return {
        "message": "Error",
        "code": 500,
        "type": "error",
        "data": {}
      }
    } else if (type === 'success') {
      return {
        "message": "Success",
        "code": 200,
        "type": "info",
        "data": {}
      }
    } else {
      throw errorPattern('Fake error');
    }
  }
}
class PDVClass {
  consult = () => {

  }
  sell = () => {

  }
  redeem = async (code, destin) => {
    if (!code)
      throw errorPattern(`PDV redeem failed, code is not defined, got ${code}`,500,'PDV_REDEEM_ERROR');
    if (!destin)
      throw errorPattern(`PDV redeem failed, destin is not defined, got ${code}`,500,'PDV_REDEEM_ERROR');
    let params = {
      code,
      destin
    }
    // let result = await Axios.post('redeem', params).then(r => r.data);
    let result = Fake.redeem('success');
    if (result.code !== 200)
      throw errorPattern(`Error on redeem's request, got response status different of 200`, result.code, 'PDV_REDEEM_ERROR', result);
    return result;
  }
}

export default PDVClass;
