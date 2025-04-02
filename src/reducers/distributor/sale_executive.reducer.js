
import {
    DISTRIBUTOR_LIST_SALE_EXECUTIVE,
    DISTRIBUTOR_ADD_SALE_EXECUTIVE,
    DISTRIBUTOR_GET_SALE_EXECUTIVE,
    DISTRIBUTOR_UPDATE_SALE_EXECUTIVE,
    DISTRIBUTOR_DELETE_SALE_EXECUTIVE,
    DISTRIBUTOR_RESET_SALE_EXECUTIVE
} from '../../actionTypes/distributor/sale_executive.types';
const initialState = {
    items: [],
    total: 0,
    item: null,
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
        case DISTRIBUTOR_LIST_SALE_EXECUTIVE:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_ADD_SALE_EXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_GET_SALE_EXECUTIVE:
            return {
                ...state,
                item: payload
            }
        case DISTRIBUTOR_UPDATE_SALE_EXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case DISTRIBUTOR_DELETE_SALE_EXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case DISTRIBUTOR_RESET_SALE_EXECUTIVE:
            return {
                ...state,
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