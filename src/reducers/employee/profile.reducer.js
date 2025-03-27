import {
    EMPLOYEE_UPDATE_PROFILE,
    EMPLOYEE_PROFILE_RESET,
    EMPLOYEE_UPDATE_PASSWORD,
    EMPLOYEE_DASHBOARD
} from '../../actionTypes/employee/profile.types';

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
        case EMPLOYEE_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case EMPLOYEE_UPDATE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case EMPLOYEE_PROFILE_RESET:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case EMPLOYEE_DASHBOARD:
            return {
                ...state,
                dashboard: payload
            }
        default:
            return state;
    }
}