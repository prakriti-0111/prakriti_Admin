import {
    ADMIN_CART_LIST,
    ADMIN_CART_ADD,
    ADMIN_CART_DELETE,
    ADMIN_CART_RESET,
    ADMIN_CART_RESET_LIST
} from '../../actionTypes/admin/cart.types';

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
        case ADMIN_CART_LIST:
            return {
                ...state,
                ...payload
            }
        case ADMIN_CART_ADD:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_CART_DELETE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case ADMIN_CART_RESET:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case ADMIN_CART_RESET_LIST:
            return {
                ...state,
                items: [],
                total: 0,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}