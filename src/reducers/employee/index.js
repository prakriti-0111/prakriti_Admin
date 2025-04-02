import { combineReducers } from 'redux';
import roleReducer from './role.reducer';
import profileReducer from './profile.reducer';
import permissionsReducer from './permissions.reducer';

export const EMPLOYEE_REDUCERS = {
    role: roleReducer,
    profile: profileReducer,
    permissions: permissionsReducer
}