import {
    DISTRIBUTOR_LIST_MYORDERS,
    DISTRIBUTOR_ADD_MYORDERS,
    DISTRIBUTOR_CANCEL_MYORDER,
    DISTRIBUTOR_GET_MYORDERS,
    DISTRIBUTOR_RESET_MYORDERS,
} from '../../actionTypes/distributor/myorders.types';

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
        case DISTRIBUTOR_LIST_MYORDERS:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_ADD_MYORDERS:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_CANCEL_MYORDER:
            return {
                ...state,
                actionCalled: true,
                cancelSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_GET_MYORDERS:
            return {
                ...state,
                order: payload
            }
        case DISTRIBUTOR_RESET_MYORDERS:
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