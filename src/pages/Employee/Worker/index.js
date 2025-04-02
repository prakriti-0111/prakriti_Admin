import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { employeeList, employeeDelete } from 'actions/superadmin/employee.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_EMPLOYEE} from '../../../actionTypes/superadmin/employee.types';

class WorkerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        role_id: 10
      },
      deleteSuccess: this.props.deleteSuccess,
    }
    this.columns = [
      {
        name: 'profile_image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Worker Name'
      },
      {
        name: 'mobile',
        display_name: 'Contact Number'
      }
    ];
    this.tableActions = [
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary'
      },
      /*{
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      },*/
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      },
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

    return update;
  }

  loadListData = () => {
    this.props.actions.employeeList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.employeeDelete(row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_EMPLOYEE
      });
      this.handlePagination(1);
    }
  }

  render() {    
    
    return (
      <MainCard title="Workers" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
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
  items: state.superadmin.employee.items,
  total: state.superadmin.employee.total,
  deleteSuccess: state.superadmin.employee.deleteSuccess
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({employeeList, employeeDelete}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerPage));
