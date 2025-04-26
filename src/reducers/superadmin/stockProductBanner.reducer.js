import {
    LIST_STOCKPRODUCTBANNER,
    CREATE_STOCKPRODUCTBANNER,
    ADD_STOCKPRODUCTBANNER,
    GET_STOCKPRODUCTBANNER,
    UPDATE_STOCKPRODUCTBANNER,
    DELETE_STOCKPRODUCTBANNER,
    RESET_STOCKPRODUCT,
    RESET_STOCKPRODUCT_LIST
} from '../../actionTypes/superadmin/stockproductbanner.types';

const initialState = {
    categories: [],
    items: [],
    total: 0,
    stockproductbanner: null,
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
        case LIST_STOCKPRODUCTBANNER:
            return {
                ...state,
                ...payload
            }
        case CREATE_STOCKPRODUCTBANNER:
            return {
                ...state,
                categoriescategories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_STOCKPRODUCTBANNER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_STOCKPRODUCTBANNER:
            return {
                ...state,
                stockproductbanner: payload
            }
        case UPDATE_STOCKPRODUCTBANNER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_STOCKPRODUCTBANNER:
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