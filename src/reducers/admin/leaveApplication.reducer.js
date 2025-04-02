import {
     LIST_LEAVEAPPLICATION ,
     CREATE_LEAVEAPPLICATION, 
     ADD_LEAVEAPPLICATION,
     GET_LEAVEAPPLICATION,
     UPDATE_LEAVEAPPLICATION, 
     DELETE_LEAVEAPPLICATION, 
     RESET_LEAVEAPPLICATION 
} from '../../actionTypes/admin/leaveApplication.types';

const initialState = {
    categories: [],
    certificates: [],
    materials: [],
    sizes: [],
    items: [],
    total: 0,
    product: null,
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
                createSuccess: payload
            }
        case GET_LEAVEAPPLICATION:
                return {
                    ...state,
                    items: payload
                }
        case UPDATE_LEAVEAPPLICATION:
            return {
                ...state,
                editSuccess: payload
            }
        case DELETE_LEAVEAPPLICATION:
            return {
                ...state,
                deleteSuccess: payload
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