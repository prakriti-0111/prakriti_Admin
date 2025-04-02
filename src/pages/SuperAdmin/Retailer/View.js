import React from 'react';
import { connect } from 'react-redux';
import {Grid, Button, CircularProgress, IconButton, Box, Typography, Pagination, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Rating, Tab } from '@mui/material';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { retailerFetch, retailerUpdate, retailerReviewStore, retailerReviewList, retailerReviewUpdate, retailerMyReview } from 'actions/superadmin/retailer.actions';
import { gridSpacing } from 'store/constant';
import { withSnackbar } from 'notistack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {isEmpty, getRoleName, getUserDashboardRoute, isSuperAdmin, isDistributor, isSalesExecutive, isAdmin} from 'src/helpers/helper';
import { paymentStore } from 'actions/superadmin/payment.actions';
import {SUPERADMIN_RESET_PAYMENT} from '../../../actionTypes/superadmin/payment.types';
import {SUPERADMIN_RESET_VISIT} from '../../../actionTypes/superadmin/visit.types';
import { salesList, salesDownloadInvoice } from 'actions/superadmin/sales.actions';
import { visitCreate, visitList } from 'actions/superadmin/visit.actions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import {SUPERADMIN_RESET_RETAILER} from '../../../actionTypes/superadmin/retailer.types';
import DataTable from 'src/utils/DataTable';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { getNotifiactions } from 'actions/superadmin/notification.actions';

