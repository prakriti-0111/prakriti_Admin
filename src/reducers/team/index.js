import { combineReducers } from 'redux';
import roleReducer from './role.reducer';

export const TEAM_REDUCERS = {
    role: roleReducer
}