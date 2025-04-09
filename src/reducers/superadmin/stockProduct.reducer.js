import {
    LIST_STOCKPRODUCT,
    CREATE_STOCKPRODUCT,
    ADD_STOCKPRODUCT,
    GET_STOCKPRODUCT,
    UPDATE_STOCKPRODUCT,
    DELETE_STOCKPRODUCT,
    RESET_STOCKPRODUCT,
    RESET_STOCKPRODUCT_LIST
} from '../../actionTypes/superadmin/stockproduct.types';

const initialState = {
    categories: [],
    items: [],
    total: 0,
    stockproduct: null,
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
        case LIST_STOCKPRODUCT:
            return {
                ...state,
                ...payload
            }
        case CREATE_STOCKPRODUCT:
            return {
                ...state,
                categoriescategories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_STOCKPRODUCT:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_STOCKPRODUCT:
            return {
                ...state,
                stockproduct: payload
            }
        case UPDATE_STOCKPRODUCT:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_STOCKPRODUCT:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_STOCKPRODUCT:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_STOCKPRODUCT_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}