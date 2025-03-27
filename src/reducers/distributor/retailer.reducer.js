
import {
    DISTRIBUTOR_LIST_RETAILER,
    DISTRIBUTOR_ADD_RETAILER,
    DISTRIBUTOR_GET_RETAILER,
    DISTRIBUTOR_UPDATE_RETAILER,
    DISTRIBUTOR_DELETE_RETAILER,
    DISTRIBUTOR_RESET_RETAILER
} from '../../actionTypes/distributor/retailer.types';
const initialState = {
    items: [],
    total: 0,
    item: null,
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
        case DISTRIBUTOR_LIST_RETAILER:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_ADD_RETAILER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_GET_RETAILER:
            return {
                ...state,
                item: payload
            }
        case DISTRIBUTOR_UPDATE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
         case DISTRIBUTOR_DELETE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }

        case DISTRIBUTOR_RESET_RETAILER:
            return {
                ...state,
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