import {
    LIST_STOCK_HISTORY,
    ADD_STOCK_HISTORY,
    GET_STOCK_HISTORY,
    UPDATE_STOCK_HISTORY,
    DELETE_STOCK_HISTORY,
    RESET_STOCK_HISTORY,
    GET_STOCK_HISTORY_MATERIALS,
    RESET_STOCK_HISTORY_MATERIALS
} from '../../actionTypes/manager/stockHistory.types';

const initialState = {
    materials: [],
    sizes: [],
    items: [],
    total: 0,
    stockHistory: null,
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
        case LIST_STOCK_HISTORY:
            return {
                ...state,
                ...payload
            }
        case ADD_STOCK_HISTORY:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_STOCK_HISTORY:
            return {
                ...state,
                stockHistory: payload
            }
        case GET_STOCK_HISTORY_MATERIALS:
            return {
                ...state,
                materials: payload
            }
        case RESET_STOCK_HISTORY_MATERIALS:
            return {
                ...state,
                materials: []
            }
        case UPDATE_STOCK_HISTORY:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_STOCK_HISTORY:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_STOCK_HISTORY:
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