import React from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { orderList, getAllUsers } from 'actions/superadmin/order.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {hasPermission} from 'src/helpers/helper';

class OrderPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      permissions: this.props.permissions,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        order_from: '',
        user_id: ''
      },
      userList: []
    }

    this.columns = [
      {
        name: 'order_from',
        display_name: 'Order From'
      },
      {
        name: 'order_by',
        display_name: 'Order By'
      },
      {
        name: 'order_no',
        display_name: 'Order #'
      },
      {
        name: 'order_date',
        display_name: 'Order Date'
      },
      {
        name: 'no_of_products',
        display_name: 'No of Prod'
      },
      {
        name: 'total_amount',
        display_name: 'Order Value'
      },
      {
        name: 'city',
        display_name: 'City'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      {
        name: 'sale_executive_name',
        display_name: 'Assign To'
      },
      {
        name: 'status_display',
        display_name: 'Status',
        show_tag: true
      },
    ];

  }

  componentDidMount() {
    this.loadListData();
    this.loadUserList('');
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }
    if (props.total !== state.total) {
      update.total = props.total;
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
    this.props.orderList(data);
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

  handleSell = (row) => {
    this.props.navigate('/super-admin/sales/create?order_id=' + row.id);
  }

  updateQueryParams = async(value, key) => {
    this.setState({
        queryParams: {
            ...this.state.queryParams,
            [key] : value
        }
    });

    if(key == "order_from"){
      this.loadUserList(value);
    }
  }

  loadUserList = async (role) => {
    let response = await getAllUsers({role: role});
    let items = [];
    if(response.data.success){
      items = response.data.data.items;
    }
    this.setState({
      userList: items
    })
  }

  handleSearch = () => {
    this.loadListData();
  }

  render() {

    return (
      <>
        <MainCard title="Orders">
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={{mb: 2}}>
              <Grid item xs={12} md={2} className='create-input'>
                    <FormControl fullWidth>
                        <InputLabel>Order From</InputLabel>
                        <Select
                            className='input-inner'
                            value={this.state.queryParams.order_from}
                            fullWidth
                            label="Order From"
                            defaultValue=""
                            onChange={(e) => this.updateQueryParams(e.target.value, 'order_from')}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="distributor">Distributor</MenuItem>
                            <MenuItem value="retailer">Retailer</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={2} className='create-input'>
                    <FormControl fullWidth>
                        <InputLabel>User</InputLabel>
                        <Select
                            className='input-inner'
                            value={this.state.queryParams.user_id}
                            fullWidth
                            label="User"
                            defaultValue=""
                            onChange={(e) => this.updateQueryParams(e.target.value, 'user_id')}
                        >
                            <MenuItem value=""></MenuItem>
                            {
                              this.state.userList.map((item, index) => (
                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                              ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={2} className='create-input'>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            className='input-inner'
                            value={this.state.queryParams.status}
                            fullWidth
                            label="Status"
                            defaultValue=""
                            onChange={(e) => this.updateQueryParams(e.target.value, 'status')}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="shipped">Shipped</MenuItem>
                            <MenuItem value="out_for_delivery">Out For Delivery</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date From"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.queryParams.date_from}
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_from')}
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
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_to')}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                
                <Grid item xs={6} md={2} className='create-input order-input button-right'>
                    <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} className='orders-sale-button'>
            <DataTable
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={ [
                {
                  label: 'View',
                  onClick: this.handleView,
                  color: 'primary',
                  show: hasPermission(this.state.permissions, 'orders', 'view')
                },
                /*{
                  label: 'Sale',
                  onClick: this.handleSell,
                  color: 'primary',
                  icon: false,
                  conditions: [
                    {
                      key: "can_sell",
                      value: true
                    }
                  ]
                }*/
              ]}
            />
          </Grid>


        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.orders.items,
  total: state.superadmin.orders.total,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
        orderList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderPage)));
