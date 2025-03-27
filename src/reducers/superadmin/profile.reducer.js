import {
    SUPERADMIN_UPDATE_PROFILE,
    SUPERADMIN_PROFILE_RESET,
    SUPERADMIN_UPDATE_PASSWORD,
    SUPERADMIN_DASHBOARD
} from '../../actionTypes/superadmin/profile.types';

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
        case SUPERADMIN_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_UPDATE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_PROFILE_RESET:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SUPERADMIN_DASHBOARD:
            return {
                ...state,
                dashboard: payload
            }
        default:
            return state;
    }
}