import {
    LIST_SUB_CATEGORY,
    ADD_SUB_CATEGORY,
    UPDATE_SUB_CATEGORY,
    DELETE_SUB_CATEGORY,
    RESET_SUB_CATEGORY_LIST,
    RESET_SUB_CATEGORY_RESET
} from '../../actionTypes/superadmin/subCategory.types';

const initialState = {
    categories: [],
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
        case LIST_SUB_CATEGORY:
            return {
                ...state,
                ...payload
            }
        case ADD_SUB_CATEGORY:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case UPDATE_SUB_CATEGORY:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_SUB_CATEGORY:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_SUB_CATEGORY_RESET:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case RESET_SUB_CATEGORY_LIST:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}