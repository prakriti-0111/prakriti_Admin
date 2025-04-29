import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import {SUPERADMIN_REDUCERS} from './superadmin/index';
import {MANAGER_REDUCERS} from './manager/index';
import {ADMIN_REDUCERS} from './admin/index';
import {DISTRIBUTOR_REDUCERS} from './distributor/index';
import {EMPLOYEE_REDUCERS} from './employee/index';
import {TEAM_REDUCERS} from './team/index';
import {SE_REDUCERS} from './se/index';
import { reducer as formReducer } from 'redux-form';
import customizationReducer from 'src/store/customizationReducer';
import {
    DESTROY_SESSION
} from '../actionTypes/global.types';

/*export default combineReducers({
    form: formReducer,
    customization: customizationReducer,
    ...SUPERADMIN_REDUCERS
});*/


const appReducer = combineReducers({
    form: formReducer,
    customization: customizationReducer,
    auth: authReducer,
    superadmin: combineReducers({
        ...SUPERADMIN_REDUCERS
    }),
    admin: combineReducers({
        ...ADMIN_REDUCERS
    }),
    manager: combineReducers({
        ...MANAGER_REDUCERS
    }),
    distributor: combineReducers({
        ...DISTRIBUTOR_REDUCERS
    }),
    employee: combineReducers({
        ...EMPLOYEE_REDUCERS
    }),
    team: combineReducers({
        ...TEAM_REDUCERS
    }),
    se: combineReducers({
        ...SE_REDUCERS
    })
});
const rootReducer = (state, action) => {
    if(action.type === DESTROY_SESSION)
        state = undefined;
   
    return appReducer(state, action);
};
export default rootReducer;