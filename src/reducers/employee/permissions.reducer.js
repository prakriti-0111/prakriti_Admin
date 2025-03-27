import {
    EMPLOYEE_PERMISSIONS
} from '../../actionTypes/employee/permissions.types';

const initialState = {
    permissions: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case EMPLOYEE_PERMISSIONS:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}