import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import {hasPermission} from 'src/helpers/helper';

const LoginPage = Loadable(lazy(() => import('../pages/Distributor/Auth/Login')));
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

// retailer
const RetailerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer')));
const RetailerCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Create')));
const RetailerEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Edit')));
const RetailerViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/View')));
const MyRetailerPage = Loadable(lazy(() => import('../pages/SuperAdmin/MyRetailer')));

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
const SalesExecutiveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/SalesExecutive/View')));

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
const LeaveApplicationViewPage =Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application/View')));

// expense
const ExpensePage =Loadable(lazy(() => import('../pages/SuperAdmin/Expense')));

//stocks
const StocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Stocks/View')));

//purchase
const PurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase')));
const PurchaseCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Create')));
const PurchaseEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Edit')));
const PurchaseReturnPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/Return')));
const PurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/View')));
const PurchaseDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/DownloadView')));

//loan
const LoanPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans')));
const LoanViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Loans/View')));

//sales
const SalePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Create')));
const SaleViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/View')));
const SaleDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/DownloadView')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval/View')));
const PurchaseOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval')));
const PurchaseOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/PurchaseOnApproval/View')));

//profile
const EditProfilePage = Loadable(lazy(() => import('../pages/Distributor/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('../pages/Distributor/Profile/ChangePassword')));

//roles
const RolePage = Loadable(lazy(() => import('../pages/SuperAdmin/Role')));

//customers
const CustomerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer')));
const CustomerViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer/View')));

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

const OrderPage = Loadable(lazy(() => import('../pages/Distributor/Orders')));
const OrderViewPage = Loadable(lazy(() => import('../pages/Distributor/Orders/View')));

// My Order 
const MyOrderPage = Loadable(lazy(() => import('../pages/Distributor/MyOrder')));
const MyOrderCreatePage = Loadable(lazy(() => import('../pages/Distributor/MyOrder/Create')));
const MyOrderViewPage = Loadable(lazy(() => import('../pages/Distributor/MyOrder/View')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received/View')));

//search
const SearchPage = Loadable(lazy(() => import('../pages/SuperAdmin/Search')));

//Return orders
const ReturnOrderPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder/View')));


const routePrefix = '/distributor';
const DistributorRoutes = (isLoggedIn, permissions) => [
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
        path: 'retailers',
        element: <RetailerPage />
      },
      {
        path: 'retailers/Create',
        element: <RetailerCreatePage />
      },
      {
        path: 'retailers/Edit/:id',
        element: <RetailerEditPage />
      },
      {
        path: 'retailers/View/:id',
        element: <RetailerViewPage />
      },
      {
        path: 'my-retailers',
        element: <MyRetailerPage />
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
        path: 'sales/Download-View/:id',
        element: <SaleDownloadViewPage />
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
        path: 'sales-executive',
        element: <SalesExecutivePage />
      },
      {
        path: 'sales-executive/View/:id',
        element: <SalesExecutiveViewPage />
      },
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'customers/View/:id',
        element: <CustomerViewPage />
      },
      {
        path: 'payments',
        element: <PaymentPage />
      },
      {
        path: 'wallet-history',
        element: <WalletPage />
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
        path: 'orders',
        element: <OrderPage />
      },
      {
        path: 'orders/View/:id',
        element: <OrderViewPage />
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
        path: 'purchases',
        element: <PurchasePage />
      },
      {
        path: 'purchases/View/:id',
        element: <PurchaseViewPage />
      },
      {
        path: 'purchases/Download-View/:id',
        element: <PurchaseDownloadViewPage />
      },
      {
        path: 'purchases/Return/:id',
        element: <PurchaseReturnPage />
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
        path: 'transfer',
        element: <TransferPage />
      },
      {
        path: 'transfer/View/:id',
        element: <TransferViewPage />
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
        path: 'suppliers',
        element: <SupplierPage />
      },
      {
        path: 'suppliers/View/:id',
        element: <SupplierViewPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'leave-applications',
        element: <LeaveApplicationPage />
      },
      {
        path: 'leave-applications/View/:id',
        element: <LeaveApplicationViewPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />,
        permission: hasPermission(permissions, 'expense', 'list')
      },
      {
        path: 'return-orders',
        element: <ReturnOrderPage />
      },
      {
        path: 'return-orders/View/:id',
        element: <ReturnOrderViewPage />
      }
    ]
  }
];

export default DistributorRoutes;