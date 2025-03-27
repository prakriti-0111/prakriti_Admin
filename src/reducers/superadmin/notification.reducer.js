import {
    SUPERADMIN_NOTIFICATION_LIST,
    SUPERADMIN_NOTIFICATION_ADD,
    SUPERADMIN_NOTIFICATION_READ
} from '../../actionTypes/superadmin/notification.types';

const initialState = {
    items: [],
    total: 0,
    new: 0
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SUPERADMIN_NOTIFICATION_LIST:
            return {
                ...state,
                ...payload
            }
        case SUPERADMIN_NOTIFICATION_ADD:
            return {
                ...state,
                items: [payload].concat(state.items),
                new: (state.new + 1)
            }
        case SUPERADMIN_NOTIFICATION_READ:
            let itemLength = state.items[payload.index].items.length;
            if(itemLength == 1){
                return{
                    ...state,
                    items: state.items.filter((val, i) => i !== payload.index),
                    new: state.new > 0 ? (state.new - 1) : state.new 
                }
            }else{
                let items = state.items;
                let childItems = state.items[payload.index].items;
                childItems = childItems.filter((val, i) => i !== payload.item_index);
                items[payload.index].items = [...childItems];
                return {
                    ...state,
                    items: [
                       ...items
                    ],
                    new: state.new > 0 ? (state.new - 1) : state.new 
                }
            }
            //let items = itemLength == 1 ? state.items.filter((val, i) => i !== payload.index) : state.items;

           
        default:
            return state;
    }
}