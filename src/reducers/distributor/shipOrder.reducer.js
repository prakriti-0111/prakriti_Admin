import {
    LIST_SHIP_ORDER,
    GET_SHIP_ORDER
} from '../../actionTypes/distributor/shipOrder.types';

const initialState = {
    items: [],
    total: 0,
    order: null,

};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_SHIP_ORDER:
            return {
                ...state,
                ...payload
            }
        case GET_SHIP_ORDER:
            console.log({
                ...state,
                order: payload
            })
            return {
                ...state,
                order: payload
            }
        default:
            return state;
    }
}