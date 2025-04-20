import {
    LIST_RETURN_SALE,
    GET_RETURN_SALE,
} from '../../actionTypes/superadmin/returnSale.types';

const initialState = {
    items: [],
    total: 0,
    returnSale: null,
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
        case LIST_RETURN_SALE:
            return {
                ...state,
                ...payload
            }
        case GET_RETURN_SALE:
            return {
                ...state,
                returnSale: payload
            }
        default:
            return state;
    }
}