import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import ProductForm from 'forms/SuperAdmin/ProductForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {productView, productUpdate } from 'actions/superadmin/product.actions';
import { withSnackbar } from 'notistack';
import {RESET_PRODUCT} from '../../../actionTypes/superadmin/product.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class ProductEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      product: this.props.product,
      id: this.props.params.id,
	  auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.productView(this.state.id);
    
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
    if(props.product !== state.product){
      update.product = props.product;
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
          type: RESET_PRODUCT
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/products');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_PRODUCT
        });
      }
      
    }
  }

  render() {
    
    return (
      <MainCard title="Product Edit">
        <div>
          {
            this.state.product ? 
            <ProductForm formData={this.state.product} />
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
  actionCalled: state.superadmin.product.actionCalled,
  editSuccess: state.superadmin.product.editSuccess,
  successMessage: state.superadmin.product.successMessage,
  errorMessage: state.superadmin.product.errorMessage,
  product: state.superadmin.product.product,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    productView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductEditPage)));
