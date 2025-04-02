import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import LeaveApplicationForm from 'forms/SuperAdmin/LeaveApplicationForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { leaveApplicationFetch } from 'actions/superadmin/leaveApplication.action';
import {RESET_LEAVEAPPLICATION} from '../../../actionTypes/superadmin/leaveApplication.types';
import { withSnackbar } from 'notistack';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class LeaveApplicationEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item,
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      auth: this.props.auth,
    }
  }

  componentDidMount(){
    this.props.actions.leaveApplicationFetch(this.props.params.id);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.item !== state.item){
      update.item = props.item;
    }

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
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
	  if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(){
    if(this.state.actionCalled){
      if(this.state.editSuccess){
        this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
        this.props.dispatch({
          type: RESET_LEAVEAPPLICATION
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/leave-applications');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_LEAVEAPPLICATION
        });
      }
      
    }
  }

  render() {
    return (
      <MainCard title="Leave Application Edit">
        <div>
          {
            this.state.item ? 
            <LeaveApplicationForm formData={this.state.item} />
            : 
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          }
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.superadmin.leaveApplication.item || null,
  actionCalled: state.superadmin.leaveApplication.actionCalled,
  editSuccess: state.superadmin.leaveApplication.editSuccess,
  successMessage: state.superadmin.leaveApplication.successMessage,
  errorMessage: state.superadmin.leaveApplication.errorMessage,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({leaveApplicationFetch}, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveApplicationEditPage)));
