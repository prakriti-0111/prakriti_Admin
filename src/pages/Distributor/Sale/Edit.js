import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import SaleForm from 'forms/distributor/SaleForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { salesEdit } from 'actions/distributor/sales.actions';

class SaleEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      sale: this.props.sale
    }
    
  }

  componentDidMount(){
    this.props.actions.salesEdit(this.state.id);
    
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.sale !== state.sale){
      update.sale = props.sale;
    }

    return update;
  }


  render() {
    
    return (
      <MainCard title="Edit Sale">
        <div>
          {
            this.state.sale ? 
            <SaleForm formData={this.state.sale} />
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
  sale: state.distributor.sales.sale,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    salesEdit,
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleEditPage)));
