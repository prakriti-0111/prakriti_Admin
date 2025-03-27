import {
    LIST_COUNTRY,
    ADD_COUNTRY,
    GET_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
} from '../../actionTypes/superadmin/country.types';

const initialState = {
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
        case LIST_COUNTRY:
            return {
                ...state,
                ...payload
            }
        case ADD_COUNTRY:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_COUNTRY:
            return {
                ...state,
                item: payload
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case DELETE_COUNTRY:
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