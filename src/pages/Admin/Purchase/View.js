import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { purchaseView, purchaseStatusChange } from 'actions/admin/purchase.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {isEmpty} from 'src/helpers/helper';
import { paymentStore, paymentList, paymentGetWalletBalance } from 'actions/admin/payment.actions';
import {ADMIN_RESET_PAYMENT} from '../../actionTypes/admin/payment.types';
import { getRoleName, getUserDashboardRoute, displayAmount } from 'src/helpers/helper';

class PurchaseViewPage extends React.Component {

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
        table_type: "purchase"
      },
      confirmDialog: false,
      status_changing: 0,
      auth: this.props.auth,
      wallet_balance: 0
    }

    this.columns = [
      {
        name: 'payment_date',
        display_name: 'Payment Date'
      },
      {
          name: 'amount',
          display_name: 'Amount'
      },
      {
          name: 'payment_mode',
          display_name: 'Payment Mode'
      },
      {
          name: 'cheque_no',
          display_name: 'Cheque #'
      },
      {
          name: 'txn_id',
          display_name: 'Transaction #'
      }
    ];

  }

  componentDidMount() {
    this.loadViewData();
    this.loadListData();
  }

  loadListData = () => {
    let data = {...this.state.queryParams, table_id: this.props.params.id};
    this.props.actions.paymentList(data);
  }

  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadListData();
    })
    
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.purchase !== state.purchase) {
      update.purchase = props.purchase;
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
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
        update.total = props.total;
    }
    if (props.auth !== state.auth) {
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
            this.loadViewData();
            this.loadListData();
        }else{
            this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
            this.setState({
                processing: false
            });
        }
        this.props.dispatch({
          type: ADMIN_RESET_PAYMENT
        });
    }
    
  }

  loadViewData = () => {
    this.props.actions.purchaseView(this.props.params.id);
  }

  handlePayNow = () => {
    this.setState({
      openDialog: true
    })
  }

  handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
        openDialog: false
    })
  }

  handleSupplierChange = (event) => {
      this.updateFormValue(event.target.value, 'user_id');
      this.props.actions.paymentTotalDue(event.target.value)
  }

  updateFormValue = async(value, key) => {
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
              due_date: '',
              amount: '',
              notes: '',
              cheque_no: '',
              txn_id: '',
              table_type: "purchase",
              table_id: ''
          },
          formErros: {
              user_id: false,
              payment_mode: false,
              payment_date: false,
              amount: false,
              notes: false,
              cheque_no: false,
              txn_id: false,
              due_date: false
          }
      }
  }

  handleSubmit = () => {
    if(!this.formValidate()){
        this.setState({
            processing: true
        });
        let data = {...this.state.formValues, user_id: this.state.purchase.supplier_id, table_id: this.state.purchase.id}
        this.props.actions.paymentStore(data);
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if(parseFloat(formValues.amount) > parseFloat(this.state.purchase.due_amount)){
      hasErr = true;
      this.props.enqueueSnackbar("Amount must be less than or equal due amount.", {variant: 'error'});
    }
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
    if(isEmpty(formValues.due_date)){
      formErros.due_date = true;
      hasErr = true;
    }else{
        formErros.due_date = false;
    }
    if(!isEmpty(formValues.amount) && parseFloat(this.state.wallet_balance) < parseFloat(formValues.amount)){
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

  handleStatusChange = async(val) =>{
    this.setState({
      status_changing: val,
      confirmDialog: true
    })
    
  }

  handleConfirmSubmit = async() => {
    let data = {approve_status: this.state.status_changing};
    let status_response = await purchaseStatusChange(this.props.params.id, data);
    if(status_response.data.success == true){
        this.props.enqueueSnackbar(status_response.data.message, {variant: 'success'});
        this.setState({
          confirmDialog: false
        });
        this.loadViewData();
    }else{
        this.props.enqueueSnackbar(status_response.data.message, {variant: 'error'});
    }
  }

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false
    })
  }

  render() {
    const { purchase, formValues, formErros } = this.state;
    return (
      <MainCard title="Purchase Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        
          {
            !purchase ?
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
              :
              <>
              <div className='single-item-wrapper details-header'>
                <div className='single-item'>
                  <p><span>Supplier: </span> <br />{purchase.supplier_name}, {purchase.supplier_mobile}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Number: </span> <br /> {purchase.invoice_number}</p>
                </div>
                <div className='single-item'>
                  <p><span>Invoice Date: </span> <br /> {purchase.invoice_date}</p>
                </div>
                {/*<div className='single-item'>
                  <p><span>Payment Mode: </span>  <br />{purchase.payment_mode}</p>
                </div>*/}
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
                  <p><span>Paid Amount: </span>  <br />{purchase.paid_amount}</p>
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

                </div>
                <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12} className="p-add-product create-input">
                  <h3 className='p_heading_list'>Product List</h3>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table">
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Certificate Number</TableCell>
                            <TableCell>Total Weight</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Making Charge</TableCell>
                            <TableCell>ETC</TableCell>
                            <TableCell>Sub Total</TableCell>
                            <TableCell>Tax</TableCell>
                            <TableCell>Tag Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {purchase.products.map((row, i) => (
                            <Row key={i} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
                {
                  purchase.is_approved == 1 ?
                  <Grid item xs={12} className="p-add-product create-input button-right">
                    <h3 className='p_heading_list'>Payment List {parseFloat(purchase.due_amount) > 0 ? <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay Now</Button> : null}</h3>
                    <DataTable 
                        columns={this.columns}
                        rows={this.state.items}
                        page={this.state.queryParams.page}
                        limit={this.state.queryParams.limit}
                        total={this.state.total}
                        handlePagination={this.handlePagination}
                    />
                  </Grid>
                  : null
                }
                </Grid>
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
                    Pay Now
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
                            <Grid item xs={4} className='p-invoice-date create-input'>
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
                            <Grid item xs={4} className='create-input'>
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
                            
                            <Grid item xs={4} className='create-input'>
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
                                <Grid item xs={4} className='create-input'>
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
                                <Grid item xs={4} className='create-input'>
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
                            <Grid item xs={4} className='create-input'>
                                <TextareaAutosize
                                    className='description'
                                    minRows={1}
                                    placeholder="Notes"
                                    style={{ width: '100%', height: '51px' }}
                                    value={formValues.notes}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'notes')}
                                />
                            </Grid>
                            <Grid item xs={4} className='p-invoice-date create-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Due Date"
                                        value={formValues.due_date}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newValue) => this.updateFormValue(newValue, 'due_date')}
                                        renderInput={(params) => <TextField {...params} fullWidth error={formErros.due_date} />}
                                    />
                                </LocalizationProvider>
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
          

            <Dialog
                open={this.state.confirmDialog}
                onClose={this.handleConfirmDialogClose}
                fullWidth
                maxWidth="xs"
                className="ratn-dialog-wrapper"
            >
                <DialogTitle>
                  {
                    this.state.status_changing == 1 ? "Accept" : "Decline"
                  }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {
                        this.state.status_changing == 1 ?
                        "Are you sure want to accept this purchase?"
                        :
                        "Are you sure want to decline this purchase?"
                      }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <Button variant="outlined" onClick={this.handleConfirmDialogClose}>Cancel</Button>
                        <Button variant="contained" type="button" onClick={this.handleConfirmSubmit}>Yes, Confirm</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  purchase: state.admin.purchase.purchase,
  actionCalled: state.admin.payment.actionCalled,
  createSuccess: state.admin.payment.createSuccess,
  successMessage: state.admin.payment.successMessage,
  errorMessage: state.admin.payment.errorMessage,
  items: state.admin.payment.items,
  total: state.admin.payment.total,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      purchaseView,
      paymentStore,
      paymentList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseViewPage)));



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  console.log('row.is_return', row.is_return)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={row.is_return ? "strike_through" : ""}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
        <TableCell>{row.tax}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
      <TableRow className='table-inner-row'>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='pur-details-table-body'>
                  {row.materials.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {item.material_name}
                      </TableCell>
                      <TableCell>{item.purity_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.unit_name}</TableCell>
                      <TableCell>{item.rate}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
