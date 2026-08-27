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
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import DataTable from "src/utils/DataTable";
import { withSnackbar } from "notistack";
import { salesView } from "actions/superadmin/sales.actions";
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
import { isEmpty, isSuperAdmin, isAdmin, priceFormat, displayAmount } from "src/helpers/helper";
import { paymentStore, paymentList } from "actions/superadmin/payment.actions";
import { SUPERADMIN_RESET_PAYMENT } from "../../../actionTypes/superadmin/payment.types";
import {
  getRoleName,
  getUserDashboardRoute,
  getApprovalColor,
} from "src/helpers/helper";
import { getNotifiactions } from "actions/superadmin/notification.actions";
import { stocksList } from 'actions/superadmin/stocks.actions';
import { stocksTransferHistoryStore } from 'actions/superadmin/stockHistory.actions';
import { purityList } from 'actions/superadmin/purity.actions';
import axios from 'axios';
import './style.css';
import { PAYMENT_STATUS_COLORS } from "../../../utils/paymentStatusColors";

class SaleViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      sale: this.props.sale,
      materialStocks: this.props.materialStocks,
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
        table_type: "sale",
      },
      auth: this.props.auth,
      liveGoldPerGram: 0,
      liveGoldPriceDisplay: '',
      selectedPurityLabel: '',
      selectedPurityPerGram: 0,
      purityItems: this.props.purityItems || [],
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
        // payment_mode_display carries the amount in brackets while a payment
        // is still pending: "Cheque (Rs.500.00)". The cheque no / txn id have
        // their own columns on this screen, so they are not repeated here.
        name: "payment_mode_display",
        display_name: "Payment Mode",
        isHtml: true,
      },
      {
        name: "cheque_no",
        display_name: "Cheque #",
      },
      {
        name: "txn_id",
        display_name: "Transaction #",
      },
      {
        name: "weight",
        display_name: "Weight",
      },
    ];
  }

  componentDidMount() {
    this.loadViewData();
    this.loadListData();
    this.props.actions.purityList({ all: 1 });
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
    if (props.sale !== state.sale) {
      update.sale = props.sale;
      update.isLoading = false;
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
    if (props.purityItems !== state.purityItems) {
      update.purityItems = props.purityItems;
    }
    if (props.materialStocks !== state.materialStocks) {
      update.materialStocks = props.materialStocks;
    }
    return update;
  }

  handlePayNow = () => {
    axios.get(process.env.GOLD_RATE_URL)
      .then(res => {
        const perGram = res.data && (res.data.base_per_gram || res.data.per_gram);
        if (perGram && perGram['24K']) {
          const liveGoldPerGram = perGram['24K'];
          const liveGoldPriceDisplay = res.data.display || `₹${liveGoldPerGram.toLocaleString('en-IN')}`;
          this.setState({ liveGoldPerGram, liveGoldPriceDisplay });
        }
      })
      .catch(err => console.warn('gold rate fetch failed', err));
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
      user_id: this.state.sale.user_id,
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

  updateFormValue = (value, key) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value,
      },
    });
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
        table_type: "sale",
        table_id: "",
      },
      formErros: {
        user_id: false,
        //material_id: false,
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
      this.setState({ processing: true });
      const { formValues, sale } = this.state;
      const isMetalPayment = formValues.payment_mode === 'metal';
      const totalAmount = parseFloat(formValues.amount) || 0;
      // This modal is 24K-only, so the quoted rate is the 24K spot itself.
      const metalRate = this.state.liveGoldPerGram > 0 ? this.state.liveGoldPerGram : null;

      // 1. Record payment against the sale
      this.props.actions.paymentStore({
        ...formValues,
        amount: totalAmount,
        metal_rate: isMetalPayment ? metalRate : null,
        user_id: sale.user_id,
        table_id: sale.id,
        purity_id: isMetalPayment ? '' : formValues.purity_id,
        effective_weight: isMetalPayment ? formValues.weight : formValues.effective_weight,
      });

      // 2. Transfer metal from buyer to seller's material stock
      if (isMetalPayment) {
        // Find 24K purity from loaded purity list (value = 100 or highest available)
        const purityItems = this.state.purityItems || [];
        let purity24K = purityItems.find(p => parseFloat(p.value) === 100);
        if (!purity24K) purity24K = purityItems.find(p => (p.name || '').toLowerCase().includes('24'));
        if (!purity24K && purityItems.length > 0) {
          purity24K = purityItems.reduce((max, p) => parseFloat(p.value) > parseFloat(max.value) ? p : max, purityItems[0]);
        }
        // Get unit_id from seller's material stocks if loaded
        const materialStocks = this.state.materialStocks || [];
        let unit_id = '';
        if (materialStocks.length > 0 && materialStocks[0].stock_materials?.length > 0) {
          unit_id = materialStocks[0].stock_materials[0].unit_id || '';
        }
        try {
          const stockRes = await stocksTransferHistoryStore({
            from_user_id: sale.user_id,
            to_user_id: sale.sale_by_id,
            material_id: formValues.material_id,
            quantity: 0,
            payment_mode: 'metal',
            amount: totalAmount,
            metal_rate: metalRate,
            ref_no: sale.invoice_number || `SALE-${sale.id}`,
            purity_id: purity24K?.id || '',
            unit_id: unit_id,
            weight: formValues.weight,
            effective_weight: formValues.weight,
          });
          if (!stockRes?.data?.success) {
            this.props.enqueueSnackbar(
              stockRes?.data?.message || 'Metal stock update failed.',
              { variant: 'warning' }
            );
          }
        } catch (e) {
          this.props.enqueueSnackbar('Metal stock update failed.', { variant: 'warning' });
        }
      }
    }
  };

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    const isMetalPayment = formValues.payment_mode === 'metal';

    // Nothing absorbs an over-payment any more, so no mode may exceed the due.
    if (parseFloat(formValues.amount) > parseFloat(this.state.sale.due_amount)) {
      hasErr = true;
      this.props.enqueueSnackbar("Amount must be less than or equal due amount.", { variant: "error" });
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
    if (isMetalPayment) {
      // Metal is always 24K — only validate weight
      if (isEmpty(formValues.weight)) {
        formErros.weight = true;
        hasErr = true;
      } else if (parseFloat(formValues.weight) <= 0) {
        formErros.weight = true;
        hasErr = true;
        this.props.enqueueSnackbar("Weight must be greater than 0.", { variant: "error" });
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
    this.setState({
      formErros: formErros,
    });
    return hasErr;
  };

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
      this.loadListData();
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
        window.scrollTo(0, document.querySelector(".p_heading_list").offsetTop);
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
    this.props.actions.salesView(this.props.params.id);
    console.log(this.props.actions.salesView(this.props.params.id));
  };

  render() {
    const { sale, formValues, formErros } = this.state;
    const { liveGoldPerGram } = this.state;
    const metalAmount = liveGoldPerGram > 0 && parseFloat(formValues.weight) > 0
      ? parseFloat((parseFloat(formValues.weight) * liveGoldPerGram).toFixed(2))
      : parseFloat(formValues.amount) || 0;
    let total_report_charge_amount = 0;
    let total_report_charge_tax_amount = 0;
    let total_report_charge_amount_after_tax = 0;
    if(sale){
      total_report_charge_amount = parseFloat(sale.report_qty)*parseFloat(sale.report_charge);
      total_report_charge_tax_amount = (total_report_charge_amount*sale.report_tax_percentage)/100;
      total_report_charge_amount_after_tax = total_report_charge_amount + total_report_charge_tax_amount;
    }
    return (
      <MainCard
        id="invoice_view_page"
        secondary={<>
          {sale && parseFloat(sale.due_amount) > 0 ? (
            <Button
              variant='contained'
              className='add-button'
              onClick={() => this.handlePayNow()}>
              Pay Now
            </Button>
          ) : null}
          <Button variant='contained' onClick={() => this.props.navigate(-1)}>
            Back
          </Button></>
        }>
        {this.state.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* <div className='single-item-wrapper details-header'>
                  <div className='single-item'>
                    <p><span>Admin: </span> <br />{sale.user_name}, {sale.user_mobile}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Invoice Number: </span> <br /> {sale.invoice_number}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Invoice Date: </span> <br /> {sale.invoice_date}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Taxable Amount: </span> <br /> {sale.taxable_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Cgst Tax: </span> <br /> {sale.cgst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Sgst Tax: </span> <br /> {sale.sgst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Igst Tax: </span> <br /> {sale.igst_tax}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Total Amount: </span> <br /> {sale.total_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Discount: </span>  <br />{sale.discount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Total Payable: </span>  <br />{sale.total_payable}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Paid Amount: </span>  <br />{sale.paid_amount}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Due Amount: </span>  <br />{sale.due_amount_display}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Due Date: </span>  <br />{sale.due_date}</p>
                  </div>
                  <div className='single-item'>
                    <p><span>Settlement Date: </span>  <br />{sale.settlement_date}</p>
                  </div>
                  <div className='single-item'>
                      <div><span>Status: </span>  <br />
                          {
                            sale.is_approved == 0 ? 
                            <Chip label={sale.approve_status} color="primary" className='approved_status' />
                            :
                            <>
                              {
                                sale.is_approved == 1 ? 
                                <Chip label={sale.approve_status} color="success" className='approved_status' />
                                :
                                <Chip label={sale.approve_status} color="error" className='approved_status' />
                              }
                            </>

                          }
                      </div> 
                  </div>

                </div> */}

            {sale.report_qty > 0 && <Grid
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
                          
                        </TableRow>
                      </TableHead>
                      <TableBody className='pur-details-table-body'>
                        <TableRow>
                          <TableCell></TableCell>
                          
                          <TableCell >
                            {`${sale.report_qty} pics x ${displayAmount(sale.report_charge)} = `}
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            {displayAmount(total_report_charge_amount)}
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            
                              {`${priceFormat(sale.report_tax_percentage).toFixed(2)}%`}
                            
                          </TableCell>
                          <TableCell className=' align-items-center'>
                            {displayAmount(total_report_charge_tax_amount)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(total_report_charge_amount_after_tax)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(sale.taxable_amount_raw)}
                          </TableCell>
                          <TableCell className=" align-items-center">
                            {displayAmount(sale.total_tax)}
                          </TableCell>
                          
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
            </Grid>}

            {/*<div className='sale-view-button'>
                  
                    <Button variant="contained" className='primary accept'>Accept</Button>
                    <Button variant="contained" className='danger decline'>Decline</Button>
                 
              </div>*/}
            {/*<Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view" style={{paddingTop : '0px'}}>
                <Grid item xs={12} className="p-add-product create-input button-right">
                  <h3 className='p_heading_list' style={{paddingTop : '0px'}}>Payment List {parseFloat(sale.due_amount) > 0 ? <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay Now</Button> : null}</h3>
                  <DataTable 
                      columns={this.columns}
                      rows={this.state.items}
                      page={this.state.queryParams.page}
                      limit={this.state.queryParams.limit}
                      total={this.state.total}
                      handlePagination={this.handlePagination}
                  />
                </Grid>
                </Grid>*/}
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
                          <TableCell>Sub Total</TableCell>
                          <TableCell>Dist</TableCell>
                          <TableCell>Tax</TableCell>
                          <TableCell colSpan='2'>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow style={{height:"20px"}}></TableRow>
                        {sale.products.map((row, i) => (
                          <Row key={i} row={row} index={i} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TableContainer>
              </Grid>
              {!sale.is_assigned ? (
                <Grid
                  item
                  xs={12}
                  className='p-add-product create-input button-right'>
                  <h3 className='p_heading_list sales_heading_list'>
                    Payment List{" "}
                    {parseFloat(sale.due_amount) > 0 ? (
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
                    actionValueColorConditions={PAYMENT_STATUS_COLORS}
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
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 3 }}>
            <span>Pay Now</span>
            {this.state.liveGoldPriceDisplay ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#fff', fontWeight: 800, fontSize: '0.9rem',
                whiteSpace: 'nowrap'
              }}>
                24K:- <strong style={{ marginLeft: 4 }}>₹{this.state.liveGoldPerGram.toLocaleString('en-IN')}/gm</strong>
              </span>
            ) : null}
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
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
                          className='non_disable_text'
                        />
                      )}
                      disabled
                    />
                  </LocalizationProvider>
                </Grid>
                {/* Amount: auto-calculated for metal, manual for others */}
                <Grid item md={4} xs={12} className='create-input'>
                  <TextField
                    label='Amount'
                    variant='outlined'
                    fullWidth
                    value={formValues.payment_mode === 'metal' ? (metalAmount || '') : formValues.amount}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
                      readOnly: formValues.payment_mode === 'metal',
                    }}
                    error={formErros.amount}
                    onChange={(event) => {
                      if (formValues.payment_mode !== 'metal') this.updateFormValue(event.target.value, 'amount');
                    }}
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
                      onChange={(event) => {
                        this.setState({
                          formValues: { ...this.state.formValues, payment_mode: event.target.value, weight: '', amount: '' },
                        });
                      }}>
                      <MenuItem value=''></MenuItem>
                      <MenuItem value='cash'>Cash</MenuItem>
                      <MenuItem value='cheque'>Cheque</MenuItem>
                      <MenuItem value='imps_neft'>BANKING/RTGS/NEFT</MenuItem>
                      <MenuItem value='online'>UPI/PhonePe/Gpay</MenuItem>
                      {isSuperAdmin && isAdmin && <MenuItem value='metal'>Metal (24K)</MenuItem>}
                    </Select>
                  </FormControl>
                </Grid>

                {formValues.payment_mode === 'cheque' && (
                  <Grid item md={4} xs={12} className='create-input'>
                    <TextField label='Cheque No' variant='outlined' fullWidth value={formValues.cheque_no}
                      onChange={(e) => this.updateFormValue(e.target.value, 'cheque_no')} />
                  </Grid>
                )}
                {(formValues.payment_mode === 'imps_neft' || formValues.payment_mode === 'upi') && (
                  <Grid item md={4} xs={12} className='create-input'>
                    <TextField label='Transaction #' variant='outlined' fullWidth value={formValues.txn_id}
                      onChange={(e) => this.updateFormValue(e.target.value, 'txn_id')} />
                  </Grid>
                )}

                {/* Metal 24K: weight input → amount auto-calculates from live rate */}
                {isSuperAdmin && isAdmin && formValues.payment_mode === 'metal' && (
                  <Grid item md={4} xs={12} className='create-input'>
                    <TextField
                      label='Weight (GM) — 24K'
                      variant='outlined'
                      fullWidth
                      type='number'
                      inputProps={{ step: '0.001', min: 0 }}
                      error={formErros.weight}
                      value={formValues.weight}
                      onChange={(event) => {
                        let w = event.target.value;
                        // Limit to 3 decimal places
                        if (w && w.includes('.')) {
                          const parts = w.split('.');
                          if (parts[1] && parts[1].length > 3) {
                            w = parts[0] + '.' + parts[1].slice(0, 3);
                          }
                        }
                        const calcAmount = liveGoldPerGram > 0 && parseFloat(w) > 0
                          ? parseFloat((parseFloat(w) * liveGoldPerGram).toFixed(2)) : '';
                        this.setState({
                          formValues: { ...this.state.formValues, weight: w, amount: calcAmount, effective_weight: w },
                        });
                      }}
                    />
                    {liveGoldPerGram > 0 && parseFloat(formValues.weight) > 0 && (
                      <Typography variant='h6' gutterBottom component='div'>
                        {`₹${metalAmount.toLocaleString('en-IN')} @ ₹${liveGoldPerGram.toLocaleString('en-IN')}/gm`}
                      </Typography>
                    )}
                  </Grid>
                )}
                <Grid item md={4} xs={12} className='create-input'>
                  <TextareaAutosize
                    className='description'
                    minRows={1}
                    maxLength={20}
                    placeholder='Notes'
                    style={{ width: "100%", height: "51px" }}
                    value={formValues.notes}
                    onChange={(event) =>
                      this.updateFormValue(event.target.value, "notes")
                    }
                  />
                  <Typography
                    variant='h6'
                    gutterBottom
                    component='div'>{`*Max 20 characters are allowed.`}</Typography>
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
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  sale: state.superadmin.sales.sale,
  materialStocks: state.superadmin.stocks.items,
  purityItems: state.superadmin.purity.items,
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
        salesView,
        paymentStore,
        paymentList,
        getNotifiactions,
        stocksList,
        purityList
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleViewPage))
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
        {/* <TableCell style={{ color: "#fff" }}>{row.rep}</TableCell> */}
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
