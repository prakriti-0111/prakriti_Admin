import {
    LIST_COMPANY_DETAILS,
    UPDATE_COMPANY_DETAILS,
    RESET_COMPANY_DETAILS,
} from '../../actionTypes/superadmin/companyDetails.types';

const initialState = {
    data: null,
    actionCalled: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_COMPANY_DETAILS:
            return { ...state, data: payload };
        case UPDATE_COMPANY_DETAILS:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            };
        case RESET_COMPANY_DETAILS:
            return {
                ...state,
                actionCalled: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null,
            };
        default:
            return state;
    }
}
