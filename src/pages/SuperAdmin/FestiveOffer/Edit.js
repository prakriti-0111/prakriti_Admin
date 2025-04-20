import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import FestiveofferForm from 'forms/SuperAdmin/FestiveofferForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {festiveofferView } from 'actions/superadmin/festiveoffer.actions';
import { withSnackbar } from 'notistack';
import {RESET_FESTIVEOFFER} from '../../../actionTypes/superadmin/festiveoffer.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class FestiveofferEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      festiveoffer: this.props.festiveoffer,
      id: this.props.params.id,
	    auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.festiveofferView(this.state.id);
    
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
    if(props.festiveoffer !== state.festiveoffer){
      update.festiveoffer = props.festiveoffer;
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
          type: RESET_FESTIVEOFFER
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/festive-offers');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_FESTIVEOFFER
        });
      }
      
    }
  }

  render() {
    
    return (
      <MainCard title="Festiveoffer Edit">
        <div>
          {
            this.state.festiveoffer ? 
            <FestiveofferForm formData={this.state.festiveoffer} />
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
  actionCalled: state.superadmin.festiveoffer.actionCalled,
  editSuccess: state.superadmin.festiveoffer.editSuccess,
  successMessage: state.superadmin.festiveoffer.successMessage,
  errorMessage: state.superadmin.festiveoffer.errorMessage,
  festiveoffer: state.superadmin.festiveoffer.festiveoffer,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    festiveofferView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(FestiveofferEditPage)));
