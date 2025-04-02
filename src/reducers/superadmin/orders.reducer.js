import {
    SUPERADMIN_LIST_ORDERS,
    SUPERADMIN_CANCEL_ORDER,
    SUPERADMIN_GET_ORDERS,
    SUPERADMIN_RESET_ORDERS,
} from '../../actionTypes/superadmin/orders.types';

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
        case SUPERADMIN_LIST_ORDERS:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_CANCEL_ORDER:
            return {
                ...state,
                actionCalled: true,
                cancelSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_ORDERS:
            return {
                ...state,
                order: payload
            }
        case SUPERADMIN_RESET_ORDERS:
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