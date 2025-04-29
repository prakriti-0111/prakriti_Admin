import { IconDashboard, IconWindmill } from '@tabler/icons';

let urlPrefix = '/manager';
const managerMenus = [
  {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: urlPrefix + '/dashboard',
        icon: IconDashboard,
        breadcrumbs: false
      },
      {
        id: 'worker',
        title: 'Worker',
        type: 'item',
        url: urlPrefix + '/workers',
        icon: IconWindmill,
        breadcrumbs: false
      },
      {
        id: 'stock_history',
        title: 'Stock History',
        type: 'item',
        url: urlPrefix + '/stock-histories',
        icon: IconWindmill,
        breadcrumbs: false
      },
      /*{
        id: 'HR_management',
        title: 'HR management',
        type: 'collapse',
        icon: IconWindmill,
        children: [
          {
            id: 'Leave_application',
            title: 'Leave Application',
            type: 'item',
            url: urlPrefix + '/Leave_application',
            breadcrumbs: false
          }
        ]
      },*/
    
    ]
  }
];

export default managerMenus;