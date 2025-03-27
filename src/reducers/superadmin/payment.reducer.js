import {
    SUPERADMIN_LIST_PAYMENT,
    SUPERADMIN_ADD_PAYMENT,
    SUPERADMIN_RESET_PAYMENT,
    SUPERADMIN_DUE_PAYMENT,
    SUPERADMIN_RESET_ALL_PAYMENT,
    SUPERADMIN_LIST_WALLET
} from '../../actionTypes/superadmin/payment.types';
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
        case SUPERADMIN_LIST_PAYMENT:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_PAYMENT:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_DUE_PAYMENT:
            return {
                ...state,
                due_amount: parseFloat(payload.due_amount),
                due_amount_display: payload.due_amount_display
            }
        case SUPERADMIN_RESET_PAYMENT:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SUPERADMIN_RESET_ALL_PAYMENT:
            return {
                ...state,
                due_amount: 0,
                due_amount_display: '',
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SUPERADMIN_LIST_WALLET:
            return {
                ...state,
                ...payload
            }    
        default:
            return state;
    }
}