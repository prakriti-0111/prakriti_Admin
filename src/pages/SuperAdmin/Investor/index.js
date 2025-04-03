import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { investorList, investorDelete } from 'actions/superadmin/investor.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { districtList } from 'actions/superadmin/district.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_INVESTOR} from '../../../actionTypes/superadmin/investor.types';
import {hasPermission} from 'src/helpers/helper';

class InvestorPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      deleteSuccess: this.props.deleteSuccess,
      countries: this.props.countries,
      states: this.props.states,
      districts: this.props.districts,
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      {
        name: 'city',
        display_name: 'City'
      },
      {
        name: 'total_loan_amount_display',
        display_name: 'Received Amt'
      },
      {
        name: 'total_with_interest_display',
        display_name: 'Tot With Interest'
      },
      {
        name: 'total_paid_display',
        display_name: 'Total Paid'
      }

    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.countryList({all: 1});
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

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }

    if(props.countries !== state.countries){
      update.countries = props.countries;
    }

    if(props.states !== state.states){
      update.states = props.states;
    }

    if(props.districts !== state.districts){
      update.districts = props.districts;
    }
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.investorList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.investorDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_INVESTOR
      });
      this.handlePagination(1);
      
    }
  }

  render() {  
    
    return (
      <MainCard title="Investors" secondary={hasPermission(this.state.permissions, 'investors', 'add') ? <Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button> : null} >
        <Grid container spacing={gridSpacing} className="abc">
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
                show: hasPermission(this.state.permissions, 'investors', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'investors', 'delete')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.investor.items,
  total: state.superadmin.investor.total,
  countries: state.superadmin.country.items || [],
  states: state.superadmin.countryState.items || [],
  districts: state.superadmin.district.items || [],
  deleteSuccess: state.superadmin.investor.deleteSuccess,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({investorList, investorDelete, countryList, stateList, districtList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorPage));
