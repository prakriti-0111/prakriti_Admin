import {
    LIST_LEAVEAPPLICATION,
    ADD_LEAVEAPPLICATION,
    GET_LEAVEAPPLICATION,
    UPDATE_LEAVEAPPLICATION, 
    DELETE_LEAVEAPPLICATION, 
    RESET_LEAVEAPPLICATION 
} from '../../actionTypes/superadmin/leaveApplication.types';

const initialState = {
    items: [],
    item: null,
    total: 0,
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
        case LIST_LEAVEAPPLICATION:
            return {
                ...state,
                ...payload
            }
        case ADD_LEAVEAPPLICATION:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_LEAVEAPPLICATION:
                return {
                    ...state,
                    item: payload
                }
        case UPDATE_LEAVEAPPLICATION:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_LEAVEAPPLICATION:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_LEAVEAPPLICATION:
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