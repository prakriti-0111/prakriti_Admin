import {
    SE_UPDATE_PROFILE,
    SE_PROFILE_RESET,
    SE_UPDATE_PASSWORD,
    SE_DASHBOARD
} from '../../actionTypes/se/profile.types';

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
        case SE_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SE_UPDATE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SE_PROFILE_RESET:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SE_DASHBOARD:
            return {
                ...state,
                dashboard: payload
            }
        default:
            return state;
    }
}