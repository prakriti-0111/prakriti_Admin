import React from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { orderList } from 'actions/distributor/myorder.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

class MyOrderPage extends React.Component {

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
        my_order: 1
      },
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
        name: 'status_display',
        display_name: 'Status'
      },
    ];

    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
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

  render() {

    return (
      <>
        <MainCard title="My Orders" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>New Order</Button>}>
            <Grid container spacing={gridSpacing} sx={{mb: 2}} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='mob_responsive_input'>
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
                            renderInput={(params) => <TextField {...params} />}
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
              actions={this.tableActions}
            />
          </Grid>


        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.distributor.myorders.items,
  total: state.distributor.myorders.total
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
        orderList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderPage)));
