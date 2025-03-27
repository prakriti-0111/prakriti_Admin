import {
    DISTRIBUTOR_UPDATE_PROFILE,
    DISTRIBUTOR_PROFILE_RESET,
    DISTRIBUTOR_UPDATE_PASSWORD,
    DISTRIBUTOR_DASHBOARD
} from '../../actionTypes/distributor/profile.types';

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
        case DISTRIBUTOR_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_UPDATE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_PROFILE_RESET:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case DISTRIBUTOR_DASHBOARD:
            return {
                ...state,
                dashboard: payload
            }
        default:
            return state;
    }
}