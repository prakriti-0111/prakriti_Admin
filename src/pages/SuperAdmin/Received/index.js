import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Box, Grid, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material';
import LoginForm from 'forms/SuperAdmin/LoginForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { purchaseList, purchaseDelete } from 'actions/superadmin/purchase.actions';
import DataTable from 'src/utils/DataTable';
import {RESET_PURCHASE} from '../../../actionTypes/superadmin/purchase.types';
import { withSnackbar } from 'notistack';
import { supplierList } from 'actions/superadmin/supplier.actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {isDistributor, isSalesExecutive} from 'src/helpers/helper';
import { distributorList } from 'actions/superadmin/distributor.actions';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';

class ReceivedPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      queryParams: {
        page: 1,
        limit: 50,
        supplier_id: '',
        search: '',
        date_from: null,
        date_to: null,
        status: '',
        is_assigned: true
      },
      distributorList: this.props.distributorList,
      salesExecutiveList: this.props.salesExecutiveList,
    }

    this.columns = [
      {
        name: 'invoice_date',
        display_name: 'Received Date'
      },
      /*{
        name: 'invoice_number',
        display_name: 'Received Number'
      },*/
      {
        name: 'supplier_name',
        display_name: 'Received From'
      },
      {
        name: 'no_of_products',
        display_name: 'No. of Products'
      },
      {
        name: 'accept_declined_at',
        display_name: 'Accept/Declined At'
      },
      {
        name: 'approve_status',
        display_name: 'Status',
        show_tag: true,
        color_conditions: [
          {
            key: "approve_status",
            value: "Pending",
            color: "primary"
          },
          {
            key: "approve_status",
            value: "Accepted",
            color: "success"
          },
          {
            key: "approve_status",
            value: "Declined",
            color: "error"
          }
        ]
      }
    ];
    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      }
    ];
    
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
  }

  componentDidMount(){
    this.loadListData();
    if(this.isDistributor){
      this.props.actions.salesExecutiveList({ all: 1, role_id: 4 });
    }else if(this.isSalesExecutive){
      this.props.actions.salesExecutiveList({ all: 1, role_id: 4 });
      this.props.actions.distributorList({ all: 1 });
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

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    if(props.salesExecutiveList !== state.salesExecutiveList){
      update.salesExecutiveList = props.salesExecutiveList;
    }
    if(props.distributorList !== state.distributorList){
      update.distributorList = props.distributorList;
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
    this.props.actions.purchaseList(data);
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

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: RESET_PURCHASE
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
    this.loadListData();
  }

  getUserList = () => {
    let userList = [];
    if(this.isDistributor){
      userList = this.state.salesExecutiveList;
    }else if(this.isSalesExecutive){
      userList = this.state.salesExecutiveList.concat(this.state.distributorList);
    }
    return userList;
  }

  render() {
    let userList = this.getUserList();

    return (
      <MainCard title="Received List">
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view'>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Received From</InputLabel>
                <Select
                  value={this.state.queryParams.supplier_id}
                  label="Supplier"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'supplier_id')}
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
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={this.state.queryParams.status}
                  label="Status"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'status')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="0">Pending</MenuItem>
                  <MenuItem value="1">Accepted</MenuItem>
                  <MenuItem value="2">Declined</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
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
        <Grid container spacing={gridSpacing}>
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={this.tableActions}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.purchase.items,
  total: state.superadmin.purchase.total,
  actionCalled: state.superadmin.purchase.actionCalled,
  deleteSuccess: state.superadmin.purchase.deleteSuccess,
  successMessage: state.superadmin.purchase.successMessage,
  salesExecutiveList: state.superadmin.salesExecutive.items,
  distributorList: state.superadmin.distributor.items,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      purchaseList,
      purchaseDelete,
      salesExecutiveList,
      distributorList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceivedPage)));
