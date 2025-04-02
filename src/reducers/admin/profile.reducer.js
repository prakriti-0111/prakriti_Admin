import {
    ADMIN_UPDATE_PROFILE,
    ADMIN_PROFILE_RESET,
    ADMIN_UPDATE_PASSWORD,
    ADMIN_DASHBOARD
} from '../../actionTypes/admin/profile.types';

const initialState = {
    actionCalled: false,
    editProfileSuccess: false,
    changePasswordSuccess: false,
    successMessage: null,
    errorMessage: null,
    dashboard: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_UPDATE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_PROFILE_RESET:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case ADMIN_DASHBOARD:
            return {
                ...state,
                dashboard: payload
            }
        default:
            return state;
    }
}