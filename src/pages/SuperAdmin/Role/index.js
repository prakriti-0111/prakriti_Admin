import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { roleList, roleCreate, roleDelete, roleUpdate} from 'actions/superadmin/role.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RoleForm from 'forms/SuperAdmin/RoleForm';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';
import {
  SUPERADMIN_ADD_ROLE,
  SUPERADMIN_UPDATE_ROLE,
  SUPERADMIN_DELETE_ROLE,
  SUPERADMIN_RESET_ROLE
} from '../../../actionTypes/superadmin/role.types';

class RolePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Role Name'
      }
    ];

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

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
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
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
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
    this.props.actions.roleList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit Role'
    })
  }

  handlePermissions = (row) => {
    this.props.navigate('permissions/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.roleDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Role',
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
      this.props.actions.roleUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.roleCreate(data);
    }
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({
          type: SUPERADMIN_ADD_ROLE,
          payload: false
        });
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null
        }, () => {
          this.loadListData()
        })
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({
          type: SUPERADMIN_UPDATE_ROLE,
          payload: false
        });
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null
        }, () => {
          this.loadListData()
        })
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({
          type: SUPERADMIN_DELETE_ROLE,
          payload: false
        });
        this.handlePagination(1);
      }
      else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
      }
      this.props.dispatch({type: SUPERADMIN_RESET_ROLE})
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
  }

  render() {

    return (
      <MainCard title="Roles" secondary={hasPermission(this.state.permissions, 'roles', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
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
                show: hasPermission(this.state.permissions, 'roles', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'roles', 'delete'),
                conditions: [
                  {
                    key: "can_delete",
                    value: true
                  }
                ]
              },
              {
                label: 'Permissions',
                onClick: this.handlePermissions,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'roles', 'edit')
              },
            ]}
          />
        </Grid>

          <Dialog
            className="ratn-dialog-wrapper"
            open={this.state.openDialog}
            onClose={this.handleDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {
                this.state.dialogTitle
              }
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <RoleForm formData={this.state.editRow} handleCancel={this.handleCancel} />
            </DialogContent>
          </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.role.items,
  total: state.superadmin.role.total,
  actionCalled: state.superadmin.role.actionCalled,
  createSuccess: state.superadmin.role.createSuccess,
  editSuccess: state.superadmin.role.editSuccess,
  deleteSuccess: state.superadmin.role.deleteSuccess,
  successMessage: state.superadmin.role.successMessage,
  errorMessage: state.superadmin.role.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ roleList, roleCreate, roleUpdate, roleDelete }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(RolePage)));
