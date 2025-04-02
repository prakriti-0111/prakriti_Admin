import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, TextareaAutosize } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {isSuperAdmin, isDistributor, hasPermission} from 'src/helpers/helper';
import { leaveApplicationList, leaveApplicationStore, leaveApplicationFetch, leaveApplicationUpdate, leaveApplicationDelete } from 'actions/superadmin/leaveApplication.action';
import DataTable from 'src/utils/DataTable';
import {RESET_LEAVEAPPLICATION} from '../../../actionTypes/superadmin/leaveApplication.types';
import { withSnackbar } from 'notistack';
import _ from 'lodash';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class LeaveApplicationPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      total: this.props.total,
      permissions: this.props.permissions,
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      queryParams: {
        page: 1,
        limit: 50
      },
      actionItem: null,
      status: '',
      dialogOpen: false,
      explanation: ''
    }
    this.isSuperAdmin = isSuperAdmin();
    this.isDistributor = isDistributor();

    this.columns = [
      {
        name: 'user_name',
        display_name: 'User Name'
      },
      {
        name: 'role',
        display_name: 'Role'
      },
      {
        name: 'title',
        display_name: 'Title'
      },
      {
        name: 'short_message',
        display_name: 'Message',
        isHtml: true
      },
      {
        name: 'explanation',
        display_name: 'Explanation'
      },
      {
        name: 'from_date',
        display_name: 'From'
      },
      {
        name: 'to_date',
        display_name: 'To'
      },
      {
        name: 'created_at',
        display_name: 'Created At'
      },
      {
        name: 'status_display',
        display_name: 'Status',
        show_tag: true,
        color_conditions: [
          {
            key: "status",
            value: "pending",
            color: "primary"
          },
          {
            key: "status",
            value: "accepted",
            color: "success"
          },
          {
            key: "status",
            value: "declined",
            color: "error"
          }
        ]
      },
    ];
    if(!this.isSuperAdmin){
      if(!this.isDistributor){
        _.remove(this.columns, (i) => i.name == "user_name");
      }
      _.remove(this.columns, (i) => i.name == "role");
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

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.editSuccess !== state.editSuccess){
      update.editSuccess = props.editSuccess;
    }
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    if(props.errorMessage !== state.errorMessage){
      update.errorMessage = props.errorMessage;
    }
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.leaveApplicationList(this.state.queryParams);
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

  handleEdit = async(row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.leaveApplicationDelete(row.id);
  }

  handleAceept = (row) => {
    this.setState({
      actionItem: row,
      status: 'accepted',
      dialogOpen: true,
      explanation: ''
    })
  }

  handleDecline = (row) => {
    this.setState({
      actionItem: row,
      status: 'declined',
      dialogOpen: true,
      explanation: ''
    })
  }

  handleClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  handleSubmit = () => {
    this.props.actions.leaveApplicationUpdate(this.state.actionItem.id, {status: this.state.status, explanation: this.state.explanation})
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.actionCalled){
      if(this.state.deleteSuccess || this.state.editSuccess){
        this.setState({
          dialogOpen: false
        })
        this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
        this.loadListData();
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
      }
      this.props.dispatch({
        type: RESET_LEAVEAPPLICATION
      });
    }
  }

  getTableActions = () => {
    let tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        show: hasPermission(this.state.permissions, 'leave_applications', 'view')
      }
    ];
    if(this.isSuperAdmin){
      tableActions = [...tableActions, ...[
        {
          label: 'Accept',
          onClick: this.handleAceept,
          color: 'primary',
          show: hasPermission(this.state.permissions, 'leave_applications', 'edit'),
          conditions: [
            {
              key: "status",
              value: 'pending'
            }
          ]
        },
        {
          label: 'Decline',
          onClick: this.handleDecline,
          color: 'error',
          show: hasPermission(this.state.permissions, 'leave_applications', 'edit'),
          conditions: [
            {
              key: "status",
              value: 'pending'
            }
          ]
        }
      ]];
    }else if(!this.isDistributor){
      tableActions = [...tableActions, ...[
        {
          label: 'Edit',
          onClick: this.handleEdit,
          show: hasPermission(this.state.permissions, 'leave_applications', 'edit'),
          conditions: [
            {
              key: "status",
              value: 'pending'
            }
          ]
        },
        {
          label: 'Delete',
          onClick: this.handleDelete,
          isDelete: true,
          show: hasPermission(this.state.permissions, 'leave_applications', 'delete'),
          conditions: [
            {
              key: "status",
              value: 'pending'
            }
          ]
        }
      ]];
    }
    return tableActions;
  }

  render() {
    return (
      <MainCard title="Leave Applications" secondary={!isSuperAdmin() ? (<Button variant="contained" onClick={() => this.props.navigate('create')}>Add</Button>) : null}>
        <Grid container spacing={gridSpacing} className='orders-sale-button'>
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
        <Dialog
          className='ratn-dialog-footer delete_modal'
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>{this.state.status == "accepted" ? "Accept" : "Decline"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                this.state.status == "accepted" ?
                "Are you sure want accept this leave application?"
                :
                "Are you sure want decline this leave application?"
              }
            </DialogContentText>
            <Box sx={{ flexGrow: 1}}>
              <Grid container>
                <Grid item md={12} xs={12} className='create-input'>
                  <TextareaAutosize
                    className='description'
                    minRows={1}
                    placeholder="Explanation"
                    style={{ width: '100%', height: '51px' }}
                    value={this.state.explanation}
                    onChange={(event) => this.setState({explanation: event.target.value})}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <div className='ratn-footer-buttons'>
              <Button onClick={this.handleClose} className='close-button'>Close</Button>
              <Button onClick={this.handleSubmit} className='conf-button'>Yes, Confirm</Button>
            </div>
          </DialogActions>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.leaveApplication.items,
  total: state.superadmin.leaveApplication.total,
  actionCalled: state.superadmin.leaveApplication.actionCalled,
  deleteSuccess: state.superadmin.leaveApplication.deleteSuccess,
  editSuccess: state.superadmin.leaveApplication.editSuccess,
  successMessage: state.superadmin.leaveApplication.successMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      leaveApplicationList,
      leaveApplicationStore,
      leaveApplicationFetch,
      leaveApplicationUpdate,
      leaveApplicationDelete
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveApplicationPage)));
