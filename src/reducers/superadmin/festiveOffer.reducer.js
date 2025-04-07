import {
    LIST_FESTIVEOFFER,
    CREATE_FESTIVEOFFER,
    ADD_FESTIVEOFFER,
    GET_FESTIVEOFFER,
    UPDATE_FESTIVEOFFER,
    DELETE_FESTIVEOFFER,
    RESET_FESTIVEOFFER,
    RESET_FESTIVEOFFER_LIST
} from '../../actionTypes/superadmin/festiveoffer.types';

const initialState = {
    categories: [],
    items: [],
    total: 0,
    festiveoffer: null,
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
        case LIST_FESTIVEOFFER:
            return {
                ...state,
                ...payload
            }
        case CREATE_FESTIVEOFFER:
            return {
                ...state,
                categories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_FESTIVEOFFER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_FESTIVEOFFER:
            return {
                ...state,
                festiveoffer: payload
            }
        case UPDATE_FESTIVEOFFER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_FESTIVEOFFER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_FESTIVEOFFER:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_FESTIVEOFFER_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}