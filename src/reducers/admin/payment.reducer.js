import {
    ADMIN_LIST_PAYMENT,
    ADMIN_ADD_PAYMENT,
    ADMIN_RESET_PAYMENT,
    ADMIN_DUE_PAYMENT,
    ADMIN_RESET_ALL_PAYMENT,
    ADMIN_LIST_WALLET
} from '../../actionTypes/admin/payment.types';
const initialState = {
    items: [],
    total: 0,
    due_amount: 0,
    due_amount_display: '',
    actionCalled: false,
    createSuccess: false,
    successMessage: null,
    errorMessage: null,
    balance_by_mode: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_LIST_PAYMENT:
            return {
                ...state,
                ...payload
            }
        case ADMIN_ADD_PAYMENT:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_DUE_PAYMENT:
            return {
                ...state,
                due_amount: parseFloat(payload.due_amount),
                due_amount_display: payload.due_amount_display
            }
        case ADMIN_RESET_PAYMENT:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case ADMIN_RESET_ALL_PAYMENT:
            return {
                ...state,
                due_amount: 0,
                due_amount_display: '',
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case ADMIN_LIST_WALLET:
            return {
                ...state,
                ...payload
            }    
        default:
            return state;
    }
}