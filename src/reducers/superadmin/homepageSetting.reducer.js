import {
    LIST_HOMEPAGESETTING,
    UPDATE_HOMEPAGESETTING,
    RESET_HOMEPAGESETTING,
    RESET_HOMEPAGESETTING_LIST
} from '../../actionTypes/superadmin/homepagesetting.types';

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    //deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;  
    switch (type) {
        case LIST_HOMEPAGESETTING:
            return {
                ...state,
                ...payload
            }
        
        case UPDATE_HOMEPAGESETTING: 
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_HOMEPAGESETTING:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                //deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_HOMEPAGESETTING_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}