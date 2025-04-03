import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Button, Stack, Grid, Box } from '@mui/material';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute } from 'src/helpers/helper';

class HomeContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      roleName: this.props.roleName,
      auth: this.props.auth
    }
  }

  componentDidMount() {
    if (this.state.isLoggedIn) {
      setTimeout(() => {
        this.props.navigate(getUserDashboardRoute(this.state.roleName))
      }, 100)
    }else{
      setTimeout(() => {
        let hostname = window.location.hostname;
        // if(hostname.includes("superpatna.")){
        //   this.props.navigate("/super-admin/login");
        // }else if(hostname.includes("adminpatna.")){
        //   this.props.navigate("/admin/login");
        // }else{
        //   this.props.navigate("/login");
        // }
        
        
        if(hostname.includes("super.")){
          this.props.navigate("/super-admin/login");
        }else if(hostname.includes("admin.")){
          this.props.navigate("/admin/login");
        }else{
          this.props.navigate("/login");
        } 
       
        
      }, 100)
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.auth !== state.auth){
      update.auth = props.auth;
    }

    if(props.roleName !== state.roleName){
      update.roleName = props.roleName;
    }

    if(props.isLoggedIn !== state.isLoggedIn){
      update.isLoggedIn = props.isLoggedIn;
    }

    return update;
  }

  render() {
    return (
      <React.Fragment>
        {/* ----  <Box sx={{ flexGrow: 1, m: 0.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row"  justifyContent="flex-end">
              <Button variant="contained" color="success" onClick={() => this.props.navigate('/super-admin/login') }>
                Super Admin
              </Button>
              <Button variant="contained" color="success" onClick={() => this.props.navigate('/admin/login') }>
                Admin
              </Button>
              <Button variant="contained" color="success" onClick={() => this.props.navigate('/distributor/login') }>
                Distributor
              </Button>
            </Stack>
          </Grid>
        </Grid>
        </Box> 
        <Container maxWidth="sm">
          <Typography variant="h3" component="h3" align="center" mt={30}>
            
          </Typography>
        </Container> ----- */}
        <div className='ratn-admin-home'>
        <div className="square-box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
          <h1> Ratan Vihar</h1>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoggedIn: 'isLoggedIn' in state.auth ? state.auth.isLoggedIn : false,
  roleName: ('user' in state.auth && state.auth.user && 'role_name' in state.auth.user) ? state.auth.user.role_name : '',
});

export default withRouter(connect(mapStateToProps, {})(HomeContainer));
