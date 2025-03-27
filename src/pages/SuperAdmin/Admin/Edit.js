import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, CircularProgress } from '@mui/material';
import AdminForm from 'forms/SuperAdmin/AdminForm';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { adminFetch } from 'actions/superadmin/admin.actions';
import { bindActionCreators } from 'redux';

class AdminEditPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    }
    
  }

  componentDidMount(){
    this.props.actions.adminFetch(this.props.params.id);
    
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.item !== state.item){
      update.item = props.item;
    }
    return update;
  }

  render() {
    
    return (
      <MainCard title="Edit Admin">
        <div>
          {
            this.state.item ? 
            <AdminForm formData={this.state.item} />
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
  item: state.superadmin.admin.item,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({adminFetch}, dispatch)
});



export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminEditPage)));
