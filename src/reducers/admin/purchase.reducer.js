import {
    ADMIN_LIST_PURCHASE,
    ADMIN_CREATE_PURCHASE,
    ADMIN_ADD_PURCHASE,
    ADMIN_GET_PURCHASE,
    ADMIN_UPDATE_PURCHASE,
    ADMIN_DELETE_PURCHASE,
    ADMIN_RESET_PURCHASE,
    ADMIN_LIST_PURCHASE_ON_APPROVE,
    ADMIN_GET_PURCHASE_ON_APPROVE,
    ADMIN_UPDATE_PURCHASE_STATUS,
} from '../../actionTypes/admin/purchase.types';

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
        case ADMIN_LIST_PURCHASE:
            return {
                ...state,
                ...payload
            }
        case ADMIN_LIST_PURCHASE_ON_APPROVE:
            return {
                ...state,
                ...payload
            }    
        case ADMIN_ADD_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_GET_PURCHASE:
            return {
                ...state,
                purchase: payload
            }
        case ADMIN_GET_PURCHASE_ON_APPROVE:
            return {
                ...state,
                purchase: payload
            }    
        case ADMIN_UPDATE_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_DELETE_PURCHASE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_RESET_PURCHASE:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case ADMIN_UPDATE_PURCHASE_STATUS:
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