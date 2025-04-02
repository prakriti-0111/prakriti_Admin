import {
    LIST_COUNTRY,
    ADD_COUNTRY,
    GET_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
} from '../../actionTypes/admin/country.types';

const initialState = {
    items: [],
    total: 0,
    deleteSuccess: false,
    editSuccess: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_COUNTRY:
            return {
                ...state,
                ...payload
            }
        case ADD_COUNTRY:
            return {
                ...state,
                success: true
            }
        case GET_COUNTRY:
            return {
                ...state,
                item: payload
            }
        case UPDATE_COUNTRY:
            return {
                ...state,
                editSuccess: payload
            }
         case DELETE_COUNTRY:
            return {
                ...state,
                deleteSuccess: payload
            }
        default:
            return state;
    }
}