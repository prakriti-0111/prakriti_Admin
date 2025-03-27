import {
    SUPERADMIN_LIST_REASON
} from '../../actionTypes/superadmin/reason.types';
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
        case SUPERADMIN_LIST_REASON:
            return {
                ...state,
                items:payload
            }    
        default:
            return state;
    }
}