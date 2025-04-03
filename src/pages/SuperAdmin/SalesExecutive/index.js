import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salesExecutiveList, salesExecutiveDelete } from 'actions/superadmin/salesExecutive.actions';
import DataTable from 'src/utils/DataTable';
import {SUPERADMIN_RESET_SALESEXECUTIVE} from '../../../actionTypes/superadmin/salesExecutive.types';
import {isAdmin, isDistributor, isSuperAdmin, hasPermission } from 'src/helpers/helper';

class SalesExecutivePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        role_id: 4
      },
      deleteSuccess: this.props.deleteSuccess,
    }
    this.isAdmin = isAdmin();
    this.isDistributor = isDistributor();
    this.isSuperAdmin = isSuperAdmin();
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      /*{
        name: 'email',
        display_name: 'Email'
      }*/
      {
        name: 'company_name',
        display_name: 'Company name'
      },
      {
        name: 'state_name',
        display_name: 'State'
      },
    ];
    if(!this.isDistributor){
      this.columns = [...this.columns, {
        name: 'parent_user_name',
        display_name: 'Distributor'
      }];
    }
    if(this.isAdmin || this.isDistributor || this.isSuperAdmin){
      this.columns = [...this.columns, ...[
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
      ]];
    }
    
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
    this.props.actions.salesExecutiveList(this.state.queryParams);
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

  handleEmployeeView = (row) => {
    this.props.navigate('/super-admin/employees/view/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.salesExecutiveDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: SUPERADMIN_RESET_SALESEXECUTIVE
      });
      this.handlePagination(1);
    }
  }

  getTableActions = () => {
    let tableActions = [
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'sales_executive', 'edit')
      },
      {
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error',
        show: hasPermission(this.state.permissions, 'sales_executive', 'delete')
      }
    ];

    if(this.isDistributor){
      tableActions = [{
        label: 'View',
        onClick: this.handleView,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'sales_executive', 'view')
      }];
    }else if(this.isSuperAdmin){
      tableActions = [{
        label: 'View',
        onClick: this.handleEmployeeView,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'sales_executive', 'view')
      }].concat(tableActions);
    }

    return tableActions;
    
  }

  render() {
    return (
      <MainCard title="Sales Executives" secondary={(!this.isDistributor && hasPermission(this.state.permissions, 'sales_executive', 'add')) ? <Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button> : null} >
        <Grid container spacing={gridSpacing} className="abc">
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={this.getTableActions()}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.salesExecutive.items,
  total: state.superadmin.salesExecutive.total,
  deleteSuccess: state.superadmin.salesExecutive.deleteSuccess,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({salesExecutiveList, salesExecutiveDelete}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesExecutivePage));
