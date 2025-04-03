
import {
    ADMIN_LIST_DISTRIBUTOR,
    ADMIN_ADD_DISTRIBUTOR,
    ADMIN_GET_DISTRIBUTOR,
    ADMIN_UPDATE_DISTRIBUTOR,
    ADMIN_DELETE_DISTRIBUTOR,
    ADMIN_RESET_DISTRIBUTOR
} from '../../actionTypes/admin/distributor.types';
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
        case ADMIN_LIST_DISTRIBUTOR:
            return {
                ...state,
                ...payload
            }
        case ADMIN_ADD_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_GET_DISTRIBUTOR:
            return {
                ...state,
                item: payload
            }
        case ADMIN_UPDATE_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case ADMIN_DELETE_DISTRIBUTOR:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case ADMIN_RESET_DISTRIBUTOR:
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