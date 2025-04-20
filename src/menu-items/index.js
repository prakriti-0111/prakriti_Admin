import superadminMenus from './superadmin.menus';
import adminMenus from './admin.menus';
import distributorMenus from './distributor.menus';
import managerMenus from './manager.menus';
import employeeMenus from './employee.menus';
import seMenus from './se.menus';
import cssVars from '@mui/system/cssVars';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role, permissions) => {
    let menus = [];
    switch (role) {
        case 'Super Admin':
            menus = superadminMenus;
            break;

        case 'Distributor':
            menus = [...distributorMenus(permissions)];
            break;

        case 'Admin':
            menus = adminMenus;
            break;

        /*case 'Manager':
            menus = managerMenus;
            break;*/

        case 'Sales Executive':
            menus = seMenus;
            break;

        default:
            menus = [...employeeMenus(permissions)];
            break;
    }
    return {items: menus};
};

export default menuItems;
