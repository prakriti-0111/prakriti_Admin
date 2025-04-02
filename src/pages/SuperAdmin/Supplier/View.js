import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, Pagination, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { supplierFetch } from 'actions/superadmin/supplier.actions';
import { purchaseList } from 'actions/superadmin/purchase.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {isEmpty, displayAmount} from 'src/helpers/helper';
import { paymentStore, paymentGetWalletBalance } from 'actions/superadmin/payment.actions';
import {SUPERADMIN_RESET_PAYMENT} from '../../../actionTypes/superadmin/payment.types';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import { fontSize } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';
import { getNotifiactions } from 'actions/superadmin/notification.actions';

class SupplierViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      supplier: this.props.supplier,
      purchaseList: this.props.purchaseList,
      purchaseTotal: this.props.purchaseTotal,
      queryParams: {
        page: 1,
        limit: 50,
        search: ''
      },
      openDialog: false,
      due_amount: this.props.due_amount,
      due_amount_display: this.props.due_amount_display,
      ...this.defaultFormValues(),
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      wallet_balance: 0,
      pay_by_invoice: null
    }

    this.columns = [
      {
        name: 'invoice_number',
        display_name: 'Invoice Number'
      },
      {
        name: 'invoice_date',
        display_name: 'Invoice Date'
      },
      {
        name: 'total_payable',
        display_name: 'Total Amount'
      },
      {
        name: 'paid_amount',
        display_name: 'Paid Amount'
      },
      {
        name: 'due_amount',
        display_name: 'Due Amount'
      },
      {
        name: 'status_display',
        display_name: 'Status'
      }
    ];

  }

  componentDidMount() {
    this.loadAllData();
  }

  loadAllData = () => {
    this.loadViewData();
    this.loadPurchaseData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.supplier !== state.supplier) {
      update.supplier = props.supplier;
    }
    if(props.purchaseList !== state.purchaseList){
      update.purchaseList = props.purchaseList;
    }
    if(props.purchaseTotal !== state.purchaseTotal){
      update.purchaseTotal = props.purchaseTotal;
    }
    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if(props.createSuccess !== state.createSuccess){
        update.createSuccess = props.createSuccess;
    }
    if(props.successMessage !== state.successMessage){
        update.successMessage = props.successMessage;
    }
    
    if(props.errorMessage !== state.errorMessage){
        update.errorMessage = props.errorMessage;
    }
    if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(){
    if(this.state.actionCalled){
        if(this.state.createSuccess){
            this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
            this.setState({
                processing: false,
                openDialog: false,
                queryParams: {
                  ...this.state.queryParams,
                  page: 1
                },
                ...this.defaultFormValues()
            });
            this.loadAllData();
            this.props.actions.getNotifiactions();
        }else{
            this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
            this.setState({
                processing: false
            });
        }
        this.props.dispatch({
          type: SUPERADMIN_RESET_PAYMENT
        });
    }
    
  }

  loadViewData = () => {
    this.props.actions.supplierFetch(this.props.params.id);
  }

  loadPurchaseData = () => {
    let data = {...this.state.queryParams};
    data.supplier_id = this.props.params.id;
    data.load_payments = true;
    this.props.actions.purchaseList(data);
  }

  handlePagination = (e, number) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: number
      }
    }, () => {
      this.loadPurchaseData();
    })
    
  }

  handleInvoiceView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases/view/' + row.id);
  }

  handleInvoiceEdit = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases/edit/' + row.id);
  }

  handleInvoiceReturn = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases/return/' + row.id);
  }

  handleInvoicePay = (row) => {
    this.setState({
      pay_by_invoice: row,
      openDialog: true,
      ...this.defaultFormValues()
    })
  }

  handlePayNow = () => {
    this.setState({
      openDialog: true,
      pay_by_invoice: null,
      ...this.defaultFormValues()
    })
  }

  handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
        openDialog: false
    })
  }

  updateFormValue = (value, key) => {
      this.setState({
          formValues: {
              ...this.state.formValues,
              [key] : value
          }
      }, async() => {
        if(key == "payment_mode"){
          let wallet_balance = 0;
          if(value){
            let res = await paymentGetWalletBalance(value);
            if(res.data.success){
              wallet_balance = res.data.data.balance;
            }
          }
          this.setState({
            wallet_balance: wallet_balance
          })
        }
      })
  }

  defaultFormValues = () => {
      return {
          formValues: {
              user_id: '',
              payment_mode: '',
              payment_date: moment().format('MM/DD/YYYY'),
              amount: '',
              notes: '',
              cheque_no: '',
              txn_id: '',
              table_type: 'purchase',
              payment_type: "invoice"
          },
          formErros: {
              user_id: false,
              payment_mode: false,
              payment_date: false,
              amount: false,
              notes: false,
              cheque_no: false,
              txn_id: false
          }
      }
  }

  handleSubmit = () => {
    if(!this.formValidate()){
        this.setState({
            processing: true
        });
        let data = {...this.state.formValues, user_id: this.props.params.id}
        if(this.state.pay_by_invoice){
          data.table_id = this.state.pay_by_invoice.id;
        }
        this.props.actions.paymentStore(data);
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if(isEmpty(formValues.amount)){
        formErros.amount = true;
        hasErr = true;
    }else{
        formErros.amount = false;
    }
    if(isEmpty(formValues.payment_mode)){
        formErros.payment_mode = true;
        hasErr = true;
    }else{
        formErros.payment_mode = false;
    }
    if(isEmpty(formValues.payment_date)){
        formErros.payment_date = true;
        hasErr = true;
    }else{
        formErros.payment_date = false;
    }
    if(!isEmpty(formValues.amount) && parseFloat(this.state.wallet_balance) < parseFloat(formValues.amount) && parseFloat(formValues.amount) > 0){
      hasErr = true;
      formErros.amount = true;
      this.props.enqueueSnackbar("Insufficient wallet balance.", {variant: 'error'});
    }else{
      formErros.amount = false;
    }
    this.setState({
        formErros: formErros
    })
    return hasErr;
  }

  handleSearch = () => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1
      }
    }, () => {
      this.loadPurchaseData();
    })
  }

  render() {
    const { supplier, formValues, formErros } = this.state;
    const totalPage = Math.ceil(this.state.purchaseTotal / this.state.queryParams.limit);
    return (
      <MainCard title="Supplier Details"  secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        {
          !supplier ?
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
          :
          <>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
              <div autoComplete="off" className='ratn-dialog-inner'>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='loans_view p_view'>
                  <Grid item xs={12} md={6} className='create-input'>
                    <TextField  
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                      value={supplier.company_name}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} className='create-input'>
                    <TextField  
                      label="Owner Name"
                      variant="outlined"
                      fullWidth
                      value={supplier.name}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="GST Number"
                      variant="outlined"
                      fullWidth
                      value={supplier.gst}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="City"
                      variant="outlined"
                      fullWidth
                      value={supplier.city}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Total Amount"
                      variant="outlined"
                      fullWidth
                      value={supplier.total_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Total Return"
                      variant="outlined"
                      fullWidth
                      value={supplier.total_return}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Total Payable"
                      variant="outlined"
                      fullWidth
                      value={supplier.total_payable_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Total Paid"
                      variant="outlined"
                      fullWidth
                      value={supplier.paid_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Total Dues"
                      variant="outlined"
                      fullWidth
                      value={supplier.due_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className='create-input'>
                    <TextField  
                      label="Advance"
                      variant="outlined"
                      fullWidth
                      value={supplier.advance_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} className='create-input'>
                      <FormControl fullWidth>
                        <OutlinedInput
                          value={this.state.queryParams.search}
                          onChange={(e) => this.setState({
                            queryParams: {
                              ...this.state.queryParams,
                              search: e.target.value
                            }
                          })}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={this.handleSearch}
                                edge="end"
                              >
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          sx={{borderRadius: '25px'}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={2} className='create-input button-right'>
                      <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay</Button>
                    </Grid>
                </Grid>
              </div>
            </Box>
            <Grid container spacing={gridSpacing} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className="details-header ratn-pur-wrapper loans_view">
              <Grid item xs={12} md={12} className="p-add-product create-input">
                <TableContainer component={Paper}>
                  <div className='ratn-table-purchase-wrapper'>
                    <Table aria-label="collapsible table">
                      <TableHead className='ratn-table-header'>
                        <TableRow>
                          {/*<TableCell />*/}
                          <TableCell>#</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Invoice No</TableCell>
                          <TableCell>Bill Amount</TableCell>
                          <TableCell>Return</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Dues</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell sx={{width: '50px'}}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.purchaseList.map((row, i) => (
                          <Row 
                            key={i} 
                            row={row} 
                            page={this.state.queryParams.page} 
                            limit={this.state.queryParams.limit}
                            index={i} 
                            viewAction={this.handleInvoiceView}
                            editAction={this.handleInvoiceEdit}
                            returnAction={this.handleInvoiceReturn}
                            payAction={this.handleInvoicePay}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    {
                      this.state.purchaseTotal > 0 ?
                      <Grid container alignItems="right" className='ratn-table-footer'>
                        <Grid item>
                          <Pagination
                            count={totalPage}
                            page={this.state.queryParams.page}
                            onChange={this.handlePagination}
                          />
                        </Grid>
                      </Grid>
                      : null
                    }
                  </div>
                </TableContainer>
              </Grid>
            </Grid>
            {/*<div className='single-item-wrapper details-header'>
            <div className='single-item'>
              <p><span>Name: </span> <br />{supplier.name}</p>
            </div>
            <div className='single-item'>
              <p><span>Email: </span> <br /> {supplier.email}</p>
            </div>
            <div className='single-item'>
              <p><span>mobile: </span> <br /> {supplier.mobile}</p>
            </div>
            <div className='single-item'>
              <p><span>Adhar: </span>  <br />{supplier.adhar}</p>
            </div>
            <div className='single-item'>
              <p><span>Pan: </span> <br /> {supplier.pan}</p>
            </div>
            <div className='single-item'>
              <p><span>Address: </span> <br /> {supplier.address}</p>
            </div>
            <div className='single-item'>
              <p><span>Company Name: </span> <br /> {supplier.company_name}</p>
            </div>
            <div className='single-item'>
              <p><span>GST: </span>  <br />{supplier.gst}</p>
            </div>
            <div className='single-item'>
              <p><span>Bank Name: </span>  <br />{supplier.bank_name}</p>
            </div>
            <div className='single-item'>
              <p><span>Bank Account No: </span>  <br />{supplier.bank_account_no}</p>
            </div>
            <div className='single-item'>
              <p><span>Bank IFSC: </span>  <br />{supplier.bank_ifsc}</p>
            </div>
            <div className='single-item'>
              <p><span>Due Amount: </span>  <br />{supplier.due_amount_display}</p>
            </div>
            </div>
            <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
              <Grid item xs={12} className="p-add-product create-input">
                <h3 className='p_heading_list'>Purchase List <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay Now</Button></h3>
                <TableContainer component={Paper}>
                  <div className='ratn-table-purchase-wrapper'>
                    <Table aria-label="collapsible table">
                      <TableHead className='ratn-table-header'>
                        <TableRow>
                          <TableCell />
                          <TableCell>#</TableCell>
                          <TableCell>Invoice Number</TableCell>
                          <TableCell>Invoice Date</TableCell>
                          <TableCell>Total Amount</TableCell>
                          <TableCell>Paid Amount</TableCell>
                          <TableCell>Due Amount</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.purchaseList.map((row, i) => (
                          <Row 
                            key={i} 
                            row={row} 
                            page={this.state.queryParams.page} 
                            limit={this.state.queryParams.limit}
                            index={i} 
                            viewAction={this.handleInvoiceView}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    {
                      this.state.purchaseTotal > 0 ?
                      <Grid container alignItems="right" className='ratn-table-footer'>
                        <Grid item>
                          <Pagination
                            count={totalPage}
                            page={this.state.queryParams.page}
                            onChange={this.handlePagination}
                          />
                        </Grid>
                      </Grid>
                      : null
                    }
                  </div>
                </TableContainer>
              </Grid>
            </Grid>*/}
          </>
        }
        

        <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.openDialog}
                onClose={this.handleDialogClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Pay Now {this.state.pay_by_invoice ? ("/ " + this.state.pay_by_invoice.invoice_number) : null}
                </DialogTitle>
                <DialogContent>
                <DialogContentText></DialogContentText>
                    <Box sx={{ flexGrow: 1, m: 0.5 }}>
                        <Grid container spacing={2}>
                          {
                              formValues.payment_mode ?
                              <Grid item xs={12}>
                                <h3>Wallet Balance: {displayAmount(this.state.wallet_balance)}</h3>
                              </Grid>
                              : null
                            }
                            <Grid item md={3} xs={12} className='create-input'>
                              <FormControl fullWidth>
                                <InputLabel>Payment Type</InputLabel>
                                <Select
                                className='input-inner'
                                    value={formValues.payment_type}
                                    fullWidth
                                    label="Payment Type"
                                    onChange={(event) => this.updateFormValue(event.target.value, 'payment_type')}
                                >
                                  {
                                    !this.state.pay_by_invoice ?
                                    <MenuItem value="advance">Advance</MenuItem>
                                    : null
                                  }
                                    <MenuItem value="invoice">Invoice</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12} className='p-invoice-date create-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Payment Date"
                                        value={formValues.payment_date}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newValue) => this.updateFormValue(newValue, 'payment_date')}
                                        renderInput={(params) => <TextField {...params} fullWidth error={formErros.payment_date} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item md={3} xs={12} className='create-input'>
                                <TextField  
                                    label="Amount" 
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.amount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    error={formErros.amount}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'amount')}
                                />
                            </Grid>
                            
                            <Grid item md={3} xs={12} className='create-input'>
                                <FormControl fullWidth error={formErros.payment_mode}>
                                    <InputLabel>Payment Mode</InputLabel>
                                    <Select
                                    className='input-inner'
                                        value={formValues.payment_mode}
                                        fullWidth
                                        label="Payment Mode"
                                        onChange={(event) => this.updateFormValue(event.target.value, 'payment_mode')}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="cheque">Cheque</MenuItem>
                                        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                                        <MenuItem value="online">Online</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                formValues.payment_mode == "cheque"?
                                <Grid item md={6} xs={12} className='create-input'>
                                    <TextField  
                                        label="Cheque No" 
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.cheque_no}
                                        onChange={(event) => this.updateFormValue(event.target.value, 'cheque_no')}
                                    />
                                </Grid>
                                : null
                            }
                            {
                                (formValues.payment_mode == "imps_neft" || formValues.payment_mode == "upi") ?
                                <Grid item md={6} xs={12} className='create-input'>
                                    <TextField  
                                        label="Transaction #" 
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.txn_id}
                                        onChange={(event) => this.updateFormValue(event.target.value, 'txn_id')}
                                    />
                                </Grid>
                                : null
                            }
                            <Grid item md={6} xs={12} className='create-input'>
                                <TextareaAutosize
                                    className='description'
                                    minRows={1}
                                    placeholder="Notes"
                                    style={{ width: '100%', height: '51px' }}
                                    value={formValues.notes}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'notes')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                              <Stack spacing={1} direction="row" justifyContent="flex-end">
                                  <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                                      {
                                          this.state.processing ? "Processing" : "Submit"
                                      }
                                  </Button>
                                  <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
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
  supplier: state.superadmin.supplier.item,
  purchaseList: state.superadmin.purchase.items,
  purchaseTotal: state.superadmin.purchase.total,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      supplierFetch,
      purchaseList,
      paymentStore,
      getNotifiactions
    }, dispatch)
  }
};

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierViewPage)));


