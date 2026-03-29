import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {TextField, MenuItem, Link, Box, FormControl, InputLabel, Select, Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salesList, salesDelete, salesDownloadInvoice } from 'actions/admin/sales.actions';
import DataTable from 'src/utils/DataTable';
import {ADMIN_RESET_SALES} from '../../actionTypes/admin/sales.types';
import { withSnackbar } from 'notistack';
import { distributorList } from 'actions/admin/distributor.actions';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

class SalePage extends Component {

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
        user_id: '',
        search: '',
        date_from: null,
        date_to: null,
        status: ''
      },
      distributorList: this.props.distributorList
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
        name: 'user_name',
        display_name: 'Admin Name'
      },
      {
        name: 'total_amount',
        display_name: 'Total Amount'
      },
      {
        name: 'due_amount_display',
        display_name: 'Due Amount'
      },
      {
        name: 'due_date',
        display_name: 'Due Date'
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
      },
      /*{
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      },*/
      {
        label: 'Download',
        onClick: this.handleDownload,
        color: 'primary'
      }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.distributorList({all: 1});
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
    this.props.actions.salesList(data);
  }

  handleDownload = async (row) => {
    let response = await salesDownloadInvoice(row.id);
    if(response.data.success){
      window.open(response.data.data.url, '_blank').focus();

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
    }
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

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.salesDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: ADMIN_RESET_SALES
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

  render() {
    
    return (
      <MainCard title="Sales List" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={12} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Distributor</InputLabel>
                <Select
                  value={this.state.queryParams.user_id}
                  label="Distributor"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'user_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    this.state.distributorList.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={2}>
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
            <Grid item xs={2} className='create-input'>
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
            <Grid item xs={2} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
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
            actions={this.tableActions}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.admin.sales.items,
  total: state.admin.sales.total,
  actionCalled: state.admin.sales.actionCalled,
  deleteSuccess: state.admin.sales.deleteSuccess,
  successMessage: state.admin.sales.successMessage,
  distributorList: state.admin.distributor.items
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      salesList,
      salesDelete,
      distributorList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalePage)));
