import {
    DISTRIBUTOR_LIST_PRODUCT,
    DISTRIBUTOR_GET_PRODUCT,
    DISTRIBUTOR_RESET_PRODUCT_LIST
} from '../../actionTypes/distributor/product.types';

const initialState = {
    items: [],
    total: 0,
    product: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISTRIBUTOR_LIST_PRODUCT:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_GET_PRODUCT:
            return {
                ...state,
                product: payload
            }
        case DISTRIBUTOR_RESET_PRODUCT_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}