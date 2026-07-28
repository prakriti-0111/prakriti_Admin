import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, TextField, Button, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { resetPassword } from 'actions/admin/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute, getRoleName } from 'src/helpers/helper';
import { withSnackbar } from 'notistack';

const LOGIN_ROUTE = '/admin/login';

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        const params = new URLSearchParams(window.location.search);

        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            token: params.get('token') || '',
            email: params.get('email') || '',
            new_password: '',
            confirm_new_password: '',
            new_password_err: '',
            confirm_new_password_err: '',
            resErr: '',
            processing: false,
            passwordShow1: false,
            passwordShow2: false,
        }
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            setTimeout(() => {
                this.props.navigate(getUserDashboardRoute(getRoleName(this.props.auth)))
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    formValidate = () => {
        let err = false;
        if (!this.state.new_password) {
            this.setState({ new_password_err: 'Required.' });
            err = true;
        } else if (this.state.new_password.length < 8) {
            this.setState({ new_password_err: 'At least 8 characters.' });
            err = true;
        } else {
            this.setState({ new_password_err: '' });
        }
        if (!this.state.confirm_new_password) {
            this.setState({ confirm_new_password_err: 'Required.' });
            err = true;
        } else if (this.state.new_password && this.state.confirm_new_password !== this.state.new_password) {
            this.setState({ confirm_new_password_err: 'Passwords do not match.' });
            err = true;
        } else {
            this.setState({ confirm_new_password_err: '' });
        }
        return !err;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.formValidate()) return;

        this.setState({ resErr: '', processing: true });
        try {
            let res = await resetPassword({
                email: this.state.email,
                token: this.state.token,
                new_password: this.state.new_password,
                confirm_new_password: this.state.confirm_new_password,
            });
            if (res.data.success) {
                this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
                this.setState({ processing: false }, () => {
                    this.props.navigate(LOGIN_ROUTE);
                });
            } else {
                this.setState({ processing: false, resErr: res.data.message });
            }
        } catch (error) {
            this.setState({ processing: false, resErr: 'Something went wrong. Please try again.' });
        }
    }

    render() {
        const { resErr } = this.state;
        const invalidLink = !this.state.token || !this.state.email;

        return (
            <div className='super-admin-login'>
                <div className="square-box">
                    <div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div>
                </div>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <div className='login-wrapper'>
                        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className='login-icon'>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>

                            {resErr ?
                                <Box sx={{ width: 1 }}>
                                    <Alert severity="error">{resErr}</Alert>
                                </Box>
                                : null}

                            {invalidLink ?
                                <Box sx={{ mt: 2, width: 1, textAlign: 'center' }}>
                                    <Alert severity="warning" sx={{ mb: 3 }}>
                                        This password reset link is invalid or incomplete. Please request a new one.
                                    </Alert>
                                    <Button
                                        className='signin-btn'
                                        fullWidth
                                        variant="contained"
                                        onClick={() => this.props.navigate('/admin/forgot-password')}
                                    >
                                        Request New Link
                                    </Button>
                                </Box>
                                :
                                <form onSubmit={this.handleSubmit}>
                                    <Box sx={{ mt: 1 }} className='myinput'>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Set a new password for <strong>{this.state.email}</strong>.
                                        </Typography>
                                        <TextField
                                            label="New Password"
                                            margin="normal"
                                            name="new_password"
                                            type={this.state.passwordShow1 ? "text" : "password"}
                                            value={this.state.new_password}
                                            fullWidth
                                            error={this.state.new_password_err ? true : false}
                                            helperText={this.state.new_password_err ? this.state.new_password_err : 'At least 8 characters'}
                                            onChange={this.handleChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">{this.state.passwordShow1 ? <Visibility onClick={() => this.setState({ passwordShow1: false })} /> : <VisibilityOff onClick={() => this.setState({ passwordShow1: true })} />}</InputAdornment>,
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
                                                endAdornment: <InputAdornment position="end">{this.state.passwordShow2 ? <Visibility onClick={() => this.setState({ passwordShow2: false })} /> : <VisibilityOff onClick={() => this.setState({ passwordShow2: true })} />}</InputAdornment>,
                                            }}
                                        />
                                        <Button
                                            className='signin-btn'
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={this.state.processing}
                                        >
                                            {this.state.processing ? "Resetting..." : "Reset Password"}
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/admin/login" variant="body2" className='forget-text'>
                                                    Back to Login
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            }
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
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({}, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword)));
