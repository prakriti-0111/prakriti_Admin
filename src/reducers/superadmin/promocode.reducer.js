import {
    LIST_PROMOCODE,
    CREATE_PROMOCODE,
    ADD_PROMOCODE,
    GET_PROMOCODE,
    UPDATE_PROMOCODE,
    DELETE_PROMOCODE,
    RESET_PROMOCODE,
    RESET_PROMOCODE_LIST
} from '../../actionTypes/superadmin/promocode.types';

const initialState = {
    categories: [],
    items: [],
    total: 0,
    promocode: null,
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
        case LIST_PROMOCODE:
            return {
                ...state,
                ...payload
            }
        case CREATE_PROMOCODE:
            return {
                ...state,
                categories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_PROMOCODE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_PROMOCODE:
            return {
                ...state,
                promocode: payload
            }
        case UPDATE_PROMOCODE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_PROMOCODE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_PROMOCODE:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_PROMOCODE_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}