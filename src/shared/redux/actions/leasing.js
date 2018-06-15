import Leasing from "Classes/Leasing";

export const getLeasingHistory = (payload) => {
    return {
        type: 'GET_LEASING',
        payload: new Leasing().getLeaseHistory(payload)
    }
}

export const cancelLeasing = (payload) => {
    return {
        type: 'CANCEL_LEASING',
        payload: new Leasing().cancelLease(payload)
    }
}