import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack} from '@mui/material';
import {isEmpty} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { changePassword } from 'actions/distributor/profile.actions';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import {DISTRIBUTOR_PROFILE_RESET} from '../../actionTypes/distributor/profile.types';
import {UPDATE_GLOBAL_AUTH} from '../../actionTypes/global.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';


class ChangePasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			auth: this.props.auth,
            submitting: false,
            formValues: {
                confirm_password: '',
                old_password: '',
                password: ''
            },
            formErros: {
                confirm_password: false,
                old_password: false,
                password: false
            },
            actionCalled: this.props.actionCalled,
            changePasswordSuccess: this.props.changePasswordSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
        }
    
    }

    componentDidMount(){

    }

    static getDerivedStateFromProps(props, state){
        let update = {};
    
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.changePasswordSuccess !== state.changePasswordSuccess){
            update.changePasswordSuccess = props.changePasswordSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }
        
        return update;
    }

    componentDidUpdate(){
        if(this.state.actionCalled){
            if(this.state.changePasswordSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.setState({
                    formValues: {
                        confirm_password: '',
                        old_password: '',
                        password: ''
                    }
                })
            }else{
                this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
            }
            this.props.dispatch({
                type: DISTRIBUTOR_PROFILE_RESET
            });

            this.setState({
                submitting: false
            })
        }
    }

    handleDefaultChange = (event, key) => {
        this.updateFormValues(event.target.value, key);
    }

    updateFormValues = (val, key) => {
        let formValues = this.state.formValues;
        formValues[key] = val;
        this.setState({
            formValues: formValues
        })
    }

    handleSubmit = () => {
        let hasErr = this.formValidate();
        if(!hasErr){
            this.setState({
                submitting: true
            })
            this.props.actions.changePassword(this.state.formValues);
        }
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        /*if(isEmpty(formValues.old_password)){
            formErros.old_password = true;
            hasErr = true;
        }else{
            formErros.old_password = false;
        }*/
        if(isEmpty(formValues.password)){
            formErros.password = true;
            hasErr = true;
        }else{
            formErros.password = false;
        }
        if(isEmpty(formValues.confirm_password)){
            formErros.confirm_password = true;
            hasErr = true;
        }else{
            formErros.confirm_password = false;
        }
        this.setState({
            formErros: formErros
        });
        return hasErr;
    }

    render() {
        const { formValues, formErros, submitting } = this.state;
        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view '>
                    {/*<Grid item xs={12} className='create-input'>
                        <TextField  
                            label="Current Password" 
                            variant="outlined"
                            fullWidth
                            value={formValues.old_password}
                            type="password"
                            onChange={(event) => this.handleDefaultChange(event, 'old_password')}
                            error={formErros.old_password}
                        />
                    </Grid>*/}
                    <Grid item xs={12} className='create-input'>
                        <TextField  
                            label="New Password" 
                            variant="outlined"
                            fullWidth
                            value={formValues.password}
                            type="password"
                            onChange={(event) => this.handleDefaultChange(event, 'password')}
                            error={formErros.password}
                        />
                    </Grid>
                    <Grid item xs={12} className='create-input'>
                        <TextField  
                            label="Confirm New Password" 
                            variant="outlined"
                            fullWidth
                            value={formValues.confirm_password}
                            type="password"
                            onChange={(event) => this.handleDefaultChange(event, 'confirm_password')}
                            error={formErros.confirm_password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                        <LoadingButton
                        className='conf-button'
                            variant="contained"
                            type="button" 
                            loading={submitting} 
                            disabled={submitting}
                            onClick={this.handleSubmit}
                        >
                            Update
                        </LoadingButton>
                        {
                            !submitting ? 
                            <Button variant="outlined" className='close-button' onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/dashboard') }>Cancel</Button>
                            : null
                        }
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        )

    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    actionCalled: state.distributor.profile.actionCalled,
    changePasswordSuccess: state.distributor.profile.changePasswordSuccess,
    successMessage: state.distributor.profile.successMessage,
    errorMessage: state.distributor.profile.errorMessage,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    changePassword
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ChangePasswordForm'
})(ChangePasswordForm))));