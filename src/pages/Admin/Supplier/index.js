import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { supplierList, supplierDelete } from 'actions/admin/supplier.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { districtList } from 'actions/superadmin/district.actions';
import DataTable from 'src/utils/DataTable';
import {ADMIN_RESET_SUPPLIER} from '../../actionTypes/admin/supplier.types';
import {displayAmount} from 'src/helpers/helper';

class SupplierPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      deleteSuccess: this.props.deleteSuccess,
      states: this.props.states,
      districts: this.props.districts,
    }
    // this.columns = [
    //   {
    //     name: 'name',
    //     display_name: 'Name'
    //   },
    //   {
    //     name: 'mobile',
    //     display_name: 'Mobile'
    //   },
    //   {
    //     name: 'email',
    //     display_name: 'Email'
    //   },
    //   {
    //     name: 'gst',
    //     display_name: 'GST'
    //   },
    //   {
    //     name: 'total_amount_display',
    //     display_name: 'Total Purchase'
    //   },
    //   {
    //     name: 'paid_amount_display',
    //     display_name: 'Paid'
    //   },
    //   {
    //     name: 'due_amount_display',
    //     display_name: 'Due'
    //   },
    //   /*{
    //     name: 'status_display',
    //     display_name: 'Status'
    //   },*/

    // ];
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

    ];
    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      },
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary'
      },
      {
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.stateList({all: 1});
    this.props.actions.districtList({all: 1});
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.total_purchase !== state.total_purchase){
      update.total_purchase = props.total_purchase;
    }
    if(props.total_purchase_due !== state.total_purchase_due){
      update.total_purchase_due = props.total_purchase_due;
    }
    if(props.total_purchase_paid !== state.total_purchase_paid){
      update.total_purchase_paid = props.total_purchase_paid;
    }
    if(props.total_purchase_return !== state.total_purchase_return){
      update.total_purchase_return = props.total_purchase_return;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }

    if(props.states !== state.states){
      update.states = props.states;
    }

    if(props.districts !== state.districts){
      update.districts = props.districts;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.supplierList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.supplierDelete(row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: ADMIN_RESET_SUPPLIER
      });
      this.handlePagination(1);
      
    }
  }

  render() {   
    
    return (
      <>
        <Card className='dashboard_card supplier-card' style={{marginBottom: '16px'}}>
          <CardContent className={`dashboard_card_content user-bg-1`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Purchase</h1>
              <h2>{displayAmount(this.state.total_purchase)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-2`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Return</h1>
              <h2>{displayAmount(this.state.total_purchase_return)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-3`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Paid</h1>
              <h2>{displayAmount(this.state.total_purchase_paid)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
          <CardContent className={`dashboard_card_content user-bg-4`} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
              <h1>Total Due</h1>
              <h2>{displayAmount(this.state.total_purchase_due)}</h2>
            </Typography>
            <div className="card-icon">
              {/*<CurrencyRupeeIcon />*/}
            </div>
          </CardContent>
        </Card>
        <MainCard title="Suppliers" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
          <Grid container spacing={gridSpacing} className="abc">
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
  items: state.admin.supplier.items,
  total: state.admin.supplier.total,
  total_purchase: state.admin.supplier.total_purchase,
  total_purchase_due: state.admin.supplier.total_purchase_due,
  total_purchase_paid: state.admin.supplier.total_purchase_paid,
  total_purchase_return: state.admin.supplier.total_purchase_return,
  states: state.superadmin.countryState.items || [],
  districts: state.superadmin.district.items || [],
  deleteSuccess: state.admin.supplier.deleteSuccess
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({supplierList, supplierDelete, stateList, districtList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierPage));
