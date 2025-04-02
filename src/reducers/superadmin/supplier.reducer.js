
import {
    SUPERADMIN_LIST_SUPPLIER,
    SUPERADMIN_ADD_SUPPLIER,
    SUPERADMIN_GET_SUPPLIER,
    SUPERADMIN_UPDATE_SUPPLIER,
    SUPERADMIN_DELETE_SUPPLIER,
    SUPERADMIN_RESET_SUPPLIER
} from '../../actionTypes/superadmin/supplier.types';
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
        case SUPERADMIN_LIST_SUPPLIER:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_SUPPLIER:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_SUPPLIER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_SUPPLIER:
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