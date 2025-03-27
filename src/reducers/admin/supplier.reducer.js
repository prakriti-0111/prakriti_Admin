
import {
    ADMIN_LIST_SUPPLIER,
    ADMIN_ADD_SUPPLIER,
    ADMIN_GET_SUPPLIER,
    ADMIN_UPDATE_SUPPLIER,
    ADMIN_DELETE_SUPPLIER,
    ADMIN_RESET_SUPPLIER
} from '../../actionTypes/admin/supplier.types';
const initialState = {
    items: [],
    total: 0,
    item: null,
    total_purchase: 0,
    total_purchase_due: 0,
    total_purchase_paid: 0,
    total_purchase_return: 0,
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
        case ADMIN_LIST_SUPPLIER:
            return {
                ...state,
                ...payload
            }
        case ADMIN_ADD_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_GET_SUPPLIER:
            return {
                ...state,
                item: payload
            }
        case ADMIN_UPDATE_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case ADMIN_DELETE_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case ADMIN_RESET_SUPPLIER:
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