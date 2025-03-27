import {
    DISTRIBUTOR_LIST_STOCKAPPLICATION,
    DISTRIBUTOR_GET_STOCK_PRODUCT_LIST,
    DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS,
    DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS_RESET,
    DISTRIBUTOR_GET_STOCK
} from '../../actionTypes/distributor/stocks.types';
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
       case DISTRIBUTOR_LIST_STOCKAPPLICATION:
           return {
               ...state,
               ...payload
           }
       case DISTRIBUTOR_GET_STOCK_PRODUCT_LIST:
            return {
                ...state,
                productList: payload
            }
        case DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: payload
            }
        case DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS_RESET:
            return {
                ...state,
                productDetails: []
            }
        case DISTRIBUTOR_GET_STOCK:
            return {
                ...state,
                stock: payload
            }
       default:
           return state;
   }
}