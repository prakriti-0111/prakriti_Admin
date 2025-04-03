import {
    ADMIN_MATERIAL_PRICE_PRODUCT_PRICE_INFO,
} from '../../actionTypes/admin/materialPrice.types';

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
        case ADMIN_MATERIAL_PRICE_PRODUCT_PRICE_INFO:
            return {
                ...state,
                productPriceInfo: payload
            }
        default:
            return state;
    }
}