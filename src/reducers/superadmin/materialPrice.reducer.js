import {
    LIST_MATERIAL_PRICE,
    ADD_MATERIAL_PRICE,
    GET_MATERIAL_PRICE,
    UPDATE_MATERIAL_PRICE,
    DELETE_MATERIAL_PRICE,
    RESET_MATERIAL_PRICE,
    MATERIAL_PRICE_PRODUCT_PRICE_INFO,
} from '../../actionTypes/superadmin/materialPrice.types';

const initialState = {
    items: [],
    total: 0,
    materialPrice: null,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
    productPriceInfo: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_MATERIAL_PRICE:
            return {
                ...state,
                ...payload
            }
        case LIST_MATERIAL_PRICE:
            return {
                ...state,
                categories: payload.categories,
                certificates: payload.certificates,
                materials: payload.materials,
                sizes: payload.sizes
            }
        case ADD_MATERIAL_PRICE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_MATERIAL_PRICE:
            return {
                ...state,
                materialPrice: payload
            }
        case UPDATE_MATERIAL_PRICE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_MATERIAL_PRICE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_MATERIAL_PRICE:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case MATERIAL_PRICE_PRODUCT_PRICE_INFO:
            return {
                ...state,
                productPriceInfo: payload
            }
        default:
            return state;
    }
}