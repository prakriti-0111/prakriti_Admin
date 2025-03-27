import { React, Component } from 'react';
import { matchRoutes, useLocation, useSearchParams } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, Stack } from '@mui/material';
import OrderView from 'pages/SuperAdmin/Orders/OrderView';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';

class OrderViewPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth
    }
    
  }

  componentDidMount(){
    
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    return update;
  }


  render() {
    
    return (
      <MainCard title="Order Details" secondary={
        <Stack spacing={1} direction="row" justifyContent="flex-end">
          {/*{
            order ?
            <Button variant="contained" onClick={this.handleSale}>Sale</Button>
            : null
          }*/}
          <Button variant="contained" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/orders')}>Back</Button>
        </Stack>
      }
      >
        <OrderView />
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatch
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderViewPage)));
