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
import {hasPermission} from 'src/helpers/helper';

class EmployeePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
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
        display_name: 'Employee Name'
      },
      {
        name: 'mobile',
        display_name: 'Contact Number'
      },
      {
        name: 'parents_name',
        display_name: 'Work Under'
      },
      {
        name: 'role_name',
        display_name: 'Designation Role'
      },
      {
        name: 'expense_balance',
        display_name: 'Expense Balance'
      },
      {
        name: 'attendence',
        display_name: 'Attendence',
        show_tag: true,
        showAttendenceAddress: true,
        color_conditions: [
          {
            key: "attendence",
            value: "Present",
            color: "success"
          },
          {
            key: "approve_status",
            value: "Absent",
            color: "error"
          }
        ]
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
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
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
      <MainCard title="Employees" secondary={hasPermission(this.state.permissions, 'employees', 'add') ? <Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button> : null} >
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
                label: 'View',
                onClick: this.handleView,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'employees', 'view')
              },
              {
                label: 'Edit',
                onClick: this.handleEdit,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'employees', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'employees', 'delete')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.employee.items,
  total: state.superadmin.employee.total,
  deleteSuccess: state.superadmin.employee.deleteSuccess,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({employeeList, employeeDelete}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeePage));
