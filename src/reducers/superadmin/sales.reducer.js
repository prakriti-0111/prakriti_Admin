import {
    LIST_SALES,
    CREATE_SALES,
    ADD_SALES,
    GET_SALES,
    UPDATE_SALES,
    DELETE_SALES,
    SUPERADMIN_RESET_SALES,
    LIST_SALES_ON_APPROVE,
    GET_SALES_ON_APPROVE,
    UPDATE_SALES_STATUS,
} from '../../actionTypes/superadmin/sales.types';

const initialState = {
    items: [],
    total: 0,
    sale: null,
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
        case LIST_SALES:
            return {
                ...state,
                ...payload
            }
        case ADD_SALES:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_SALES:
            return {
                ...state,
                sale: payload
            }
        case UPDATE_SALES:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_SALES:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_RESET_SALES:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case LIST_SALES_ON_APPROVE:
            return {
                ...state,
                ...payload
            }
        case GET_SALES_ON_APPROVE:
            return {
                ...state,
                sale: payload
            }
        case UPDATE_SALES_STATUS:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }        
        default:
            return state;
    }
}