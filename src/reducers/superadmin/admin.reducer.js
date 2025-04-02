import {
    SUPERADMIN_LIST_ADMIN,
    SUPERADMIN_ADD_ADMIN,
    SUPERADMIN_GET_ADMIN,
    SUPERADMIN_UPDATE_ADMIN,
    SUPERADMIN_DELETE_ADMIN,
    SUPERADMIN_RESET_ADMIN
} from '../../actionTypes/superadmin/admin.types';

const initialState = {
    items: [],
    total: 0,
    total_sale: 0,
    total_sale_due: 0,
    total_sale_paid: 0,
    total_sale_return: 0,
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
        case SUPERADMIN_LIST_ADMIN:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_ADMIN:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_ADMIN:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_ADMIN:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_ADMIN:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_ADMIN:
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