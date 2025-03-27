import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { returnPolicyList, returnPolicyDelete, returnPolicyCreate, returnPolicyUpdate } from 'actions/superadmin/returnPolicy.actions';
import DataTable from 'src/utils/DataTable';
import ReturnPolicyForm from 'forms/SuperAdmin/ReturnPolicyForm';
import { categoryList } from 'actions/superadmin/category.actions';
import { withSnackbar } from 'notistack';
import { RESET_RETURN_POLICY } from '../../../actionTypes/superadmin/returnPolicy.types';
import {hasPermission} from 'src/helpers/helper';

class ReturnPolicyPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        role: ''
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      categories: this.props.categories,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      submitSuccess: false
    }
    this.columns = [
      {
        name: 'category_name',
        display_name: 'Category'
      },
      {
        name: 'role_display',
        display_name: 'Role'
      },
      {
        name: 'amount_display',
        display_name: 'Amount %'
      },
      {
        name: 'days',
        display_name: 'Days'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }

    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }

    if ('createSuccess' in props && props.createSuccess !== state.createSuccess) {
      update.createSuccess = props.createSuccess;
    }

    if ('editSuccess' in props && props.editSuccess !== state.editSuccess) {
      update.editSuccess = props.editSuccess;
    }

    if ('deleteSuccess' in props && props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }

    return update;
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

  loadListData = () => {
    this.props.actions.returnPolicyList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row
    })
  }

  handleDelete = (row) => {
    this.props.actions.returnPolicyDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      editRow: null
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
      editRow: null
    })
  }

  submit = (data) => {
    if (this.state.editRow) {
      this.props.actions.returnPolicyUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.returnPolicyCreate(data);
    }
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_RETURN_POLICY});
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null,
          submitSuccess: true
        }, () => {
          this.loadListData();
          this.setState({
            submitSuccess: false
          })
        })
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_RETURN_POLICY});
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null,
          submitSuccess: true
        }, () => {
          this.loadListData();
          this.setState({
            submitSuccess: false
          })
        })
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_RETURN_POLICY});
        this.handlePagination(1);
      }
      else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
        this.props.dispatch({type: RESET_RETURN_POLICY});
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
  }

  categoryChange = (vl) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1,
        category_id: vl
      }
    }, () => {
      this.loadListData()
    })
  }

  roleChange = (vl) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1,
        role: vl
      }
    }, () => {
      this.loadListData()
    })
  }

  render() {

    return (
      <MainCard title="Return Policy" >
        {
          hasPermission(this.state.permissions, 'return_policy', 'add') ?
          <div className='tax-input loans_view p_view'>
            <ReturnPolicyForm onSubmit={this.submit} formData={this.state.editRow} categories={this.state.categories} handleCancel={this.handleCancel} categoryChange={this.categoryChange} submitSuccess={this.state.submitSuccess} roleChange={this.roleChange} />
          </div>
          : null
        }
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
                show: hasPermission(this.state.permissions, 'return_policy', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'return_policy', 'delete')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.returnPolicy.items,
  total: state.superadmin.returnPolicy.total,
  categories: state.superadmin.category.items || [],
  actionCalled: state.superadmin.returnPolicy.actionCalled,
  createSuccess: state.superadmin.returnPolicy.createSuccess,
  editSuccess: state.superadmin.returnPolicy.editSuccess,
  deleteSuccess: state.superadmin.returnPolicy.deleteSuccess,
  successMessage: state.superadmin.returnPolicy.successMessage,
  errorMessage: state.superadmin.returnPolicy.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ returnPolicyList, returnPolicyCreate, returnPolicyUpdate, returnPolicyDelete, categoryList }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnPolicyPage)));
