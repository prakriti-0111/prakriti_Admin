import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, Pagination, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput, Card, CardContent } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
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
import {isEmpty, displayAmount, getRoleName, getUserDashboardRoute} from 'src/helpers/helper';
import { paymentStore, paymentGetWalletBalance } from 'actions/superadmin/payment.actions';
import {SUPERADMIN_RESET_PAYMENT} from '../../../actionTypes/superadmin/payment.types';
import { salesList, salesDownloadInvoice } from 'actions/superadmin/sales.actions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { distributorFetch } from 'actions/superadmin/distributor.actions';
import { getNotifiactions } from 'actions/superadmin/notification.actions';
import { getProfile } from 'actions/superadmin/profile.actions';
import { stocksList, getPriceByCategory } from 'actions/superadmin/stocks.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { categoryList } from 'actions/superadmin/category.actions';

class DistrubutorViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      item: this.props.item,
      queryParams: {
        page: 1,
        limit: 50,
        search: ''
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
      profile: null,
      stock_items: this.props.stock_items,
      stock_total: this.props.stock_total,
      stockQueryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        search: '',
        all: 0,
      },
      categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      price_by_categories: [],
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
    
  }

  componentDidMount() {
    this.loadAllData();
  }

  loadAllData = () => {
    this.loadViewData();
    this.loadSalesData();
    this.loadProfile();
    this.loadStockData();
    this.loadPriceByCategory();
    this.props.actions.categoryList({ all: 1 });
  }

  loadProfile = () => {
    getProfile()
      .then(res => {
        if (res.data.success) {
          this.setState({
            profile: res.data.data
          })
        }
      })
  }

  loadViewData = () => {
    this.props.actions.distributorFetch(this.props.params.id);
  }

  loadSalesData = () => {
    let data = {...this.state.queryParams};
    data.user_id = this.props.params.id;
    this.props.actions.salesList(data);
  }

  loadStockData = () => {
    this.props.actions.stocksList({ ...this.state.stockQueryParams, user_id: this.props.params.id });
  }

  loadPriceByCategory = async () => {
    let res = await getPriceByCategory({
      user_id: this.props.params.id
    });
    if (res.data.success) {
      this.setState({
        price_by_categories: res.data.data
      })
    }
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
    if (props.stock_items !== state.stock_items) {
      update.stock_items = props.stock_items;
    }
    if (props.stock_total !== state.stock_total) {
      update.stock_total = props.stock_total;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    return update;
  }

  componentDidUpdate(previousProps){
    if (previousProps.params.id != this.props.params.id) {
      this.loadViewData();
      this.loadSalesData();
      this.loadStockData();
      this.loadPriceByCategory();
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

  handleStockPagination = (page, all) => {
    this.setState({
      stockQueryParams: {
        ...this.state.stockQueryParams,
        page: page,
        all: all ? 1 : 0
      }
    }, () => {
      this.loadStockData();
    })

  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.actions.subCategoryList({ all: 1, category_id: val });
    this.setState({
      stockQueryParams: {
        ...this.state.stockQueryParams,
        category_id: val
      }
    })
  }

  handleSubCategoryChange = (event) => {
    this.setState({
      stockQueryParams: {
        ...this.state.stockQueryParams,
        sub_category_id: event.target.value
      }
    })
  }

  handleSearchChange = (event) => {
    this.setState({
      stockQueryParams: {
        ...this.state.stockQueryParams,
        search: event.target.value
      }
    })
  }

  handleStockSearch = () => {
    this.loadStockData();
  }

  handleCardClick = (category_id) => {
    this.props.actions.subCategoryList({ all: 1, category_id: category_id });
    this.setState({
      stockQueryParams: {
        ...this.state.stockQueryParams,
        category_id: category_id
      }
    }, () => {
      this.handleStockSearch()
    })
  }

  render() {
    const admin = this.state.item;
    const { formValues, formErros } = this.state;
    const totalPage = Math.ceil(this.state.total / this.state.queryParams.limit);

    return (
      <MainCard title="Distributor Details"  secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        {
          !admin ?
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
          :
          <>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
              <div autoComplete="off" className='ratn-dialog-inner'>
                <Grid container spacing={2} className='loans_view p_view'>
                  <Grid item xs={12} md={6} className='create-input'>
                    <TextField  
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                      value={admin.company_name}
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
                      value={admin.name}
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
                      value={admin.gst}
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
                      value={admin.city}
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
                      value={admin.total_amount}
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
                      value={admin.total_payable_amount}
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
                      value={admin.total_return}
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
                      value={admin.paid_amount}
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
                      value={admin.due_amount}
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
                      value={admin.advance_amount}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                    }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Box>
            {
              this.state.profile ?
              <>
              {
                this.state.profile.own && admin.own ?
                <>
                    {
                      this.state.price_by_categories.length ?
                        <Card className='dashboard_card' style={{ marginBottom: '4px' }}>
                          {
                            this.state.price_by_categories.map((item, key) => (
                              <CardContent className={`dashboard_card_content bg-color-1`} sx={{ display: "flex", justifyContent: "space-between" }} key={key} onClick={() => this.handleCardClick(item.category_id)}>
                                <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                                  <h1>{item.category_name}</h1>
                                  <h2>{displayAmount(item.total_amount)}</h2>
                                  <h3>{item.quantity} Piece(s)</h3>
                                </Typography>
                                <div className="card-icon">
                                  {/* <DiamondIcon /> */}
                                </div>
                              </CardContent>
                            ))
                          }
                        </Card>
                        : null
                    }
                    <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                      <Grid container spacing={2} className='tax-input loans_view p_view' columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item xs={6} md={3} className='create-input'>
                          <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                              value={this.state.stockQueryParams.category_id}
                              label="Category"
                              onChange={this.handleCategoryChange}
                              className='input-inner'
                              defaultValue=""
                            >
                              <MenuItem value="">All</MenuItem>
                              {
                                this.state.categories.map((item, index) => (
                                  <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} className='create-input'>
                          <FormControl fullWidth>
                            <InputLabel>Sub Category</InputLabel>
                            <Select
                              value={this.state.stockQueryParams.sub_category_id}
                              label="Sub Category"
                              onChange={this.handleSubCategoryChange}
                              className='input-inner'
                              defaultValue=""
                            >
                              <MenuItem value="">All</MenuItem>
                              {
                                this.state.sub_categories.map((item, index) => (
                                  <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} className='create-input'>
                          <FormControl fullWidth>
                            <TextField
                              label="Search"
                              variant="outlined"
                              value={this.state.stockQueryParams.search}
                              onChange={this.handleSearchChange}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={3} className='create-input order-input button-right'>
                          <Button variant="contained" className='search-btn' onClick={this.handleStockSearch}>Search</Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid container spacing={gridSpacing} className='orders-sale-button'>
                      <DataTable
                        columns={[
                          {
                            name: 'image',
                            display_name: 'Image',
                            isImage: true
                          },
                          {
                            name: 'name',
                            display_name: 'Product Name'
                          },
                          {
                            name: 'certificate_no',
                            display_name: 'Certificate No',
                            width: '120px'
                          },
                          {
                            name: 'total_weight_display',
                            display_name: 'Total Wt.',
                            width: '90px'
                          },
                          {
                            name: 'stock_material_display',
                            display_name: 'Materials Name',
                            width: '165px'
                          },
                          {
                            name: 'purity_display',
                            display_name: 'Purity Name',
                            width: '165px'
                          },
                          {
                            name: 'weight_display',
                            display_name: 'Qty'
                          },
                          {
                            name: 'unit_display',
                            display_name: 'Unit'
                          },
                          {
                            name: 'product_code',
                            display_name: 'P Code'
                          },
                          {
                            name: 'size_name',
                            display_name: 'Size'
                          },
                          {
                            name: 'mrp_display',
                            display_name: 'Price'
                          }
                        ]}
                        rows={this.state.stock_items}
                        page={this.state.stockQueryParams.page}
                        limit={this.state.stockQueryParams.limit}
                        total={this.state.stock_total}
                        handlePagination={this.handleStockPagination}
                        actions={[]}
                        haveAllOption={true}
                      />
                    </Grid>
                  </>
                  :
                  <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                  <Grid item xs={12} className="p-add-product create-input">
                    <div>
                      <Grid container spacing={2} className='loans_view p_view'>
                        <Grid item xs={12} md={6} className='create-input'>
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
                        <Grid item xs={12} md={2} className='create-input button-right'>
                          <Button variant="contained" className='add-button' onClick={() => this.handlePayNow()}>Pay</Button>
                        </Grid>
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
                }
              </>
              : null
            }
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
                                    !this.state.pay_by_invoice ?
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
                                        renderInput={(params) => <TextField {...params} fullWidth error={formErros.payment_date} />}
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
                                <Grid item xs={12} md={6} className='create-input'>
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
                                <Grid item xs={12} md={6} className='create-input'>
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
        
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.superadmin.distributor.item,
  sales: state.superadmin.sales.items,
  total: state.superadmin.sales.total,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  auth: state.auth,
  stock_items: state.superadmin.stocks.items,
  stock_total: state.superadmin.stocks.total,
  categories: state.superadmin.category.items,
  sub_categories: state.superadmin.subCategory.items,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({distributorFetch, paymentStore, salesList, getNotifiactions, stocksList, categoryList, subCategoryList}, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(DistrubutorViewPage)));


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
        <TableCell>{row.total_payable}</TableCell>
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
            <Button
                variant="contained"
                color="primary"
                onClick={() => downloadAction(row)}
              >
                <FileDownloadIcon />
              </Button>
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
          </Stack>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

