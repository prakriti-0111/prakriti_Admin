import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Box, Grid, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { returnSaleList } from 'actions/superadmin/returnSale.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { supplierList } from 'actions/superadmin/supplier.actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { adminList } from 'actions/superadmin/admin.actions';
import {isSuperAdmin, isDistributor, isAdmin, isSalesExecutive, hasPermission} from 'src/helpers/helper';
import { retailerList } from 'actions/superadmin/retailer.actions';
import { distributorList } from 'actions/superadmin/distributor.actions';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';

class ReturnSale extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        user_id: '',
        search: '',
        date_from: null,
        date_to: null,
        status: "",
      },
      adminList: this.props.adminList,
      retailerList: this.props.retailerList,
      distributorList: this.props.distributorList,
      salesExecutiveList: this.props.salesExecutiveList,
      isAssign: this.props.isAssign,
      permissions: this.props.permissions
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
        name: 'return_date',
        display_name: 'Return Date'
      },
      {
        name: 'user_name',
        display_name: 'Owner Name'
      },
      {
        name: 'return_amount',
        display_name: 'Return Amount'
      },
      {
        name: 'status_display',
        display_name: 'Status',
        show_tag: true
      },
      
    ];
    
    this.isSuperAdmin = isSuperAdmin();
    this.isAdmin = isAdmin();
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
  }

  componentDidMount(){
    this.loadListData();
    if(this.isSuperAdmin){
      this.props.actions.adminList({ all: 1 });
    }else if(this.isAdmin){
      this.props.actions.distributorList({ all: 1 });
    }else if(this.isDistributor){
      this.props.actions.salesExecutiveList({ all: 1, role_id: 4 });
    }else if(this.salesExecutiveList){
      if(this.state.isAssign){
        this.props.actions.salesExecutiveList({ all: 1, role_id: 4 });
      }else{
        this.props.actions.retailerList({ all: 1});
      }
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }
    if(props.adminList !== state.adminList){
      update.adminList = props.adminList;
    }
    if (props.distributorList !== state.distributorList) {
      update.distributorList = props.distributorList;
    }
    if (props.retailerList !== state.retailerList) {
      update.retailerList = props.retailerList;
    }
    if (props.salesExecutiveList !== state.salesExecutiveList) {
      update.salesExecutiveList = props.salesExecutiveList;
    }
    if (props.isAssign !== state.isAssign) {
      update.isAssign = props.isAssign;
    }
    if (props.permissions !== state.permissions) {
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
    this.props.actions.returnSaleList(data);
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

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
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
    this.loadListData();
  }

  getUserList = () => {
    let userList = [];
    if(this.isSuperAdmin){
      userList = this.state.adminList;
    }else if(this.isAdmin){
      userList = this.state.distributorList;
    }else if(this.isDistributor){
      userList = this.state.salesExecutiveList;
    }else if(this.isSalesExecutive){
      if(this.state.isAssign){
        userList = this.state.salesExecutiveList;
      }else{
        userList = this.state.retailerList;
      }
    }
    return userList;
  }

  render() {
    let userList = this.getUserList();
    let userLabel = '';
    if(this.isSuperAdmin){
      userLabel = 'Admin';
    }else if(this.isAdmin){
      userLabel = 'Distributor';
    }else if(this.isDistributor){
      userLabel = 'Sales Executive';
    }else if(this.isSalesExecutive){
      if(this.state.isAssign){
        userLabel = 'Sales Executive';
      }else{
        userLabel = 'Retailer';
      }
    }

    return (
      <MainCard title={this.state.isAssign ? "Return Assign List" : "Return Sale List"}>
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view'>
            <Grid item xs={12} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>{userLabel}</InputLabel>
                <Select
                  value={this.state.queryParams.user_id}
                  label={userLabel}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'user_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    userList.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
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
            <Grid item xs={6} md={4} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing} >
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={[
              {
                label: 'View',
                onClick: this.handleView,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'return_sale', 'view')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.returnSale.items,
  total: state.superadmin.returnSale.total,
  supplierList: state.superadmin.supplier.items,
  distributorList: state.superadmin.distributor.items,
  adminList: state.superadmin.admin.items,
  retailerList: state.superadmin.retailer.items,
  salesExecutiveList: state.superadmin.salesExecutive.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      returnSaleList,
      supplierList,
      adminList,
      retailerList,
      distributorList,
      salesExecutiveList
    }, dispatch)
  }
};

ReturnSale.defaultProps = {
  isAssign: false
}

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnSale)));
