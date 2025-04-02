import { React, Component } from "react";
import { connect } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import { supplierList } from "actions/superadmin/supplier.actions";
import {
  paymentList,
  walletHistoryList,
  paymentStatusChange,
  paymentStore,
} from "actions/superadmin/payment.actions";
import DataTable from "src/utils/DataTable";
import {
  SUPERADMIN_RESET_PAYMENT,
  SUPERADMIN_RESET_ALL_PAYMENT,
} from "../../../actionTypes/superadmin/payment.types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  isEmpty,
  isSuperAdmin,
  isAdmin,
  isDistributor,
  isSalesExecutive,
} from "src/helpers/helper";
import { withSnackbar } from "notistack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { distributorList } from "actions/superadmin/distributor.actions";
import { adminList } from "actions/superadmin/admin.actions";
import { retailerList } from "actions/superadmin/retailer.actions";
import { getProfile } from "actions/superadmin/profile.actions";

class WalletPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advanceFilter: false,
      items: this.props.items,
      total: this.props.total,
      balance_by_mode: this.props.balance_by_mode,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        payment_mode: "",
      },
      openDialog: false,
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      actionRow: null,
      formvalues: {
        status: "",
        ref_no: "",
        reasons: "",
      },
      paymentDialog: false,
      supplierList: this.props.supplierList,
      adminList: this.props.adminList,
      distributorList: this.props.distributorList,
      retailerList: this.props.retailerList,
      profile: null,
      ...this.defaultFormValues(),
    };
    this.columns = [
      {
        name: "payment_date",
        display_name: "Date",
      },
      {
        name: "display_user_details",
        display_name: "Particular",
      },
      {
        name: "purpose",
        display_name: "Purpose",
      },
      {
        name: "display_mode",
        display_name: "Mode",
        isHtml: true,
      },
      {
        name: "debit",
        display_name: "Debit",
        class_conditions: [
          {
            key: "action_value",
            value: "Declined",
            class_name: "strike_through",
          },
        ],
      },
      {
        name: "credit",
        display_name: "Credit",
        class_conditions: [
          {
            key: "action_value",
            value: "Declined",
            class_name: "strike_through",
          },
        ],
      },
      {
        name: "remaining_balance",
        display_name: "Balance",
      },
    ];

    // this.advanceFilter_Columns = [
    //   {
    //     name: "name",
    //     display_name: "Name",
    //   },
    //   //   {
    //   //     name: "display_user_details",
    //   //     display_name: "Particular",
    //   //   },
    //   {
    //     name: "address",
    //     display_name: "address",
    //   },
    //   {
    //     name: "advance_amount_display",
    //     display_name: "Advance amount",
    //     // isHtml: true,
    //   },
    // ];

    this.tableActions = [
      {
        label: "green_tick",
        onClick: this.handleAccept,
        color: "primary",
        conditions: [
          {
            key: "status",
            value: "pending",
          },
          {
            key: "can_accept",
            value: true,
          },
        ],
      },
      {
        label: "Close",
        onClick: this.handleDeclined,
        color: "error",
        conditions: [
          {
            key: "status",
            value: "pending",
          },
          {
            key: "can_accept",
            value: true,
          },
        ],
      },
    ];

    this.isSuperAdmin = isSuperAdmin();
    this.isAdmin = isAdmin();
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
  }

  handleAccept = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      formvalues: {
        ...this.state.formvalues,
        status: 1,
      },
    });
  };

  handleDeclined = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      formvalues: {
        ...this.state.formvalues,
        status: 0,
      },
    });
  };

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
    });
  };

  handleSubmit = async () => {
    let res = await paymentStatusChange(
      this.state.actionRow.id,
      this.state.formvalues
    );
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: "success" });
      this.setState({
        openDialog: false,
      });
      this.loadListData();
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: "error" });
    }
  };

  componentDidMount() {
    this.loadListData();
    if (this.isSuperAdmin) {
      this.props.actions.supplierList({ all: 1 });
      this.props.actions.adminList({ all: 1 });
    } else if (this.isAdmin) {
      this.props.actions.supplierList({ all: 1 });
      this.props.actions.distributorList({ all: 1 });
      this.props.actions.distributorList({ all: 1 });
    } else if (this.isSalesExecutive) {
      this.props.actions.distributorList({ all: 1 });
      this.props.actions.retailerList({ all: 1 });
    } else if (this.isDistributor) {
      this.props.actions.retailerList({ all: 1 });
      this.props.actions.adminList({ all: 1, own: 1 });
    }
    this.loadProfile();
  }

  loadProfile = async () => {
    let res = await getProfile();
    if (res.data.success) {
      this.setState({
        profile: res.data.data,
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if (props.due_amount !== state.due_amount) {
      update.due_amount = props.due_amount;
    }
    if (props.due_amount_display !== state.due_amount_display) {
      update.due_amount_display = props.due_amount_display;
    }
    if (props.supplierList !== state.supplierList) {
      update.supplierList = props.supplierList;
    }
    if (props.adminList !== state.adminList) {
      update.adminList = props.adminList;
    }
    if (props.distributorList !== state.distributorList) {
      update.distributorList = props.distributorList;
    }
    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }
    if (props.createSuccess !== state.createSuccess) {
      update.createSuccess = props.createSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }
    if (props.balance_by_mode !== state.balance_by_mode) {
      update.balance_by_mode = props.balance_by_mode;
    }
    if (props.retailerList !== state.retailerList) {
      update.retailerList = props.retailerList;
    }

    return update;
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.setState({
          processing: false,
          openDialog: false,
          paymentDialog: false,
          ...this.defaultFormValues(),
        });
        this.props.dispatch({
          type: SUPERADMIN_RESET_ALL_PAYMENT,
        });
        this.loadListData();
      } else {
        this.props.enqueueSnackbar(this.state.errorMessage, {
          variant: "error",
        });
        this.setState({
          processing: false,
        });
        this.props.dispatch({
          type: SUPERADMIN_RESET_PAYMENT,
        });
      }
    }
  }

  loadListData = () => {
    let data = { ...this.state.queryParams };
    if (data.date_from) {
      data.date_from = moment(data.date_from.toString()).format("YYYY-MM-DD");
    }
    if (data.date_to) {
      data.date_to = moment(data.date_to.toString()).format("YYYY-MM-DD");
    }
    this.props.actions.walletHistoryList(data);
  };

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  };

  updateQueryParams = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value,
      },
    });
  };

  handleSearch = () => {
    this.loadListData();
  };

  handleCardClick = (mode) => {
    this.setState(
      {
        advanceFilter: false,
        queryParams: {
          ...this.state.queryParams,
          payment_mode: mode,
        },
      },
      () => {
        this.handleSearch();
      }
    );
  };

  handlePayNow = () => {
    this.setState({
      paymentDialog: true,
      ...this.defaultFormValues(),
    });
  };

  handlePaymentDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      paymentDialog: false,
    });
  };

  updateFormValue = (value, key) => {
    this.setState(
      {
        paymentFormValues: {
          ...this.state.paymentFormValues,
          [key]: value,
        },
      },
      () => {
        if (key == "payment_role") {
          this.setState({
            paymentFormValues: {
              ...this.state.paymentFormValues,
              user_id: "",
            },
          });
        } else if (key == "payment_type") {
          let payment_role = "";
          if (this.isSalesExecutive && value == "send_money") {
            payment_role = "distributor";
          }
          this.setState({
            paymentFormValues: {
              ...this.state.paymentFormValues,
              payment_role: payment_role,
              user_id: "",
            },
          });
        }
      }
    );
  };

  defaultFormValues = () => {
    return {
      paymentFormValues: {
        user_id: "",
        payment_mode: "",
        payment_date: moment().format("MM/DD/YYYY"),
        amount: "",
        notes: "",
        cheque_no: "",
        txn_id: "",
        table_type: "",
        payment_type: "advance",
        payment_role: "",
      },
      paymentFormErros: {
        user_id: false,
        payment_mode: false,
        payment_date: false,
        amount: false,
        notes: false,
        cheque_no: false,
        txn_id: false,
        payment_role: false,
      },
    };
  };

  handlePaymentSubmit = () => {
    if (!this.formValidate()) {
      this.setState({
        processing: true,
      });
      let data = { ...this.state.paymentFormValues };
      if (data.payment_role == "admin" || data.payment_role == "distributor") {
        data.table_type = "sale";
      } else if (data.payment_role == "supplier") {
        data.table_type = "purchase";
      }
      this.props.actions.paymentStore(data);
    }
  };

  formValidate = () => {
    let paymentFormValues = this.state.paymentFormValues;
    let paymentFormErros = this.state.paymentFormErros;
    let hasErr = false;
    if (isEmpty(paymentFormValues.amount)) {
      paymentFormErros.amount = true;
      hasErr = true;
    } else {
      paymentFormErros.amount = false;
    }
    if (isEmpty(paymentFormValues.payment_mode)) {
      paymentFormErros.payment_mode = true;
      hasErr = true;
    } else {
      paymentFormErros.payment_mode = false;
    }
    if (isEmpty(paymentFormValues.payment_date)) {
      paymentFormErros.payment_date = true;
      hasErr = true;
    } else {
      paymentFormErros.payment_date = false;
    }
    if (isEmpty(paymentFormValues.payment_role)) {
      paymentFormErros.payment_role = true;
      hasErr = true;
    } else {
      paymentFormErros.payment_role = false;
    }
    if (isEmpty(paymentFormValues.user_id)) {
      paymentFormErros.user_id = true;
      hasErr = true;
    } else {
      paymentFormErros.user_id = false;
    }
    this.setState({
      paymentFormErros: paymentFormErros,
    });
    return hasErr;
  };

  handlePaymentRole = (vl) => {
    this.updateFormValue(vl, "payment_role");
  };

  render() {
    const {
      formValues,
      formErros,
      balance_by_mode,
      paymentFormValues,
      paymentFormErros,
      profile,
    } = this.state;
    let userList = [],
      userListLabel = "";
    if (paymentFormValues.payment_role == "admin") {
      userList = this.state.adminList;
      userListLabel = "Admin";
    } else if (paymentFormValues.payment_role == "supplier") {
      userList = this.state.supplierList;
      userListLabel = "Supplier";
    } else if (paymentFormValues.payment_role == "distributor") {
      userList = this.state.distributorList;
      userListLabel = "Distributor";
    } else if (paymentFormValues.payment_role == "retailer") {
      userList = this.state.retailerList;
      userListLabel = "Retailer";
    }

    let payment_roles = [];
    let payment_types = [
      {
        label: "Advance",
        value: "advance",
      },
    ];
    if (this.isSuperAdmin) {
      payment_roles = [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Supplier",
          value: "supplier",
        },
      ];
    } else if (this.isAdmin) {
      payment_roles = [
        {
          label: "Distributor",
          value: "distributor",
        },
        {
          label: "Supplier",
          value: "supplier",
        },
      ];
      if (paymentFormValues.payment_type == "send_money") {
        userList = [{ name: "Superadmin", id: 1 }];
        userListLabel = "Superadmin";
        payment_roles = [
          {
            label: "Superadmin",
            value: "superadmin",
          },
        ];
      }
    } else if (this.isSalesExecutive) {
      if (paymentFormValues.payment_type == "send_money") {
        payment_roles = [
          {
            label: "Distributor",
            value: "distributor",
          },
        ];
      } else {
        payment_roles = [
          {
            label: "Retailer",
            value: "retailer",
          },
        ];
      }
      payment_types.push({
        label: "Send Money",
        value: "send_money",
      });
    } else if (this.isDistributor) {
      payment_roles = [
        {
          label: "Retailer",
          value: "retailer",
        },
      ];
      if (paymentFormValues.payment_type == "send_money") {
        userList = this.state.adminList;
        userListLabel = "Admin";
        payment_roles = [
          {
            label: "Admin",
            value: "admin",
          },
        ];
      }
    }

    if (profile && profile.own && !this.isSalesExecutive) {
      payment_types.push({
        label: "Send Money",
        value: "send_money",
      });
    }

    console.log(
      "-----------------------------------------columns",
      this.columns,
      this.state.items
    );
    let advanceData = 0;

    this.props.retailerList.map(
      (index) => (advanceData += index.advance_amount)
    );
    return (
      <MainCard title="Wallet History" secondary="">
        {balance_by_mode ? (
          <Card className="dashboard_card">
            <CardContent
              className="dashboard_card_content bg-color-1"
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => this.handleCardClick("cash")}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>Cash</h1>
                <h2>{balance_by_mode.cash}</h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
            <CardContent
              className="dashboard_card_content bg-color-2"
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => this.handleCardClick("cheque")}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>Cheque</h1>
                <h2>{balance_by_mode.cheque}</h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
            <CardContent
              className="dashboard_card_content bg-color-3"
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => this.handleCardClick("imps_neft")}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>NEFT/IMPS/UPI</h1>
                <h2>{balance_by_mode.imps_neft}</h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
            <CardContent
              className="dashboard_card_content bg-color-4"
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => this.handleCardClick("online")}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>Online</h1>
                <h2>{balance_by_mode.online}</h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
            <CardContent
              className="dashboard_card_content bg-color-7"
              sx={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => this.setState({ advanceFilter: true })}
            >
              <Typography
                sx={{ fontSize: 14, margin: 0 }}
                color="text.secondary"
                gutterBottom
                component="span"
              >
                <h1>Advance</h1>
                <h2>{advanceData}</h2>
              </Typography>
              <div className="card-icon">
                <AccountBalanceWalletIcon />
              </div>
            </CardContent>
          </Card>
        ) : null}
        <Grid
          container
          spacing={gridSpacing}
          columnSpacing={{ xs: 1, md: 3 }}
          sx={{ mb: 2 }}
          rowSpacing={{ xs: 2 }}
          className="mob_responsive_input"
        >
          <Grid item xs={6} md={2} className="create-input">
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                value={this.state.queryParams.payment_mode}
                label="Status"
                onChange={(e) =>
                  this.updateQueryParams(e.target.value, "payment_mode")
                }
                className="input-inner"
                defaultValue=""
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="cheque">Cheque</MenuItem>
                <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date From"
                inputFormat="DD/MM/YYYY"
                value={this.state.queryParams.date_from}
                onChange={(newValue) =>
                  this.updateQueryParams(newValue, "date_from")
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date To"
                inputFormat="DD/MM/YYYY"
                value={this.state.queryParams.date_to}
                onChange={(newValue) =>
                  this.updateQueryParams(newValue, "date_to")
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6} md={2} className="create-input">
            <Button
              variant="contained"
              className="search-btn"
              onClick={this.handleSearch}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={6} md={1} className="create-input button-right">
            <Button
              variant="contained"
              className="search-btn ml-10"
              onClick={this.handlePayNow}
            >
              Pay
            </Button>
          </Grid>
        </Grid>
        {console.log(
          "--------------------retailerList",
          this.props.retailerList
        )}
        <Grid container spacing={gridSpacing} className="wallet_table">
          {this.state.advanceFilter == true ? (
            <table class="table table-sm mx-1 ">
              <thead className="table-dark fixed ">
                <tr className=" ">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col" className="text-bold">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="table-group-divide">
                {this.props.retailerList.map((items, index) => {
                  return items.advance_amount == 0 ? null : (
                    <>
                      <tr>
                        <th scope="row" className="py-2">
                          {index}{" "}
                        </th>
                        <td className="py-2">{items.name}</td>
                        <td className="py-2">{items.address}</td>
                        <td className="font-bold py-2">
                          {items.advance_amount_display}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <DataTable
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
              actionValue={"action_value"}
              actionValueColorConditions={[
                {
                  value: "Accepted",
                  color: "green",
                },
                {
                  value: "Declined",
                  color: "red",
                },
              ]}
            />
          )}
        </Grid>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            {this.state.formvalues.status == 1 ? "Accept" : "Reject"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                {this.state.formvalues.status == 1 ? (
                  <>
                    {this.state.actionRow &&
                    this.state.actionRow.payment_mode == "Cheque" ? (
                      <Grid item xs={12} className="create-input">
                        <TextField
                          label="Ref. No"
                          variant="outlined"
                          fullWidth
                          value={this.state.formvalues.ref_no}
                          onChange={(event) =>
                            this.setState({
                              formvalues: {
                                ...this.state.formvalues,
                                ref_no: event.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                    ) : null}
                  </>
                ) : (
                  <Grid item xs={12} className="create-input">
                    <InputLabel>Reason</InputLabel>
                    <TextareaAutosize
                      minRows={3}
                      label={"Reason"}
                      style={{ width: "100%" }}
                      value={this.state.formvalues.reasons}
                      onChange={(event) =>
                        this.setState({
                          formvalues: {
                            ...this.state.formvalues,
                            reasons: event.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      type="button"
                      disabled={this.state.processing}
                      onClick={this.handleSubmit}
                    >
                      {this.state.processing ? "Processing" : "Submit"}
                    </Button>
                    <Button variant="outlined" onClick={this.handleDialogClose}>
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.paymentDialog}
          onClose={this.handlePaymentDialogClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Make Payment</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} className="create-input">
                  <FormControl fullWidth>
                    <InputLabel>Payment Type</InputLabel>
                    <Select
                      className="input-inner"
                      value={paymentFormValues.payment_type}
                      fullWidth
                      label="Payment Type"
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "payment_type")
                      }
                    >
                      {payment_types.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  className="p-invoice-date create-input"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Payment Date"
                      value={paymentFormValues.payment_date}
                      inputFormat="DD/MM/YYYY"
                      onChange={(newValue) =>
                        this.updateFormValue(newValue, "payment_date")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={paymentFormErros.payment_date}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={3} className="create-input">
                  <FormControl fullWidth error={paymentFormErros.payment_role}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      className="input-inner"
                      value={paymentFormValues.payment_role}
                      fullWidth
                      label="Role"
                      onChange={(event) =>
                        this.handlePaymentRole(event.target.value)
                      }
                    >
                      {payment_roles.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} className="create-input">
                  <FormControl fullWidth error={paymentFormErros.user_id}>
                    {/*<InputLabel>{userListLabel}</InputLabel>
                                <Select
                                    className='input-inner'
                                    value={paymentFormValues.user_id}
                                    fullWidth
                                    label={userListLabel}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'user_id')}
                                >
                                    {
                                        userList.map((item, index) => (
                                            <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                        ))
                                    }
                                    
                                </Select>*/}
                    <Autocomplete
                      className="autocomplete-selectbox"
                      fullWidth
                      options={userList}
                      autoHighlight
                      getOptionLabel={(option) =>
                        paymentFormValues.payment_role == "retailer"
                          ? option.company_name
                          : option.name
                      }
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {paymentFormValues.payment_role == "retailer"
                            ? option.company_name
                            : option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={userListLabel}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                          fullWidth
                          error={paymentFormErros.user_id}
                        />
                      )}
                      onChange={(event, newValue) => {
                        this.updateFormValue(
                          newValue ? newValue.id : "",
                          "user_id"
                        );
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} className="create-input">
                  <TextField
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    value={paymentFormValues.amount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    error={paymentFormErros.amount}
                    onChange={(event) =>
                      this.updateFormValue(event.target.value, "amount")
                    }
                  />
                </Grid>

                <Grid item xs={12} md={3} className="create-input">
                  <FormControl fullWidth error={paymentFormErros.payment_mode}>
                    <InputLabel>Payment Mode</InputLabel>
                    <Select
                      className="input-inner"
                      value={paymentFormValues.payment_mode}
                      fullWidth
                      label="Payment Mode"
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "payment_mode")
                      }
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="cheque">Cheque</MenuItem>
                      <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                      <MenuItem value="online">Online</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {paymentFormValues.payment_mode == "cheque" ? (
                  <Grid item md={6} xs={12} className="create-input">
                    <TextField
                      label="Cheque No"
                      variant="outlined"
                      fullWidth
                      value={paymentFormValues.cheque_no}
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "cheque_no")
                      }
                    />
                  </Grid>
                ) : null}
                {paymentFormValues.payment_mode == "imps_neft" ||
                paymentFormValues.payment_mode == "upi" ? (
                  <Grid item md={6} xs={12} className="create-input">
                    <TextField
                      label="Transaction #"
                      variant="outlined"
                      fullWidth
                      value={paymentFormValues.txn_id}
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "txn_id")
                      }
                    />
                  </Grid>
                ) : null}
                <Grid item md={6} xs={12} className="create-input">
                  <TextareaAutosize
                    className="description"
                    minRows={1}
                    placeholder="Notes"
                    style={{ width: "100%", height: "51px" }}
                    value={paymentFormValues.notes}
                    onChange={(event) =>
                      this.updateFormValue(event.target.value, "notes")
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      type="button"
                      disabled={this.state.processing}
                      onClick={this.handlePaymentSubmit}
                    >
                      {this.state.processing ? "Processing" : "Submit"}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={this.handlePaymentDialogClose}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.payment.items,
  total: state.superadmin.payment.total,
  balance_by_mode: state.superadmin.payment.balance_by_mode,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  distributorList: state.superadmin.distributor.items,
  adminList: state.superadmin.admin.items,
  supplierList: state.superadmin.supplier.items,
  retailerList: state.superadmin.retailer.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      {
        walletHistoryList,
        adminList,
        supplierList,
        distributorList,
        paymentStore,
        retailerList,
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletPage))
);
