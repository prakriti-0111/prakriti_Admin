import {
    SUPERADMIN_MY_PERFORMANCE_GET
} from '../../actionTypes/superadmin/my_performance.types';

const initialState = {
    performance: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUPERADMIN_MY_PERFORMANCE_GET:
            return {
                ...state,
                performance: {
                    ...payload
                }
            }
        default:
            return state;
    }
}