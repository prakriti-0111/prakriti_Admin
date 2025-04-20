import {
    DISTRIBUTOR_LIST_SALES,
    DISTRIBUTOR_CREATE_SALES,
    DISTRIBUTOR_ADD_SALES,
    DISTRIBUTOR_GET_SALES,
    DISTRIBUTOR_UPDATE_SALES,
    DISTRIBUTOR_DELETE_SALES,
    DISTRIBUTOR_RESET_SALES,
} from '../../actionTypes/distributor/sales.types';

const initialState = {
    items: [],
    total: 0,
    sale: null,
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
        case DISTRIBUTOR_LIST_SALES:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_ADD_SALES:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_GET_SALES:
            return {
                ...state,
                sale: payload
            }
        case DISTRIBUTOR_UPDATE_SALES:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_DELETE_SALES:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DISTRIBUTOR_RESET_SALES:
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