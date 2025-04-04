import { React, Component } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  CssBaseline,
  Link,
  Box,
  Typography,
  Container,
  Alert,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  getDashboardData,
  sendAutoNotifications,
} from "actions/superadmin/profile.actions";
import {
  getRoleName,
  getUserDashboardRoute,
  isSuperAdmin,
  isAdmin,
  isDistributor,
  isSalesExecutive,
  hasPermission,
  isManager,
} from "src/helpers/helper";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import withRouter from "src/helpers/withRouter";
import GroupIcon from "@mui/icons-material/Group";
import DiamondIcon from "@mui/icons-material/Diamond";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { NoLuggageOutlined } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getProfile } from "actions/superadmin/profile.actions";
import { isMobile } from "react-device-detect";
import { objectToQuery } from "src/helpers/helper";
import axios from "actions/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: this.props.dashboard,
      auth: this.props.auth,
      permissions: this.props.permissions,
      months_name: [],
      all_months: [],
      month_wise_customer: [],
      month_wise_order: [],
      month_wise_sales: [],
      profile: null,
      sales: [],
      purchOnApproveList: [],
      Total_sales_on_approval: 0,
      Total_purchase_on_approval: 0,
    };

    this.chartCustomerOptions = {
      //responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Customer Chart",
        },
      },
    };
    this.chartRetailerOptions = {
      //responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Retailer Chart",
        },
      },
    };
    this.chartAmountOptions = {
      //responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Sales & Orders Chart",
        },
      },
    };

    this.isSuperAdmin = isSuperAdmin();
    this.isAdmin = isAdmin();
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
    this.isManager = isManager();
  }

  componentDidMount() {
    this.props.actions.getDashboardData();
    this.props.actions.sendAutoNotifications();
    this.loadProfile();
    this.sales();
    this.purchaseOnApproveList();
  }

  sales = () => {
    let params = {
      page: 1,
      limit: 100,
      user_id: "",
      search: "",
      date_from: null,
      date_to: null,
      status: "3",
      is_approval: 1,
    };
    let params1 = objectToQuery(params, true);

    axios
      .get(`/superadmin/sales${params1}`)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.success) {
          // console.log(response.data.data);
          this.setState({
            sales: response.data.data,
          });
          let Total_sales_on_approval_count = 0;

          this.state.sales.items?.map((items) => {
            let items_data = items.bill_amount.split("₹");
            Total_sales_on_approval_count += Number(items_data[1]);
          });

          this.setState({
            Total_sales_on_approval: Total_sales_on_approval_count.toFixed(2),
          });
        }
      })
      .catch((error) => {});
  };

  purchaseOnApproveList = () => {
    let params = {
      page: 1,
      limit: 100,
      supplier_id: "",
      search: "",
      date_from: null,
      date_to: null,
      status: "3",
      is_approval: 1,
    };

    let params1 = objectToQuery(params, true);

    axios
      .get(`/superadmin/purchases${params1}`)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            purchOnApproveList: response.data.data,
          });

          let onApprove_total = 0;
          this.state.purchOnApproveList.items?.map((items) => {
            let items_data = items.bill_amount.split("₹");
            onApprove_total += Number(items_data[1]);
          });

          this.setState({
            Total_purchase_on_approval: onApprove_total.toFixed(2),
          });
        }
      })
      .catch((error) => {});
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.dashboard !== state.dashboard) {
      update.dashboard = props.dashboard;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }
    if (
      props.dashboard != null &&
      props.dashboard.all_months !== state.all_months
    ) {
      update.months_name = props.dashboard.all_months;
    }
    if (
      props.dashboard != null &&
      props.dashboard.month_wise_customer !== state.month_wise_customer
    ) {
      update.month_wise_customer = props.dashboard.month_wise_customer;
    }
    if (
      props.dashboard != null &&
      props.dashboard.month_wise_order !== state.month_wise_order
    ) {
      update.month_wise_order = props.dashboard.month_wise_order;
    }
    if (
      props.dashboard != null &&
      props.dashboard.month_wise_sales !== state.month_wise_sales
    ) {
      update.month_wise_sales = props.dashboard.month_wise_sales;
    }
    // if(props.dashboard.all_months !== state.all_months){
    //   update.all_months = props.dashboard.all_months;
    // }
    return update;
  }

  handleClick = (route) => {
    // if (route == "retailers" && this.isAdmin) {
    //   return;
    // }
    this.props.navigate(
      getUserDashboardRoute(getRoleName(this.state.auth)) + "/" + route
    );
  };

  loadProfile = () => {
    getProfile().then((res) => {
      if (res.data.success) {
        this.setState({
          profile: res.data.data,
        });
      }
    });
  };

  render() {
    const { dashboard, permissions, profile, auth } = this.state;
    console.log("profile.own : ", profile);
    console.log("auth : ", auth);
    //this.chartLabels = this.state.months_name;
    // this.chartData = {
    //   labels: this.state.months_name,
    //   datasets: [
    //     {
    //       label: 'Total Customer',
    //       data: this.state.month_wise_customer,
    //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //     },
    //     {
    //       label: 'Monthly Order',
    //       data: this.state.month_wise_order,
    //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //     },
    //   ],
    // };
    const chartCustomerData = {
      labels: this.state.months_name,
      datasets: [
        {
          label: "Total Customer",
          data: this.state.month_wise_customer,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    const chartRetailerData = {
      labels: this.state.months_name,
      datasets: [
        {
          label: "Total Retailer",
          data: this.state.month_wise_retailer,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    const chartAmountData = {
      labels: this.state.months_name,
      datasets: [
        {
          label: "Total Sales",
          data: this.state.month_wise_sales,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Total Order",
          data: this.state.month_wise_order,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    if (isMobile) {
      this.chartAmountOptions = {
        ...this.chartAmountOptions,
        ...{ responsive: true, maintainAspectRatio: true, aspectRatio: 1 },
      };
      this.chartCustomerOptions = {
        ...this.chartCustomerOptions,
        ...{ responsive: true, maintainAspectRatio: true, aspectRatio: 1 },
      };
      this.chartRetailerOptions = {
        ...this.chartRetailerOptions,
        ...{ responsive: true, maintainAspectRatio: true, aspectRatio: 1 },
      };
    }
    // console.log(
    //   "-------------",
    //   this.state || "no state",
    //   "============this.props",
    //   this.props
    // );
    console.log(this.state);

    return (
      <>
        <Card className="dashboard_card">
          {!this.isSuperAdmin ||
          (this.isSuperAdmin &&
            hasPermission(permissions, ["purchase", "sales"], "list")) ? (
            <CardContent
              onClick={() => this.handleClick("wallet-history")}
              className="dashboard_card_content bg-color-6"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>My Wallet </h1>
                <h2>
                  {dashboard ? dashboard.wallet_balance : <CircularProgress />}
                </h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
          ) : null}

          {!this.isSuperAdmin ||
          (this.isSuperAdmin && hasPermission(permissions, "stock", "list")) ? (
            <CardContent
              onClick={() => this.handleClick("stocks")}
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  My Stock &nbsp;{" "}
                  <span>
                    {dashboard ? dashboard.total_stock : <CircularProgress />}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.total_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {(!this.isSuperAdmin ||
            (this.isSuperAdmin &&
              hasPermission(permissions, "stock", "list"))) &&
          !this.isAdmin &&
          !this.isSalesExecutive &&
          !this.isDistributor ? (
            <CardContent
              onClick={() => this.handleClick("material-stocks")}
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Material Stock &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.material_total_stock
                    ) : (
                      <CircularProgress />
                    )}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.material_total_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin || this.isSalesExecutive ? (
            <CardContent
              onClick={() => this.handleClick("return-stocks")}
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Return Stock &nbsp;{" "}
                  <span>
                    {dashboard ? dashboard.return_stock : <CircularProgress />}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.return_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {!this.isSalesExecutive &&
          (!this.isSuperAdmin ||
            (this.isSuperAdmin &&
              hasPermission(permissions, "supplier", "list"))) &&
          !this.isDistributor &&
          this.isAdmin &&
          profile &&
          profile.own == false ? (
            <CardContent
              onClick={() => this.handleClick("suppliers")}
              className="dashboard_card_content bg-color-3"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Supplier &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_supplier
                    ) : (
                      <CircularProgress />
                    )}{" "}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.purchase_due_amount}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin && hasPermission(permissions, "admin", "list") ? (
            <CardContent
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1 onClick={() => this.handleClick("admins?own=1")}>
                  Own Admin &nbsp;{" "}
                  <span>
                    {dashboard ? dashboard.total_admin : <CircularProgress />}
                  </span>{" "}
                </h1>
                <h2
                  onClick={() =>
                    this.handleClick("stocks?own_admin=1&by_specific=1")
                  }
                >
                  {dashboard ? (
                    dashboard.total_admin_stock +
                    " | " +
                    dashboard.total_admin_stock_price
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin &&
          hasPermission(permissions, "distributor", "list") ? (
            <CardContent
              className="dashboard_card_content bg-color-4"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1 onClick={() => this.handleClick("distributors?own=1")}>
                  Own Distributor &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_distributor
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2
                  onClick={() =>
                    this.handleClick("stocks?own_distributor=1&by_specific=1")
                  }
                >
                  {dashboard ? (
                    dashboard.total_distributor_stock +
                    " | " +
                    dashboard.total_distributor_stock_price
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin && hasPermission(permissions, "admin", "list") ? (
            <CardContent
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1 onClick={() => this.handleClick("admins?own=0")}>
                  Other Admin &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_other_admin
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? dashboard.sale_due_amount : <CircularProgress />}
                </h2>
                {/*<h2
                  onClick={() =>
                    this.handleClick("stocks?own_admin=0&by_specific=1")
                  }
                >
                  {dashboard ? (
                    dashboard.total_other_admin_stock +
                    " | " +
                    dashboard.total_other_admin_stock_price
                  ) : (
                    <CircularProgress />
                  )}
                </h2>*/}
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin &&
          hasPermission(permissions, "distributor", "list") ? (
            <CardContent
              className="dashboard_card_content bg-color-4"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1 onClick={() => this.handleClick("distributors?own=0")}>
                  Distributor Other &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_other_distributor
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    dashboard.total_other_distributor_due_amount
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
                {/*<h2
                  onClick={() =>
                    this.handleClick("stocks?own_distributor=0&by_specific=1")
                  }
                >
                  {dashboard ? (
                    dashboard.total_other_distributor_stock +
                    " | " +
                    dashboard.total_other_distributor_stock_price
                  ) : (
                    <CircularProgress />
                  )}
                </h2>*/}
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isAdmin ? (
            <>
              <CardContent
                className="dashboard_card_content bg-color-4"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  sx={{ fontSize: 14, margin: 0 }}
                  color="text.secondary"
                  gutterBottom
                  component="span"
                >
                  <h1 onClick={() => this.handleClick("distributors?own=1")}>
                    Distributor Own &nbsp;{" "}
                    <span>
                      {dashboard ? (
                        dashboard.total_distributor
                      ) : (
                        <CircularProgress />
                      )}
                    </span>{" "}
                  </h1>
                  <h2
                    onClick={() =>
                      this.handleClick("stocks?own_distributor=1&by_specific=1")
                    }
                  >
                    {dashboard ? (
                      dashboard.total_distributor_stock +
                      " | " +
                      dashboard.total_distributor_stock_price
                    ) : (
                      <CircularProgress />
                    )}
                  </h2>
                </Typography>
                <div className="card-icon">
                  <GroupIcon />
                </div>
              </CardContent>
              <CardContent
                className="dashboard_card_content bg-color-4"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  sx={{ fontSize: 14, margin: 0 }}
                  color="text.secondary"
                  gutterBottom
                  component="span"
                >
                  <h1 onClick={() => this.handleClick("distributors?own=0")}>
                    Distributor Other &nbsp;{" "}
                    <span>
                      {dashboard ? (
                        dashboard.total_other_distributor
                      ) : (
                        <CircularProgress />
                      )}
                    </span>{" "}
                  </h1>
                  <h2>
                    {dashboard ? (
                      dashboard.total_other_distributor_due_amount
                    ) : (
                      <CircularProgress />
                    )}
                  </h2>
                  {/*<h2
                    onClick={() =>
                      this.handleClick("stocks?own_distributor=0&by_specific=1")
                    }
                  >
                    {dashboard ? (
                      dashboard.total_other_distributor_stock +
                      " | " +
                      dashboard.total_other_distributor_stock_price
                    ) : (
                      <CircularProgress />
                    )}
                  </h2>*/}
                </Typography>
                <div className="card-icon">
                  <GroupIcon />
                </div>
              </CardContent>
            </>
          ) : null}

          {!this.isSalesExecutive &&
          (this.isAdmin ||
            !this.isSuperAdmin ||
            (this.isSuperAdmin &&
              hasPermission(permissions, "sales_executive", "list"))) ? (
            <CardContent
              className="dashboard_card_content bg-color-5"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1 onClick={() => this.handleClick("sales-executive")}>
                  Total SE
                  <>
                    &nbsp;{" "}
                    <span>
                      {dashboard ? (
                        this.isAdmin && this.isDistributor ? (
                          dashboard.total_own_sales_executive
                        ) : (
                          dashboard.total_sales_executive
                        )
                      ) : (
                        <CircularProgress />
                      )}
                    </span>
                  </>
                </h1>
                {!this.isDistributor && !this.isAdmin ? (
                  <h2>
                    {this.isSuperAdmin ? (
                      <h2
                        onClick={() =>
                          this.handleClick("stocks?own_se=1&by_specific=1")
                        }
                      >
                        {dashboard ? (
                          dashboard.total_se_stock +
                          " | " +
                          dashboard.total_se_stock_price
                        ) : (
                          <CircularProgress />
                        )}
                      </h2>
                    ) : null}
                  </h2>
                ) : (
                  <h2
                    onClick={() =>
                      this.handleClick("stocks?own_se=1&by_specific=1")
                    }
                  >
                    {dashboard ? (
                      dashboard.total_own_se_stock +
                      " | " +
                      dashboard.total_own_se_stock_price
                    ) : (
                      <CircularProgress />
                    )}
                  </h2>
                )}
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin ||
          (this.isAdmin && profile && profile.own == false) ? (
            <CardContent
              onClick={() => this.handleClick("purchase-products")}
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Purchase &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_purchase_product
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? dashboard.total_purchase : <CircularProgress />}
                </h2>
              </Typography>
              <div className="card-icon">
                <CurrencyRupeeIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin || this.isAdmin ? (
            <CardContent
              onClick={() => this.handleClick("sale-products")}
              className="dashboard_card_content bg-color-8"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Sale &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_own_sale_products
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? dashboard.total_own_sale : <CircularProgress />}
                </h2>
              </Typography>
              <div className="card-icon">
                <CurrencyRupeeIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin || this.isAdmin ? (
            <CardContent
              onClick={() => this.handleClick("suppliers")}
              className="dashboard_card_content bg-color-6"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Return &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_return_product
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    dashboard.total_return_amount
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <CurrencyRupeeIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isAdmin || this.isDistributor || this.isSalesExecutive /* && 
          (profile && profile.own == false)*/ ? (
            <CardContent
              onClick={() =>
                this.handleClick("stocks?total_avl_stock=1&by_specific=1")
              }
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Available &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_avl_stock
                    ) : (
                      <CircularProgress />
                    )}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.total_avl_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin ||
          this.isAdmin ||
          this.isDistributor ||
          this.isSalesExecutive ? (
            <CardContent
              onClick={() =>
                this.handleClick("stocks?total_avl_stock=1&by_specific=0")
              }
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Available &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.super_admin_total_avl_stock
                    ) : (
                      <CircularProgress />
                    )}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.super_admin_total_avl_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin ||
          this.isAdmin ||
          this.isDistributor ||
          this.isSalesExecutive ? (
            <CardContent
              onClick={() =>
                this.handleClick("transfer")
              }
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Pending Stock &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_avl_pending_stock
                    ) : (
                      <CircularProgress />
                    )}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.total_avl_pending_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {!this.isSuperAdmin ||
          (this.isSuperAdmin &&
            hasPermission(permissions, "retailer", "list")) ? (
            <CardContent
              onClick={() => this.handleClick("retailers")}
              className="dashboard_card_content bg-color-6"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Total Retailer &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_retailer
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {this.isDistributor ? (
                    <>
                      {dashboard ? (
                        <span style={{ fontSize: "16px" }}>
                          {" "}
                          {dashboard.total_other_distributor_due_amount}{" "}
                        </span>
                      ) : (
                        <CircularProgress />
                      )}
                    </>
                  ) : (
                    <>
                      {dashboard ? (
                        <span style={{ fontSize: "16px" }}>
                          {" "}
                          {dashboard.total_retailer_due}{" "}
                        </span>
                      ) : (
                        <CircularProgress />
                      )}
                    </>
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSalesExecutive ? (
            <CardContent
              onClick={() => this.handleClick("my-retailers")}
              className="dashboard_card_content bg-color-6"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  My Retailer &nbsp;{" "}
                  <span>
                    {dashboard ? dashboard.my_retailer : <CircularProgress />}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.my_retailer_due_amount}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isDistributor ? (
            <CardContent
              onClick={() => this.handleClick("my-retailers")}
              className="dashboard_card_content bg-color-5"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  My Retailer &nbsp;{" "}
                  <span>
                    {dashboard ? dashboard.my_retailer : <CircularProgress />}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.my_retailer_due_amount}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {!this.isAdmin &&
          (!this.isSuperAdmin ||
            (this.isSuperAdmin &&
              hasPermission(permissions, "customer", "list"))) ? (
            <CardContent
              onClick={() => this.handleClick("customers")}
              className="dashboard_card_content bg-color-7"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>Total Customer </h1>
                <h2>
                  {dashboard ? dashboard.total_customer : <CircularProgress />}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin ||
          this.isSalesExecutive ||
          this.isAdmin ||
          this.isDistributor ? (
            <CardContent
              onClick={() => this.handleClick("sale-on-approve")}
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.primary"
                gutterBottom
                component="span"
              >
                <h1>
                  Sales on Approval &nbsp;{" "}
                  <span>
                    {this.state.sales ? (
                      this.state.sales.total
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {this.state.Total_sales_on_approval}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin || this.isAdmin ? (
            <CardContent
              onClick={() => this.handleClick("purchase-on-approve")}
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.primary"
                gutterBottom
                component="span"
              >
                <h1>
                  Purchase on Approval &nbsp;{" "}
                  <span>
                    {this.state.sales ? (
                      this.state.purchOnApproveList.total
                    ) : (
                      <CircularProgress />
                    )}
                  </span>{" "}
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {this.state.Total_purchase_on_approval}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <GroupIcon />
              </div>
            </CardContent>
          ) : null}

          {this.isSuperAdmin &&
          !this.isManager &&
          hasPermission(permissions, "stock", "list") ? (
            <CardContent
              onClick={() => this.handleClick("stocks?manager=1&by_specific=1")}
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>
                  Manager Stock &nbsp;{" "}
                  <span>
                    {dashboard ? (
                      dashboard.total_manager_stock
                    ) : (
                      <CircularProgress />
                    )}
                  </span>
                </h1>
                <h2>
                  {dashboard ? (
                    <span style={{ fontSize: "16px" }}>
                      {" "}
                      {dashboard.total_manager_stock_price}{" "}
                    </span>
                  ) : (
                    <CircularProgress />
                  )}
                </h2>
              </Typography>
              <div className="card-icon">
                <DiamondIcon />
              </div>
            </CardContent>
          ) : null}

          {/* <CardContent className='dashboard_card_content bg-color-7' sx = {{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Best Admin </h1>
              <h2>{dashboard ? dashboard.best_admin : <CircularProgress />}</h2>
            </Typography>
            <div className="card-icon">
              <GroupIcon />
            </div>
          </CardContent>
          <CardContent className='dashboard_card_content bg-color-7' sx = {{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Poor Admin </h1>
              <h2>{dashboard ? dashboard.poor_admins : <CircularProgress />}</h2>
            </Typography>
            <div className="card-icon">
              <GroupIcon />
            </div>
          </CardContent> */}
        </Card>
        <>
          <div>
            <Bar
              options={this.chartAmountOptions}
              data={chartAmountData}
              height={100}
            />
          </div>
          {this.isSalesExecutive ? (
            <div>
              <Bar
                options={this.chartRetailerOptions}
                data={chartRetailerData}
                height={100}
              />
            </div>
          ) : !this.isAdmin ? (
            <div>
              <Bar
                options={this.chartCustomerOptions}
                data={chartCustomerData}
                height={100}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.superadmin.profile.dashboard,
  auth: state.auth,
  permissions: state.employee.permissions.permissions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      { getDashboardData, sendAutoNotifications },
      dispatch
    ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
);
