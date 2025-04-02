import {
    ADMIN_LIST_CATEGORY
} from '../../actionTypes/admin/category.types';

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
        case ADMIN_LIST_CATEGORY:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}