function Row(props) {
  const { row, page, limit, index, viewAction, editAction, payAction, returnAction } = props;
  const [open, setOpen] = React.useState(false);

  const getSerialNo = () => {
    return (page == 1) ? (index + 1) : (index + 1 + limit);
  }

  const getStatusColor = (status) => {
    if(status == "Pending"){
      return "#ff9100"
    }else if(status == "Accepted"){
      return "#4caf50";
    }else if(status == "Declined"){
      return "#ff3d00";
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {/*<TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>*/}
        <TableCell scope="row">
          {getSerialNo()}
        </TableCell>
        <TableCell>{row.invoice_date}</TableCell>
        <TableCell>{row.invoice_number}</TableCell>
        <TableCell>{row.bill_amount}</TableCell>
        <TableCell>{row.return_amount}</TableCell>
        <TableCell>{row.paid_amount}</TableCell>
        <TableCell>{row.due_amount}</TableCell>
        <TableCell sx={{color: getStatusColor(row.approve_status)}}><b>{row.approve_status}</b></TableCell>
        <TableCell className='action_btn'>
          <Stack spacing={1} direction="row" justifyContent={"left"} alignItems={"left"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => viewAction(row)}
            >
              <RemoveRedEyeIcon />
            </Button>
            {
              row.created_myself && row.is_approved == 0 ? 
              <Button
                variant="contained"
                color="primary"
                onClick={() => editAction(row)}
              >
                <EditIcon />
              </Button>
              : null
            }
            {
              row.approve_status == "Accepted" ? 
              <Button
                variant="contained"
                color="primary"
                onClick={() => returnAction(row)}
              >
                <ReplayIcon />
              </Button>
              : null
            }
            {
              row.is_approved == 1 && !row.is_assigned && row.status == "due" ?
              <Button
                variant="contained"
                color="primary"
                onClick={() => payAction(row)}
                ref={(node) => {
                  if (node) {
                    node.style.setProperty("backgroundColor", "#357a38", "important");
                    node.style.setProperty("width", "40px", "important");
                    node.style.setProperty("fontSize", "12px", "important");
                  }
                }}
              >
                Pay
              </Button>
              : null
            }
          </Stack>
        </TableCell>
      </TableRow>
      {/*<TableRow className='table-inner-row'>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Mode</TableCell>
                    <TableCell>Cheque / Transaction #</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='pur-details-table-body'>
                  {row.payments.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {item.payment_date}
                      </TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.payment_mode}</TableCell>
                      <TableCell>{item.cheque_no || item.txn_id}</TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>*/}
    </React.Fragment>
  );
}
