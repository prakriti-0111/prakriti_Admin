
import {
    DISTRIBUTOR_LIST_CUSTOMER
} from '../../actionTypes/distributor/customer.types';
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
        case DISTRIBUTOR_LIST_CUSTOMER:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}