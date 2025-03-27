import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import EditProfileForm from 'forms/SuperAdmin/EditProfileForm';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';

class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
    
  }

  render() {
    
    return (
      <MainCard title="Edit Profile">
        <div>
            <EditProfileForm />
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


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile)));
