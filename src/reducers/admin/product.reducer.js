import {
    ADMIN_LIST_PRODUCT,
    ADMIN_RESET_PRODUCT_LIST
} from '../../actionTypes/admin/product.types';

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
        case ADMIN_LIST_PRODUCT:
            return {
                ...state,
                ...payload
            }
        case ADMIN_RESET_PRODUCT_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}