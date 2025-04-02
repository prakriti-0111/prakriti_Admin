import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { withSnackbar } from 'notistack';
import withRouter from 'src/helpers/withRouter';
import { adminList, adminDelete } from 'actions/superadmin/admin.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { countryList } from 'actions/superadmin/country.actions';
import DataTable from 'src/utils/DataTable';
import { SUPERADMIN_RESET_ADMIN } from '../../../actionTypes/superadmin/admin.types';
import { displayAmount, hasPermission } from 'src/helpers/helper';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

class AdminPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        own: this.props.query.get('own') ?? ""
      },
      deleteSuccess: this.props.deleteSuccess,
      deleteErrorMsg: this.props.deleteErrorMsg,
      countries: this.props.countries,
      states: this.props.states,
    }

    if(this.state.queryParams.own == 0){
      this.columns = [
        {
          name: 'company_name',
          display_name: 'Company Name'
        },
        {
          name: 'mobile',
          display_name: 'Contact Number'
        },
        {
          name: 'city',
          display_name: 'City'
        },
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
        },
        /*{
          name: 'status_display',
          display_name: 'Status'
        },*/

      ];
    } else {
      this.columns = [
        {
          name: 'company_name',
          display_name: 'Company Name'
        },
        {
          name: 'mobile',
          display_name: 'Contact Number'
        },
        {
          name: 'city',
          display_name: 'City'
        },
        {
          name: 'total_stock',
          display_name: 'No of Stock',
          isBold: true
        },
        {
          name: 'total_stock_price',
          display_name: 'Stock Amt',
          isBold: true
        },
        {
          name: 'wallet_balance',
          display_name: 'Wallet Balance',
          isBold: true
        },

      ];
    }

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

    if (props.total_sale !== state.total_sale) {
      update.total_sale = props.total_sale;
    }
    if (props.total_sale_due !== state.total_sale_due) {
      update.total_sale_due = props.total_sale_due;
    }
    if (props.total_sale_paid !== state.total_sale_paid) {
      update.total_sale_paid = props.total_sale_paid;
    }
    if (props.total_sale_return !== state.total_sale_return) {
      update.total_sale_return = props.total_sale_return;
    }

    if (props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }

    if (props.deleteErrorMsg !== state.deleteErrorMsg) {
      update.deleteErrorMsg = props.deleteErrorMsg;
    }

    if (props.states !== state.states) {
      update.states = props.states;
    }
    if (props.countries !== state.countries) {
      update.countries = props.countries;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.adminList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.adminDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState) { 
    if (this.state.deleteSuccess) {
      
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_ADMIN
      });
      this.handlePagination(1);

    } else if(this.state.deleteSuccess == false && this.state.deleteErrorMsg != null) { 
      this.props.enqueueSnackbar(this.state.deleteErrorMsg, {variant: 'error'});
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_ADMIN
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

  render() {  //console.log(this.state.states)

    return (
      <>
        {this.state.queryParams.own == 0 && <Card className='dashboard_card supplier-card' style={{ marginBottom: '16px' }}>
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
        </Card>}
        <MainCard title="Admins" secondary={hasPermission(this.state.permissions, 'admin', 'add') ? <Button variant="contained" onClick={() => this.props.navigate('create')}>Add New</Button> : null} >
          <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view'>
              <Grid item xs={2} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Admin Type</InputLabel>
                  <Select
                    value={this.state.queryParams.own}
                    label="Admin Type"
                    onChange={(e) => this.handleSearchChange(e.target.value, 'own')}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="1">Own</MenuItem>
                    <MenuItem value="0">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} className='create-input order-input button-right'>
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
                  label: 'Edit',
                  onClick: this.handleEdit,
                  color: 'primary',
                  show: hasPermission(this.state.permissions, 'admin', 'edit')
                },
                {
                  label: 'Delete',
                  onClick: this.handleDelete,
                  isDelete: true,
                  color: 'error',
                  show: hasPermission(this.state.permissions, 'admin', 'delete')
                },
                {
                  label: 'View',
                  onClick: this.handleView,
                  color: 'primary',
                  show: hasPermission(this.state.permissions, 'admin', 'view')
                }
              ]}
            />
          </Grid>
        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.admin.items,
  total: state.superadmin.admin.total,
  total_sale: state.superadmin.admin.total_sale,
  total_sale_due: state.superadmin.admin.total_sale_due,
  total_sale_paid: state.superadmin.admin.total_sale_paid,
  total_sale_return: state.superadmin.admin.total_sale_return,
  states: state.superadmin.countryState.items || [],
  countries: state.superadmin.country.items || [],
  deleteSuccess: state.superadmin.admin.deleteSuccess,
  deleteErrorMsg: state.superadmin.admin.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({ adminList, adminDelete, stateList, countryList }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPage)));
