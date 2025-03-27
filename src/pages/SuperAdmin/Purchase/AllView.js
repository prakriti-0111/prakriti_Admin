import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Collapse,
  Box,
  Typography,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  InputAdornment,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import DataTable from "src/utils/DataTable";
import { withSnackbar } from "notistack";
import {
  purchaseView,
  purchaseStatusChange,
} from "actions/superadmin/purchase.actions";
import { bindActionCreators } from "redux";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { isEmpty } from "src/helpers/helper";
import {
  paymentStore,
  paymentList,
  paymentGetWalletBalance,
} from "actions/superadmin/payment.actions";
import { SUPERADMIN_RESET_PAYMENT } from "../../../actionTypes/superadmin/payment.types";
import {
  getRoleName,
  getUserDashboardRoute,
  displayAmount,
  getApprovalColor,
} from "src/helpers/helper";
import { getNotifiactions } from "actions/superadmin/notification.actions";

class PurchaseAllViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      purchase: this.props.purchase,
      openDialog: false,
      ...this.defaultFormValues(),
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        table_type: "purchase",
      },
      confirmDialog: false,
      status_changing: 0,
      auth: this.props.auth,
      wallet_balance: 0,
      decline_type: "advance",
    };

    this.columns = [
      {
        name: "payment_date",
        display_name: "Payment Date",
      },
      {
        name: "amount",
        display_name: "Amount",
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
    ];
  }

  componentDidMount() {
    this.loadViewData();
    this.loadListData();
  }

  loadListData = () => {
    let data = { ...this.state.queryParams, table_id: this.props.params.id };
    this.props.actions.paymentList(data);
  };

  handlePagination = (page) => {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: page,
        },
      },
      () => {
        this.loadListData();
      }
    );
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.purchase !== state.purchase) {
      update.purchase = props.purchase;
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
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }

    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.setState({
          processing: false,
          openDialog: false,
          queryParams: {
            ...this.state.queryParams,
            page: 1,
          },
          ...this.defaultFormValues(),
        });
        this.loadViewData();
        this.loadListData();
        this.props.actions.getNotifiactions();
      } else {
        this.props.enqueueSnackbar(this.state.errorMessage, {
          variant: "error",
        });
        this.setState({
          processing: false,
        });
      }
      this.props.dispatch({
        type: SUPERADMIN_RESET_PAYMENT,
      });
    }
  }

  loadViewData = () => {
    this.props.actions.purchaseView(this.props.params.id);
  };

  handlePayNow = () => {
    this.setState({
      openDialog: true,
    });
  };

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
    });
  };

  handleSupplierChange = (event) => {
    this.updateFormValue(event.target.value, "user_id");
    this.props.actions.paymentTotalDue(event.target.value);
  };

  updateFormValue = async (value, key) => {
    this.setState(
      {
        formValues: {
          ...this.state.formValues,
          [key]: value,
        },
      },
      async () => {
        if (key == "payment_mode") {
          let wallet_balance = 0;
          if (value) {
            let res = await paymentGetWalletBalance(value);
            if (res.data.success) {
              wallet_balance = res.data.data.balance;
            }
          }
          this.setState({
            wallet_balance: wallet_balance,
          });
        }
      }
    );
  };

  defaultFormValues = () => {
    return {
      formValues: {
        user_id: "",
        payment_mode: "",
        payment_date: moment().format("MM/DD/YYYY"),
        due_date: "",
        amount: "",
        notes: "",
        cheque_no: "",
        txn_id: "",
        table_type: "purchase",
        table_id: "",
      },
      formErros: {
        user_id: false,
        payment_mode: false,
        payment_date: false,
        amount: false,
        notes: false,
        cheque_no: false,
        txn_id: false,
        due_date: false,
      },
    };
  };

  handleSubmit = () => {
    if (!this.formValidate()) {
      this.setState({
        processing: true,
      });
      let data = {
        ...this.state.formValues,
        user_id: this.state.purchase.supplier_id,
        table_id: this.state.purchase.id,
      };
      this.props.actions.paymentStore(data);
    }
  };

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if (
      parseFloat(formValues.amount) > parseFloat(this.state.purchase.due_amount)
    ) {
      hasErr = true;
      this.props.enqueueSnackbar(
        "Amount must be less than or equal due amount.",
        { variant: "error" }
      );
    }
    if (isEmpty(formValues.amount)) {
      formErros.amount = true;
      hasErr = true;
    } else {
      formErros.amount = false;
    }
    if (isEmpty(formValues.payment_mode)) {
      formErros.payment_mode = true;
      hasErr = true;
    } else {
      formErros.payment_mode = false;
    }
    if (isEmpty(formValues.payment_date)) {
      formErros.payment_date = true;
      hasErr = true;
    } else {
      formErros.payment_date = false;
    }
    if (isEmpty(formValues.due_date)) {
      formErros.due_date = true;
      hasErr = true;
    } else {
      formErros.due_date = false;
    }
    if (
      !isEmpty(formValues.amount) &&
      parseFloat(this.state.wallet_balance) < parseFloat(formValues.amount) &&
      parseFloat(formValues.amount) > 0
    ) {
      hasErr = true;
      formErros.amount = true;
      this.props.enqueueSnackbar("Insufficient wallet balance.", {
        variant: "error",
      });
    } else {
      formErros.amount = false;
    }
    this.setState({
      formErros: formErros,
    });
    return hasErr;
  };

  handleStatusChange = async (val) => {
    this.setState({
      status_changing: val,
      confirmDialog: true,
    });
  };

  handleConfirmSubmit = async () => {
    let data = {
      approve_status: this.state.status_changing,
      decline_type: this.state.decline_type,
    };
    let status_response = await purchaseStatusChange(
      this.props.params.id,
      data
    );
    if (status_response.data.success == true) {
      this.props.enqueueSnackbar(status_response.data.message, {
        variant: "success",
      });
      this.setState({
        confirmDialog: false,
      });
      this.loadViewData();
    } else {
      this.props.enqueueSnackbar(status_response.data.message, {
        variant: "error",
      });
    }
  };

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false,
    });
  };

  render() {
    const { purchase, formValues, formErros } = this.state;
    return (
      <MainCard title="Purchase Details">
        {!purchase ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <div className="return-wrapper">
              <div className="return-header">
                <p>Invoice Date: {purchase.invoice_date}</p>
                <p>Dues Date:{purchase.due_date}</p>
              </div>
              <div className="">
                <Button
                  className="add-button"
                  variant="contained"
                  onClick={() => this.props.navigate(-1)}
                >
                  Back
                </Button>
              </div>
            </div>
            <Grid
              container
              spacing={gridSpacing}
              className="details-header ratn-pur-wrapper loans_view"
            >
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <div className="ratn-table-purchase-wrapper">
                    <Table
                      aria-label="collapsible table"
                      className="invoice_product_list"
                    >
                      <TableHead className="ratn-table-header">
                        <TableRow>
                          <TableCell>Supplier</TableCell>
                          <TableCell>Total Amt</TableCell>
                          <TableCell>Cash Disc</TableCell>
                          <TableCell>Bill Amount</TableCell>
                          <TableCell>Return Amt</TableCell>
                          <TableCell>Paid Amt</TableCell>
                          <TableCell>Due Amt</TableCell>
                          <TableCell>Invoice No</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="pur-details-table-body">
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {purchase.supplier_name}
                          </TableCell>
                          <TableCell>{purchase.total_amount}</TableCell>
                          <TableCell>{purchase.discount}</TableCell>
                          <TableCell>{purchase.bill_amount}</TableCell>
                          <TableCell>{purchase.return_amount}</TableCell>
                          <TableCell>{purchase.paid_amount_display}</TableCell>
                          <TableCell>{purchase.due_amount_display}</TableCell>
                          <TableCell>{purchase.invoice_number}</TableCell>
                          <TableCell className="sales-status">
                            <Chip
                              label={purchase.approve_status}
                              color={getApprovalColor(purchase.is_approved)}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={gridSpacing}
              className="details-header ratn-pur-wrapper loans_view"
            >
              <Grid item xs={12} className="p-add-product create-input">
                <h3 className="p_heading_list">Product List</h3>
                <TableContainer component={Paper}>
                  <div className="ratn-table-purchase-wrapper">
                    <Table
                      aria-label="collapsible table"
                      className="invoice_product_list"
                    >
                      <TableHead className="ratn-table-header">
                        <TableRow>
                          <TableCell />
                          <TableCell>#</TableCell>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Category Name</TableCell>
                          <TableCell>Certificate Number</TableCell>
                          <TableCell>Total Weight</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Making Charge</TableCell>
                          <TableCell>ETC</TableCell>
                          <TableCell>Sub Total</TableCell>
                          <TableCell>Dist</TableCell>
                          <TableCell>Tax</TableCell>
                          <TableCell>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {purchase.products.map((row, i) => (
                          <Row key={i} row={row} index={i} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        )}
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  purchase: state.superadmin.purchase.purchase,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  items: state.superadmin.payment.items,
  total: state.superadmin.payment.total,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      {
        purchaseView,
        paymentStore,
        paymentList,
        getNotifiactions,
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseAllViewPage))
);

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const sl_no = index + 1;
  const odd_even_class = sl_no % 2 == 0 ? "even" : "odd";
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={(row.is_return ? "strike_through " : "") + odd_even_class}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="expand_icon"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {sl_no <= 9 ? "0" + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.product_name}
        </TableCell>
        <TableCell>{row.category_name}</TableCell>
        <TableCell>{row.certificate_no}</TableCell>
        <TableCell>{row.total_weight}</TableCell>
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.making_charge}</TableCell>
        <TableCell>{row.rep}</TableCell>
        <TableCell>{row.sub_total}</TableCell>
        <TableCell>{row.total_discount}</TableCell>
        <TableCell>{row.tax}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
      <TableRow className={"table-inner-row sub_table " + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow className="pur-details-inner-table">
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Dist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pur-details-table-body">
                  {row.materials.map((item, i) =>
                    !(item.weight == 0 && item.quantity == 0) ? (
                      <TableRow key={i}>
                        <TableCell scope="row">
                          {item.material_name}
                          {console.log(
                            "---------------- view",
                            item.weight != 0 && item.quantity != 0
                          )}
                          {console.log(
                            "--------------row.materials",
                            row.materials
                          )}
                        </TableCell>
                        <TableCell>{item.purity_name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell>{item.unit_name}</TableCell>
                        <TableCell>{item.rate}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.discount_amount}</TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
