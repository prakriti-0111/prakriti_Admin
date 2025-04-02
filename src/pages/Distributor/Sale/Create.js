import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import SaleForm from 'forms/distributor/SaleForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';

class SaleCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
    
  }

  render() {
    
    return (
      <MainCard title="Add New Sale">
        <div>
            <SaleForm order_id={this.props.query.get('order_id')} />
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


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleCreatePage)));
