
import {
    SUPERADMIN_LIST_RETAILER,
    SUPERADMIN_ADD_RETAILER,
    SUPERADMIN_GET_RETAILER,
    SUPERADMIN_UPDATE_RETAILER,
    SUPERADMIN_DELETE_RETAILER,
    SUPERADMIN_RESET_RETAILER,
    SUPERADMIN_LIST_RETAILER_REVIEW
} from '../../actionTypes/superadmin/retailer.types';
const initialState = {
    items: [],
    total: 0,
    total_sale: 0,
    total_sale_due: 0,
    total_sale_paid: 0,
    total_sale_return: 0,
    item: null,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
    reviews: [],
    review_total: 0
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUPERADMIN_LIST_RETAILER:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_ADD_RETAILER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SUPERADMIN_GET_RETAILER:
            return {
                ...state,
                item: payload
            }
        case SUPERADMIN_UPDATE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case SUPERADMIN_DELETE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case SUPERADMIN_RESET_RETAILER:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SUPERADMIN_LIST_RETAILER_REVIEW:
            return {
                ...state,
                reviews: payload.items,
                review_total: payload.total
            }
        default:
            return state;
    }
}