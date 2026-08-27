import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack} from '@mui/material';
import {isEmpty} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { updateEditProfile } from 'actions/distributor/profile.actions';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import {DISTRIBUTOR_PROFILE_RESET} from '../../actionTypes/distributor/profile.types';
import {UPDATE_GLOBAL_AUTH} from '../../actionTypes/global.types';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';


class EditProfileForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			auth: this.props.auth,
            submitting: false,
            formValues: {
                name: this.props.auth.user.name,
                mobile: this.props.auth.user.mobile,
                email: this.props.auth.user.email
            },
            formErros: {
                name: false,
                mobile: false,
                email: false
            },
            actionCalled: this.props.actionCalled,
            editProfileSuccess: this.props.editProfileSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
        }
    
    }

    componentDidMount(){
        if(this.props.auth && this.props.auth.user){
            this.setState({
                formValues:{
                    ...this.state.formValues,
                    name: this.props.auth.user.name,
                    mobile: this.props.auth.user.mobile,
                    email: this.props.auth.user.email
                }
            })
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
    
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.editProfileSuccess !== state.editProfileSuccess){
            update.editProfileSuccess = props.editProfileSuccess;
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
            if(this.state.editProfileSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.props.dispatch({
                    type: UPDATE_GLOBAL_AUTH,
                    payload: {
                        name: this.state.formValues.name,
                        mobile: this.state.formValues.mobile,
                        email: this.state.formValues.email
                    }
                });
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
            this.props.actions.updateEditProfile(this.state.formValues);
        }
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        if(isEmpty(formValues.name)){
            formErros.name = true;
            hasErr = true;
        }else{
            formErros.name = false;
        }
        if(isEmpty(formValues.mobile)){
            formErros.mobile = true;
            hasErr = true;
        }else{
            formErros.mobile = false;
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
                    <Grid item xs={12} className='create-input'>
                        <TextField  
                            label="Name" 
                            variant="outlined"
                            fullWidth
                            value={formValues.name}
                            onChange={(event) => this.handleDefaultChange(event, 'name')}
                            error={formErros.name}
                        />
                    </Grid>
                    <Grid item xs={12} className='create-input'>
                        <TextField  
                            label="Mobile" 
                            variant="outlined"
                            fullWidth
                            value={formValues.mobile}
                            onChange={(event) => this.handleDefaultChange(event, 'mobile')}
                            error={formErros.mobile}
                        />
                    </Grid>
                    <Grid item xs={12} className='create-input'>
                        <TextField  
                            label="Email" 
                            variant="outlined"
                            fullWidth
                            value={formValues.email}
                            onChange={(event) => this.handleDefaultChange(event, 'email')}
                            error={formErros.email}
                        />
                    </Grid>
                    <Grid item xs={12} className='create-input'>
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
    editProfileSuccess: state.distributor.profile.editProfileSuccess,
    successMessage: state.distributor.profile.successMessage,
    errorMessage: state.distributor.profile.errorMessage,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    updateEditProfile
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'EditProfileForm'
})(EditProfileForm))));