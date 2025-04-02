
import {
    SUPERADMIN_LIST_DISTRIBUTOR,
    SUPERADMIN_ADD_DISTRIBUTOR,
    SUPERADMIN_GET_DISTRIBUTOR,
    SUPERADMIN_UPDATE_DISTRIBUTOR,
    SUPERADMIN_DELETE_DISTRIBUTOR,
    SUPERADMIN_RESET_DISTRIBUTOR
} from '../../actionTypes/superadmin/distributor.types';
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
        case SUPERADMIN_LIST_DISTRIBUTOR:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_DISTRIBUTOR:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_DISTRIBUTOR:
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