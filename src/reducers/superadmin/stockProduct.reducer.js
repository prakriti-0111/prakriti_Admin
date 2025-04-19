import {
    LIST_STOCK_PRODUCT,
    RESET_STOCK_PRODUCT_LIST
} from '../../actionTypes/superadmin/stockProduct.types';

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
        case LIST_STOCK_PRODUCT:
            return {
                ...state,
                ...payload
            }
        case RESET_STOCK_PRODUCT_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        default:
            return state;
    }
}