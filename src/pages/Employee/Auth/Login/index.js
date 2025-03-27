import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from 'forms/Employee/LoginForm';
import { login } from 'actions/employee/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute } from 'src/helpers/helper';
import { withSnackbar } from 'notistack';
import { getAllRoles } from 'actions/employee/auth.actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginError: this.props.loginError,
      isLoggedIn: this.props.isLoggedIn,
      roleName: this.props.roleName,
      roleList: this.props.roleList
    }
  }

  componentDidMount() {
    if (this.state.isLoggedIn) {
      setTimeout(() => {
        this.props.navigate(getUserDashboardRoute(this.state.roleName))
      })
    }
    this.props.actions.getAllRoles();
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

    if(props.roleList !== state.roleList){
      update.roleList = props.roleList;
    }

    return update;
  }

  componentDidUpdate() {
    if (this.state.isLoggedIn) {
      this.props.enqueueSnackbar("Login successfully!", {variant: 'success'});
      this.props.navigate('/employee')
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
                <span style={{marginBottom : '15px', display : 'block'}}> Employee Sign in </span>
              </Typography>

              {
                loginError ?
                  <Box sx={{ width: 1 }}>
                    <Alert severity="error">{loginError}</Alert>
                  </Box>
                  : null
              }

              <LoginForm onSubmit={this.submit} roleList={this.state.roleList} />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6, mb: 0 }} className='copyright'>
              {'Copyright ©  Ratnvihar '}
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
  roleName: ('user' in state.auth && state.auth.user && 'role_name' in state.auth.user) ? state.auth.user.role_name : '',
  roleList: state.employee.role.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login, getAllRoles }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));
