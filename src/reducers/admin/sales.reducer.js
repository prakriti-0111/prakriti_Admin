import {
    ADMIN_LIST_SALES,
    ADMIN_CREATE_SALES,
    ADMIN_ADD_SALES,
    ADMIN_GET_SALES,
    ADMIN_UPDATE_SALES,
    ADMIN_DELETE_SALES,
    ADMIN_RESET_SALES,
} from '../../actionTypes/admin/sales.types';

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
        case ADMIN_LIST_SALES:
            return {
                ...state,
                ...payload
            }
        case ADMIN_ADD_SALES:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_GET_SALES:
            return {
                ...state,
                sale: payload
            }
        case ADMIN_UPDATE_SALES:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_DELETE_SALES:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_RESET_SALES:
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