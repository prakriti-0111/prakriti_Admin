import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import PurchaseForm from 'forms/Admin/PurchaseForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';

class PurchaseCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
    
  }

  render() {
    
    return (
      <MainCard title="">
        <div>
            <PurchaseForm />
        </div>
      </MainCard>
    );
  }
} 

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseCreatePage)));
