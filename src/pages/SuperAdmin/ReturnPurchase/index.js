import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Box, Grid, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { returnPurchaseList } from 'actions/superadmin/returnPurchase.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { supplierList } from 'actions/superadmin/supplier.actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import {hasPermission} from 'src/helpers/helper';

class ReturnPurchase extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        supplier_id: '',
        search: '',
        date_from: null,
        date_to: null,
        status: ""
      },
      supplierList: this.props.supplierList,
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
        name: 'supplier_name',
        display_name: 'Supplier Name'
      },
      {
        name: 'return_amount',
        display_name: 'Return Amount'
      },
      {
        name: 'status_display',
        display_name: 'Status'
      },
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.supplierList({all: 1})
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }
    if(props.supplierList !== state.supplierList){
      update.supplierList = props.supplierList;
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
    this.props.actions.returnPurchaseList(data);
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

  render() {
    
    return (
      <MainCard title="Return Purchase List" >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view'>
            <Grid item xs={12} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select
                  value={this.state.queryParams.supplier_id}
                  label="Supplier"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'supplier_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    this.state.supplierList.map((item, index) => (
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
                show: hasPermission(this.state.permissions, 'return_purchase', 'view')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.returnPurchase.items,
  total: state.superadmin.returnPurchase.total,
  supplierList: state.superadmin.supplier.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      returnPurchaseList,
      supplierList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnPurchase)));
