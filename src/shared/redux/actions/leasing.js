import {LeasingClass} from "Classes/Leasing";

export const getLeasingHistory = (payload) => {
    return {
        type: 'GET_LEASING',
        payload: new LeasingClass().getLeaseHistory(payload)
    }
}

export const cancelLeasing = (payload) => {
    return {
        type: 'CANCEL_LEASING',
        payload: new LeasingClass().cancelLease(payload)
    }
}