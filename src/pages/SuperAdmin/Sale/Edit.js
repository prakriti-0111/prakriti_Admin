import { React, Component } from 'react';
import { matchRoutes, useLocation, useSearchParams } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import SaleForm from 'forms/SuperAdmin/SaleForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { salesEdit } from 'actions/superadmin/sales.actions';

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
      <MainCard title="Return Sale">
        <div>
          {
            this.state.sale ? 
            <>
            {/*{
              this.state.sale.is_approved == 0 ?
              <SaleForm formData={this.state.sale} />
              :
              <div>
                <Alert variant="filled" severity="error">
                  You can't edit this sale.
                </Alert>
              </div>
            }*/}
            <SaleForm formData={this.state.sale} />
            </>
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
  sale: state.superadmin.sales.sale,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    salesEdit,
  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleEditPage)));
