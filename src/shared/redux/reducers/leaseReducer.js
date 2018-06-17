//import {decrypt} from '../../utils/crypt';
import {LeasingClass} from "Classes/Leasing";

let initialState = {
    listLeasing: [],
    lastLeasing: {
      amount: 0
    }
}

const leaseReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_LEASING_FULFILLED':
          return {
            ...state,
            lastLeasing: action.payload
          }
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
