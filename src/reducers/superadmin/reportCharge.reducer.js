import {
    GET_REPORT_CHARGE,
    UPDATE_REPORT_CHARGE
} from '../../actionTypes/superadmin/reportCharge.types';

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_REPORT_CHARGE:
            return {
                ...state,
                ...payload
            }
        case UPDATE_REPORT_CHARGE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        default:
            return state;
    }
}