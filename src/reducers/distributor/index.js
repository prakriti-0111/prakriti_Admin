import { combineReducers } from 'redux';
// Reducers
import authReducer from './auth.reducer';
import leaveApplicationReducer from './leaveApplication.reducer';
import stocksReducer from './stocks.reducer';
import categoryReducer from './category.reducer';
import subCategoryReducer from './subCategory.reducer';
//import distributorReducer from './distributor.reducer';
import materialPriceReducer from './materialPrice.reducer';
import salesReducer from './sales.reducer';
import retailerReducer from './retailer.reducer';
import oredrsReducer from './orders.reducer';
import myordersReducer from './myorders.reducer';
import productReducer from './product.reducer';
import shipOrder from './shipOrder.reducer';
import cartReducer from './cart.reducer';
import profileReducer from './profile.reducer';
import salesExecutiveReducer from './salesExecutive.reducer';
import customerReducer from './customer.reducer';
import paymentReducer from './payment.reducer';
import saleCartReducer from './saleCart.reducer';
import sale_executiveReducer from './sale_executive.reducer';

export const DISTRIBUTOR_REDUCERS = {
    //auth: authReducer,
    leaveApplication: leaveApplicationReducer,
    stocks: stocksReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    materialPrice: materialPriceReducer,
    sales: salesReducer,
    retailer: retailerReducer,
    orders: oredrsReducer,
    myorders: myordersReducer,
    shipOrder: shipOrder,
    product: productReducer,
    cart: cartReducer,
    profile: profileReducer,
    salesExecutive: salesExecutiveReducer,
    customer: customerReducer,
    payment: paymentReducer,
    saleCart: saleCartReducer,
    sale_executive: sale_executiveReducer,
}