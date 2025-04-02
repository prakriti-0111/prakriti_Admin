import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const LoginPage = Loadable(lazy(() => import('../pages/Admin/Auth/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('../pages/Admin/Auth/ForgotPassword')));
const DashboardPage = Loadable(lazy(() => import('../pages/SuperAdmin/Dashboard')));
const CertificatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Certificate')));
const CategoryPage = Loadable(lazy(() => import('../pages/SuperAdmin/Category')));
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
const DistributorViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Distributor/View')));

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

//material stocks
const MaterialStocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks')));
const MaterialStocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks/View')));
const MaterialStocksHistoryPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialStocks/history')));

// worker
/*const WorkerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Worker/Create')));
const WorkerEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Worker/Edit')));*/

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

//material price
const MaterialPricePage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice')));
const MaterialPriceCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice/Create')));
const MaterialPriceEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/MaterialPrice/Edit')));

// leave-application
const LeaveApplicationPage =Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application')));

// expense
const ExpensePage =Loadable(lazy(() => import('../pages/SuperAdmin/Expense')));

//stocks
const StocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Stocks/View')));

//purchase
const PurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase')));
const PurchaseCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Create')));
const PurchaseEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Edit')));
//const PurchaseReturnPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Return')));
const PurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/View')));
const PurchaseDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/DownloadView')));
const PurchaseProductsPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/PurchaseProducts')));

//loan
const LoanPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans')));
const LoanViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans/View')));

//sales
const SalePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Create')));
const SaleViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/View')));
const SaleEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Edit')));
const SaleDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/DownloadView')));
const SaleProductsPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/SaleProducts')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval/View')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval/View')));

//profile
const EditProfilePage = Loadable(lazy(() => import('../pages/Admin/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('../pages/Admin/Profile/ChangePassword')));

//roles
const RolePage = Loadable(lazy(() => import('../pages/SuperAdmin/Role')));

//orders
const OrderPage = Loadable(lazy(() => import('../pages/Admin/Orders')));
const OrderViewPage = Loadable(lazy(() => import('../pages/Admin/Orders/View')));

//customers
const CustomerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer')));

//paymenta
const PaymentPage = Loadable(lazy(() => import('../pages/SuperAdmin/Payment')));
const WalletPage = Loadable(lazy(() => import('../pages/SuperAdmin/Payment/wallet')));

//Return policy
const ReturnPolicyPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPolicy')));

//Return purchase
const ReturnPurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase')));
const ReturnPurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase/View')));

//Return sale
const ReturnSalePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale')));
const ReturnSalePageViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale/View')));

// My Order 
const MyOrderPage = Loadable(lazy(() => import('../pages/Admin/MyOrder')));
const MyOrderCreatePage = Loadable(lazy(() => import('../pages/Admin/MyOrder/Create')));
const MyOrderViewPage = Loadable(lazy(() => import('../pages/Admin/MyOrder/View')));

//search
const SearchPage = Loadable(lazy(() => import('../pages/SuperAdmin/Search')));

//Return orders
const ReturnOrderPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received/View')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer/View')));

const routePrefix = '/admin';
const AdminRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/admin/login" />,
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
        path: 'investors',
        element: <InvestorPage />
      },
      {
        path: 'investors/Create',
        element: <InvestorCreatePage />
      },
      {
        path: 'investors/Edit/:id',
        element: <InvestorEditPage />
      },
      {
        path: 'distributors',
        element: <DistributorPage />
      },
      {
        path: 'distributors/View/:id',
        element: <DistributorViewPage />
      },
      {
        path: 'sales-executive',
        element: <SalesExecutivePage />
      },
      {
        path: 'sales-executive/Create',
        element: <SalesExecutiveCreatePage />
      },
      {
        path: 'sales-executive/Edit/:id',
        element: <SalesExecutiveEditPage />
      },
      {
        path: 'retailers',
        element: <RetailerPage />
      },
      {
        path: 'retailers/Create',
        element: <RetailerCreatePage />
      },
      // {
      //   path: 'retailers/Edit/:id',
      //   element: <RetailerEditPage />
      // },
      {
        path: 'retailers/View/:id',
        element: <RetailerViewPage />
      },
      {
        path: 'suppliers',
        element: <SupplierPage />
      },
      {
        path: 'suppliers/Create',
        element: <SupplierCreatePage />
      },
      {
        path: 'suppliers/Edit/:id',
        element: <SupplierEditPage />
      },
      {
        path: 'suppliers/View/:id',
        element: <SupplierViewPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />
      },
      {
        path: 'stocks',
        element: <StocksPage />
      },
      {
        path: 'stocks/View/:id',
        element: <StocksViewPage />
      },
      {
        path: 'purchases',
        element: <PurchasePage />
      },
      {
        path: 'purchases/Create',
        element: <PurchaseCreatePage />
      },
      {
        path: 'purchases/Edit/:id',
        element: <PurchaseEditPage />
      },
      /* {
        path: 'purchases/Return/:id',
        element: <PurchaseReturnPage />
      }, */
      {
        path: 'purchases/View/:id',
        element: <PurchaseViewPage />
      },
      {
        path: 'purchase-products',
        element: <PurchaseProductsPage />
      },
      {
        path: 'purchases/Download-View/:id',
        element: <PurchaseDownloadViewPage />
      },
      {
        path: 'loans',
        element: <LoanPage />
      },
      {
        path: 'material-stocks',
        element: <MaterialStocksPage />
      },
      {
        path: 'material-stocks/View/:id',
        element: <MaterialStocksViewPage />
      },
      {
        path: 'loans/View/:id',
        element: <LoanViewPage />
      },
      {
        path: 'sales',
        element: <SalePage />
      },
      {
        path: 'sales/Create',
        element: <SaleCreatePage />
      },
      {
        path: 'sales/View/:id',
        element: <SaleViewPage />
      },
      {
        path: 'sales/Edit/:id',
        element: <SaleEditPage />
      },
      {
        path: 'sales/Download-View/:id',
        element: <SaleDownloadViewPage />
      },
      {
        path: 'sale-products',
        element: <SaleProductsPage />
      },
      {
        path: 'edit-profile',
        element: <EditProfilePage />
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />
      },
      {
        path: 'roles',
        element: <RolePage />
      },
      {
        path: 'orders',
        element: <OrderPage />
      },
      {
        path: 'orders/View/:id',
        element: <OrderViewPage />
      },
      
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'payments',
        element: <PaymentPage />
      },
      {
        path: 'sale-on-approve',
        element: <SaleOnApprovePage />
      },
      {
        path: 'sale-on-approve/View/:id',
        element: <SaleOnApproveViewPage />
      },
      {
        path: 'wallet-history',
        element: <WalletPage />
      },
      {
        path: 'purchase-on-approve',
        element: <PurchaseOnApprovePage />
      },
      {
        path: 'purchase-on-approve/View/:id',
        element: <PurchaseOnApproveViewPage />
      },
      {
        path: 'return-policy',
        element: <ReturnPolicyPage />
      },
      {
        path: 'return-purchase',
        element: <ReturnPurchasePage />
      },
      {
        path: 'return-purchase/View/:id',
        element: <ReturnPurchaseViewPage />
      },
      {
        path: 'return-sale',
        element: <ReturnSalePage />
      },
      {
        path: 'return-sale/View/:id',
        element: <ReturnSalePageViewPage />
      },
      {
        path: 'my-order',
        element: <MyOrderPage />
      },
      {
        path: 'my-order/Create',
        element: <MyOrderCreatePage />
      },
      {
        path: 'my-order/View/:id',
        element: <MyOrderViewPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />
      },
      {
        path: 'return-orders/View/:id',
        element: <ReturnOrderViewPage />
      },
      {
        path: 'received',
        element: <ReceivedPage />
      },
      {
        path: 'received/View/:id',
        element: <ReceivedViewPage />
      },
      {
        path: 'transfer',
        element: <TransferPage />
      },
      {
        path: 'transfer/View/:id',
        element: <TransferViewPage />
      },
      {
        path: 'distributors/Create',
        element: <DistributorCreatePage />
      },
      {
        path: 'distributors/Edit/:id',
        element: <DistributorEditPage />
      },
    ]
  },
  {
    path: `${routePrefix}/login`,
    element: <LoginPage />,
  },
  {
    path: `${routePrefix}/forgot-password`,
    element: <ForgotPasswordPage />,
  }
];

export default AdminRoutes;