import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from 'forms/Admin/LoginForm';
import { login } from 'actions/manager/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import {getUserDashboardRoute} from 'src/helpers/helper';
import { withSnackbar } from 'notistack';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginError: this.props.loginError,
      isLoggedIn: this.props.isLoggedIn,
      roleName: this.props.roleName
    }
  }

  componentDidMount(){
    if(this.state.isLoggedIn){
      setTimeout(() => {
        this.props.navigate(getUserDashboardRoute(this.state.roleName))
      })
    }
  }

  submit = (values) => {
    this.props.actions.login(values);
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

    if(props.loginError !== state.loginError){
      update.loginError = props.loginError;
    }

    return update;
  }

  componentDidUpdate() {
    if(this.state.isLoggedIn){
      this.props.enqueueSnackbar("Login successfully!", {variant: 'success'});
      this.props.navigate('/manager')
    }
  }

  render() {
    const { loginError } = this.state;
    return (
      <div className='super-admin-login'>
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
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className='login-wrapper'>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className='login-icon'>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Manager Sign in
              </Typography>

              {
                loginError ?
                  <Box sx={{ width: 1 }}>
                    <Alert severity="error">{loginError}</Alert>
                  </Box>
                  : null
              }

              <LoginForm onSubmit={this.submit} />
            </Box>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6, mb: 0 }} className='copyright'>
                {'Copyright ©  Prakriti '}
                {new Date().getFullYear()}
                <Link color="inherit" href="https://webappssol.com/" target="_blank">
                  &nbsp; 
                </Link>
            </Typography>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoggedIn: 'isLoggedIn' in state.auth ? state.auth.isLoggedIn : false,
  loginError: 'loginError' in state.auth ? state.auth.loginError : '',
  roleName: ('user' in state.auth && state.auth.user && 'role_name' in state.auth.user) ? state.auth.user.role_name : ''
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({login}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));
