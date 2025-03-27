import {
    LIST_PRODUCT,
    CREATE_PRODUCT,
    ADD_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    RESET_PRODUCT,
    RESET_PRODUCT_LIST
} from '../../actionTypes/superadmin/product.types';

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
        case LIST_PRODUCT:
            return {
                ...state,
                ...payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                categories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_PRODUCT:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_PRODUCT:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_PRODUCT_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}