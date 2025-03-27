import {
    SUPERADMIN_LIST_EMPLOYEE_SALARY,
    SUPERADMIN_ADD_EMPLOYEE_SALARY,
    SUPERADMIN_GET_EMPLOYEE_SALARY,
    SUPERADMIN_UPDATE_EMPLOYEE_SALARY,
    //SUPERADMIN_DELETE_EMPLOYEE_SALARY,
    SUPERADMIN_RESET_EMPLOYEE_SALARY
} from '../../actionTypes/superadmin/employeeSalary.types';
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
        case SUPERADMIN_LIST_EMPLOYEE_SALARY:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_EMPLOYEE_SALARY:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_EMPLOYEE_SALARY:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_EMPLOYEE_SALARY:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         /*case SUPERADMIN_DELETE_EMPLOYEE_SALARY:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }*/

        case SUPERADMIN_RESET_EMPLOYEE_SALARY:
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