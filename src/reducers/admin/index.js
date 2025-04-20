import { combineReducers } from 'redux';
// Reducers
import authReducer from './auth.reducer';
import leaveApplicationReducer from './leaveApplication.reducer';
import stocksReducer from './stocks.reducer';
import distributorReducer from './distributor.reducer';
import materialPriceReducer from './materialPrice.reducer';
import salesReducer from './sales.reducer';
import productReducer from './product.reducer';
import countryReducer from './country.reducer';
import stateReducer from './state.reducer';
import districtReducer from './district.reducer';
import categoryReducer from './category.reducer';
import subCategoryReducer from './subCategory.reducer';
import cartReducer from './cart.reducer';
import ordersReducer from './orders.reducer';
import profileReducer from './profile.reducer';
import paymentReducer from './payment.reducer';
import saleCartReducer from './saleCart.reducer';
import purchaseReducer from './purchase.reducer';
import supplierReducer from './supplier.reducer';

export const ADMIN_REDUCERS = {
    //auth: authReducer,
    leaveApplication: leaveApplicationReducer,
    stocks: stocksReducer,
    distributor: distributorReducer,
    materialPrice: materialPriceReducer,
    sales: salesReducer,
    product: productReducer,
    country: countryReducer,
    countryState: stateReducer,
    district: districtReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    cart: cartReducer,
    orders: ordersReducer,
    profile: profileReducer,
    payment: paymentReducer,
    saleCart: saleCartReducer,
    purchase: purchaseReducer,
    supplier: supplierReducer,
}