import {
    EMPLOYEE_LIST_ROLES
} from '../../actionTypes/employee/role.types';

const initialState = {
    items: [],
    total: 0
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case EMPLOYEE_LIST_ROLES:
            return {
                ...state,
                ...payload
            }

        default:
            return state;

    }

}