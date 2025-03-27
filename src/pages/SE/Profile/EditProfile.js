import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import EditProfileForm from 'forms/Se/EditProfileForm';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { salesExecutiveFetch } from 'actions/superadmin/salesExecutive.actions';
import SalesExecutiveForm from 'forms/SuperAdmin/SalesExecutiveForm';
import { bindActionCreators } from 'redux';

class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      auth: this.props.auth
    }
    
  }

  componentDidMount(){
    this.props.actions.salesExecutiveFetch(this.state.auth.user.id);
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
      <MainCard title="Edit Profile">
        <div>
          {/*<EditProfileForm />*/}
          <SalesExecutiveForm formData={this.state.item} isEditProfile={true} />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.superadmin.salesExecutive.item || null,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({salesExecutiveFetch}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile)));
