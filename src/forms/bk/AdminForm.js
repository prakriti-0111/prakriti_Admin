import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem  } from '@mui/material';
import {isEmpty, toBase64} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import {SUPERADMIN_RESET_ADMIN} from '../../actionTypes/superadmin/admin.types';
import { stateList, rawStateList } from 'actions/superadmin/state.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { adminCreate, adminUpdate } from 'actions/superadmin/admin.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from 'lodash';

class AdminForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
            formData: formData,
            isCreateFrom: !formData,
            countryList: this.props.countryList,
            stateList: [],
            p_stateList: [],
            submitting: false,
            formValues: {
                name: '',
                email: '',
                mobile: '',
                adhar: '',
                pan: '',
                address: '',
                city: '',
                pincode: '',
                district_id: '',
                state_id: '',
                country_id: '',
                p_address: '',
                p_city: '',
                p_pincode: '',
                p_district_id: '',
                p_state_id: '',
                p_country_id: '',
                company_name: '',
                gst: '',
                bank_name: '',
                bank_account_no: '',
                bank_ifsc: '',
                status: true
            },
            formErros: {
                name: false,
                email: false,
                mobile: false,
                adhar: false,
                pan: false,
                address: false,
                city: false,
                pincode: false,
                district_id: false,
                state_id: false,
                country_id: false,
                p_address: false,
                p_city: false,
                p_pincode: false,
                p_district_id: false,
                p_state_id: false,
                p_country_id: false,
                company_name: false,
                gst: false,
                bank_name: false,
                bank_account_no: false,
                bank_ifsc: false,
            },
            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            editSuccess: this.props.editSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,

            profile_image: null,
            pan_image: null,
            adhar_image: null,
            company_logo: null,

            existing_profile_image: null,
            existing_pan_image: null,
            existing_adhar_image: null,
            existing_company_logo: null,

            remove_profile_image: false,
            remove_pan_image: false,
            remove_adhar_image: false,
            remove_company_logo: false,
        }
        
        this.profile_imageRef = React.createRef();
        this.pan_imageRef = React.createRef();
        this.adhar_imageRef = React.createRef();
        this.company_logoRef = React.createRef();
    }

    componentDidMount(){
        this.props.actions.countryList({all: 1});
        if (this.state.formData) {
          this.initializeFormData();
        }
        console.log('this.state.formData', this.state.formData)
    }
    
    initializeFormData(){
        if(this.state.formData){
            let formValues = this.state.formValues;
            _.each(this.state.formData, function(value, index) {
                if (index in formValues) {
                    formValues[index] = value;
                }
            });

            this.setState({
                formValues: formValues,
                existing_profile_image: this.state.formData.profile_image,
                existing_pan_image: this.state.formData.pan_image,
                existing_adhar_image: this.state.formData.adhar_image,
                existing_company_logo: this.state.formData.company_logo,
            });

            
            this.loadSelectList(formValues);
        }
    }

    loadSelectList = async(formValues) => {
        let response = await rawStateList({all: 1, country_id: formValues.country_id});
        if(response.data.success){
            this.setState({
                stateList: response.data.data.items
            });
        }

        let response2 = await rawStateList({all: 1, country_id: formValues.p_country_id});
        if(response2.data.success){
            this.setState({
                p_stateList: response2.data.data.items
            });
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        
        if (props.formData !== state.formData) {
            update.formData = props.formData;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.createSuccess !== state.createSuccess){
            update.createSuccess = props.createSuccess;
        }
        if(props.editSuccess !== state.editSuccess){
            update.editSuccess = props.editSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }
        if(props.countryList !== state.countryList){
            update.countryList = props.countryList;
        }
        //console.log('props', props)
        //console.log('update', update)
        return update;
    }

    componentDidUpdate(prevProps){
        if (this.props.formData != prevProps.formData) {
            this.initializeFormData();
        }


        if(this.state.actionCalled){
            if(this.state.isCreateFrom){
                if(this.state.createSuccess){
                    this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                    this.props.dispatch({
                        type: SUPERADMIN_RESET_ADMIN
                    });
                    this.props.navigate('/super-admin/admins');
                }else{
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                    this.props.dispatch({
                        type: SUPERADMIN_RESET_ADMIN
                    });
                }
            }else{
                if(this.state.editSuccess){
                    this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                    this.props.dispatch({
                        type: SUPERADMIN_RESET_ADMIN
                    });
                    this.props.navigate('/super-admin/admins');
                }else{
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                    this.props.dispatch({
                        type: SUPERADMIN_RESET_ADMIN
                    });
                }
            }
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

    handleSubmit = async () => {
        let hasErr = this.formValidate();
        if(!hasErr){
            this.setState({
                submitting: true
            });

            let postData = {...this.state.formValues};
            if(this.state.profile_image){
                postData.profile_image = await toBase64(this.state.profile_image);
            }
            if(this.state.pan_image){
                postData.pan_image = await toBase64(this.state.pan_image);
            }
            if(this.state.adhar_image){
                postData.adhar_image = await toBase64(this.state.adhar_image);
            }
            if(this.state.company_logo){
                postData.company_logo = await toBase64(this.state.company_logo);
            }
            postData.remove_profile_image = this.state.remove_profile_image;
            postData.remove_pan_image = this.state.remove_pan_image;
            postData.remove_adhar_image = this.state.remove_adhar_image;
            postData.remove_company_logo = this.state.remove_company_logo;
            if(this.state.isCreateFrom){
                this.props.actions.adminCreate(postData);
            }else{
                this.props.actions.adminUpdate(this.state.formData.id, postData);
            }
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
        if(this.state.isCreateFrom){
            if(isEmpty(formValues.password)){
                formErros.password = true;
                hasErr = true;
            }else{
                formErros.password = false;
            }
        }
        this.setState({
            formErros: formErros
        });
        return hasErr;
    }

    onImageChange = (e, key) => {
        let existingKey = 'existing_' + key;
        this.setState({
            [key]: e.target.files[0],
            [existingKey]: null
        });
        let refName = key + 'Ref';
        if (this[refName]) {
            this[refName].current.value = null;
        }
    }

    deleteExistingImage = (key) => {
        let removeKey = 'remove_' + key;
        let existingKey = 'existing_' + key;
        this.setState({
            [existingKey]: null,
            [removeKey] : true
        });
    }

    deleteImage = (key) => {
        this.setState({
            [key]: null
        });
    }

    getImageSrc = (item) => {
        return URL.createObjectURL(item);
    }

    handleCountryChange = async(e) => {
        this.handleDefaultChange(e, 'country_id');
        this.updateFormValues('', 'state_id');
        let response = await rawStateList({all: 1, country_id: e.target.value});
        if(response.data.success){
            this.setState({
                stateList: response.data.data.items
            });
        }
    }

    handlePermanentCountryChange = async(e) => {
        this.handleDefaultChange(e, 'p_country_id');
        this.updateFormValues('', 'p_state_id');
        let response = await rawStateList({all: 1, country_id: e.target.value});
        if(response.data.success){
            this.setState({
                p_stateList: response.data.data.items
            });
        }
    }

    render() {
        const { formValues, formErros, submitting } = this.state;
        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                <form autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} className='create-input'>
                        <TextField  
                            label="Name" 
                            variant="outlined"
                            fullWidth
                            value={formValues.name}
                            onChange={(event) => this.handleDefaultChange(event, 'name')}
                            error={formErros.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                        <TextField  
                            label="Password" 
                            variant="outlined"
                            fullWidth
                            value={formValues.password}
                            type="password"
                            onChange={(event) => this.handleDefaultChange(event, 'password')}
                            error={formErros.password}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Mobile" 
                            variant="outlined"
                            fullWidth
                            value={formValues.mobile}
                            onChange={(event) => this.handleDefaultChange(event, 'mobile')}
                            error={formErros.mobile}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Email" 
                            variant="outlined"
                            fullWidth
                            value={formValues.email}
                            onChange={(event) => this.handleDefaultChange(event, 'email')}
                            error={formErros.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Adhar" 
                            variant="outlined"
                            fullWidth
                            value={formValues.adhar}
                            onChange={(event) => this.handleDefaultChange(event, 'adhar')}
                            error={formErros.adhar}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Pan" 
                            variant="outlined"
                            fullWidth
                            value={formValues.pan}
                            onChange={(event) => this.handleDefaultChange(event, 'pan')}
                            error={formErros.pan}
                        />
                    </Grid>
                    <Grid item xs={6} className='create-input'>
                        <FormControl fullWidth error={formErros.address}>
                            <TextareaAutosize
                                className='description'
                                minRows={3}
                                placeholder="Present Address"
                                style={{ width: '100%' }}
                                value={formValues.address}
                                onChange={(event) => this.handleDefaultChange(event, 'address')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className='create-input'>
                        <FormControl fullWidth error={formErros.p_address}>
                            <TextareaAutosize
                                className='description'
                                minRows={3}
                                placeholder="Permanent Address"
                                style={{ width: '100%' }}
                                value={formValues.p_address}
                                onChange={(event) => this.handleDefaultChange(event, 'p_address')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <FormControl fullWidth error={formErros.country_id}>
                            <InputLabel>Present Country</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.country_id}
                                fullWidth
                                label="Country"
                                onChange={this.handleCountryChange}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    this.state.countryList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <FormControl fullWidth error={formErros.state_id}>
                            <InputLabel>Present State</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.state_id}
                                fullWidth
                                label="Present State"
                                onChange={(event) => this.handleDefaultChange(event, 'state_id')}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    this.state.stateList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Present City"
                            variant="outlined"
                            fullWidth
                            value={formValues.city}
                            onChange={(event) => this.handleDefaultChange(event, 'city')}
                            error={formErros.city}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Present Pincode"
                            variant="outlined"
                            fullWidth
                            value={formValues.pincode}
                            onChange={(event) => this.handleDefaultChange(event, 'pincode')}
                            error={formErros.pincode}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <FormControl fullWidth error={formErros.p_country_id}>
                            <InputLabel>Permanent Country</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.p_country_id}
                                fullWidth
                                label="Country"
                                onChange={this.handlePermanentCountryChange}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    this.state.countryList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <FormControl fullWidth error={formErros.p_state_id}>
                            <InputLabel>Permanent State</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.p_state_id}
                                fullWidth
                                label="Permanent State"
                                onChange={(event) => this.handleDefaultChange(event, 'p_state_id')}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    this.state.p_stateList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Permanent City"
                            variant="outlined"
                            fullWidth
                            value={formValues.p_city}
                            onChange={(event) => this.handleDefaultChange(event, 'p_city')}
                            error={formErros.p_city}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Permanent Pincode"
                            variant="outlined"
                            fullWidth
                            value={formValues.p_pincode}
                            onChange={(event) => this.handleDefaultChange(event, 'p_pincode')}
                            error={formErros.p_pincode}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} className='create-input'>
                        <TextField  
                            label="Company Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.company_name}
                            onChange={(event) => this.handleDefaultChange(event, 'company_name')}
                            error={formErros.company_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                        <TextField  
                            label="GST"
                            variant="outlined"
                            fullWidth
                            value={formValues.gst}
                            onChange={(event) => this.handleDefaultChange(event, 'gst')}
                            error={formErros.gst}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                        <TextField  
                            label="Bank Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_name}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_name')}
                            error={formErros.bank_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                        <TextField  
                            label="Bank Account Number"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_account_no}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_account_no')}
                            error={formErros.bank_account_no}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                        <TextField  
                            label="Bank IFSC"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_ifsc}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_ifsc')}
                            error={formErros.bank_ifsc}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
                                    Profile Photo 
                                    <input
                                    name="profile_image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onImageChange(e, 'profile_image')}
                                    ref={this.profile_imageRef}
                                    />
                                </Button>

                                {
                                    this.state.profile_image || this.state.existing_profile_image ?
                                    <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                                        {
                                            this.state.existing_profile_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.state.existing_profile_image}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteExistingImage('profile_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                        {
                                            this.state.profile_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.getImageSrc(this.state.profile_image)}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteImage('profile_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                    </ImageList>
                                    : null
                                }
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
                                    PAN Image
                                    <input
                                    name="pan_image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onImageChange(e, 'pan_image')}
                                    ref={this.pan_imageRef}
                                    />
                                </Button>

                                {
                                    this.state.pan_image || this.state.existing_pan_image ?
                                    <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                                        {
                                            this.state.existing_pan_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.state.existing_pan_image}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteExistingImage('pan_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                        {
                                            this.state.pan_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.getImageSrc(this.state.pan_image)}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteImage('pan_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                    </ImageList>
                                    : null
                                }
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
                                Aadhar Number Image
                                    <input
                                    name="adhar_image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onImageChange(e, 'adhar_image')}
                                    ref={this.adhar_imageRef}
                                    />
                                </Button>

                                {
                                    this.state.adhar_image || this.state.existing_adhar_image ?
                                    <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                                        {
                                            this.state.existing_adhar_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.state.existing_adhar_image}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteExistingImage('adhar_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                        {
                                            this.state.adhar_image ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.getImageSrc(this.state.adhar_image)}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteImage('adhar_image')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                    </ImageList>
                                    : null
                                }
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
                                Company Logo
                                    <input
                                    name="company_logo"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onImageChange(e, 'company_logo')}
                                    ref={this.company_logoRef}
                                    />
                                </Button>

                                {
                                    this.state.company_logo || this.state.existing_company_logo ?
                                    <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                                        {
                                            this.state.existing_company_logo ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.state.existing_company_logo}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteExistingImage('company_logo')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                        {
                                            this.state.company_logo ? 
                                            <ImageListItem style={{ height: '110px', width: '100px' }}>
                                                <div style={{ position: 'relative', width: '100px' }}>
                                                <img
                                                    src={this.getImageSrc(this.state.company_logo)}
                                                    loading="lazy"
                                                    style={{ height: '100px', width: '100px' }}
                                                />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteImage('company_logo')} />
                                                </span>
                                                </div>
                                            </ImageListItem>
                                            : null
                                        }
                                    </ImageList>
                                    : null
                                }
                            </Grid>
                        </Grid>
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
                            Save
                        </LoadingButton>
                        {
                            !submitting ? 
                            <Button variant="outlined" className='close-button' onClick={() => this.props.navigate('/super-admin/admins') }>Cancel</Button>
                            : null
                        }
                        </Stack>
                    </Grid>
                </Grid>
                </form>
            </Box>
        )

    }

}

const mapStateToProps = (state) => ({
    actionCalled: state.superadmin.admin.actionCalled,
    createSuccess: state.superadmin.admin.createSuccess,
    editSuccess: state.superadmin.admin.editSuccess,
    successMessage: state.superadmin.admin.successMessage,
    errorMessage: state.superadmin.admin.errorMessage,
    countryList: state.superadmin.country.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    countryList,
    stateList,
    adminUpdate,
    adminCreate
  }, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminForm)));
