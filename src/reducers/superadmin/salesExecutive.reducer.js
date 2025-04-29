import {
    SUPERADMIN_LIST_SALESEXECUTIVE,
    SUPERADMIN_ADD_SALESEXECUTIVE,
    SUPERADMIN_GET_SALESEXECUTIVE,
    SUPERADMIN_UPDATE_SALESEXECUTIVE,
    SUPERADMIN_DELETE_SALESEXECUTIVE,
    SUPERADMIN_RESET_SALESEXECUTIVE
} from '../../actionTypes/superadmin/salesExecutive.types';
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
        case SUPERADMIN_LIST_SALESEXECUTIVE:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_SALESEXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_SALESEXECUTIVE:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_SALESEXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_SALESEXECUTIVE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_SALESEXECUTIVE:
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