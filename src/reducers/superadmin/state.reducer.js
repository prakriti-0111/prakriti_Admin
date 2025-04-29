import {
    LIST_STATE,
    ADD_STATE,
    GET_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from '../../actionTypes/superadmin/state.types';

const initialState = {
    country: [],
    items: [],
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
        case LIST_STATE:
            return {
                ...state,
                ...payload
            }
        case ADD_STATE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_STATE:
            return {
                ...state,
                item: payload
            }
        case UPDATE_STATE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case DELETE_STATE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        default:
            return state;
    }
}