import {
    SUPERADMIN_LIST_EXPENSE,
    SUPERADMIN_ADD_EXPENSE,
    SUPERADMIN_GET_EXPENSE,
    SUPERADMIN_UPDATE_EXPENSE,
    //SUPERADMIN_DELETE_EXPENSE,
    SUPERADMIN_RESET_EXPENSE,
    SUPERADMIN_LIST_ATTENDANCE
} from '../../actionTypes/superadmin/expense.types';
const initialState = {
    reasons: [],
    items: [],
    total: 0,
    wallet_balance: 0,
    have_action: true,
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
        case SUPERADMIN_LIST_EXPENSE:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_EXPENSE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_EXPENSE:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_EXPENSE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         /*case SUPERADMIN_DELETE_EXPENSE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }*/
        case SUPERADMIN_RESET_EXPENSE:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SUPERADMIN_LIST_ATTENDANCE:
            return {
                ...state,
                attendance:payload,
            }
        default:
            return state;
    }
}