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
  priceFormat,
  getApprovalColor,
  isAdmin
} from "src/helpers/helper";
import { getNotifiactions } from "actions/superadmin/notification.actions";
import { getProfile } from "actions/superadmin/profile.actions";
import { stocksTransferHistoryStore } from 'actions/superadmin/stockHistory.actions';
import { stocksList } from 'actions/superadmin/stocks.actions';
import './style.css';

class PurchaseViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      purchase: this.props.purchase,
      materialStocks: this.props.materialStocks,
      openDialog: false,
      ...this.defaultFormValues(),
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      profile: null,
      processing: false,
      approve_declined_processing: false,
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
    this.loadProfile();
  }

  loadProfile = () => {
    getProfile().then((res) => {
      if (res.data.success) {
        this.setState({
          profile: res.data.data,
        });
      }
    });
  };

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

    if (props.materialStocks !== state.materialStocks) {
      update.materialStocks = props.materialStocks;
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
          approve_declined_processing: false,
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
          approve_declined_processing: false,
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
    this.props.actions.stocksList({
      page: 1,
      limit: 50,
      category_id: '',
      sub_category_id: '',
      search: '',
      type: 'material',
      all: 0,
      by_specific: "",
      manager: "",
      user_id: this.state.profile.id,
      material_id: this.state.formValues.material_id, // Gold
    });
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
        material_id: "1", // Gold
        purity_id: "",
        unit_id: "",
        payment_date: moment().format("MM/DD/YYYY"),
        due_date: "",
        amount: "",
        notes: "",
        cheque_no: "",
        txn_id: "",
        weight: "",
        effective_weight: "",
        table_type: "purchase",
        table_id: "",
      },
      formErros: {
        user_id: false,
        purity_id: false,
        payment_mode: false,
        payment_date: false,
        amount: false,
        notes: false,
        cheque_no: false,
        txn_id: false,
        weight: false,
        due_date: false,
      },
    };
  };

  handleSubmit = async () => {
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
      if(this.state.purchase.sale != null){
        await stocksTransferHistoryStore({
          from_user_id: this.state.purchase.sale.user_id,
          to_user_id: this.state.purchase.sale.sale_by,
          material_id: this.state.formValues.material_id,
          quantity: 0,
          //material_stocks: this.state.materialStocks,
          payment_mode: this.state.formValues.payment_mode,
          amount: this.state.formValues.amount,
          purity_id: this.state.formValues.purity_id,
          unit_id: this.state.formValues.unit_id,
          weight: this.state.formValues.weight,
          effective_weight: this.state.formValues.effective_weight
        });
      }
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
    if(this.state.materialStocks.length > 0 && isAdmin && this.state.profile && this.state.profile.own == false && formValues.payment_mode == "metal"){
      if (isEmpty(formValues.purity_id)) {
        formErros.purity_id = true;
        hasErr = true;
      } else {
        formErros.purity_id = false;
      }
      if (isEmpty(formValues.weight)) {
        formErros.weight = true;
        hasErr = true;
      } else if(formValues.weight <= 0){
        formErros.weight = true;
        hasErr = true;
        this.props.enqueueSnackbar(
          "Weight must be greater than 0.",
          { variant: "error" }
        );
      } else {
        formErros.weight = false;
      }
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
    if (formValues.payment_mode !== "metal" && 
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
    this.setState({
      approve_declined_processing: true,
    });
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
        approve_declined_processing: false,
      });
      this.loadViewData();
    } else {
      this.props.enqueueSnackbar(status_response.data.message, {
        variant: "error",
      });
      this.setState({
        approve_declined_processing: false,
      });
    }
  };

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false,
    });
  };

  render() {
    const { purchase, formValues, formErros, profile } = this.state;
    console.log("formValues : ", formValues);
    console.log("profile :", profile);
    console.log("this.state.materialStocks : ", this.state.materialStocks);
    let metalPurityList = [];
    if(this.state.materialStocks.length > 0 && isAdmin && profile && profile.own == false && formValues.payment_mode == "metal"){
      this.state.materialStocks.map((item) => {
        if(item.stock_materials.length > 0){
          item.stock_materials.map((subItem) => {
            subItem.purities.map((priority) => {
              metalPurityList.push({
                id: priority.id,
                unit_id: subItem.unit_id,
                value: priority.value,
                name: priority.name+`${priority.value?"("+priority.value+"%)":""}`,
              });
            });
          });
        }
      });
    }
   
    let total_report_charge_amount = 0;
    let total_report_charge_tax_amount = 0;
    let total_report_charge_amount_after_tax = 0;
    if(purchase && purchase.sale){
      total_report_charge_amount = parseFloat(purchase.sale.report_qty)*parseFloat(purchase.sale.report_charge);
      total_report_charge_tax_amount = (total_report_charge_amount*purchase.sale.report_tax_percentage)/100;
      total_report_charge_amount_after_tax = total_report_charge_amount + total_report_charge_tax_amount;
    }

    return (
      <MainCard id="invoice_view_page" title='Purchase Details'>
        {!purchase ? (
          <Grid container justifyContent='center'>
            <CircularProgress size='30px' />
          </Grid>
        ) : (
          <>
            {/*<div className='single-item-wrapper details-header'>
                <div className='single-item'>
                  <p><span>Supplier: </span> <br />{purchase.supplier_name}, {purchase.supplier_mobile}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Number: </span> <br /> {purchase.invoice_number}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Date: </span> <br /> {purchase.invoice_date}</p>
                </div>
                <div className='single-item'>
                  <p><span>Taxable Amount: </span> <br /> {purchase.taxable_amount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Tax: </span> <br /> {purchase.tax}</p>
                </div>
                <div className='single-item'>
                  <p><span>Total Amount: </span> <br /> {purchase.total_amount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Discount: </span>  <br />{purchase.discount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Bill Amount: </span>  <br />{purchase.bill_amount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Total Return: </span>  <br />{purchase.return_amount}</p>
                </div>
                <div className='single-item'>
                  <p><span>Total Payable: </span>  <br />{purchase.total_payable}</p>
                </div>
                <div className='single-item'>
                  <p><span>Paid Amount: </span>  <br />{purchase.paid_amount_display}</p>
                </div>
                <div className='single-item'>
                  <p><span>Due Amount: </span>  <br />{purchase.due_amount_display}</p>
                </div>
                <div className='single-item'>
                  <p><span>Due Date: </span>  <br />{purchase.due_date}</p>
                </div>
                <div className='single-item'>
                  <div><span>Status: </span>  <br />
                  {
                    purchase.is_approved == 0 ? 
                    <Chip label={purchase.approve_status} color="primary" className='approved_status' />
                    :
                    <>
                      {
                        purchase.is_approved == 1 ? 
                        <Chip label={purchase.approve_status} color="success" className='approved_status' />
                        :
                        <Chip label={purchase.approve_status} color="error" className='approved_status' />
                      }
                    </>

                  }
                </div>
                </div>
                {
                  purchase.is_approved == 0 ?
                  <Grid item xs={4}>
                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                      <Button variant="contained" className='search-btn' onClick={() => this.handleStatusChange(1)}>Accept</Button>
                      <Button variant="contained" className='search-btn' onClick={() => this.handleStatusChange(2)}>Decline</Button>
                    </Stack>
                  </Grid>
                  : null
                }

              </div>*/}
            <div className='return-wrapper'>
              <div className='return-header'>
                <p>Invoice Date: {purchase.invoice_date}</p>
                <p>Dues Date:{purchase.due_date}</p>
                {purchase.notes ? <p>Notes: {purchase.notes}</p> : null}
              </div>
              <div className=''>
              {purchase && purchase.is_approved == 1 && !purchase.is_assigned && parseFloat(purchase.due_amount) > 0 ? (
                <Button
                  variant='contained'
                  className='add-button'
                  onClick={() => this.handlePayNow()}>
                  Pay Now
                </Button>
              ) : null}
                <Button
                  className='add-button'
                  variant='contained'
                  onClick={() => this.props.navigate(-1)}>
                  Back
                </Button>
              </div>
            </div>
            <Grid
              container
              spacing={gridSpacing}
              className='details-header ratn-pur-wrapper loans_view'>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <div className='ratn-table-purchase-wrapper'>
                    <Table
                      aria-label='collapsible table'
                      className='invoice_product_list'>
                      <TableHead className='ratn-table-header'>
                        <TableRow>
                          <TableCell>Supplier</TableCell>
                          <TableCell>Added By</TableCell>
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
                      <TableBody className='pur-details-table-body'>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            {purchase.supplier_name}
                          </TableCell>
                          <TableCell>{purchase.added_by_details.user_name}</TableCell>  
                          <TableCell>{purchase.total_amount}</TableCell>
                          <TableCell>{purchase.discount}</TableCell>
                          <TableCell>{purchase.bill_amount}</TableCell>
                          <TableCell>{purchase.return_amount}</TableCell>
                          <TableCell>{purchase.paid_amount_display}</TableCell>
                          <TableCell>{purchase.due_amount_display}</TableCell>
                          <TableCell>{purchase.invoice_number}</TableCell>
                          <TableCell className='sales-status'>
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
            {purchase.is_approved == 0 ? (
              <div className='sale-view-button'>
                <Button
                  variant='contained'
                  className='primary accept'
                  onClick={() => this.handleStatusChange(1)}>
                  Accept
                </Button>
                <Button
                  variant='contained'
                  className='danger decline'
                  onClick={() => this.handleStatusChange(2)}>
                  Decline
                </Button>
              </div>
            ) : null}
            {purchase.sale && purchase.sale.report_qty > 0 && <Grid
              container
              spacing={gridSpacing}
              className='details-header ratn-pur-wrapper loans_view'>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <div className='ratn-table-purchase-wrapper'>
                    <Table
                      aria-label='collapsible table'
                      className='invoice_product_list'>
                      <TableHead className='sub-table-header ratn-table-header '>
                        <TableRow>
                          <TableCell sx={{ width: 15 }}></TableCell>
                          
                          <TableCell sx={{ width: 120 }}>Report Charge</TableCell>
                          <TableCell sx={{ width: 40 }}>Total Charge</TableCell>
                          <TableCell sx={{ width: 90 }}>Tax(%)</TableCell>
                          <TableCell sx={{ width: 40 }}>Tax</TableCell>
                          <TableCell sx={{ width: 40 }}>Total Charge</TableCell>
                          <TableCell sx={{ width: 40 }}>Sub Total</TableCell>
                          <TableCell sx={{ width: 40 }}>Total Tax</TableCell>
                          <TableCell sx={{ width: 40 }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className='pur-details-table-body'>
                        <TableRow>
                          <TableCell></TableCell>
                          
                          <TableCell >
                            {`${purchase.sale.report_qty} pics x ${displayAmount(purchase.sale.report_charge)} = `}
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            {displayAmount(total_report_charge_amount)}
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            
                              {`${priceFormat(purchase.sale.report_tax_percentage).toFixed(2)}%`}
                            
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            {displayAmount(total_report_charge_tax_amount)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(total_report_charge_amount_after_tax)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(purchase.sale.taxable_amount_raw)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(purchase.sale.total_tax)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {purchase.sale.total_amount}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
            </Grid>}
            <Grid
              container
              spacing={gridSpacing}
              className='details-header ratn-pur-wrapper loans_view'>
              <Grid item xs={12} className='p-add-product create-input'>
                <h3 className='p_heading_list'>Product List</h3>
                <TableContainer component={Paper}>
                  <div className='ratn-table-purchase-wrapper'>
                    <Table
                      aria-label='collapsible table'
                      className='invoice_product_list'>
                      <TableHead className='sub-table-header ratn-table-header'>
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
                          <TableCell colSpan='2'>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow style={{height:"20px"}}></TableRow>
                        {purchase.products.map((row, i) => (
                          <Row key={i} row={row} index={i} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
              {purchase.is_approved == 1 && !purchase.is_assigned ? (
                <Grid
                  item
                  xs={12}
                  className='p-add-product create-input button-right'>
                  <h3 className='p_heading_list'>
                    Payment List{" "}
                    {parseFloat(purchase.due_amount) > 0 ? (
                      <Button
                        variant='contained'
                        className='add-button'
                        onClick={() => this.handlePayNow()}>
                        Pay Now
                      </Button>
                    ) : null}
                  </h3>
                  <DataTable
                    columns={this.columns}
                    rows={this.state.items}
                    page={this.state.queryParams.page}
                    limit={this.state.queryParams.limit}
                    total={this.state.total}
                    handlePagination={this.handlePagination}
                    actions={[]}
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
                </Grid>
              ) : null}
            </Grid>
          </>
        )}

        <Dialog
          className='ratn-dialog-wrapper'
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth='md'>
          <DialogTitle>Pay Now</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            {
              this.state.materialStocks.length > 0 && isAdmin && profile && profile.own == false && formValues.payment_mode == "metal"?
              <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                <div className='ratn-table-purchase-wrapper'>
                  <Table aria-label="collapsible table" className='invoice_product_list'>
                    <TableHead className='ratn-table-header sale-modal-header'>
                      <TableRow>
                        <TableCell>Purity</TableCell>
                        <TableCell>Available Qty</TableCell>
                        <TableCell>Avl. Weight</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Mrp.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.materialStocks.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.stock_materials[0].purity_name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.total_weight_display}</TableCell>
                          <TableCell>{row.unit_display[0]}</TableCell>
                          <TableCell>{row.mrp_display}</TableCell>
                        </TableRow>
                      ))}
                      {/* {this.state.suppliers.map((row, i) => (
                              <Row key={i} row={row} index={i} />
                            ))} */}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
              : null
            }
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                {formValues.payment_mode ? (
                  <Grid item xs={12}>
                    <h3>
                      Wallet Balance: {displayAmount(this.state.wallet_balance)}
                    </h3>
                  </Grid>
                ) : null}
                <Grid
                  item
                  md={4}
                  xs={12}
                  className='p-invoice-date create-input'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Payment Date'
                      value={formValues.payment_date}
                      inputFormat='DD/MM/YYYY'
                      onChange={(newValue) =>
                        this.updateFormValue(newValue, "payment_date")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={formErros.payment_date}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={4} xs={12} className='create-input'>
                  <TextField
                    label='Amount'
                    variant='outlined'
                    fullWidth
                    value={formValues.amount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>₹</InputAdornment>
                      ),
                    }}
                    error={formErros.amount}
                    onChange={(event) =>
                      this.updateFormValue(event.target.value, "amount")
                    }
                  />
                </Grid>

                <Grid item md={4} xs={12} className='create-input'>
                  <FormControl fullWidth error={formErros.payment_mode}>
                    <InputLabel>Payment Mode</InputLabel>
                    <Select
                      className='input-inner'
                      value={formValues.payment_mode}
                      fullWidth
                      label='Payment Mode'
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "payment_mode")
                      }>
                      <MenuItem value=''></MenuItem>
                      <MenuItem value='cash'>Cash</MenuItem>
                      <MenuItem value='cheque'>Cheque</MenuItem>
                      <MenuItem value='imps_neft'>BANKING/RTGS/NEFT</MenuItem>
                      <MenuItem value='online'>UPI/PhonePe/Gpay</MenuItem>
                      {isAdmin && profile && profile.own == false && <MenuItem value='metal'>Metal</MenuItem>}
                    </Select>
                  </FormControl>
                </Grid>
                {formValues.payment_mode == "cheque" ? (
                  <Grid item md={4} xs={12} className='create-input'>
                    <TextField
                      label='Cheque No'
                      variant='outlined'
                      fullWidth
                      value={formValues.cheque_no}
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "cheque_no")
                      }
                    />
                  </Grid>
                ) : null}
                {formValues.payment_mode == "imps_neft" ||
                formValues.payment_mode == "upi" ? (
                  <Grid item md={4} xs={12} className='create-input'>
                    <TextField
                      label='Transaction #'
                      variant='outlined'
                      fullWidth
                      value={formValues.txn_id}
                      onChange={(event) =>
                        this.updateFormValue(event.target.value, "txn_id")
                      }
                    />
                  </Grid>
                ) : null}
                {isAdmin && profile && profile.own == false && formValues.payment_mode == "metal" ? (
                  <>
                    <Grid item md={4} xs={12} className='create-input'>
                      <FormControl fullWidth error={formErros.payment_mode}>
                        <InputLabel>Purity</InputLabel>
                        <Select
                          className='input-inner'
                          value={formValues.purity_id}
                          fullWidth
                          label='Purity'
                          error={formErros.purity_id}
                          onChange={(event) => {
                            let effective_weight = 0;
                            let selected_purity = metalPurityList.find(
                              (item) => item.id == event.target.value
                            );
                            if (selected_purity && parseFloat(formValues.weight) > 0) {
                              effective_weight = selected_purity.value
                              ?
                                (parseFloat(formValues.weight) *
                                parseFloat(selected_purity.value)) /
                                100
                              : parseFloat(formValues.weight);
                            }
                              
                            console.log(" selected_purity : ", selected_purity);
                            
                            this.setState({
                              formValues: {
                                ...this.state.formValues,
                                "effective_weight": effective_weight,
                                "unit_id" : selected_purity.unit_id,
                                "purity_id": selected_purity.id,
                              }
                            });
                          }
                          }>
                          {metalPurityList.map((item, i) => (
                            <MenuItem key={i} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item md={4} xs={12} className='create-input'>
                      <FormControl fullWidth error={formErros.payment_mode}>
                        <InputLabel>Material</InputLabel>
                        <Select
                          className='input-inner'
                          value={formValues.material_id}
                          fullWidth
                          label='Material'
                          error={formErros.material_id}
                          onChange={(event) => {
                            
                          }
                          }>
                          {metalPurityList.map((item, i) => (
                            <MenuItem key={i} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item md={4} xs={12} className='create-input'>
                      <TextField
                        label='Weight(GM)'
                        variant='outlined'
                        fullWidth
                        error={formErros.weight}
                        value={formValues.weight}
                        onChange={(event) => {
                          let effective_weight = 0;
                          let selected_purity = metalPurityList.find(
                            (item) => item.id == formValues.purity_id
                          );
                          if (selected_purity && parseFloat(event.target.value) > 0) {
                            effective_weight = selected_purity.value
                            ?
                              (parseFloat(event.target.value) *
                              parseFloat(selected_purity.value)) /
                              100
                            : parseFloat(event.target.value);
                          }
                            
                          console.log(" selected_purity : ", selected_purity);
                          
                          this.setState({
                            formValues: {
                              ...this.state.formValues,
                              "weight": event.target.value,
                              "unit_id" : selected_purity.unit_id,
                              "effective_weight": effective_weight
                            },
                          });
                        }
                        }
                      />
                      {formValues.effective_weight > 0 ? <Typography
                        variant='h6'
                        gutterBottom
                        component='div'>{`Effective weight : ${formValues.effective_weight} GM`}</Typography>:<></>}
                    </Grid>
                  </>
                ) : null}
                <Grid item md={4} xs={12} className='create-input'>
                  <TextareaAutosize
                    className='description'
                    minRows={1}
                    placeholder='Notes'
                    style={{ width: "100%", height: "51px" }}
                    value={formValues.notes}
                    onChange={(event) =>
                      this.updateFormValue(event.target.value, "notes")
                    }
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                  className='p-invoice-date create-input'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Due Date'
                      value={formValues.due_date}
                      inputFormat='DD/MM/YYYY'
                      onChange={(newValue) =>
                        this.updateFormValue(newValue, "due_date")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={formErros.due_date}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} direction='row' justifyContent='flex-end'>
                    <Button
                      variant='contained'
                      type='button'
                      disabled={this.state.processing}
                      onClick={this.handleSubmit}>
                      {this.state.processing ? "Processing" : "Submit"}
                    </Button>
                    <Button variant='outlined' onClick={this.handleDialogClose}>
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.confirmDialog}
          onClose={this.handleConfirmDialogClose}
          fullWidth
          maxWidth='xs'
          className='ratn-dialog-wrapper'>
          <DialogTitle>
            {this.state.status_changing == 1 ? "Accept" : "Decline"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {this.state.status_changing == 1
                ? "Are you sure want to accept this purchase?"
                : "Are you sure want to decline this purchase?"}
              {this.state.status_changing != 1 &&
              purchase &&
              parseFloat(purchase.paid_amount) > 0 ? (
                <>
                  <FormControl>
                    <RadioGroup
                      row
                      name='row-radio-buttons-group'
                      value={this.state.decline_type}
                      onChange={(e) =>
                        this.setState({ decline_type: e.target.value })
                      }>
                      <FormControlLabel
                        value='advance'
                        control={<Radio />}
                        label={`Payment move to advance ${displayAmount(
                          purchase.paid_amount
                        )}`}
                      />
                      <FormControlLabel
                        value='return'
                        control={<Radio />}
                        label={`Payment Return ${displayAmount(
                          purchase.paid_amount
                        )}`}
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              ) : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction='row' justifyContent='flex-end'>
              {!this.state.approve_declined_processing ? (
                <>
                  <Button
                    variant='outlined'
                    onClick={this.handleConfirmDialogClose}>
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    type='button'
                    onClick={this.handleConfirmSubmit}>
                    Yes, Confirm
                  </Button>
                </>
              ) : (
                <CircularProgress size='30px' />
              )}
            </Stack>
          </DialogActions>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  purchase: state.superadmin.purchase.purchase,
  materialStocks: state.superadmin.stocks.items,
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
        stocksList
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseViewPage))
);

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(true);
  const sl_no = index + 1;
  let odd_even_class = sl_no % 2 == 0 ? "even" : "odd";
  if (row.is_return) {
    odd_even_class += " strike_through";
  }
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={odd_even_class}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
            className='expand_icon'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' style={{ color: "#fff" }}>
          {sl_no <= 9 ? "0" + sl_no : sl_no}
        </TableCell>
        <TableCell component='th' scope='row' style={{ color: "#fff" }}>
          {row.product_name}
        </TableCell>
        <TableCell style={{ color: "#fff" }}>{row.category_name}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.certificate_no}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.total_weight}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.size_name}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.making_charge}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.rep}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.sub_total}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.total_discount}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.tax}</TableCell>
        <TableCell style={{ color: "#fff" }}>{row.total}</TableCell>
      </TableRow>
      <TableRow className={"table-inner-row sub_table " + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant='h6'
                gutterBottom
                component='div'></Typography>
              <Table size='medium' aria-label='purchases'>
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell className={odd_even_class}>
                      Material Name
                    </TableCell>
                    <TableCell className={odd_even_class}>Purity</TableCell>
                    <TableCell className={odd_even_class}>Quantity</TableCell>
                    <TableCell className={odd_even_class}>
                      Total Weight
                    </TableCell>
                    {row.product_code == "" ? (
                      <TableCell className={odd_even_class}>
                        Pakka Weight
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className={odd_even_class}>Unit</TableCell>
                    <TableCell className={odd_even_class}>Rate</TableCell>
                    <TableCell className={odd_even_class}>Amount</TableCell>
                    <TableCell className={odd_even_class}>Dist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='pur-details-table-body'>
                  {row.materials.map((item, i) =>
                    !(item.weight == 0 && item.quantity == 0) ? (
                      <TableRow key={i}>
                        {/* {console.log(
                          "---------------- view",
                          item.weight != 0 ||
                            (item.quantity != 0 && item.rate != 0.0)
                        )}
                        {console.log(
                          "--------------row.materials",
                          row.materials
                        )} */}
                        <TableCell scope='row' className={odd_even_class}>
                          {item.material_name}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.purity_name}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.quantity}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.weight}
                        </TableCell>
                        {row.product_code == "" ? (
                          <TableCell className={odd_even_class}>
                            {item.pakka_weight}
                          </TableCell>
                        ) : (
                          ""
                        )}
                        <TableCell className={odd_even_class}>
                          {item.unit_name}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.rate}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.amount}
                        </TableCell>
                        <TableCell className={odd_even_class}>
                          {item.discount_amount}
                        </TableCell>
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
