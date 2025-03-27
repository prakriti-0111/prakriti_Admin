import { combineReducers } from 'redux';
import profileReducer from './profile.reducer';
import ordersReducer from './orders.reducer';

export const SE_REDUCERS = {
    profile: profileReducer,
    orders: ordersReducer
}