import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import MaterialPriceForm from 'forms/SuperAdmin/MaterialPriceForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import {RESET_MATERIAL_PRICE} from '../../../actionTypes/superadmin/materialPrice.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class MaterialPriceCreatePage extends Component {

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
          type: RESET_MATERIAL_PRICE
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/material-prices');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
      }
      
    }
  }

  render() {
    
    return (
      <MainCard title="Price Create">
        <div>
            <MaterialPriceForm  />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  actionCalled: state.superadmin.materialPrice.actionCalled,
  createSuccess: state.superadmin.materialPrice.createSuccess,
  successMessage: state.superadmin.materialPrice.successMessage,
  errorMessage: state.superadmin.materialPrice.errorMessage,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialPriceCreatePage)));
