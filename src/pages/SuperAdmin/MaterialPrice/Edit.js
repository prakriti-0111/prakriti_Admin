import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import MaterialPriceForm from 'forms/SuperAdmin/MaterialPriceForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {materialPriceView } from 'actions/superadmin/materialPrice.actions';
import { withSnackbar } from 'notistack';
import {RESET_MATERIAL_PRICE} from '../../../actionTypes/superadmin/materialPrice.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class MaterialPriceEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      materialPrice: this.props.materialPrice,
      id: this.props.params.id,
	    auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.materialPriceView(this.state.id);
    
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
    if(props.materialPrice !== state.materialPrice){
      update.materialPrice = props.materialPrice;
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
          type: RESET_MATERIAL_PRICE
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/material-prices');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
      }
      
    }
  }

  render() {
    console.log('this.state.materialPrice', this.state.materialPrice)
    return (
      <MainCard title="Price Edit">
        <div>
          {
            this.state.materialPrice ? 
            <MaterialPriceForm formData={this.state.materialPrice} />
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
  actionCalled: state.superadmin.materialPrice.actionCalled,
  editSuccess: state.superadmin.materialPrice.editSuccess,
  successMessage: state.superadmin.materialPrice.successMessage,
  errorMessage: state.superadmin.materialPrice.errorMessage,
  materialPrice: state.superadmin.materialPrice.materialPrice,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    materialPriceView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialPriceEditPage)));
