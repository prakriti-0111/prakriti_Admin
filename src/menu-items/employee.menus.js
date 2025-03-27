import { IconDashboard, IconWindmill, IconSettings, IconDiamond, IconUsers, IconShoppingCart, IconBriefcase, IconFileInvoice, IconMail } from '@tabler/icons';
import { hasPermission } from 'src/helpers/helper';

let urlPrefix = '/employee';
const employeeMenus = (permissions) => [
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
        permission: (hasPermission(permissions, 'category', 'list') || hasPermission(permissions, 'sub_category', 'list') || hasPermission(permissions, 'material', 'list') || hasPermission(permissions, 'price_list', 'list') || hasPermission(permissions, 'products', 'list')),
        children: [
          {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: urlPrefix + '/categories',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'category', 'list')
          },
          {
            id: 'product_sub_category',
            title: 'Sub Category',
            type: 'item',
            url: urlPrefix + '/sub-categories',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'sub_category', 'list')
          },
          {
            id: 'material',
            title: 'Material',
            type: 'item',
            url: urlPrefix + '/materials',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'material', 'list')
          },
          {
            id: 'price_list',
            title: 'Price List',
            type: 'item',
            url: urlPrefix + '/material-prices',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'price_list', 'list')
          },
          {
            id: 'product',
            title: 'Products',
            type: 'item',
            url: urlPrefix + '/products',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'products', 'list')
          },
        ]
      },
      {
        id: 'invoice_management',
        title: 'Invoice',
        type: 'collapse',
        icon: IconFileInvoice,
        permission: (hasPermission(permissions, 'purchase', 'list') || hasPermission(permissions, 'sales', 'list') || hasPermission(permissions, 'sale_on_approval', 'list') || hasPermission(permissions, 'purchase_on_approval', 'list') || hasPermission(permissions, 'return_purchase', 'list') || hasPermission(permissions, 'return_sale', 'list')),
        children: [
          {
            id: 'purchase',
            title: 'Purchase',
            type: 'item',
            url: urlPrefix + '/purchases',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'purchase', 'list')
          },
          {
            id: 'sales',
            title: 'Sales',
            type: 'item',
            url: urlPrefix + '/sales',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'sales', 'list')
          },
          {
            id: 'sales_on_approve',
            title: 'Sale On Approval',
            type: 'item',
            url: urlPrefix + '/sale-on-approve',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'sale_on_approval', 'list')
          },
          {
            id: 'purchase_on_approve',
            title: 'Purchase On Approval',
            type: 'item',
            url: urlPrefix + '/purchase-on-approve',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'purchase_on_approval', 'list')
          },
          {
            id: 'return_purchase',
            title: 'Return Purchase',
            type: 'item',
            url: urlPrefix + '/return-purchase',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'return_purchase', 'list')
          },
          {
            id: 'return_sale',
            title: 'Return Sale',
            type: 'item',
            url: urlPrefix + '/return-sale',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'return_sale', 'list')
          },
          {
            id: 'transfer',
            title: 'Transfer',
            type: 'item',
            url: urlPrefix + '/transfer',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'transfer', 'list')
          },
          {
            id: 'received',
            title: 'Received',
            type: 'item',
            url: urlPrefix + '/received',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'received', 'list')
          }
        ]
      },
      {
        id: 'order_management',
        title: 'Order Management',
        type: 'collapse',
        icon: IconShoppingCart,
        permission: (hasPermission(permissions, 'orders', 'list') || hasPermission(permissions, 'return_orders', 'list')),
        children: [
          {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: urlPrefix + '/orders',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'orders', 'list')
          },
          {
            id: 'returnorders',
            title: 'Return Orders',
            type: 'item',
            url: urlPrefix + '/return-orders',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'return_orders', 'list')
          }
        ]
      },
      {
        id: 'user_management',
        title: 'User Management',
        type: 'collapse',
        icon: IconUsers,
        permission: (hasPermission(permissions, 'admin', 'list') || hasPermission(permissions, 'distributor', 'list') || hasPermission(permissions, 'sales_executive', 'list') || hasPermission(permissions, 'retailer', 'list') || hasPermission(permissions, 'supplier', 'list') || hasPermission(permissions, 'customer', 'list')),
        children: [
          {
            id: 'admin',
            title: 'Admin',
            type: 'item',
            url: urlPrefix + '/admins',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'admin', 'list')
          },
          {
            id: 'distributor',
            title: 'Distributor',
            type: 'item',
            url: urlPrefix + '/distributors',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'distributor', 'list')
          },
          {
            id: 'sales_executive',
            title: 'Sales Executive',
            type: 'item',
            url: urlPrefix + '/sales-executive',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'sales_executive', 'list')
          },
          {
            id: 'retailer',
            title: 'Retailer',
            type: 'item',
            url: urlPrefix + '/retailers',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'retailer', 'list')
          },
          {
            id: 'supplier',
            title: 'Supplier',
            type: 'item',
            url: urlPrefix + '/suppliers',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'supplier', 'list')
          },
          {
            id: 'customers',
            title: 'Customers',
            type: 'item',
            url: urlPrefix + '/customers',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'customer', 'list')
          },
        ]
      },
      {
        id: 'employee_management',
        title: 'Employee Management',
        type: 'collapse',
        icon: IconUsers,
        permission: (hasPermission(permissions, 'employees', 'list') || hasPermission(permissions, 'roles', 'list')),
        children: [
          {
            id: 'empliyee_master',
            title: 'Employees',
            type: 'item',
            url: urlPrefix + '/employees',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'employees', 'list')
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: urlPrefix + '/roles',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'roles', 'list')
          }
        ]
      },
      {
        id: 'investor_management',
        title: 'Investors Management',
        type: 'collapse',
        icon: IconUsers,
        permission: (hasPermission(permissions, 'investors', 'list') || hasPermission(permissions, 'loans', 'list')),
        children: [
          {
            id: 'investor',
            title: 'Investors',
            type: 'item',
            url: urlPrefix + '/investors',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'investors', 'list')
          },
          {
            id: 'loans',
            title: 'Loans',
            type: 'item',
            url: urlPrefix + '/loans',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'loans', 'list')
          },
        ]
      },
      {
        id: 'HR_management',
        title: 'HR Management',
        type: 'collapse',
        icon: IconUsers,
        permission: (hasPermission(permissions, 'leave_applications', 'list') || hasPermission(permissions, 'expense', 'list')),
        children: [
          {
            id: 'Leave_application',
            title: 'Leave Applications',
            type: 'item',
            url: urlPrefix + '/leave-applications',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'leave_applications', 'list')
          },
          {
            id: 'Expense',
            title: 'Expense',
            type: 'item',
            url: urlPrefix + '/expenses',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'expense', 'list')
          }
        ]
      },
      {
        id: 'stock_management',
        title: 'Stock Management',
        type: 'collapse',
        icon: IconBriefcase,
        permission: hasPermission(permissions, 'stock', 'list'),
        children: [
          {
            id: 'Stocks',
            title: 'Stocks',
            type: 'item',
            url: urlPrefix + '/stocks',
            permission: hasPermission(permissions, 'stock', 'list')
          },
          {
            id: 'MaterialStocks',
            title: 'Material Stocks',
            type: 'item',
            url: urlPrefix + '/material-stocks',
            permission: hasPermission(permissions, 'material_stock', 'list')
          },
          {
            id: 'stockmaterialhistory',
            title: 'Material Stocks History',
            type: 'item',
            url: urlPrefix + '/material-stock-history',
            permission: hasPermission(permissions, 'material_stock_history', 'list')
          },
        ]
      },
      {
        id: 'worker',
        title: 'Workers',
        type: 'item',
        url: urlPrefix + '/workers',
        icon: IconUsers,
        breadcrumbs: false,
        permission: hasPermission(permissions, 'workers', 'list'),
      },
      {
        id: 'subscribers',
        title: 'Subscribers',
        type: 'item',
        url: urlPrefix + '/subscribers',
        icon: IconMail,
        breadcrumbs: false,
        permission: hasPermission(permissions, 'subscribers', 'list'),
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'collapse',
        icon: IconSettings,
        permission: (hasPermission(permissions, 'promocodes', 'list') || hasPermission(permissions, 'banners', 'list')),
        children: [
          {
            id: 'banners',
            title: 'Banners',
            type: 'item',
            url: urlPrefix + '/banners',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'promocodes', 'list')
          },
          {
            id: 'promocodes',
            title: 'Pomocodes',
            type: 'item',
            url: urlPrefix + '/promocodes',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'banners', 'list')
          }
        ]
      },
      {
        id: 'master',
        title: 'Master',
        type: 'collapse',
        icon: IconSettings,
        permission: (hasPermission(permissions, 'unit', 'list') || hasPermission(permissions, 'size', 'list') || hasPermission(permissions, 'purity', 'list') || hasPermission(permissions, 'tax', 'list') || hasPermission(permissions, 'certificates', 'list') || hasPermission(permissions, 'country', 'list') || hasPermission(permissions, 'state', 'list') || hasPermission(permissions, 'district', 'list') || hasPermission(permissions, 'return_policy', 'list') || hasPermission(permissions, 'holidays', 'list')),
        children: [
          {
            id: 'unit',
            title: 'Unit',
            type: 'item',
            url: urlPrefix + '/units',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'unit', 'list')
          },
          {
            id: 'size',
            title: 'Size',
            type: 'item',
            url: urlPrefix + '/sizes',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'size', 'list')
          },
           {
            id: 'purity',
            title: 'Purity',
            type: 'item',
            url: urlPrefix + '/purities',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'purity', 'list')
          },
          {
            id: 'tax',
            title: 'Tax',
            type: 'item',
            url: urlPrefix + '/tax',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'tax', 'list')
          },
          {
            id: 'certificate',
            title: 'Certificates',
            type: 'item',
            url: urlPrefix + '/certificates',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'certificates', 'list')
          },
          {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: urlPrefix + '/countries',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'country', 'list')
          },
          {
            id: 'state',
            title: 'State',
            type: 'item',
            url: urlPrefix + '/states',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'state', 'list')
          },
          {
            id: 'district',
            title: 'District',
            type: 'item',
            url: urlPrefix + '/districts',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'district', 'list')
          },
          {
            id: 'returnpolicy',
            title: 'Return Policy',
            type: 'item',
            url: urlPrefix + '/return-policy',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'return_policy', 'list')
          },
          {
            id: 'holidays',
            title: 'Holidays',
            type: 'item',
            url: urlPrefix + '/holidays',
            breadcrumbs: false,
            permission: hasPermission(permissions, 'holidays', 'list')
          }
        ]
      }
    ]
  }

];

export default employeeMenus;