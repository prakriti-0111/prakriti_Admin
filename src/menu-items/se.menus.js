import { IconDashboard, IconWindmill, IconSettings, IconDiamond, IconUsers, IconShoppingCart, IconBriefcase,IconFileInvoice, IconClockHour3 } from '@tabler/icons';

let urlPrefix = '/sales-executive';
const seMenus = [
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
        id: 'invoice_management',
        title: 'Invoice',
        type: 'collapse',
        icon: IconFileInvoice,
        children: [
          /*{
            id: 'purchase',
            title: 'Purchase',
            type: 'item',
            url: urlPrefix + '/purchases',
            breadcrumbs: false
          },*/
          {
            id: 'sales',
            title: 'Sales',
            type: 'item',
            url: urlPrefix + '/sales',
            breadcrumbs: false
          },
          {
            id: 'sales_on_approve',
            title: 'Sale On Approval',
            type: 'item',
            url: urlPrefix + '/sale-on-approve',
            breadcrumbs: false
          },
          /*{
            id: 'return_purchase',
            title: 'Return Purchase',
            type: 'item',
            url: urlPrefix + '/return-purchase',
            breadcrumbs: false
          },
          {
            id: 'return_sale',
            title: 'Return Sale',
            type: 'item',
            url: urlPrefix + '/return-sale',
            breadcrumbs: false
          },*/
          {
            id: 'transfer',
            title: 'Transfer',
            type: 'item',
            url: urlPrefix + '/transfer',
            breadcrumbs: false
          },
          {
            id: 'received',
            title: 'Received',
            type: 'item',
            url: urlPrefix + '/received',
            breadcrumbs: false
          },
          {
            id: 'return_sale',
            title: 'Return Sale',
            type: 'item',
            url: urlPrefix + '/return-sale',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        url: urlPrefix + '/orders',
        icon: IconFileInvoice,
        breadcrumbs: false
      },
      {
        id: 'returnorders',
        title: 'Return Orders',
        type: 'item',
        url: urlPrefix + '/return-orders',
        icon: IconFileInvoice,
        breadcrumbs: false
      },
      {
        id: 'user_management',
        title: 'User Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'retailer',
            title: 'Retailer',
            type: 'item',
            url: urlPrefix + '/retailers',
            breadcrumbs: false
          },
          {
            id: 'myretailer',
            title: 'My Retailer',
            type: 'item',
            url: urlPrefix + '/my-retailers',
            breadcrumbs: false
          },
          {
            id: 'customers',
            title: 'Customer',
            type: 'item',
            url: urlPrefix + '/customers',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'stock_management',
        title: 'Stock Management',
        type: 'collapse',
        icon: IconBriefcase,
        children: [
          {
            id: 'Stocks',
            title: 'Stocks',
            type: 'item',
            url: urlPrefix + '/stocks',
          },
          {
            id: 'returnStocks',
            title: 'Return Stocks',
            type: 'item',
            url: urlPrefix + '/return-stocks',
          },
        ]
      },
      {
        id: 'LeaveApplications',
        title: 'Leave Applications',
        type: 'item',
        url: urlPrefix + '/leave-applications',
        icon: IconFileInvoice,
        breadcrumbs: false
      },
      {
        id: 'expenses',
        title: 'Expense',
        type: 'item',
        url: urlPrefix + '/expenses',
        icon: IconFileInvoice,
        breadcrumbs: false
      },
    ]
  }
];

export default seMenus;