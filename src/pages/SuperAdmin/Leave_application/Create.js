import { React, Component } from 'react';
import { connect } from 'react-redux';
import LeaveApplicationForm from 'forms/SuperAdmin/LeaveApplicationForm';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import {RESET_LEAVEAPPLICATION} from '../../../actionTypes/superadmin/leaveApplication.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class LeaveApplicationCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
	    auth: this.props.auth
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if(props.createSuccess !== state.createSuccess){
      update.createSuccess = props.createSuccess;
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
      if(this.state.createSuccess){
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
      <MainCard title="Leave Application Create">
        <div>
          <LeaveApplicationForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  actionCalled: state.superadmin.leaveApplication.actionCalled,
  createSuccess: state.superadmin.leaveApplication.createSuccess,
  successMessage: state.superadmin.leaveApplication.successMessage,
  errorMessage: state.superadmin.leaveApplication.errorMessage,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveApplicationCreatePage)));
