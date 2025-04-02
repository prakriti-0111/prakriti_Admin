import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { distributorList, distributorDelete } from 'actions/admin/distributor.actions';
import { countryList } from 'actions/admin/country.actions';
import DataTable from 'src/utils/DataTable';
import {ADMIN_RESET_DISTRIBUTOR} from '../../actionTypes/admin/distributor.types';

class DistributorPage extends Component {

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
      countries: this.props.countries,
      districts: this.props.districts,
    }
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
        name: 'email',
        display_name: 'City'
      },
      {
        name: 'total_amount_display',
        display_name: 'Total Amount'
      },
      {
        name: 'paid_amount_display',
        display_name: 'Paid Amount'
      },
      {
        name: 'due_amount_display',
        display_name: 'Due Amount'
      },

    ];
    this.tableActions = [
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
    this.props.actions.countryList({all: 1});
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

    if(props.states !== state.states){
      update.states = props.states;
    }

    if(props.districts !== state.districts){
      update.districts = props.districts;
    }
    if(props.countries !== state.countries){
      update.countries = props.countries;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.distributorList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.distributorDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: ADMIN_RESET_DISTRIBUTOR
      });
      this.handlePagination(1);
      
    }
  }

  render() {   
   
    
    
    return ( 
      <MainCard title="Distributors" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
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
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.admin.distributor.items,
  total: state.admin.distributor.total,
  states: state.admin.countryState.items || [],
  countries: state.admin.country.items || [],
  districts: state.admin.district.items || [],
  deleteSuccess: state.admin.distributor.deleteSuccess
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({distributorList, distributorDelete, countryList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistributorPage));
