import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardPage = Loadable(lazy(() => import('../pages/SuperAdmin/Dashboard')));

// retailer
const RetailerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer')));
const MyRetailerPage = Loadable(lazy(() => import('../pages/SuperAdmin/MyRetailer')));
const RetailerCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Create')));
const RetailerEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/Edit')));
const RetailerViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Retailer/View')));

//stocks
const StocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/Stocks')));
const StocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Stocks/View')));

//Return stocks
const ReturnStocksPage =Loadable(lazy(() => import('../pages/SuperAdmin/ReturnStocks')));
const ReturnStocksViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnStocks/View')));

//profile
const EditProfilePage = Loadable(lazy(() => import('../pages/SE/Profile/EditProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('../pages/SE/Profile/ChangePassword')));


//customers
const CustomerPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer')));
const CustomerViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Customer/View')));

//paymenta
const PaymentPage = Loadable(lazy(() => import('../pages/SuperAdmin/Payment')));
const WalletPage = Loadable(lazy(() => import('../pages/SuperAdmin/Payment/wallet')));

const OrderPage = Loadable(lazy(() => import('../pages/SE/Orders')));
const OrderViewPage = Loadable(lazy(() => import('../pages/SE/Orders/View')));

//attendence
const AttendencePage = Loadable(lazy(() => import('../pages/SE/Attendence')));

//Return purchase
const ReturnPurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase')));
const ReturnPurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnPurchase/View')));

//Return sale
const ReturnSalePage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale')));
const ReturnSalePageViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnSale/View')));

//purchase
const PurchasePage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase')));
const PurchaseViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Purchase/View')));

//sales
const SalePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale')));
const SaleCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Create')));
const SaleViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/View')));
const SaleEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/Edit')));
const SaleDownloadViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Sale/DownloadView')));

//Transfer 
const TransferPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer')));
const TransferViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Transfer/View')));

//Received 
const ReceivedPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received')));
const ReceivedViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Received/View')));

// leave-application
const LeaveApplicationPage = Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application')));
const LeaveApplicationViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application/View')));
const LeaveApplicationCreatePage = Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application/Create')));
const LeaveApplicationEditPage = Loadable(lazy(() => import('../pages/SuperAdmin/Leave_application/Edit')));

//Sale On Approval
const SaleOnApprovePage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval')));
const SaleOnApproveViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/SaleOnApproval/View')));

//My Performance
const MyPerformancePage = Loadable(lazy(() => import('../pages/SuperAdmin/MyPerformance')));

//search
const SearchPage = Loadable(lazy(() => import('../pages/SuperAdmin/Search')));

// expense
const ExpensePage =Loadable(lazy(() => import('../pages/SuperAdmin/Expense')));

//Return orders
const ReturnOrderPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder')));
const ReturnOrderViewPage = Loadable(lazy(() => import('../pages/SuperAdmin/ReturnOrder/View')));

const routePrefix = '/sales-executive';
const SeRoutes = (isLoggedIn) => [
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
        path: 'my-retailers',
        element: <MyRetailerPage />
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
        path: 'stocks',
        element: <StocksPage />
      },
      {
        path: 'stocks/View/:id',
        element: <StocksViewPage />
      },
      {
        path: 'return-stocks',
        element: <ReturnStocksPage />
      },
      {
        path: 'return-stocks/View/:id',
        element: <ReturnStocksViewPage />
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
        path: 'attendence',
        element: <AttendencePage />
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
        path: 'sales',
        element: <SalePage />
      },
      {
        path: 'sales/Create',
        element: <SaleCreatePage />
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
        path: 'leave-applications',
        element: <LeaveApplicationPage />
      },
      {
        path: 'leave-applications/Create',
        element: <LeaveApplicationCreatePage />
      },
      {
        path: 'leave-applications/Edit/:id',
        element: <LeaveApplicationEditPage />
      },
      {
        path: 'leave-applications/View/:id',
        element: <LeaveApplicationViewPage />
      },
      {
        path: 'my-performance',
        element: <MyPerformancePage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'expenses',
        element: <ExpensePage />
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

export default SeRoutes;