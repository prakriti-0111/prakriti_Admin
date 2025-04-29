import {
    DISTRIBUTOR_LIST_ORDERS,
    DISTRIBUTOR_GET_ORDERS,
    DISTRIBUTOR_RESET_ORDERS,
} from '../../actionTypes/distributor/orders.types';

const initialState = {
    items: [],
    total: 0,
    order: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISTRIBUTOR_LIST_ORDERS:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_GET_ORDERS:
            return {
                ...state,
                order: payload
            }
        default:
            return state;
    }
}