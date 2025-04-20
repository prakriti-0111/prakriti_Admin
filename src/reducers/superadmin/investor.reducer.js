
import {
    SUPERADMIN_LIST_INVESTOR,
    SUPERADMIN_ADD_INVESTOR,
    SUPERADMIN_GET_INVESTOR,
    SUPERADMIN_UPDATE_INVESTOR,
    SUPERADMIN_DELETE_INVESTOR,
    SUPERADMIN_RESET_INVESTOR
} from '../../actionTypes/superadmin/investor.types';
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
        case SUPERADMIN_LIST_INVESTOR:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_INVESTOR:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_INVESTOR:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_INVESTOR:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_INVESTOR:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_INVESTOR:
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