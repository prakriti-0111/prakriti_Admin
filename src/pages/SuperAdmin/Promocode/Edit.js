import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import PromocodeForm from 'forms/SuperAdmin/PromocodeForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {promocodeView } from 'actions/superadmin/promocode.actions';
import { withSnackbar } from 'notistack';
import {RESET_PROMOCODE} from '../../../actionTypes/superadmin/promocode.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';

class PromocodeEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      actionCalled: this.props.actionCalled,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      promocode: this.props.promocode,
      id: this.props.params.id,
	    auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.promocodeView(this.state.id);
    
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
    if(props.promocode !== state.promocode){
      update.promocode = props.promocode;
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
          type: RESET_PROMOCODE
        });
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/promocodes');
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.props.dispatch({
          type: RESET_PROMOCODE
        });
      }
      
    }
  }

  render() {
    
    return (
      <MainCard title="Promocode Edit">
        <div>
          {
            this.state.promocode ? 
            <PromocodeForm formData={this.state.promocode} />
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
  actionCalled: state.superadmin.promocode.actionCalled,
  editSuccess: state.superadmin.promocode.editSuccess,
  successMessage: state.superadmin.promocode.successMessage,
  errorMessage: state.superadmin.promocode.errorMessage,
  promocode: state.superadmin.promocode.promocode,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    promocodeView
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PromocodeEditPage)));
