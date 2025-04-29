import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import _ from 'lodash';

// routes
import DefaultRoutes from './default.routes';
import SuperAdminRoutes from './superadmin.routes';
import AdminRoutes from './admin.routes';
import DistributorRoutes from './distributor.routes';
import ManagerRoutes from './manager.routes';
import EmployeeRoutes from './employee.routes';
import TeamRoutes from './team.routes';
import SeRoutes from './se.routes';

const PageNotFound = Loadable(lazy(() => import('../pages/PageNotFound')));

// ==============================|| ROUTING RENDER ||============================== //

/*export default function ThemeRoutes() {
    return [...DefaultRoutes, ...SuperAdminRoutes];
}*/

const filterPermissionsRoutes = (items) => {
    let arr = [];
    for(let i = 0; i < items.length; i++){
        if('children' in items[i]){
            let _chldrn = [];
            for(let x = 0; x < items[i].children.length; x++){
                if((!('permission' in items[i].children[x]) || items[i].children[x].permission)){
                    _chldrn.push(items[i].children[x])
                }
            }
            arr.push({
                path: items[i].path,
                element: items[i].element,
                children: _chldrn
            })
        }else{
            if((!('permission' in items[i]) || items[i].permission)){
                arr.push(items[i])
            }
        }
    }
    return arr;
}

const routes = (isLoggedIn, permissions) => [
    ...DefaultRoutes(isLoggedIn), 
    ...SuperAdminRoutes(isLoggedIn),
    ...AdminRoutes(isLoggedIn),
    ...filterPermissionsRoutes(DistributorRoutes(isLoggedIn, permissions)),
    ...ManagerRoutes(isLoggedIn),
    ...filterPermissionsRoutes(EmployeeRoutes(isLoggedIn, permissions)),
    ...TeamRoutes(isLoggedIn),
    ...SeRoutes(isLoggedIn),
    {
        path: '*',
        element: <PageNotFound />
    }
];
  
export default routes;
