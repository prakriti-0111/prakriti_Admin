import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { forgotPasswordSendLink } from 'actions/superadmin/auth.actions';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import { getUserDashboardRoute, getRoleName } from 'src/helpers/helper';
import { withSnackbar } from 'notistack';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            resErr: '',
            email: '',
            email_err: '',
            processing: false,
            sent: false,
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
        if (!this.state.email) {
            this.setState({ email_err: 'Required.' });
            err = true;
        } else if (!EMAIL_REGEX.test(this.state.email)) {
            this.setState({ email_err: 'Enter a valid email address.' });
            err = true;
        } else {
            this.setState({ email_err: '' });
        }
        return !err;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.formValidate()) return;

        this.setState({ resErr: '', processing: true });
        try {
            let res = await forgotPasswordSendLink({ email: this.state.email.trim() });
            if (res.data.success) {
                this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
                this.setState({ processing: false, sent: true });
            } else {
                this.setState({ processing: false, resErr: res.data.message });
            }
        } catch (error) {
            this.setState({ processing: false, resErr: 'Something went wrong. Please try again.' });
        }
    }

    render() {
        const { resErr, sent } = this.state;
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
                                {sent ? <MarkEmailReadOutlinedIcon /> : <LockOutlinedIcon />}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {sent ? 'Check your email' : 'Forgot Password'}
                            </Typography>

                            {resErr ?
                                <Box sx={{ width: 1 }}>
                                    <Alert severity="error">{resErr}</Alert>
                                </Box>
                                : null}

                            {sent ?
                                <Box sx={{ mt: 2, width: 1, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        If an account exists for <strong>{this.state.email.trim()}</strong>, we've sent a
                                        password reset link. The link expires in 60 minutes.
                                    </Typography>
                                    <Button
                                        className='signin-btn'
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 1, mb: 2 }}
                                        onClick={() => this.props.navigate('/super-admin/login')}
                                    >
                                        Back to Login
                                    </Button>
                                </Box>
                                :
                                <form onSubmit={this.handleSubmit}>
                                    <Box sx={{ mt: 1 }} className='myinput'>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Enter your registered email and we'll send you a link to reset your password.
                                        </Typography>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            name="email"
                                            type="email"
                                            value={this.state.email}
                                            fullWidth
                                            autoFocus
                                            error={this.state.email_err ? true : false}
                                            helperText={this.state.email_err ? this.state.email_err : ''}
                                            onChange={this.handleChange}
                                        />
                                        <Button
                                            className='signin-btn'
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={this.state.processing}
                                        >
                                            {this.state.processing ? "Sending..." : "Send Reset Link"}
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/super-admin/login" variant="body2" className='forget-text'>
                                                    Already have an account?
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

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)));
