import {
    SUPERADMIN_LIST_RETURN_ORDERS,
    SUPERADMIN_GET_RETURN_ORDERS,
    SUPERADMIN_RESET_RETURN_ORDERS,
} from '../../actionTypes/superadmin/returnOrders.types';

const initialState = {
    items: [],
    total: 0,
    returnOrder: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUPERADMIN_LIST_RETURN_ORDERS:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_GET_RETURN_ORDERS:
            return {
                ...state,
                returnOrder: payload
            }
        default:
            return state;
    }
}