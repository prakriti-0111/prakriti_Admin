import { combineReducers } from 'redux';
// Reducers
import authReducer from './auth.reducer';
import productReducer from './product.reducer';
import certificateReducer from './certificate.reducer';
import categoryReducer from './category.reducer';
import subCategoryReducer from './subCategory.reducer';
import taxReducer from './tax.reducer';
import unitReducer from './unit.reducer';
import purityReducer from './purity.reducer';
import countryReducer from './country.reducer';
import stateReducer from './state.reducer';
import districtReducer from './district.reducer';
import investorReducer from './investor.reducer';
import adminReducer from './admin.reducer';
import distributorReducer from './distributor.reducer';
import retailerReducer from './retailer.reducer';
import supplierReducer from './supplier.reducer';
import employeeReducer from './employee.reducer';
//import workerReducer from './worker.reducer';
import materialReducer from './material.reducer';
import sizeReducer from './size.reducer';
import materialPriceReducer from './materialPrice.reducer';
import leaveApplicationReducer from './leaveApplication.reducer';
import stocksReducer from './stocks.reducer';
import purchaseReducer from './purchase.reducer';
import loanReducer from './loan.reducer';
import salesReducer from './sales.reducer';
import profileReducer from './profile.reducer';
import roleReducer from './role.reducer';
import orderReducer from './orders.reducer';
import salesExecutiveReducer from './salesExecutive.reducer';
import customerReducer from './customer.reducer';
import paymentReducer from './payment.reducer';
import cartReducer from './cart.reducer';
import employeeSalaryReducer from './employeeSalary.reducer';
import expenseReducer from './expense.reducer';
import reasonReducer from './reason.reducer';
import returnPolicyReducer from './returnPolicy.reducer';
import returnPurchaseReducer from './returnPurchase.reducer';
import returnSaleReducer from './returnSale.reducer';
import notificationReducer from './notification.reducer';
import visitReducer from './visit.reducer';
import bannerReducer from './banner.reducer';
import promocodeReducer from './promocode.reducer';
import newArrivalReducer from './newArrival.reducer';
import my_performanceReducer from './my_performance.reducer';
import returnOrdersReducer from './returnOrders.reducer';
import holidayReducer from './holiday.reducer';

export const SUPERADMIN_REDUCERS = {
    //auth: authReducer,
    product: productReducer,
    certificate: certificateReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    country: countryReducer,
    countryState: stateReducer,
    district: districtReducer,
    investor: investorReducer,
    admin: adminReducer,
    distributor: distributorReducer,
    retailer: retailerReducer,
    employee: employeeReducer,
    //worker: workerReducer,
    supplier: supplierReducer,
    tax: taxReducer,
    unit: unitReducer,
    material: materialReducer,
    purity: purityReducer,
    size: sizeReducer,
    materialPrice: materialPriceReducer,
    leaveApplication: leaveApplicationReducer,
    stocks: stocksReducer,
    purchase: purchaseReducer,
    loan: loanReducer,
    sales: salesReducer,
    profile: profileReducer,
    role: roleReducer,
    orders: orderReducer,
    salesExecutive: salesExecutiveReducer,
    customer: customerReducer,
    payment: paymentReducer,
    cart: cartReducer,
    employeeSalary: employeeSalaryReducer,
    expense:expenseReducer,
    reason: reasonReducer,
    returnPolicy: returnPolicyReducer,
    returnPurchase: returnPurchaseReducer,
    returnSale: returnSaleReducer,
    notification: notificationReducer,
    visit: visitReducer,
    banner: bannerReducer,
    promocode: promocodeReducer,
    newArrival: newArrivalReducer,
    my_performance: my_performanceReducer,
    returnOrders: returnOrdersReducer,
    holiday: holidayReducer,
}