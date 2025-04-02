import {
    DISTRIBUTOR_LIST_PAYMENT,
    DISTRIBUTOR_ADD_PAYMENT,
    DISTRIBUTOR_RESET_PAYMENT
} from '../../actionTypes/distributor/payment.types';
const initialState = {
    items: [],
    total: 0,
    due_amount: 0,
    actionCalled: false,
    createSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISTRIBUTOR_LIST_PAYMENT:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_ADD_PAYMENT:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_RESET_PAYMENT:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}