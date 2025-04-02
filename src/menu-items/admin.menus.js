import { IconDashboard, IconWindmill, IconSettings, IconDiamond, IconUsers, IconShoppingCart, IconBriefcase,IconFileInvoice } from '@tabler/icons';

let urlPrefix = '/admin';
const adminMenus = [
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
          {
            id: 'purchase',
            title: 'Purchase',
            type: 'item',
            url: urlPrefix + '/purchases',
            breadcrumbs: false
          },
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
          {
            id: 'purchase_on_approve',
            title: 'Purchase On Approval',
            type: 'item',
            url: urlPrefix + '/purchase-on-approve',
            breadcrumbs: false
          },
          {
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
          },
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
          }
        ]
      },
      {
        id: 'order_management',
        title: 'Order Management',
        type: 'collapse',
        icon: IconFileInvoice,
        children: [
          {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: urlPrefix + '/orders',
          },
          {
            id: 'myorders',
            title: 'My Orders',
            type: 'item',
            url: urlPrefix + '/my-order',
            breadcrumbs: false
          },
          {
            id: 'returnorders',
            title: 'Return Orders',
            type: 'item',
            url: urlPrefix + '/return-orders',
          },
        ]
      },
      {
        id: 'user_management',
        title: 'User Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'distributor',
            title: 'Distributor',
            type: 'item',
            url: urlPrefix + '/distributors',
            breadcrumbs: false
          },
          {
            id: 'sales_executive',
            title: 'Sales Executive',
            type: 'item',
            url: urlPrefix + '/sales-executive',
            breadcrumbs: false
          },
          {
            id: 'supplier',
            title: 'Supplier',
            type: 'item',
            url: urlPrefix + '/suppliers',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'investor_management',
        title: 'Investors Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'investor',
            title: 'Investors',
            type: 'item',
            url: urlPrefix + '/investors',
            breadcrumbs: false
          },
          {
            id: 'loans',
            title: 'Loans',
            type: 'item',
            url: urlPrefix + '/loans',
            breadcrumbs: false
          },
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
    ]
  }
];

export default adminMenus;