import {
    SE_LIST_ORDERS,
    SE_GET_ORDERS,
    SE_RESET_ORDERS,
} from '../../actionTypes/se/orders.types';

const initialState = {
    items: [],
    total: 0,
    order: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SE_LIST_ORDERS:
            return {
                ...state,
                ...payload
            }
        case SE_GET_ORDERS:
            return {
                ...state,
                order: payload
            }
        default:
            return state;
    }
}