import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import {hasPermission} from 'src/helpers/helper';

// worker
const WorkerPage = Loadable(lazy(() => import('../pages/Employee/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('../pages/Employee/Worker/Create')));
const WorkerEditPage = Loadable(lazy(() => import('../pages/Employee/Worker/Edit')));
const WorkerViewPage = Loadable(lazy(() => import('../pages/Employee/Worker/View')));

// StockHistoryPage
const StockHistoryPage = Loadable(lazy(() => import('../pages/Employee/StockHistory')));
const StockHistoryCreatePage = Loadable(lazy(() => import('../pages/Employee/StockHistory/Create')));
const StockHistoryEditPage = Loadable(lazy(() => import('../pages/Employee/StockHistory/Edit')));

//profile
const EditProfilePage = Loadable(lazy(() => import('../pages/Employee/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('../pages/Employee/Profile/ChangePassword')));

/**
 * Superadmin routes
 */
const DashboardPage = Loadable(lazy(() => import('../pages/SuperAdmin/Dashboard')));
const CertificatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Certificate')));
const CategoryPage = Loadable(lazy(() => import('../pages/SuperAdmin/Category')));
//const CertificateEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Certificate/Edit')));
const SubCategoryPage = Loadable(lazy(() => import('../pages/SuperAdmin/SubCategory')));

//country
const CountryPage = Loadable(lazy(() => import('../pages/SuperAdmin/Country')));

//State
const StatePage = Loadable(lazy(() => import('../pages/SuperAdmin/State')));

//District
const DistrictPage = Loadable(lazy(() => import('../pages/SuperAdmin/District')));

// investor
const InvestorPage = Loadable(lazy(() => import('../pages/SuperAdmin/Investor')));
const InvestorCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Investor/Create')));
const InvestorEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Investor/Edit')));

// admin
const AdminPage = Loadable(lazy(() => import('../pages/SuperAdmin/Admin')));
const AdminCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Admin/Create')));
const AdminEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Admin/Edit')));
const AdminViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Admin/View')));


// distributor
const DistributorPage = Loadable(lazy(() => import('../pages/SuperAdmin/Distributor')));
const DistributorCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Distributor/Create')));
const DistributorEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Distributor/Edit')));

// retailer
const RetailerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer')));
const RetailerCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Create')));
const RetailerEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Edit')));
const RetailerViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/View')));

// supplier
const SupplierPage = Loadable(lazy(() => import('../pages/SuperAdmin/Supplier')));
const SupplierCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Supplier/Create')));
const SupplierEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Supplier/Edit')));
const SupplierViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Supplier/View')));

// employee
const EmployeePage = Loadable(lazy(() => import('../pages/SuperAdmin/Employee')));
const EmployeeCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Employee/Create')));
const EmployeeEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Employee/Edit')));
const EmployeeViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Employee/View')));

// sales executive
const SalesExecutivePage = Loadable(lazy(() => import('../pages/SuperAdmin/SalesExecutive')));
const SalesExecutiveCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/SalesExecutive/Create')));
const SalesExecutiveEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/SalesExecutive/Edit')));

//attendence
const AttendencePage = Loadable(lazy(() => import('../pages/SE/Attendence')));

//tax 
const TaxPage = Loadable(lazy(() => import('../pages/SuperAdmin/Tax')));

// Unit 
const UnitPage = Loadable(lazy(() => import('../pages/SuperAdmin/Unit')));

// Purity 
const PurityPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purity')));

// Size 
const SizePage = Loadable(lazy(() => import('../pages/SuperAdmin/Size')));

// Material
const MaterialPage = Loadable(lazy(() => import('../pages/SuperAdmin/Material')));

// Product 
const ProductPage = Loadable(lazy(() => import('../pages/SuperAdmin/Product')));
const ProductCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Product/Create')));
const ProductEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Product/Edit')));

// Promocode
const PromocodePage = Loadable(lazy(() => import('../pages/SuperAdmin/Promocode')));
const PromocodeCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Promocode/Create')));
const PromocodeEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Promocode/Edit')));

//material price
const MaterialPricePage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice')));
const MaterialPriceCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice/Create')));
const MaterialPriceEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice/Edit')));

// leave-application
const LeaveApplicationPage =Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application')));
const LeaveApplicationViewPage =Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application/View')));

// expense
const ExpensePage =Loadable(lazy(() => import('../pages/SuperAdmin/Expense')));

//stocks
const StocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Stocks/View')));

//material stocks
const MaterialStocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks')));
const MaterialStocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks/View')));
const MaterialStocksHistoryPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks/history')));

//purchase
const PurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase')));
const PurchaseCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Create')));
const PurchaseEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Edit')));
const PurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/View')));
const PurchaseAllViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/AllView')));
const PurchaseReturnPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Return')));
const PurchaseProductsPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/PurchaseProducts')));

//loan
const LoanPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans')));
const LoanViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans/View')));

//sales
const SalePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Create')));
const SaleViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/View')));
const SaleDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/DownloadView')));
//const OwnSalePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/SaleProducts')));
//const OwnSaleViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/OwnSaleView')));
const SaleProductsPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/SaleProducts')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval/View')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval/View')));

//roles
const RolePage = Loadable(lazy(() => import('../pages/SuperAdmin/Role')));

//orders
const OrderPage = Loadable(lazy(() => import('../pages/SuperAdmin/Orders')));
const OrderViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Orders/View')));

//customers
const CustomerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer')));

//paymenta
const WalletPage = Loadable(lazy(() => import('../pages/SuperAdmin/Payment/wallet')));

//Return policy
const ReturnPolicyPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPolicy')));

//Return purchase
const ReturnPurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase')));
const ReturnPurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase/View')));

//Return sale
const ReturnSalePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale')));
const ReturnSalePageViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale/View')));

//banners
const BannerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Banner')));

//search
const SearchPage = Loadable(lazy(() => import('../pages/SuperAdmin/Search')));

//Return orders
const ReturnOrderPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder/View')));

//holiday
const HolidayPage = Loadable(lazy(() => import('../pages/SuperAdmin/Holiday')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received/View')));

//SubscriberPage
const SubscriberPage =Loadable(lazy(() => import('../pages/SuperAdmin/Subscriber')));

const routePrefix = '/employee';
const EmployeeRoutes = (isLoggedIn, permissions) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to={`/login`} />,
    children: [
      {
        path: routePrefix,
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'edit-profile',
        element: <EditProfilePage />
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />
      },

      /**
       * Superadmin routes
       */
      {
        path: 'workers',
        element: <WorkerPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/Create',
        element: <WorkerCreatePage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/Edit/:id',
        element: <WorkerEditPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'workers/View/:id',
        element: <WorkerViewPage />,
        permission: hasPermission(permissions, 'workers',  'list')
      },
      {
        path: 'stock-histories',
        element: <StockHistoryPage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'stock-histories/Create',
        element: <StockHistoryCreatePage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'stock-histories/Edit/:id',
        element: <StockHistoryEditPage />,
        permission: hasPermission(permissions, 'stock_history',  'list')
      },
      {
        path: 'certificates',
        element: <CertificatePage />,
        permission: hasPermission(permissions, 'certificates',  'list')
      },
      {
        path: 'tax',
        element: <TaxPage />,
        permission: hasPermission(permissions, 'tax',  'list')
      },
      {
        path: 'units',
        element: <UnitPage />,
        permission: hasPermission(permissions, 'unit',  'list')
      },
      {
        path: 'purities',
        element: <PurityPage />,
        permission: hasPermission(permissions, 'purity',  'list')
      },
      {
        path: 'sizes',
        element: <SizePage />,
        permission: hasPermission(permissions, 'size',  'list')
      },
      {
        path: 'countries',
        element: <CountryPage />,
        permission: hasPermission(permissions, 'country',  'list')
      },
      {
        path: 'states',
        element: <StatePage />,
        permission: hasPermission(permissions, 'state',  'list')
      },
      {
        path: 'districts',
        element: <DistrictPage />,
        permission: hasPermission(permissions, 'district',  'list')
      },
      {
        path: 'return-policy',
        element: <ReturnPolicyPage />,
        permission: hasPermission(permissions, 'return_policy',  'list')
      },
      {
        path: 'holidays',
        element: <HolidayPage />,
        permission: hasPermission(permissions, 'holidays',  'list')
      },
      {
        path: 'products',
        element: <ProductPage />,
        permission: hasPermission(permissions, 'products',  'list')
      },
      {
        path: 'products/Create',
        element: <ProductCreatePage />,
        permission: hasPermission(permissions, 'products',  'add')
      },
      {
        path: 'products/Edit/:id',
        element: <ProductEditPage />,
        permission: hasPermission(permissions, 'products',  'edit')
      },
      {
        path: 'material-prices',
        element: <MaterialPricePage />,
        permission: hasPermission(permissions, 'price_list',  'list')
      },
      {
        path: 'material-prices/Create',
        element: <MaterialPriceCreatePage />,
        permission: hasPermission(permissions, 'price_list',  'add')
      },
      {
        path: 'material-prices/Edit/:id',
        element: <MaterialPriceEditPage />,
        permission: hasPermission(permissions, 'price_list',  'edit')
      },
      {
        path: 'categories',
        element: <CategoryPage />,
        permission: hasPermission(permissions, 'category',  'list')
      },
      {
        path: 'sub-categories',
        element: <SubCategoryPage />,
        permission: hasPermission(permissions, 'sub_category',  'list')
      },
      {
        path: 'materials',
        element: <MaterialPage />,
        permission: hasPermission(permissions, 'material',  'list')
      },
      {
        path: 'admins',
        element: <AdminPage />,
        permission: hasPermission(permissions, 'admin',  'list')
      },
      {
        path: 'admins/Create',
        element: <AdminCreatePage />,
        permission: hasPermission(permissions, 'admin',  'add')
      },
      {
        path: 'admins/Edit/:id',
        element: <AdminEditPage />,
        permission: hasPermission(permissions, 'admin',  'edit')
      },
      {
        path: 'admins/View/:id',
        element: <AdminViewPage />,
        permission: hasPermission(permissions, 'admin',  'view')
      },
      {
        path: 'distributors',
        element: <DistributorPage />,
        permission: hasPermission(permissions, 'distributor',  'list')
      },
      {
        path: 'distributors/Create',
        element: <DistributorCreatePage />,
        permission: hasPermission(permissions, 'distributor',  'add')
      },
      {
        path: 'distributors/Edit/:id',
        element: <DistributorEditPage />,
        permission: hasPermission(permissions, 'distributor',  'edit')
      },
      {
        path: 'retailers',
        element: <RetailerPage />,
        permission: hasPermission(permissions, 'retailer',  'list')
      },
      {
        path: 'retailers/Create',
        element: <RetailerCreatePage />,
        permission: hasPermission(permissions, 'retailer',  'add')
      },
      {
        path: 'retailers/Edit/:id',
        element: <RetailerEditPage />,
        permission: hasPermission(permissions, 'retailer', 'edit')
      },
      {
        path: 'retailers/View/:id',
        element: <RetailerViewPage />,
        permission: hasPermission(permissions, 'retailer', 'view')
      },
      {
        path: 'suppliers',
        element: <SupplierPage />,
        permission: hasPermission(permissions, 'supplier', 'list')
      },
      {
        path: 'suppliers/Create',
        element: <SupplierCreatePage />,
        permission: hasPermission(permissions, 'supplier', 'add')
      },
      {
        path: 'suppliers/Edit/:id',
        element: <SupplierEditPage />,
        permission: hasPermission(permissions, 'supplier', 'edit')
      },
      {
        path: 'suppliers/View/:id',
        element: <SupplierViewPage />,
        permission: hasPermission(permissions, 'supplier', 'view')
      },
      {
        path: 'customers',
        element: <CustomerPage />,
        permission: hasPermission(permissions, 'customer', 'list')
      },
      {
        path: 'sales-executive',
        element: <SalesExecutivePage />,
        permission: hasPermission(permissions, 'sales_executive', 'list')
      },
      {
        path: 'sales-executive/Create',
        element: <SalesExecutiveCreatePage />,
        permission: hasPermission(permissions, 'sales_executive', 'add')
      },
      {
        path: 'sales-executive/Edit/:id',
        element: <SalesExecutiveEditPage />,
        permission: hasPermission(permissions, 'sales_executive', 'edit')
      },
      {
        path: 'employees',
        element: <EmployeePage />,
        permission: hasPermission(permissions, 'employees', 'list')
      },
      {
        path: 'employees/Create',
        element: <EmployeeCreatePage />,
        permission: hasPermission(permissions, 'employees', 'add')
      },
      {
        path: 'employees/Edit/:id',
        element: <EmployeeEditPage />,
        permission: hasPermission(permissions, 'employees', 'edit')
      },
      {
        path: 'employees/View/:id',
        element: <EmployeeViewPage />,
        permission: hasPermission(permissions, 'employees', 'view')
      },
      {
        path: 'roles',
        element: <RolePage />,
        permission: hasPermission(permissions, 'roles', 'list')
      },
      {
        path: 'loans',
        element: <LoanPage />,
        permission: hasPermission(permissions, 'loans', 'list')
      },
      {
        path: 'loans/View/:id',
        element: <LoanViewPage />,
        permission: hasPermission(permissions, 'loans', 'view')
      },
      {
        path: 'investors',
        element: <InvestorPage />,
        permission: hasPermission(permissions, 'investors', 'list')
      },
      {
        path: 'investors/Create',
        element: <InvestorCreatePage />,
        permission: hasPermission(permissions, 'investors', 'add')
      },
      {
        path: 'investors/Edit/:id',
        element: <InvestorEditPage />,
        permission: hasPermission(permissions, 'investors', 'edit')
      },
      {
        path: 'stocks',
        element: <StocksPage />,
        permission: hasPermission(permissions, 'stock', 'list')
      },
      {
        path: 'stocks/View/:id',
        element: <StocksViewPage />,
        permission: hasPermission(permissions, 'stock', 'view')
      },
      {
        path: 'purchases',
        element: <PurchasePage />,
        permission: hasPermission(permissions, 'purchase', 'list')
      },
      {
        path: 'purchase-products',
        element: <PurchaseProductsPage />,
        permission: hasPermission(permissions, 'purchase', 'list')
      },
      {
        path: 'purchases/Create',
        element: <PurchaseCreatePage />,
        permission: hasPermission(permissions, 'purchase', 'add')
      },
      {
        path: 'purchases/Edit/:id',
        element: <PurchaseEditPage />,
        permission: hasPermission(permissions, 'purchase', 'edit')
      },
      {
        path: 'purchases/View/:id',
        element: <PurchaseViewPage />,
        permission: hasPermission(permissions, 'purchase', 'view')
      },
      {
        path: 'purchases/all-view/:id',
        element: <PurchaseAllViewPage />,
        permission: hasPermission(permissions, 'purchase', 'view')
      },
      {
        path: 'purchases/Return/:id',
        element: <PurchaseReturnPage />,
        permission: hasPermission(permissions, 'return_purchase', 'view')
      },
      {
        path: 'sales',
        element: <SalePage />,
        permission: hasPermission(permissions, 'sales', 'list')
      },
      {
        path: 'sale-products',
        element: <SaleProductsPage />,
        permission: hasPermission(permissions, 'sales', 'list')
      },
      {
        path: 'sales/Create',
        element: <SaleCreatePage />,
        permission: hasPermission(permissions, 'sales', 'add')
      },
      {
        path: 'sales/View/:id',
        element: <SaleViewPage />,
        permission: hasPermission(permissions, 'sales', 'view')
      },
      {
        path: 'sales/Download-View/:id',
        element: <SaleDownloadViewPage />
      },
      {
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />,
        permission: hasPermission(permissions, 'sale_on_approval', 'list')
      },
      {
        path: 'sale-on-approve/View/:id',
        element: <SaleOnApproveViewPage />,
        permission: hasPermission(permissions, 'sale_on_approval', 'view')
      },
      {
        path: 'purchase-on-approve',
        element: <PurchaseOnApprovePage />,
        permission: hasPermission(permissions, 'purchase_on_approval', 'list')
      },
      {
        path: 'purchase-on-approve/View/:id',
        element: <PurchaseOnApproveViewPage />,
        permission: hasPermission(permissions, 'purchase_on_approval', 'view')
      },
      {
        path: 'return-purchase',
        element: <ReturnPurchasePage />,
        permission: hasPermission(permissions, 'return_purchase', 'list')
      },
      {
        path: 'return-purchase/View/:id',
        element: <ReturnPurchaseViewPage />,
        permission: hasPermission(permissions, 'return_purchase', 'view')
      },
      {
        path: 'return-sale',
        element: <ReturnSalePage />,
        permission: hasPermission(permissions, 'return_sale', 'list')
      },
      {
        path: 'return-sale/View/:id',
        element: <ReturnSalePageViewPage />,
        permission: hasPermission(permissions, 'return_sale', 'view')
      },
      {
        path: 'search',
        element: <SearchPage />,
        permission: hasPermission(permissions, ['purchase', 'sales'], ['list', 'view'])
      },
      {
        path: 'wallet-history',
        element: <WalletPage />,
        permission: hasPermission(permissions, ['purchase', 'sales'], ['list', 'view'])
      },
      {
        path: 'orders',
        element: <OrderPage />,
        permission: hasPermission(permissions, 'orders', 'list')
      },
      {
        path: 'orders/View/:id',
        element: <OrderViewPage />,
        permission: hasPermission(permissions, 'orders', 'view')
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />,
        permission: hasPermission(permissions, 'return_orders', 'list')
      },
      {
        path: 'return-orders/View/:id',
        element: <ReturnOrderViewPage />,
        permission: hasPermission(permissions, 'return_orders', 'view')
      },
      {
        path: 'promocodes',
        element: <PromocodePage />,
        permission: hasPermission(permissions, 'promocodes', 'list')
      },
      {
        path: 'promocodes/Create',
        element: <PromocodeCreatePage />,
        permission: hasPermission(permissions, 'promocodes', 'add')
      },
      {
        path: 'promocodes/Edit/:id',
        element: <PromocodeEditPage />,
        permission: hasPermission(permissions, 'promocodes', 'edit')
      },
      {
        path: 'banners',
        element: <BannerPage />,
        permission: hasPermission(permissions, 'banners', 'list')
      },
      {
        path: 'leave-applications',
        element: <LeaveApplicationPage />,
        permission: hasPermission(permissions, 'leave_applications', 'list')
      },
      {
        path: 'leave-applications/View/:id',
        element: <LeaveApplicationViewPage />,
        permission: hasPermission(permissions, 'leave_applications', 'view')
      },
      {
        path: 'expenses',
        element: <ExpensePage />,
        permission: hasPermission(permissions, 'expense', 'list')
      },
      {
        path: 'material-stocks',
        element: <MaterialStocksPage />,
        permission: hasPermission(permissions, 'material_stock', 'list')
      },
      {
        path: 'material-stocks/View/:id',
        element: <MaterialStocksViewPage />,
        permission: hasPermission(permissions, 'material_stock', 'view')
      },
      {
        path: 'material-stock-history',
        element: <MaterialStocksHistoryPage />,
        permission: hasPermission(permissions, 'material_stock_history', 'list')
      },
      {
        path: 'transfer',
        element: <TransferPage />,
        permission: hasPermission(permissions, 'transfer', 'list')
      },
      {
        path: 'transfer/View/:id',
        element: <TransferViewPage />,
        permission: hasPermission(permissions, 'transfer', 'view')
      },
      {
        path: 'received',
        element: <ReceivedPage />,
        permission: hasPermission(permissions, 'received', 'list')
      },
      {
        path: 'received/View/:id',
        element: <ReceivedViewPage />,
        permission: hasPermission(permissions, 'received', 'view')
      },
      {
        path: 'subscribers',
        element: <SubscriberPage />,
        permission: hasPermission(permissions, 'subscribers', 'list')
      },
      {
        path: 'attendence',
        element: <AttendencePage />
      },
    ]
  }
];


export default EmployeeRoutes;