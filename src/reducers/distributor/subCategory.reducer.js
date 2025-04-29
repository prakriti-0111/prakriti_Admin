import {
    DISTRIBUTOR_LIST_SUB_CATEGORY,
    DISTRIBUTOR_RESET_SUB_CATEGORY_LIST
} from '../../actionTypes/distributor/subCategory.types';

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
        case DISTRIBUTOR_LIST_SUB_CATEGORY:
            return {
                ...state,
                ...payload
            }
        case DISTRIBUTOR_RESET_SUB_CATEGORY_LIST:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}