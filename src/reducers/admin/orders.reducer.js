import {
    ADMIN_LIST_ORDERS,
    ADMIN_ADD_ORDERS,
    ADMIN_CANCEL_ORDER,
    ADMIN_GET_ORDERS,
    ADMIN_RESET_ORDERS,
} from '../../actionTypes/admin/orders.types';

const initialState = {
    items: [],
    total: 0,
    order: null,
    actionCalled: false,
    createSuccess: false,
    cancelSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_LIST_ORDERS:
            return {
                ...state,
                ...payload
            }
        case ADMIN_ADD_ORDERS:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_CANCEL_ORDER:
            return {
                ...state,
                actionCalled: true,
                cancelSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_GET_ORDERS:
            return {
                ...state,
                order: payload
            }
        case ADMIN_RESET_ORDERS:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                cancelSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}