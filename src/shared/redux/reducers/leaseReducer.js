//import {decrypt} from '../../utils/crypt';
import Leasing from "Classes/Leasing";

let initialState = {
    listLeasing: []
}

const leaseReducer = (state=initialState, action) => {
    switch(action.type){
        case 'GET_LEASING_FULFILLED':
            return {
                ...state,
                listLeasing: action.payload
            }
        case 'CANCEL_LEASING_FULFILLED': //_FULFILLED
        // pegar o retorno do cancelamento e tratar
            return {
                ...state
            }
    }
    return state;
}

export default leaseReducer