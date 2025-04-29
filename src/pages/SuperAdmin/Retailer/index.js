import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardContent, Typography, FormControl, TextField, IconButton, Box } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { retailerList, retailerDelete } from 'actions/superadmin/retailer.actions';
import { countryList } from 'actions/superadmin/country.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_RETAILER} from '../../../actionTypes/superadmin/retailer.types';
import {isSuperAdmin, displayAmount, isSalesExecutive, isDistributor, hasPermission, isAdmin} from 'src/helpers/helper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

class RetailerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: '',
        date_from: null,
        date_to: null,
        all: 0
      },
      deleteSuccess: this.props.deleteSuccess,
      countries: this.props.countries,
      dialogOpen: false
    }
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
    this.isAdmin = isAdmin();
    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'company_name',
        display_name: 'Company Name'
      },
      {
        name: 'name',
        display_name: 'Owner Name'
      },
      {
        name: 'mobile',
        display_name: 'Contact Number'
      },
      {
        name: 'rating',
        display_name: 'Rating',
        isRating: true
      },
      {
        name: 'city',
        display_name: 'City'
      },
      {
        name: 'district_name',
        display_name: 'District'
      },
      {
        name: 'pincode',
        display_name: 'Pin'
      },
      {
        name: 'created_by_display',
        display_name: 'Created By'
      }
    ];
    if(!this.isSalesExecutive){
      this.columns = [...this.columns, ...[
        {
          name: 'total_amount_display',
          display_name: 'Total Amount',
          className: "amount_column",
          isBold: true
        },
        {
          name: 'total_return_display',
          display_name: 'Total Return',
          className: "amount_column",
          isBold: true
        },
        {
          name: 'paid_amount_display',
          display_name: 'Paid Amount',
          className: "amount_column",
          isBold: true
        },
        {
          name: 'due_amount_display',
          display_name: 'Due Amount',
          className: "amount_column",
          isBold: true
        }
      ]]
    }
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.countryList({all: 1});
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }

    if(props.countries !== state.countries){
      update.countries = props.countries;
    }
    if(props.total_sale !== state.total_sale){
      update.total_sale = props.total_sale;
    }
    if(props.total_sale_due !== state.total_sale_due){
      update.total_sale_due = props.total_sale_due;
    }
    if(props.total_sale_paid !== state.total_sale_paid){
      update.total_sale_paid = props.total_sale_paid;
    }
    if(props.total_sale_return !== state.total_sale_return){
      update.total_sale_return = props.total_sale_return;
    }
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    let data = {...this.state.queryParams};
    if(data.date_from){
      data.date_from = moment(data.date_from.toString()).format('YYYY-MM-DD')
    }
    if(data.date_to){
        data.date_to = moment(data.date_to.toString()).format('YYYY-MM-DD')
    }
    this.props.actions.retailerList(data);
  }

  handlePagination = (page, all) => {
    this.state.queryParams.page = page;
    this.state.queryParams.all = all ? 1 : 0;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id + '?total_retailer=1');
  }

  dialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleDelete = (row) => {
    this.props.actions.retailerDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_RETAILER
      });
      this.handlePagination(1);
    }
  }

  handleSearchChange = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value
      }
    })
  }

  handleSearch = () => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1
      }
    }, () => {
      this.loadListData();
    })
  }

  getTableActions = () => {
    let tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'retailer', 'view')
      }
    ];
    if(!this.isDistributor && !this.isSalesExecutive && !this.isAdmin){
      tableActions = [...tableActions, {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'retailer', 'edit')
      }, {
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error',
        show: hasPermission(this.state.permissions, 'retailer', 'delete')
      }];
    }
    return tableActions;
  }

  render() {    
    
    return (
      <>
        {
          !this.isSalesExecutive ?
          <Card className='dashboard_card supplier-card' style={{marginBottom: '16px'}}>
            <CardContent className={`dashboard_card_content user-bg-1`} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                <h1>Total Sales</h1>
                <h2>{displayAmount(this.state.total_sale)}</h2>
              </Typography>
              <div className="card-icon">
                {/*<CurrencyRupeeIcon />*/}
              </div>
            </CardContent>
            <CardContent className={`dashboard_card_content user-bg-2`} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                <h1>Total Return</h1>
                <h2>{displayAmount(this.state.total_sale_return)}</h2>
              </Typography>
              <div className="card-icon">
                {/*<CurrencyRupeeIcon />*/}
              </div>
            </CardContent>
            <CardContent className={`dashboard_card_content user-bg-3`} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                <h1>Total Paid</h1>
                <h2>{displayAmount(this.state.total_sale_paid)}</h2>
              </Typography>
              <div className="card-icon">
                {/*<CurrencyRupeeIcon />*/}
              </div>
            </CardContent>
            <CardContent className={`dashboard_card_content user-bg-4`} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                <h1>Total Due</h1>
                <h2>{displayAmount(this.state.total_sale_due)}</h2>
              </Typography>
              <div className="card-icon">
                {/*<CurrencyRupeeIcon />*/}
              </div>
            </CardContent>
          </Card>
          : null
        }
        <MainCard title="Retailers" secondary={((!this.isSalesExecutive && !this.isAdmin /*&& !this.isDistributor*/ && hasPermission(this.state.permissions, 'retailer', 'add')) || this.isDistributor) ? <Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button> : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={6} md={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Date From"
                      inputFormat="DD/MM/YYYY"
                      value={this.state.queryParams.date_from}
                      onChange={(newValue) => this.handleSearchChange(newValue, 'date_from')}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                  />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date To"
                        inputFormat="DD/MM/YYYY"
                        value={this.state.queryParams.date_to}
                        onChange={(newValue) => this.handleSearchChange(newValue, 'date_to')}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                  InputProps={{
                    endAdornment: (
                    <IconButton
                      sx={{ visibility: this.state.queryParams.search ? "visible" : "hidden" }}
                      onClick={(e) => this.handleSearchChange('', 'search')}
                    >
                      <ClearIcon />
                    </IconButton>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>


          <Grid container spacing={gridSpacing}>
            <DataTable 
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.getTableActions()}
              haveAllOption={true}
            />
          </Grid>

          <Dialog
            className='ratn-dialog-footer delete_modal'
            open={this.state.dialogOpen}
            onClose={this.dialogClose}
            fullWidth
            maxWidth="xs"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Coming Soon!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='ratn-footer-buttons'>
              <Button onClick={this.dialogClose} className='conf-button'>Close</Button>
            </div>
          </DialogActions>
          </Dialog>
        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.retailer.items,
  total: state.superadmin.retailer.total,
  total_sale: state.superadmin.retailer.total_sale,
  total_sale_due: state.superadmin.retailer.total_sale_due,
  total_sale_paid: state.superadmin.retailer.total_sale_paid,
  total_sale_return: state.superadmin.retailer.total_sale_return,
  countries: state.superadmin.country.items || [],
  deleteSuccess: state.superadmin.retailer.deleteSuccess,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({retailerList, retailerDelete, countryList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetailerPage));
