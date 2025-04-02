import { combineReducers } from 'redux';
// Reducers
import authReducer from './auth.reducer';
import workerReducer from './worker.reducer';
import stockHistoryReducer from './stockHistory.reducer';

export const MANAGER_REDUCERS = {
    //auth: authReducer,
    worker: workerReducer,
    stockHistory: stockHistoryReducer,
}