import { React, Component } from 'react';
import { Link as ReactLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { forgotPasswordSendOtp, forgotPassword, forgotPasswordVerifyOtp } from 'actions/admin/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute, getRoleName } from 'src/helpers/helper';
import { withSnackbar } from 'notistack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            forgotPassError: this.props.forgotPassError,
            isLoggedIn: this.props.isLoggedIn,
            sendOtp: false,
            verifyOtp: false,
            resErr: '',
            user_name: '',
            new_password: '',
            confirm_new_password: '',
            otp: '',
            user_name_err: '',
            new_password_err: '',
            confirm_new_password_err: '',
            otp_err: '',
            processing: false,
            passwordShow1: false,
            passwordShow2: false,
        }
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            setTimeout(() => {
                this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)))
            })
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};

        if(props.auth !== state.auth){
            update.auth = props.auth;
        }
        if(props.isLoggedIn !== state.isLoggedIn){
            update.isLoggedIn = props.isLoggedIn;
        }
        if(props.forgotPassError !== state.forgotPassError){
            update.forgotPassError = props.forgotPassError;
        }

        return update;
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async(event) => {
        event.preventDefault();

        if(!this.formValidate())return;

        this.setState({
            resErr: '',
            processing: true
        })
        if(!this.state.sendOtp){
            let res = await forgotPasswordSendOtp({user_name: this.state.user_name});
            if(res.data.success){
                this.props.enqueueSnackbar(res.data.message, {variant: 'success'});
                this.setState({
                    processing: false,
                    sendOtp: true
                })
            }else{
                this.setState({
                    processing: false,
                    resErr: res.data.message
                })
            }
        }else{
            if(!this.state.verifyOtp){
                let res = await forgotPasswordVerifyOtp({otp: this.state.otp, user_name: this.state.user_name});
                if(res.data.success){
                    this.setState({
                        processing: false,
                        verifyOtp: true
                    })
                }else{
                    this.setState({
                        processing: false,
                        resErr: res.data.message
                    })
                }
            }else{
                let res = await forgotPassword({new_password: this.state.new_password, confirm_new_password: this.state.confirm_new_password, user_name: this.state.user_name, otp: this.state.otp});
                if(res.data.success){
                    this.props.enqueueSnackbar(res.data.message, {variant: 'success'});
                    this.setState({
                        processing: false
                    }, () => {
                        this.props.navigate("/admin/login");
                    })
                }else{
                    this.setState({
                        processing: false,
                        resErr: res.data.message
                    })
                }
            }
        }
    }

    formValidate = () => {
        let err = false;
        if(!this.state.sendOtp){
            if(!this.state.user_name){
                this.setState({
                    user_name_err: 'Required.'
                })
                err = true;
            }else{
                this.setState({
                    user_name_err: ''
                })
            }
        }else{
            if(!this.state.verifyOtp){
                if(!this.state.otp){
                    this.setState({
                        otp_err: 'Required.'
                    })
                    err = true;
                }else{
                    this.setState({
                        otp_err: ''
                    })
                }
            }else{
                if(!this.state.new_password){
                    this.setState({
                        new_password_err: 'Required.'
                    })
                    err = true;
                }else{
                    this.setState({
                        new_password_err: ''
                    })
                }if(!this.state.confirm_new_password){
                    this.setState({
                        confirm_new_password_err: 'Required.'
                    })
                    err = true;
                }else{
                    this.setState({
                        confirm_new_password_err: ''
                    })
                }
            }
        }
        return !err;
    }

  render() {
    const { forgotPassError, resErr } = this.state;
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
            <Container component="main" maxWidth="md">
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
                            Forgot Password
                        </Typography>

                        {
                            forgotPassError ?
                            <Box sx={{ width: 1 }}>
                                <Alert severity="error">{forgotPassError}</Alert>
                            </Box>
                            : null
                        }
                        {
                            resErr ?
                            <Box sx={{ width: 1 }}>
                                <Alert severity="error">{resErr}</Alert>
                            </Box>
                            : null
                        }

                        <form onSubmit={this.handleSubmit}>
                            <Box sx={{ mt: 1 }} className='myinput'>
                                {
                                    !this.state.sendOtp ?
                                    <TextField
                                        label="User Name / Email / Mobile"
                                        margin="normal"
                                        name="user_name"
                                        value={this.state.user_name}
                                        fullWidth
                                        error={this.state.user_name_err ? true : false}
                                        helperText={this.state.user_name_err ? this.state.user_name_err : ''}
                                        onChange={this.handleChange}
                                    />
                                    :
                                    <>
                                    {
                                        !this.state.verifyOtp ?
                                        <TextField
                                            label="OTP"
                                            margin="normal"
                                            name="otp"
                                            type="password"
                                            value={this.state.otp}
                                            fullWidth
                                            error={this.state.otp_err ? true : false}
                                            helperText={this.state.otp_err ? this.state.otp_err : ''}
                                            onChange={this.handleChange}
                                        />
                                        :
                                        <>
                                        <TextField
                                            label="New Password"
                                            margin="normal"
                                            name="new_password"
                                            type={this.state.passwordShow1 ? "text" : "password"}
                                            value={this.state.new_password}
                                            fullWidth
                                            error={this.state.new_password_err ? true : false}
                                            helperText={this.state.new_password_err ? this.state.new_password_err : ''}
                                            onChange={this.handleChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">{this.state.passwordShow1 ? <Visibility onClick={() => this.setState({passwordShow1: false})} /> : <VisibilityOff onClick={() => this.setState({passwordShow1: true})} />}</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            label="Confirm New Password"
                                            margin="normal"
                                            name="confirm_new_password"
                                            type={this.state.passwordShow2 ? "text" : "password"}
                                            value={this.state.confirm_new_password}
                                            fullWidth
                                            error={this.state.confirm_new_password_err ? true : false}
                                            helperText={this.state.confirm_new_password_err ? this.state.confirm_new_password_err : ''}
                                            onChange={this.handleChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">{this.state.passwordShow2 ? <Visibility onClick={() => this.setState({passwordShow2: false})} /> : <VisibilityOff onClick={() => this.setState({passwordShow2: true})} />}</InputAdornment>,
                                            }}
                                        />
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
                                    disabled={this.state.processing}
                                >
                                    {this.state.processing ? "Processing..." : "Submit"}
                                    
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/admin/login" variant="body2" className='forget-text'>
                                        Already have an account?
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
  forgotPassError: 'forgotPassError' in state.auth ? state.auth.forgotPassError : ''
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({  }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)));
