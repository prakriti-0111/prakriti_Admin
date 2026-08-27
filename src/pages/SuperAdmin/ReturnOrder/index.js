
import React from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Stack, Container, Alert, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { returnOrderList } from 'actions/superadmin/returnOrder.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {hasPermission} from 'src/helpers/helper';

class ReturnOrderPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        order_from: ''
      },
      saleExecutiveList: this.props.saleExecutiveList,
      permissions: this.props.permissions,
      formValues: {
        user_id: ''
      },
      formErros: {
        user_id: false
      },
      openDialog: false,
      processing: false,
      actionRow: null
    }

    this.columns = [
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
        display_name: 'Total Amt'
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
        display_name: 'Status'
      },
    ];

  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.salesExecutiveList({all: 1, role_id: 4});
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if (props.saleExecutiveList !== state.saleExecutiveList) {
      update.saleExecutiveList = props.saleExecutiveList;
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
    this.props.actions.returnOrderList(data);
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

  loadListData = () => {
    let data = {...this.state.queryParams};
    if(data.date_from){
        data.date_from = moment(data.date_from.toString()).format('YYYY-MM-DD')
    }
    if(data.date_to){
        data.date_to = moment(data.date_to.toString()).format('YYYY-MM-DD')
    }
    this.props.actions.returnOrderList(data);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  updateQueryParams = (value, key) => {
    this.setState({
        queryParams: {
            ...this.state.queryParams,
            [key] : value
        }
    })
  }

  handleSearch = () => {
    this.loadListData();
  }

  handleAssign = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row
    })
  }

  handleDialogClose = (event, reason) => {
      if(reason && reason == "backdropClick")return;
      this.setState({
          openDialog: false
      })
  }

  handleFormChange = (e, key) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: e.target.value
      }
    })
  }

  handleSubmit = async() => {
    if(!this.formValidate()){
      this.setState({
          processing: true
      });
      let res = await returnOrderAssign(this.state.actionRow.id, this.state.formValues);
      let openDialog = false;
      if(res.data.success){
        this.props.enqueueSnackbar(res.data.message, {variant: 'success'});
        this.loadListData();
      }else{
        this.props.enqueueSnackbar(res.data.message, {variant: 'error'});
        openDialog = true;
      }
      this.setState({
        processing: false,
        openDialog: openDialog
      });
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if(!(formValues.user_id)){
        formErros.user_id = true;
        hasErr = true;
    }else{
        formErros.user_id = false;
    }
    this.setState({
        formErros: formErros
    })
    return hasErr;
  }


  render() {

    return (
      <>
        <MainCard title="Return Orders">
        <Grid container spacing={gridSpacing} sx={{mb: 2}} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='mob_responsive_input'>
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
                            <MenuItem value="retailer">Retailer</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
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
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="picked_up">Picked Up</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date From"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.queryParams.date_from}
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_from')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date To"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.queryParams.date_to}
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_to')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                
                <Grid item xs={6} md={1} className='create-input button-right'>
                    <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
                </Grid>
            </Grid>
          <Grid container spacing={gridSpacing}>
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
                  show: hasPermission(this.state.permissions, 'return_orders', 'view')
                },
                /*{
                  label: 'Assign',
                  onClick: this.handleAssign,
                  color: 'primary',
                  conditions: []
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
  items: state.superadmin.returnOrders.items,
  total: state.superadmin.returnOrders.total,
  saleExecutiveList: state.superadmin.salesExecutive.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      returnOrderList,
      salesExecutiveList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnOrderPage)));
