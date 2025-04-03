import {
    ADMIN_LIST_SUB_CATEGORY,
    ADMIN_RESET_SUB_CATEGORY_LIST
} from '../../actionTypes/admin/subCategory.types';

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
        case ADMIN_LIST_SUB_CATEGORY:
            return {
                ...state,
                ...payload
            }
        case ADMIN_RESET_SUB_CATEGORY_LIST:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}