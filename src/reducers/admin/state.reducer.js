import {
    LIST_STATE,
    ADD_STATE,
    GET_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from '../../actionTypes/admin/state.types';

const initialState = {
    country: [],
    items: [],
    total: 0,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_STATE:
            return {
                ...state,
                ...payload
            }
        case ADD_STATE:
            return {
                ...state,
                createSuccess: payload
            }
        case GET_STATE:
            return {
                ...state,
                item: payload
            }
        case UPDATE_STATE:
            return {
                ...state,
                editSuccess: payload
            }
         case DELETE_STATE:
            return {
                ...state,
                deleteSuccess: payload
            }
        default:
            return state;
    }
}