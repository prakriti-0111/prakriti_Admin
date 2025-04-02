import {
    ADMIN_LIST_STOCKAPPLICATION,
    ADMIN_GET_STOCK_PRODUCT_LIST,
    ADMIN_GET_STOCK_PRODUCT_DETAILS,
    ADMIN_GET_STOCK_PRODUCT_DETAILS_RESET,
    ADMIN_GET_STOCK
} from '../../actionTypes/admin/stocks.types';
const initialState = {
   items: [],
   total: 0,
   productList: [],
   productDetails: [],
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
       case ADMIN_LIST_STOCKAPPLICATION:
           return {
               ...state,
               ...payload
           }
       case ADMIN_GET_STOCK_PRODUCT_LIST:
            return {
                ...state,
                productList: payload
            }
        case ADMIN_GET_STOCK_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: payload
            }
        case ADMIN_GET_STOCK_PRODUCT_DETAILS_RESET:
            return {
                ...state,
                productDetails: []
            }
        case ADMIN_GET_STOCK:
            return {
                ...state,
                stock: payload
            }
       default:
           return state;
   }
}