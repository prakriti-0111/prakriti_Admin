import {
    LIST_WORKER,
    ADD_WORKER,
    GET_WORKER,
    UPDATE_WORKER,
    DELETE_WORKER,
} from '../../actionTypes/manager/worker.types';

const initialState = {
    items: [],
    total: 0,
    deleteSuccess: false,
    editSuccess: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_WORKER:
            return {
                ...state,
                ...payload
            }
        case ADD_WORKER:
            return {
                ...state,
                success: true
            }
        case GET_WORKER: 
            return {
                ...state,
                item: payload
            }
        case UPDATE_WORKER:
            return {
                ...state,
                editSuccess: payload
            }
         case DELETE_WORKER:
            return {
                ...state,
                deleteSuccess: payload
            }
        default:
            return state;
    }
}