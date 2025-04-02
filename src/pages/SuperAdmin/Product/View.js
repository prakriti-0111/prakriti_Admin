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

class ProductViewPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

    if(props.product !== state.product){
      update.product = props.product;
    }
	  if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(){

  }

  render() {
    
    return (
      <MainCard title="Product Details">
        <div>
          {
            this.state.product ? 
            <ProductForm formData={this.state.product} onlyView={true} />
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
  product: state.superadmin.product.product,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    productView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductViewPage)));
