import {
    SUPERADMIN_LIST_EMPLOYEE,
    SUPERADMIN_ADD_EMPLOYEE,
    SUPERADMIN_GET_EMPLOYEE,
    SUPERADMIN_UPDATE_EMPLOYEE,
    SUPERADMIN_DELETE_EMPLOYEE,
    SUPERADMIN_RESET_EMPLOYEE
} from '../../actionTypes/superadmin/employee.types';
const initialState = {
    salaries: [],
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
        case SUPERADMIN_LIST_EMPLOYEE:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_EMPLOYEE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_EMPLOYEE:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_EMPLOYEE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_EMPLOYEE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_EMPLOYEE:
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