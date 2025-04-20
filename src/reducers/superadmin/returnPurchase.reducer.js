import {
    LIST_RETURN_PURCHASE,
    GET_RETURN_PURCHASE,
} from '../../actionTypes/superadmin/returnPurchase.types';

const initialState = {
    items: [],
    total: 0,
    returnPurchase: null,
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
        case LIST_RETURN_PURCHASE:
            return {
                ...state,
                ...payload
            }
        case GET_RETURN_PURCHASE:
            return {
                ...state,
                returnPurchase: payload
            }
        default:
            return state;
    }
}