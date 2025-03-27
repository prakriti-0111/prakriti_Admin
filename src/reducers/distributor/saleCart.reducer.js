import {
    DISTRIBUTOR_SALE_CART_LIST,
    DISTRIBUTOR_SALE_CART_ADD,
    DISTRIBUTOR_SALE_CART_DELETE,
    DISTRIBUTOR_SALE_CART_RESET,
    DISTRIBUTOR_SALE_CART_RESET_LIST
} from '../../actionTypes/distributor/saleCart.types';

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISTRIBUTOR_SALE_CART_LIST:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_SALE_CART_ADD:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_SALE_CART_DELETE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_SALE_CART_RESET:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case DISTRIBUTOR_SALE_CART_RESET_LIST:
            return {
                ...state,
                items: [],
                total: 0,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}