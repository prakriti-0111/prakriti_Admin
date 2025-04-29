import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import StockProductBannerForm from 'forms/SuperAdmin/StockProductBannerForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {stockproductView } from 'actions/superadmin/stockproductbanner.actions';
import { withSnackbar } from 'notistack';
import {RESET_STOCKPRODUCT} from '../../../actionTypes/superadmin/stockproductbanner.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class StockProductBannerEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      stockproductbanner: this.props.stockproductbanner,
      id: this.props.params.id,
	    auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.stockproductView(this.state.id);
    
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
    if(props.stockproductbanner !== state.stockproductbanner){
      update.stockproductbanner = props.stockproductbanner;
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
          type: RESET_STOCKPRODUCT
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/stock-products');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_STOCKPRODUCT
        });
      }
      
    }
  }

  render() {
    
    return (
      <MainCard title="Stock Product Banner Edit">
        <div>
          {
            this.state.stockproductbanner ? 
            <StockProductBannerForm formData={this.state.stockproductbanner} />
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
  actionCalled: state.superadmin.stockproductbanner.actionCalled,
  editSuccess: state.superadmin.stockproductbanner.editSuccess,
  successMessage: state.superadmin.stockproductbanner.successMessage,
  errorMessage: state.superadmin.stockproductbanner.errorMessage,
  stockproductbanner: state.superadmin.stockproductbanner.stockproductbanner,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    stockproductView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(StockProductBannerEditPage)));
