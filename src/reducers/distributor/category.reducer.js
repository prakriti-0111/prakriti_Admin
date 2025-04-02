import {
    DISTRIBUTOR_LIST_CATEGORY
} from '../../actionTypes/distributor/category.types';

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
        case DISTRIBUTOR_LIST_CATEGORY:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}