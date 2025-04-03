import { IconDashboard, IconWindmill, IconSettings, IconDiamond, IconUsers, IconShoppingCart, IconBriefcase, IconFileInvoice, IconMail } from '@tabler/icons';

let urlPrefix = '/super-admin';
const superadminMenus = [
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
        id: 'product_master',
        title: 'Product Master',
        type: 'collapse',
        icon: IconDiamond,
        children: [
          {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: urlPrefix + '/categories',
            breadcrumbs: false
          },
          {
            id: 'product_sub_category',
            title: 'Sub Category',
            type: 'item',
            url: urlPrefix + '/sub-categories',
            breadcrumbs: false
          },
          {
            id: 'material',
            title: 'Material',
            type: 'item',
            url: urlPrefix + '/materials',
            breadcrumbs: false
          },
          {
            id: 'price_list',
            title: 'Price List',
            type: 'item',
            url: urlPrefix + '/material-prices',
            breadcrumbs: false
          },
          {
            id: 'product',
            title: 'Products',
            type: 'item',
            url: urlPrefix + '/products',
            breadcrumbs: false
          },
        ]
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
        icon: IconShoppingCart,
        children: [
          {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: urlPrefix + '/orders',
            breadcrumbs: false
          },
          {
            id: 'returnorders',
            title: 'Return Orders',
            type: 'item',
            url: urlPrefix + '/return-orders',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'user_management',
        title: 'User Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'admin',
            title: 'Admin',
            type: 'item',
            url: urlPrefix + '/admins',
            breadcrumbs: false
          },
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
            id: 'retailer',
            title: 'Retailer',
            type: 'item',
            url: urlPrefix + '/retailers',
            breadcrumbs: false
          },
          {
            id: 'supplier',
            title: 'Supplier',
            type: 'item',
            url: urlPrefix + '/suppliers',
            breadcrumbs: false
          },
          {
            id: 'customers',
            title: 'Customers',
            type: 'item',
            url: urlPrefix + '/customers',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'employee_management',
        title: 'Employee Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'empliyee_master',
            title: 'Employees',
            type: 'item',
            url: urlPrefix + '/employees',
            breadcrumbs: false
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: urlPrefix + '/roles',
            breadcrumbs: false
          },
          {
            id: 'salary',
            title: 'Salary',
            type: 'item',
            url: urlPrefix + '/salary',
            breadcrumbs: false
          }
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
        id: 'HR_management',
        title: 'HR Management',
        type: 'collapse',
        icon: IconUsers,
        children: [
          {
            id: 'Leave_application',
            title: 'Leave Applications',
            type: 'item',
            url: urlPrefix + '/leave-applications',
            breadcrumbs: false
          },
          {
            id: 'Expense',
            title: 'Expense',
            type: 'item',
            url: urlPrefix + '/expenses',
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
            id: 'MaterialStocks',
            title: 'Material Stocks',
            type: 'item',
            url: urlPrefix + '/material-stocks',
          },
          {
            id: 'stockmaterialhistory',
            title: 'Material Stocks History',
            type: 'item',
            url: urlPrefix + '/material-stock-history',
          },
        ]
      },
      {
        id: 'subscribers',
        title: 'Subscribers',
        type: 'item',
        url: urlPrefix + '/subscribers',
        icon: IconMail,
        breadcrumbs: false
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'collapse',
        icon: IconSettings,
        children: [
          {
            id: 'banners',
            title: 'Banners',
            type: 'item',
            url: urlPrefix + '/banners',
            breadcrumbs: false
          },
          {
            id: 'promocodes',
            title: 'Pomocodes',
            type: 'item',
            url: urlPrefix + '/promocodes',
            breadcrumbs: false
          },
          {
            id: 'new-arrivals',
            title: 'New Arrivals',
            type: 'item',
            url: urlPrefix + '/new-arrivals',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'master',
        title: 'Master',
        type: 'collapse',
        icon: IconSettings,
        children: [
          {
            id: 'unit',
            title: 'Unit',
            type: 'item',
            url: urlPrefix + '/units',
            breadcrumbs: false
          },
          {
            id: 'size',
            title: 'Size',
            type: 'item',
            url: urlPrefix + '/sizes',
            breadcrumbs: false
          },
           {
            id: 'purity',
            title: 'Purity',
            type: 'item',
            url: urlPrefix + '/purities',
            breadcrumbs: false
          },
          {
            id: 'tax',
            title: 'Tax',
            type: 'item',
            url: urlPrefix + '/tax',
            breadcrumbs: false
          },
          {
            id: 'certificate',
            title: 'Certificates',
            type: 'item',
            url: urlPrefix + '/certificates',
            breadcrumbs: false
          },
          {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: urlPrefix + '/countries',
            breadcrumbs: false
          },
          {
            id: 'state',
            title: 'State',
            type: 'item',
            url: urlPrefix + '/states',
            breadcrumbs: false
          },
          {
            id: 'district',
            title: 'District',
            type: 'item',
            url: urlPrefix + '/districts',
            breadcrumbs: false
          },
          {
            id: 'returnpolicy',
            title: 'Return Policy',
            type: 'item',
            url: urlPrefix + '/return-policy',
            breadcrumbs: false
          },
          {
            id: 'holidays',
            title: 'Holidays',
            type: 'item',
            url: urlPrefix + '/holidays',
            breadcrumbs: false
          }
        ]
      },
      
      /*{
        id: 'payments',
        title: 'Payments',
        type: 'item',
        url: urlPrefix + '/payments',
        icon: IconCash,
        breadcrumbs: false
      },*/
    ]
  }
];

export default superadminMenus;