import {
    LIST_STOCKAPPLICATION ,
    ADD_STOCKAPPLICATION,
    GET_STOCK_PRODUCT_LIST,
    GET_STOCK_PRODUCT_DETAILS,
    GET_STOCK_PRODUCT_DETAILS_RESET,
    SUPERADMIN_GET_STOCK
} from '../../actionTypes/superadmin/stocks.types';
const initialState = {
   items: [],
   total: 0,
   stock: null,
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
       case LIST_STOCKAPPLICATION:
           return {
               ...state,
               ...payload
           }
       case ADD_STOCKAPPLICATION:
           return {
               ...state,
               createSuccess: payload
           }
       case GET_STOCK_PRODUCT_LIST:
            return {
                ...state,
                productList: payload
            }
        case GET_STOCK_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: payload
            }
        case GET_STOCK_PRODUCT_DETAILS_RESET:
            return {
                ...state,
                productDetails: []
            }
        case SUPERADMIN_GET_STOCK:
            return {
                ...state,
                stock: payload
            }
       default:
           return state;
   }
}