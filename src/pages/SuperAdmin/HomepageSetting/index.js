import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import HomepagesettingForm from 'forms/SuperAdmin/HomepagesettingForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {homepagesettingList } from 'actions/superadmin/homepagesetting.actions';
import { withSnackbar } from 'notistack';
import {RESET_HOMEPAGESETTING} from '../../../actionTypes/superadmin/homepagesetting.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class HomepageSettingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      homepagesetting: this.props.homepagesetting,
      //id: this.props.params.id,
	    auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.homepagesettingList();
    
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

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
    if(props.homepagesetting !== state.homepagesetting){
      update.homepagesetting = props.homepagesetting;
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
          type: RESET_HOMEPAGESETTING
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/homepage-settings');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_HOMEPAGESETTING
        });
      }
      
    }
  }

  render() {
    //console.log("homepagesettingList ", this.state.homepagesetting);
    console.log("this.state.actionCalled : ", this.state.actionCalled);
    return (
      <MainCard title="Home Page Settings">
        <div>
          {
            this.state.homepagesetting.length > 0 ? 
            <HomepagesettingForm submitting={this.state.actionCalled} formData={this.state.homepagesetting} />
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
  actionCalled: state.superadmin.homepagesetting.actionCalled,
  editSuccess: state.superadmin.homepagesetting.editSuccess,
  successMessage: state.superadmin.homepagesetting.successMessage,
  errorMessage: state.superadmin.homepagesetting.errorMessage,
  homepagesetting: state.superadmin.homepagesetting.items,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    homepagesettingList
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(HomepageSettingPage)));
