import {
    LIST_PURCHASE,
    CREATE_PURCHASE,
    ADD_PURCHASE,
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE,
    RESET_PURCHASE,
     LIST_PURCHASE_ON_APPROVE,
    GET_PURCHASE_ON_APPROVE,
    UPDATE_PURCHASE_STATUS,
} from '../../actionTypes/superadmin/purchase.types';

const initialState = {
    items: [],
    total: 0,
    purchase: null,
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
        case LIST_PURCHASE:
            return {
                ...state,
                ...payload
            }
        case LIST_PURCHASE_ON_APPROVE:
            return {
                ...state,
                ...payload
            }    
        case ADD_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_PURCHASE:
            return {
                ...state,
                purchase: payload
            }
        case GET_PURCHASE_ON_APPROVE:
            return {
                ...state,
                purchase: payload
            }    
        case UPDATE_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_PURCHASE:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case UPDATE_PURCHASE_STATUS:
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