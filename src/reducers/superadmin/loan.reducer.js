import {
    LIST_LOAN,
    ADD_LOAN,
    GET_LOAN,
    DELETE_LOAN,
    LOAN_MAKE_PAYMENT,
    RESET_LOAN
} from '../../actionTypes/superadmin/loan.types';

const initialState = {
    items: [],
    total: 0,
    loan: null,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    paymentSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;  
    switch (type) {
        case LIST_LOAN:
            return {
                ...state,
                ...payload
            }
        case ADD_LOAN:
            let newState = {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
            return newState;
        case DELETE_LOAN:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_LOAN: 
            return {
                ...state,
                loan: payload
            }
        case LOAN_MAKE_PAYMENT: 
            return {
                ...state,
                actionCalled: true,
                paymentSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_LOAN:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                paymentSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}