class RetailerViewPage extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item,
      auth: this.props.auth,
      queryParams: {
        page: 1,
        limit: 50,
        search: ''
      },
      reviewQueryParams: {
        page: 1,
        limit: 50,
      },
      visitQueryParams: {
        page: 1,
        limit: 50
      },
      sales: this.props.sales,
      total: this.props.total,
      openDialog: false,
      ...this.defaultFormValues(),
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      pay_by_invoice: null,
      openVisitDialog: false,
      ...this.defaultVisitFormValues(),
      v_actionCalled: this.props.v_actionCalled,
      v_createSuccess: this.props.v_createSuccess,
      v_successMessage: this.props.v_successMessage,
      v_errorMessage: this.props.v_errorMessage,
      reviews: this.props.reviews,
      review_total: this.props.review_total,
      r_actionCalled: this.props.r_actionCalled,
      r_createSuccess: this.props.r_createSuccess,
      r_editSuccess: this.props.r_editSuccess,
      r_successMessage: this.props.r_successMessage,
      r_errorMessage: this.props.r_errorMessage,
      reviews: this.props.reviews,
      review_total: this.props.review_total,
      my_review: null,
      rating: 0,
      review: '',
      visits: this.props.visits,
      visit_total: this.props.visit_total,
      tab: 'rating'
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
        name: 'due_amount_display',
        display_name: 'Due Amount'
      },
      {
        name: 'status_display',
        display_name: 'Status'
      }
    ];

    this.isSuperAdmin = isSuperAdmin();
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
    this.isAdmin = isAdmin();

    this.visitColumns = [
      {
        name: 'type',
        display_name: 'Type'
      },
      {
        name: 'notes',
        display_name: 'Note'
      },
      {
        name: 'date',
        display_name: 'Date'
      },
    ];
    if(this.isSuperAdmin){
      this.visitColumns = [{
        name: 'user_name',
        display_name: 'Visit By'
      }].concat(this.visitColumns);
    }
  }

  componentDidMount(){
    this.loadAllData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.item !== state.item){
      update.item = props.item;
    }
    if(props.sales !== state.sales){
      update.sales = props.sales;
    }
    if(props.total !== state.total){
      update.total = props.total;
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
    if(props.v_actionCalled !== state.v_actionCalled){
      update.v_actionCalled = props.v_actionCalled;
    }
    if(props.v_createSuccess !== state.v_createSuccess){
        update.v_createSuccess = props.v_createSuccess;
    }
    if(props.v_successMessage !== state.v_successMessage){
      update.v_successMessage = props.v_successMessage;
    }
    if(props.v_errorMessage !== state.v_errorMessage){
      update.v_errorMessage = props.v_errorMessage;
    }
    if(props.r_actionCalled !== state.r_actionCalled){
      update.r_actionCalled = props.r_actionCalled;
    }
    if(props.r_createSuccess !== state.r_createSuccess){
      update.r_createSuccess = props.r_createSuccess;
    }
    if(props.r_editSuccess !== state.r_editSuccess){
      update.r_editSuccess = props.r_editSuccess;
    }
    if(props.r_successMessage !== state.r_successMessage){
      update.r_successMessage = props.r_successMessage;
    }
    if(props.r_errorMessage !== state.r_errorMessage){
      update.r_errorMessage = props.r_errorMessage;
    }
    if(props.reviews !== state.reviews){
      update.reviews = props.reviews;
    }
    if(props.review_total !== state.review_total){
      update.review_total = props.review_total;
    }
    if(props.visits !== state.visits){
      update.visits = props.visits;
    }
    if(props.visit_total !== state.visit_total){
      update.visit_total = props.visit_total;
    }

    return update;
  }

  loadAllData = () => {
    this.loadViewData();
    this.loadSalesData();
    this.loadReviews();
    this.loadMyReview();
    this.loadVisits();
  }

  loadViewData = () => {
    this.props.actions.retailerFetch(this.props.params.id);
  }

  loadSalesData = () => {
    let data = {...this.state.queryParams};
    data.user_id = this.props.params.id;
    this.props.actions.salesList(data);
  }

  loadReviews = () => {
    let data = {...this.state.reviewQueryParams};
    data.retailer_id = this.props.params.id;
    this.props.actions.retailerReviewList(data);
  }

  loadMyReview = async() => {
    let res = await retailerMyReview(this.props.params.id);
    if(res.data.success && !isEmpty(res.data.data)){
      this.setState({
        rating: res.data.data.rating,
        review: res.data.data.review,
        my_review: res.data.data
      })
    }
  }

  loadVisits = () => {
    let params = {visit_user_id: this.props.params.id};
    if(!this.isSuperAdmin){
      params.user_id = this.state.auth.user.id;
    }
    this.props.actions.visitList(params)
  }

  componentDidUpdate(previousProps){
    if(previousProps.params.id != this.props.params.id){
      this.loadAllData();
    }
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

    if(this.state.v_actionCalled){
      if(this.state.v_createSuccess){
        this.props.enqueueSnackbar(this.state.v_successMessage, {variant: 'success'});
        this.setState({
          processing: false,
          openVisitDialog: false,
          ...this.defaultVisitFormValues()
        });
        this.loadAllData();
      }else{
        this.props.enqueueSnackbar(this.state.v_errorMessage, {variant: 'error'});
        this.setState({
          processing: false
        });
      }
      this.props.dispatch({
        type: SUPERADMIN_RESET_VISIT
      });
    }

    if(this.state.r_actionCalled){
      if(this.state.r_createSuccess){
        this.props.enqueueSnackbar(this.state.r_successMessage, {variant: 'success'});
        this.props.dispatch({
            type: SUPERADMIN_RESET_RETAILER
        });
        this.loadAllData();
      }else if(this.state.r_editSuccess){
        this.props.enqueueSnackbar(this.state.r_successMessage, {variant: 'success'});
        this.props.dispatch({
            type: SUPERADMIN_RESET_RETAILER
        });
        this.loadAllData();
      }else{
        this.props.enqueueSnackbar(this.state.r_errorMessage, {variant: 'error'});
        this.props.dispatch({
            type: SUPERADMIN_RESET_RETAILER
        });
      }

      this.setState({
        processing: false
      })
    }
    
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

  handleReviewPagination = (e, number) => {
    this.setState({
      reviewQueryParams: {
        ...this.state.reviewQueryParams,
        page: number
      }
    }, () => {
      this.loadReviews();
    })
  }

  handleVisitPagination = (page) => {
    this.state.visitQueryParams.page = page;
    this.loadVisits();
  }

  handleInvoiceView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/sales/view/' + row.id);
  }

  handleInvoiceDownload = async(row) => {
    let response = await salesDownloadInvoice(row.id);
    if(response.data.success){
      window.open(response.data.data.url, '_blank').focus();
    }
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
        table_type: 'sale',
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

  defaultVisitFormValues = () => {
    return {
      visitformValues: {
        user_id: '',
        type: 'Interested',
        date: moment().format('MM/DD/YYYY'),
        notes: '',
      },
      visitformErros: {
        user_id: false,
        type: false,
        date: false,
        notes: false
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

  handleSaleNow = () => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/stocks');
  }

  handleOrderNow = () => {
    window.open(process.env.FRONT_BASE_URL, '_blank').focus();
  }

  handleVisit = () => {
    this.setState({
      openVisitDialog: true,
      ...this.defaultVisitFormValues()
    })
  }

  handleVisitDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
        openVisitDialog: false
    })
  }

  updateVisitFormValue = (value, key) => {
    this.setState({
      visitformValues: {
          ...this.state.visitformValues,
          [key] : value
      }
    })
  }

  handleVisitSubmit = () => {
    if(!this.formValidate()){
      this.setState({
          processing: true
      });
      let data = {...this.state.visitformValues, user_id: this.props.params.id};
      if(data.date){
        data.date = moment(data.date.toString()).format('YYYY-MM-DD')
      }

      if(this.state.visitformValues.type == "Not Interested"){
        data.date = '';
      }
      this.props.actions.visitCreate(data);
    }
  }

  formValidate = () => {
    let hasErr = false;
    return hasErr;
  }

  handleReviewSubmit = () => {
    if(this.state.rating <= 0){
      return this.props.enqueueSnackbar("Please give rating.", {variant: 'error'});
    }
    let data = {review: this.state.review, rating: this.state.rating, user_id: this.props.params.id};
    if(!isEmpty(this.state.my_review)){
      this.props.actions.retailerReviewUpdate(this.state.my_review.id, data);
    }else{
      this.props.actions.retailerReviewStore(data);
    }
  }

  render() {
    const retailer = this.state.item;
    const { formValues, formErros, visitformValues } = this.state;
    const totalPage = Math.ceil(this.state.total / this.state.queryParams.limit);
    const reviewTotalPage = Math.ceil(this.state.review_total / this.state.reviewQueryParams.limit);
    const showAsTotalRetailer = this.props.query.get('total_retailer') == 1 ? false : true;

    return (
      <MainCard title="Retailer Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        <div>
          {
            retailer ? 
            <>
              <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <div autoComplete="off" className='ratn-dialog-inner'>
                  {
                    !this.isSalesExecutive || (this.isSalesExecutive && showAsTotalRetailer) ?
                    <Grid container spacing={2} className='loans_view p_view'>
                      <Grid item xs={12} md={6} className='create-input'>
                        <TextField  
                          label="Company Name"
                          variant="outlined"
                          fullWidth
                          value={retailer.company_name}
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
                          value={retailer.name}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="GST Number"
                          variant="outlined"
                          fullWidth
                          value={retailer.gst}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="City"
                          variant="outlined"
                          fullWidth
                          value={retailer.city}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Total Amount"
                          variant="outlined"
                          fullWidth
                          value={retailer.total_amount}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Total Return"
                          variant="outlined"
                          fullWidth
                          value={retailer.total_return}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                        }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Total Payable"
                          variant="outlined"
                          fullWidth
                          value={retailer.total_payable_amount}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                        }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Total Paid"
                          variant="outlined"
                          fullWidth
                          value={retailer.paid_amount}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                        }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Total Dues"
                          variant="outlined"
                          fullWidth
                          value={retailer.due_amount}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                        }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Advance"
                          variant="outlined"
                          fullWidth
                          value={retailer.advance_amount}
                          disabled
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            className: "non_disable_text"
                        }}
                        />
                      </Grid>
                    </Grid>
                    : null
                  }

                  {
                    this.isSalesExecutive && !showAsTotalRetailer ?
                    <TableContainer component={Paper}>
                      <div className='ratn-table-purchase-wrapper'>
                        <Table aria-label="collapsible table">
                          <TableHead className='ratn-table-header'>
                            <TableRow>
                              <TableCell>Image</TableCell>
                              <TableCell>Company Name</TableCell>
                              <TableCell>Owner Name</TableCell>
                              <TableCell>Contact Number</TableCell>
                              <TableCell>Rating</TableCell>
                              <TableCell>City</TableCell>
                              <TableCell>District</TableCell>
                              <TableCell>Pin</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell scope="row">
                                <img src={retailer.image} style={{height: '70px', width: '70px'}} className='table-data-image'/>
                              </TableCell>
                              <TableCell>{retailer.company_name}</TableCell>
                              <TableCell>{retailer.name}</TableCell>
                              <TableCell>{retailer.mobile}</TableCell>
                              <TableCell><Rating name="read-only" value={retailer.rating} readOnly /></TableCell>
                              <TableCell>{retailer.city}</TableCell>
                              <TableCell>{retailer.district_name}</TableCell>
                              <TableCell>{retailer.pincode}</TableCell>
                              <TableCell className='action_btn'>
                                <Stack spacing={1} direction="row" justifyContent={"left"} alignItems={"left"}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className='text_btn'
                                    onClick={this.handleSaleNow}
                                  >
                                    Sale Now
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className='text_btn'
                                    onClick={this.handleOrderNow}
                                  >
                                    Order Now
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    className='text_btn'
                                    onClick={this.handleVisit}
                                  >
                                    Visit
                                  </Button>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TableContainer>
                    : null
                  }
                </div>
              </Box>
              {
                (!this.isSalesExecutive || showAsTotalRetailer) ?
                <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                  <Grid item xs={12} className="p-add-product create-input">
                    <div>
                      <Grid container spacing={2} className='loans_view p_view'>
                        <Grid item xs={7} md={6} className='create-input'>
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
                        {
                          !this.isAdmin ?
                          <Grid item xs={5} md={2} className='create-input button-right'>
                            <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay</Button>
                          </Grid>
                          : null
                        }
                      </Grid>
                    </div>
                    <TableContainer component={Paper}>
                      <div className='ratn-table-purchase-wrapper'>
                        <Table aria-label="collapsible table">
                          <TableHead className='ratn-table-header'>
                            <TableRow>
                              {/*<TableCell />*/}
                              <TableCell>#</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Invoice No</TableCell>
                              <TableCell>Biller Name</TableCell>
                              <TableCell>Bill Amount</TableCell>
                              <TableCell>Return</TableCell>
                              <TableCell>Paid</TableCell>
                              <TableCell>Dues</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell sx={{width: '50px'}}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.sales.map((row, i) => (
                              <Row 
                                key={i} 
                                row={row} 
                                page={this.state.queryParams.page} 
                                limit={this.state.queryParams.limit}
                                index={i} 
                                viewAction={this.handleInvoiceView}
                                downloadAction={this.handleInvoiceDownload}
                                payAction={this.handleInvoicePay}
                              />
                            ))}
                          </TableBody>
                        </Table>
                        {
                          this.state.total > 0 ?
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
                : null
              }

              {
                this.isSalesExecutive && !showAsTotalRetailer ?
                <div>
                  <TabContext value={this.state.tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={(e, newVal) => this.setState({tab: newVal})}>
                        <Tab label="Ratings" value="rating" />
                        <Tab label="Visits" value="visit" />
                      </TabList>
                    </Box>
                    <TabPanel value="rating">
                      <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                        <Grid item xs={12} md={1} className="p-add-product create-input">
                          My Rating
                        </Grid>
                        <Grid item xs={12} md={2} className="p-add-product create-input">
                          {this.state.auth.user.name}
                        </Grid>
                        <Grid item xs={12} md={2} className="p-add-product create-input">
                          {this.state.auth.user.mobile}
                        </Grid>
                        <Grid item xs={12} md={2} className="p-add-product">
                          <Rating
                            name="my_rating"
                            className='rating_input'
                            value={this.state.rating}
                            onChange={(event, newValue) => {
                              this.setState({rating: newValue})
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3} className='p-add-product create-input'>
                          <TextareaAutosize
                            minRows={2}
                            className='description'
                            placeholder="Type review..."
                            style={{ width: '100%', height: '51px' }}
                            value={this.state.review}
                            onChange={(event) => this.setState({review: event.target.value})}
                          />
                        </Grid>
                        <Grid item xs={12} md={2} className="p-add-product create-input">
                          <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleReviewSubmit}>{!isEmpty(this.state.my_review) ? "Update" : "Submit"}</Button>
                        </Grid>
                      </Grid>
                      {
                        this.state.reviews.map((item, key) => (
                          <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view" key={key}>
                            <Grid item xs={12} md={1} className="p-add-product create-input">
                              &nbsp;
                            </Grid>
                            <Grid item xs={12} md={2} className="p-add-product create-input">
                              {item.user_name}
                            </Grid>
                            <Grid item xs={12} md={2} className="p-add-product create-input">
                              {item.user_mobile}
                            </Grid>
                            <Grid item xs={12} md={2} className="p-add-product">
                              <Rating name="read-only" value={item.rating} readOnly />
                            </Grid>
                            <Grid item xs={12} md={5} className='p-add-product create-input'>
                              {item.review}
                            </Grid>
                          </Grid>
                        ))
                      }
                      {
                        this.state.review_total > 0 ?
                        <Grid container alignItems="right" className='ratn-table-footer'>
                          <Grid item>
                            <Pagination
                              count={reviewTotalPage}
                              page={this.state.reviewQueryParams.page}
                              onChange={this.handleReviewPagination}
                            />
                          </Grid>
                        </Grid>
                        : null
                      }
                    </TabPanel>
                    <TabPanel value="visit">
                      <Grid container spacing={gridSpacing}>
                        <DataTable 
                          columns={this.visitColumns}
                          rows={this.state.visits}
                          page={this.state.visitQueryParams.page}
                          limit={this.state.visitQueryParams.limit}
                          total={this.state.visit_total}
                          handlePagination={this.handleVisitPagination}
                        />
                      </Grid>
                    </TabPanel>
                  </TabContext>
                </div>
                : null
              }
            </>
            : 
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          }
        </div>

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
                        <Grid item xs={12} md={3} className='create-input'>
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
                                !this.state.pay_by_invoice && (!retailer || parseFloat(retailer.due_amount) == 0) ?
                                <MenuItem value="advance">Advance</MenuItem>
                                : null
                              }
                                <MenuItem value="invoice">Invoice</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3} className='p-invoice-date create-input'>
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
                        <Grid item xs={12} md={3} className='create-input'>
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
                        
                        <Grid item xs={12} md={3} className='create-input'>
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
                            <Grid item xs={6} className='create-input'>
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
                            <Grid item xs={6} className='create-input'>
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
                        <Grid item xs={12} md={6} className='create-input'>
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

        <Dialog
            className="ratn-dialog-wrapper"
            open={this.state.openVisitDialog}
            onClose={this.handleVisitDialogClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
              Visit
            </DialogTitle>
            <DialogContent>
            <DialogContentText></DialogContentText>
                <Box sx={{ flexGrow: 1, m: 0.5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={visitformValues.type == "Not Interested" ? 12 : 6} className='create-input'>
                          <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                            className='input-inner'
                                value={visitformValues.type}
                                fullWidth
                                label="Type"
                                onChange={(event) => this.updateVisitFormValue(event.target.value, 'type')}
                            >
                              <MenuItem value="Interested">Interested</MenuItem>
                              <MenuItem value="Not Interested">Not Interested</MenuItem>
                              <MenuItem value="Interested in future">Interested in future</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        {
                          visitformValues.type == "Interested in future" || visitformValues.type == "Interested" ?
                          <Grid item xs={12} md={6} className='p-invoice-date create-input'>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                      label="Date"
                                      value={visitformValues.date}
                                      inputFormat="DD/MM/YYYY"
                                      onChange={(newValue) => this.updateVisitFormValue(newValue, 'date')}
                                      renderInput={(params) => <TextField {...params} fullWidth />}
                                  />
                              </LocalizationProvider>
                          </Grid>
                          : null
                        }
                        <Grid item xs={12} className='create-input'>
                            <TextareaAutosize
                                minRows={2}
                                className='description'
                                placeholder="Notes"
                                style={{ width: '100%', height: '51px' }}
                                value={visitformValues.notes}
                                onChange={(event) => this.updateVisitFormValue(event.target.value, 'notes')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1} direction="row" justifyContent="flex-end">
                              <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleVisitSubmit}>
                                  {
                                      this.state.processing ? "Processing" : "Submit"
                                  }
                              </Button>
                              <Button variant="outlined" onClick={this.handleVisitDialogClose}>Cancel</Button>
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
  item: state.superadmin.retailer.item || null,
  reviews: state.superadmin.retailer.reviews,
  review_total: state.superadmin.retailer.review_total,
  sales: state.superadmin.sales.items,
  total: state.superadmin.sales.total,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  auth: state.auth,
  visits: state.superadmin.visit.items,
  visit_total: state.superadmin.visit.total,
  v_actionCalled: state.superadmin.visit.actionCalled,
  v_createSuccess: state.superadmin.visit.createSuccess,
  v_successMessage: state.superadmin.visit.successMessage,
  v_errorMessage: state.superadmin.visit.errorMessage,
  r_actionCalled: state.superadmin.retailer.actionCalled,
  r_createSuccess: state.superadmin.retailer.createSuccess,
  r_editSuccess: state.superadmin.retailer.editSuccess,
  r_successMessage: state.superadmin.retailer.successMessage,
  r_errorMessage: state.superadmin.retailer.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({retailerFetch, paymentStore, salesList, visitCreate, visitList, retailerReviewStore, retailerReviewList, retailerReviewUpdate, getNotifiactions}, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(RetailerViewPage)));

function Row(props) {
  const { row, page, limit, index, viewAction, downloadAction, payAction } = props;
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
        <TableCell scope="row">
          {getSerialNo()}
        </TableCell>
        <TableCell>{row.invoice_date}</TableCell>
        <TableCell>{row.invoice_number}</TableCell>
        <TableCell>{row.sale_by_name}</TableCell>
        <TableCell>{row.bill_amount}</TableCell>
        <TableCell>{row.return_amount}</TableCell>
        <TableCell>{row.paid_amount}</TableCell>
        <TableCell>{row.due_amount}</TableCell>
        <TableCell sx={{color: getStatusColor(row.approve_status)}}><b>{row.approve_status}</b></TableCell>
        <TableCell className='action_btn'>
          {
            row.is_own_sale ?
            <Stack spacing={1} direction="row" justifyContent={"left"} alignItems={"left"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => viewAction(row)}
              >
                <RemoveRedEyeIcon />
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => downloadAction(row)}
                >
                  <FileDownloadIcon />
                </Button>
                {
                  parseFloat(row.due_amount) > 0 ?
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
            : null
          }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
