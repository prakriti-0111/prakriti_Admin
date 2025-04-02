import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import {
  purchaseView,
  purchaseStatusChange,
  purchaseDownloadInvoiceInfo, 
  purchaseDownloadInvoiceItems 
} from "actions/superadmin/purchase.actions";
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
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
import { isEmpty } from 'src/helpers/helper';
import { paymentStore, paymentList } from 'actions/superadmin/payment.actions';
import { SUPERADMIN_RESET_PAYMENT } from '../../../actionTypes/superadmin/payment.types';
import { getRoleName, getUserDashboardRoute, getApprovalColor } from 'src/helpers/helper';
import { getNotifiactions } from 'actions/superadmin/notification.actions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


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
      auth: this.props.auth,
      downloadingInfo: false,
      downloadingItem: false,
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
    let data = { ...this.state.queryParams, table_id: this.props.params.id };
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

  handleDownloadInfo = async (id) => {
    this.setState({
      downloadingInfo: true
    });

    let response = await purchaseDownloadInvoiceInfo(id);
    if(response.data.success){
      this.setState({
        downloadingInfo: false
      }, () => {
        window.open(response.data.data.url, '_blank').focus();
      });
      

      /*var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        var blob = xhr.response;
        var downloaded = document.createElement('a');
        var downloadedurl = window.URL.createObjectURL(blob);
        downloaded.href = downloadedurl;
        downloaded.download = response.data.data.file_name;
        document.body.append(downloaded);
        downloaded.click();
        downloaded.remove();
        window.URL.revokeObjectURL(downloadedurl);
      };
      xhr.open('GET', response.data.data.url);
      xhr.send();*/
    } else {
      this.setState({
        downloadingInfo: false
      });
    }
  }

  handleDownloadItems = async (id) => {
    this.setState({
      downloadingItem: true
    });
    let response = await purchaseDownloadInvoiceItems(id);
    if(response.data.success){
      this.setState({
        downloadingItem: false
      }, () => {
        window.open(response.data.data.url, '_blank').focus();
      });

      /*var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        var blob = xhr.response;
        var downloaded = document.createElement('a');
        var downloadedurl = window.URL.createObjectURL(blob);
        downloaded.href = downloadedurl;
        downloaded.download = response.data.data.file_name;
        document.body.append(downloaded);
        downloaded.click();
        downloaded.remove();
        window.URL.revokeObjectURL(downloadedurl);
      };
      xhr.open('GET', response.data.data.url);
      xhr.send();*/
    } else {
      this.setState({
        downloadingItem: false
      });
    }
  }

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

  handlePayNow = () => {
    this.setState({
      openDialog: true
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false
    })
  }

  handleSupplierChange = (event) => {
    this.updateFormValue(event.target.value, 'user_id');
    this.props.actions.paymentTotalDue(event.target.value)
  }

  updateFormValue = (value, key) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value
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
    if (!this.formValidate()) {
      this.setState({
        processing: true
      });
      let data = { ...this.state.formValues, user_id: this.state.purchase.user_id, table_id: this.state.purchase.id }
      this.props.actions.paymentStore(data);
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if (parseFloat(formValues.amount) > parseFloat(this.state.purchase.due_amount)) {
      hasErr = true;
      this.props.enqueueSnackbar("Amount must be less than or equal due amount.", { variant: 'error' });
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
    this.setState({
      formErros: formErros
    })
    return hasErr;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
      this.loadListData();
    }

    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
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
        this.props.actions.getNotifiactions();
      } else {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
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
    this.props.actions.purchaseView(this.props.params.id);
    console.log(this.props.actions.purchaseView(this.props.params.id));
    
  }

  render() {
    const { purchase, formValues, formErros, downloadingInfo, downloadingItem } = this.state;
    console.log("purchase : ", purchase);
    return (
      <MainCard title="Purchase Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>

        {
          !purchase ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
              

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={11}>
                  <h3 className='p_heading_list text-center' >Purchase Details</h3>
                </Grid>
                <Grid item xs={1} className='action_btn'>
                  {downloadingInfo?<CircularProgress />:<Button variant="contained" style={{paddingLeft : '8%'}} onClick={() => this.handleDownloadInfo(this.props.params.id)}><FileDownloadIcon /></Button>}
                </Grid>
              </Grid>
              
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="details-header">
                
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Supplier: </span> <br />{purchase.supplier_name}, {purchase.supplier_mobile}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Invoice Number: </span> <br /> {purchase.invoice_number}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div><span>Status: </span>  <br />
                      <Chip label={purchase.approve_status} color={getApprovalColor(purchase.is_approved)} />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Invoice Date: </span> <br /> {purchase.invoice_date}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Due Date: </span>  <br />{purchase.due_date}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Taxable Amount: </span> <br /> {purchase.taxable_amount}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Tax: </span> <br /> {purchase.tax}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Total Amount: </span> <br /> {purchase.total_amount}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Discount: </span>  <br />{purchase.discount}</p>
                    </div>
                  </Grid>

                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Bill Amount: </span> <br /> {purchase.bill_amount}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Total Return: </span> <br /> {purchase.return_amount}</p>
                    </div>
                  </Grid>
                  
                  
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Total Payable: </span>  <br />{purchase.total_payable}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Paid Amount: </span>  <br />{purchase.paid_amount_display}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                      <p><span>Due Amount: </span>  <br />{purchase.due_amount_display}</p>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className='single-item'>
                    {
                      purchase.notes ?
                        <p>Notes: {purchase.notes}</p>
                        : null
                    }
                    </div>
                  </Grid>
                  
              </Grid>

              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
               
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>SL</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>QTY</TableCell>
                            <TableCell>HSN</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell>WT</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Tax@</TableCell>
                            <TableCell>Taxable Amt.</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {purchase.subCatItems.map((row, i) => (
                            <SubCatRow key={i} row={row} index={i} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
              </Grid>

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={11}>
                  <h3 className='p_heading_list text-center' >Payment Details</h3>
                </Grid>
              </Grid>

              {
                !purchase.is_assigned ?
                  <Grid item xs={12} className="p-add-product create-input button-right">
                    <h3 className='p_heading_list sales_heading_list'>Payment List</h3>
                    <DataTable
                      columns={this.columns}
                      rows={this.state.items}
                      page={this.state.queryParams.page}
                      limit={this.state.queryParams.limit}
                      total={this.state.total}
                      handlePagination={this.handlePagination}
                      actions={[]}
                      actionValue={'action_value'}
                      actionValueColorConditions={[
                        {
                          value: "Accepted",
                          color: "green"
                        },
                        {
                          value: "Declined",
                          color: "red"
                        }
                      ]}
                    />
                  </Grid>
                  : null
              }

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className="details-header">
                <Grid item xs={12}>
                  <div style={{width:"98%", border:"2px solid black"}}></div>
                </Grid>
              </Grid>
            
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={11}>
                  <h3 className='p_heading_list text-center' >Product List</h3>
                </Grid>
                <Grid item xs={1} className='action_btn'>
                {downloadingItem?<CircularProgress />:<Button variant="contained" style={{paddingLeft : '8%'}} onClick={() => this.handleDownloadItems(this.props.params.id)}><FileDownloadIcon /></Button>}
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
               
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
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
        }

        {/*<Dialog
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
                <Grid item md={4} xs={12} className='p-invoice-date create-input'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Payment Date"
                      value={formValues.payment_date}
                      inputFormat="DD/MM/YYYY"
                      onChange={(newValue) => this.updateFormValue(newValue, 'payment_date')}
                      renderInput={(params) => <TextField {...params} fullWidth error={formErros.payment_date} className="non_disable_text" />}
                      disabled
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={4} xs={12} className='create-input'>
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

                <Grid item md={4} xs={12} className='create-input'>
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
                  formValues.payment_mode == "cheque" ?
                    <Grid item md={4} xs={12} className='create-input'>
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
                    <Grid item md={4} xs={12} className='create-input'>
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
                <Grid item md={4} xs={12} className='create-input'>
                  <TextareaAutosize
                    className='description'
                    minRows={1}
                    placeholder="Notes"
                    style={{ width: '100%', height: '51px' }}
                    value={formValues.notes}
                    onChange={(event) => this.updateFormValue(event.target.value, 'notes')}
                  />
                </Grid>
                <Grid item md={4} xs={12} className='p-invoice-date create-input'>
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
        </Dialog>*/}


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

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      purchaseView,
      paymentStore,
      paymentList,
      getNotifiactions
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseViewPage)));

function SubCatRow(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const sl_no = index + 1;
  let odd_even_class = sl_no % 2 == 0 ? 'SubCatRow_even' : 'SubCatRow_odd';
  if (row.is_return) {
    odd_even_class += ' strike_through';
  }

  let materialNames = row.material.map((itm) => itm.name).join("\n").replace(/\n/g, '<br/>');
  let materialWts = row.material.map((itm) => itm.weight.toFixed(2)).join("\n").replace(/\n/g, '<br/>');
  let materialUnits = row.material.map((itm) => itm.unit).join("\n").replace(/\n/g, '<br/>');
  let materialRates = row.material.map((itm) => itm.rate.toFixed(2)).join("\n").replace(/\n/g, '<br/>');


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={odd_even_class}>
        <TableCell>
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="expand_icon"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell component="th" scope="row">
          {(sl_no <= 9) ? '0' + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.qty}</TableCell>
        <TableCell>{row.hsn}</TableCell>
        <TableCell dangerouslySetInnerHTML={{__html: materialNames}}></TableCell>
        <TableCell dangerouslySetInnerHTML={{__html: materialWts}}></TableCell>
        <TableCell dangerouslySetInnerHTML={{__html: materialUnits}}></TableCell>
        <TableCell dangerouslySetInnerHTML={{__html: materialRates}}></TableCell>
        <TableCell>{row.tax}%</TableCell>
        <TableCell>{row.taxableAmount.toFixed(2)}</TableCell>
      </TableRow>
      {/* <TableRow className={'table-inner-row sub_table ' + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="span">

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
                    <TableCell>Dist</TableCell>
                    {
                      row.product_type == "material" ?
                        <>
                          <TableCell>Return Weight</TableCell>
                          <TableCell>Return Qty</TableCell>
                        </>
                        : null
                    }
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
                      <TableCell>{item.discount_amount_display}</TableCell>
                      {
                        row.product_type == "material" ?
                          <>
                          <TableCell>{item.return_weight}</TableCell>
                          <TableCell>{item.return_qty}</TableCell>
                          </>
                          : null
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}


function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(true);
  const sl_no = index + 1;
  let odd_even_class = sl_no % 2 == 0 ? 'even' : 'odd';
  if (row.is_return) {
    odd_even_class += ' strike_through';
  }
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={odd_even_class}
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
        <TableCell component="th" scope="row" style={{color: "#fff"}}>
          {sl_no <= 9 ? "0" + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row"  style={{color: "#fff"}}>
          {row.product_name}
        </TableCell>
        <TableCell  style={{color: "#fff"}}>{row.category_name}</TableCell>
        <TableCell  style={{color: "#fff"}}>{row.certificate_no}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total_weight}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.size_name}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.making_charge}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.rep}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.sub_total}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total_discount}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.tax}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total}</TableCell>
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
                    <TableCell className={odd_even_class}>Material Name</TableCell>
                    <TableCell className={odd_even_class}>Purity</TableCell>
                    <TableCell className={odd_even_class}>Quantity</TableCell>
                    <TableCell className={odd_even_class}>Total Weight</TableCell>
                    {row.product_code == ""?<TableCell className={odd_even_class}>Pakka Weight</TableCell>:""}
                    <TableCell className={odd_even_class}>Unit</TableCell>
                    <TableCell className={odd_even_class}>Rate</TableCell>
                    <TableCell className={odd_even_class}>Amount</TableCell>
                    <TableCell className={odd_even_class}>Dist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pur-details-table-body">
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
                        <TableCell scope="row" className={odd_even_class}>{item.material_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.purity_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.quantity}</TableCell>
                        <TableCell className={odd_even_class}>{item.weight}</TableCell>
                        {row.product_code == ""?<TableCell className={odd_even_class}>{item.pakka_weight}</TableCell>:""}
                        <TableCell className={odd_even_class}>{item.unit_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.rate}</TableCell>
                        <TableCell className={odd_even_class}>{item.amount}</TableCell>
                        <TableCell className={odd_even_class}>{item.discount_amount}</TableCell>
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
