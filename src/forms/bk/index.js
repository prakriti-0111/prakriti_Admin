import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { adminList, adminDelete } from 'actions/superadmin/admin.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { countryList } from 'actions/superadmin/country.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_ADMIN} from '../../actionTypes/superadmin/admin.types';

class AdminPage extends Component {

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
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'email',
        display_name: 'Email'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      {
        name: 'pan',
        display_name: 'Pan'
      },
      {
        name: 'adhar',
        display_name: 'Adhar'
      },
      {
        name: 'status_display',
        display_name: 'Status'
      },
      {
        name: 'country_name',
        display_name: 'Country'
      },
      {
        name: 'state_name',
        display_name: 'State'
      }

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
    if(props.countries !== state.countries){
      update.countries = props.countries;
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

  handleDelete = (row) => {
    this.props.actions.adminDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_ADMIN
      });
      this.handlePagination(1);
      
    }
  }

  render() {  //console.log(this.state.states)
    
    return (
      <MainCard title="Admins" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
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
  items: state.superadmin.admin.items,
  total: state.superadmin.admin.total,
  states: state.superadmin.countryState.items || [],
  countries: state.superadmin.country.items || [],
  deleteSuccess: state.superadmin.admin.deleteSuccess
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({adminList, adminDelete, stateList,countryList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPage));
