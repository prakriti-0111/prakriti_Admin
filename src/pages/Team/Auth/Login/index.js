import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from 'actions/team/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute } from 'src/helpers/helper';
import { withSnackbar } from 'notistack';
import { getAllRoles } from 'actions/team/auth.actions';
import  secureLocalStorage  from  "react-secure-storage";
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'actions/axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../../../actionTypes/global.types';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { getPermissions } from 'actions/employee/permissions.actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      roleName: this.props.roleName,
      roleList: this.props.roleList,
      loginError: '',
      formValues: {
        role_id: '',
        user_name: '',
        password: '',
        step: 1,
        lat: '',
        lng: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
      },
      formErrors: {
        role_id: '',
        user_name: '',
        password: '',
        step: 1
      },
      processing: false,
      step_two: false,
      location_permission: 0,
      passwordShow: false
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

  componentDidUpdate() {
    if (this.state.isLoggedIn) {
      this.props.enqueueSnackbar("Login successfully!", {variant: 'success'});
      this.props.navigate(getUserDashboardRoute(this.state.roleName))
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

    if(props.roleList !== state.roleList){
      update.roleList = props.roleList;
    }

    return update;
  }

  updateFormValue = (event) => {
    const {name, value} = event.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name] : value
      }
    })
  }

  handleSubmit = async(event) => {
    event.preventDefault();

    if(this.formValidate()){
      this.setState({processing: true, loginError: ''});
      let data = {...this.state.formValues};
      let res = await login(data);
      if(res.data.success){
        if(res.data.data.user.role_name != 'Distributor' && data.step == 1){
          this.setState({
            step_two: true,
            processing: false,
            formValues: {
              ...this.state.formValues,
              step: 2
            }
          })
          this.loadLocation();
        }else{
          this.setState({
            processing: false
          })

          let auth_data = res.data.data;
          if(this.state.step_two){
            auth_data.expiresOn = moment(moment().format('YYYY-MM-DD 09:59:59'), 'YYYY-MM-DD HH:mm:ss').toDate().getTime();
            auth_data.loginOn = moment().toDate().getTime();
          }
          secureLocalStorage.setItem("auth", JSON.stringify(auth_data));
          axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.data.access_token;
          this.props.actions.getPermissions();
          this.props.dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.data
          });
        }
      }else{
        this.setState({
          loginError: res.data.message,
          processing: false
        })
      }
    }
  }

  formValidate = () => {
    let {formValues, formErrors} = this.state;
    let hasErr = false;
    /*if(!formValues.role_id){
      hasErr = true;
      formErrors.role_id = "Required.";
    }else{
      formErrors.role_id = null;
    }*/
    if(!formValues.user_name){
      hasErr = true;
      formErrors.user_name = "Required.";
    }else{
      formErrors.user_name = null;
    }
    if(!formValues.password){
      hasErr = true;
      formErrors.password = "Required.";
    }else{
      formErrors.password = null;
    }
    this.setState({
      formErrors: formErrors
    })
    return !hasErr;
  }

  loadLocation = async() => {
    try {
        let position = await this.fetchCoordinates();
        console.log(position)
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let latlng = new google.maps.LatLng(lat, lng);
        let _this = this;
        let geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            let city = '', state = '', country = '', zip = '', address = '';
            if (status == google.maps.GeocoderStatus.OK && (results[0])) {
                zip = results[0].address_components[results[0].address_components.length - 1].long_name;
                country = results[0].address_components[results[0].address_components.length - 2].long_name;
                state = results[0].address_components[results[0].address_components.length - 3].long_name;
                city = results[0].address_components[results[0].address_components.length - 4].long_name;
                address = results[0].formatted_address;
            }
            _this.setState({
              formValues: {
                    ..._this.state.formValues,
                    address: address,
                    city: city,
                    state: state,
                    country: country,
                    zipcode: zip,
                    lat: lat,
                    lng: lng
                },
                location_permission: 1
            })

        });

    }catch(err){
      this.setState({
        location_permission: 2
      });
    }
  }

  fetchCoordinates = async () => {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  }

  getCurrentAddress = () => {
    let address = [];
    let formValues = this.state.formValues;
    if(formValues.city){
        address.push(formValues.city);
    }
    if(formValues.state){
        address.push(formValues.state);
    }
    if(formValues.country){
        address.push(formValues.country);
    }
    if(formValues.zipcode){
        address.push(formValues.zipcode);
    }
    return address.join(", ");
  }

  getCurrentDateTime = () => {
      const dt = new Date();
      const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
      let date_str = `${padL(dt.getMonth()+1)}/${padL(dt.getDate())}/${dt.getFullYear()} ${dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

      return date_str;
  }

  render() {
    const { loginError, formValues, formErrors } = this.state;
    console.log(this.state)
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
                <span style={{marginBottom : '15px', display : 'block'}}> Team Sign in </span>
              </Typography>

              {
                loginError ?
                  <Box sx={{ width: 1 }}>
                    <Alert severity="error" sx={{marginBottom: '10px'}}>{loginError}</Alert>
                  </Box>
                  : null
              }
              
              <form onSubmit={this.handleSubmit}>
                <Box sx={{ mt: 1 }} className='myinput'>

                  {
                    !this.state.step_two ?
                    <>
                    {/*<FormControl fullWidth error={formErrors.role_id ? true : false}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        label="Role"
                        fullWidth
                        name="role_id"
                        onChange={this.updateFormValue}
                        value={formValues.role_id}
                      >
                        <MenuItem value="">select role</MenuItem>
                        {
                          this.state.roleList.map((item, index) => {
                            return <MenuItem value={item.id} key={index}>{item.display_name}</MenuItem>
                          })
                        }
                      </Select>
                      {
                        formErrors.role_id ?
                        <FormHelperText>{formErrors.role_id}</FormHelperText>
                        : null
                      }
                    </FormControl>*/}
                    
                    <TextField
                      label="User Name / Email / Mobile"
                      margin="normal"
                      name="user_name"
                      value={formValues.user_name}
                      fullWidth
                      error={formErrors.user_name ? true : false}
                      helperText={formErrors.user_name ? formErrors.user_name : ''}
                      onChange={this.updateFormValue}
                    />

                    <TextField
                      label="Password"
                      margin="normal"
                      name="password"
                      type={this.state.passwordShow ? "text" : "password"}
                      value={formValues.password}
                      fullWidth
                      error={formErrors.password ? true : false}
                      helperText={formErrors.user_name ? formErrors.user_name : ''}
                      onChange={this.updateFormValue}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{this.state.passwordShow ? <Visibility onClick={() => this.setState({passwordShow: false})} className="cursor-pointer" /> : <VisibilityOff onClick={() => this.setState({passwordShow: true})} className="cursor-pointer" />}</InputAdornment>,
                      }}
                    />
                    </>
                    :
                    <>
                      {
                        this.state.location_permission == 2 ? 
                        <Alert severity="error" sx={{marginBottom: '10px'}}>Please allow location permission.</Alert>
                        :
                        <>
                          <FormControl fullWidth>
                            <p><WatchLaterIcon /> {this.getCurrentDateTime()}</p>
                          </FormControl>
                          <FormControl fullWidth>
                            <p><FmdGoodIcon /> {this.getCurrentAddress()}</p>
                          </FormControl>
                        </>
                      }
                    </>
                  }
          
                  <Button
                    className='signin-btn'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    //disabled={this.state.processing || (this.state.step_two && this.state.location_permission != 1)}
                  >
                    {
                      this.state.step_two ? "Continue" : "Sign In"
                    }
                    
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgot-password" variant="body2" className='forget-text'>
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
          
                </Box>
              </form>

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
  roleName: ('user' in state.auth && state.auth.user && 'role_name' in state.auth.user) ? state.auth.user.role_name : '',
  roleList: state.team.role.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ login, getAllRoles, getPermissions }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));
