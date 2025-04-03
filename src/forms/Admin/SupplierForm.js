import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem  } from '@mui/material';
import {isEmpty, toBase64} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import {ADMIN_RESET_SUPPLIER} from '../../actionTypes/admin/supplier.types';
import { stateList, rawStateList } from 'actions/superadmin/state.actions';
import { getNextUserName } from 'actions/superadmin/profile.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { supplierCreate, supplierUpdate } from 'actions/admin/supplier.actions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from 'lodash';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';
import FilePreview from 'src/utils/FilePreview';
import noImage from 'src/assets/images/no_image.jpg';


class SupplierForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
			auth: this.props.auth,
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
                status: true,
                landmark: '',
                user_name: '',
                password: ''
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
                landmark: false,
                password: false,
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
            documents: [],

            existing_profile_image: null,
            existing_pan_image: null,
            existing_adhar_image: null,
            existing_company_logo: null,
            existing_documents: [],

            remove_profile_image: false,
            remove_pan_image: false,
            remove_adhar_image: false,
            remove_company_logo: false,
            remove_documents: []
        }
        
        this.profile_imageRef = React.createRef();
        this.pan_imageRef = React.createRef();
        this.adhar_imageRef = React.createRef();
        this.company_logoRef = React.createRef();
        this.documentRef = React.createRef();
    }

    componentDidMount(){
        this.props.actions.countryList({all: 1});
        if (this.state.formData) {
          this.initializeFormData();
        }else{
            this.loadUserName('')
        }
        
    }

    loadUserName = async(id) => {
        let res = await getNextUserName('supplier', id);
        if(res.data.success){
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    user_name: res.data.data
                }
            })
        }
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
                existing_documents: this.state.formData.documents,
            }, () => {
                if(!formValues.user_name){
                    this.loadUserName(formValues.id)
                }
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
                        type: ADMIN_RESET_SUPPLIER
                    });
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/suppliers');
                }else{
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                    this.props.dispatch({
                        type: ADMIN_RESET_SUPPLIER
                    });
                }
            }else{
                if(this.state.editSuccess){
                    this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                    this.props.dispatch({
                        type: ADMIN_RESET_SUPPLIER
                    });
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/suppliers');
                }else{
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                    this.props.dispatch({
                        type: ADMIN_RESET_SUPPLIER
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

            let thisDocuments = [...this.state.documents];
            for (let i = 0; i < thisDocuments.length; i++) {
                thisDocuments[i] = await toBase64(thisDocuments[i]);
            }
            postData.documents = thisDocuments;
            postData.remove_documents = this.state.remove_documents;

            if(this.state.isCreateFrom){
                this.props.actions.supplierCreate(postData);
            }else{
                this.props.actions.supplierUpdate(this.state.formData.id, postData);
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
        if(isEmpty(formValues.country_id)){
            formErros.country_id = true;
            hasErr = true;
        }else{
            formErros.country_id = false;
        }
        if(isEmpty(formValues.state_id)){
            formErros.state_id = true;
            hasErr = true;
        }else{
            formErros.state_id = false;
        }

        if(isEmpty(formValues.company_name)){
            formErros.company_name = true;
            hasErr = true;
        }else{
            formErros.company_name = false;
        }
        if(isEmpty(formValues.address)){
            formErros.address = true;
            hasErr = true;
        }else{
            formErros.address = false;
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

    onDocumentChange = (e) => {
        let documents = this.state.documents;
        let totalDoc = this.state.existing_documents.length + documents.length + e.target.files.length;
        if (totalDoc > 10) {
          this.props.enqueueSnackbar('Maximum 5 document are allowed.', { variant: 'error' });
          return;
        }
        for(let i = 0; i < e.target.files.length; i++){
            documents.push(e.target.files[i]);
        }
        
        this.setState({
            documents: documents
        });
    
        if (this.documentRef) {
          this.documentRef.current.value = null;
        }
    
    }
    
    deleteDocument = (i) => {
        let documents = this.state.documents;
        documents.splice(i, 1);
        this.setState({
            documents: documents
        })
        if (this.documentRef) {
          this.documentRef.current.value = null;
        }
    
    }

    deleteExistingDocument = (index) => {
        let remove_documents = this.state.remove_documents;
        let existing_documents = this.state.existing_documents;
        remove_documents.push(existing_documents[index]);
        existing_documents.splice(index, 1);
        this.setState({
            remove_documents: remove_documents,
            existing_documents: existing_documents
        })
    }

    filePreview = (file) => {

    }

    getAllDocuments = (isSingle) => {
        let arr = [];
        for(let item of this.state.existing_documents){
          arr.push({
            path: item.path,
            type: 'existing'
          })
        }
        for(let item of this.state.documents){
          arr.push({
            path: item,
            type: 'new'
          })
        }
        let x = arr.length;
        for(let i = x; i < 5; i++){
          arr.push({
            path: noImage,
            type: 'no_image'
          })
        }
        if(isSingle){
          return arr[0];
        }else{
          arr.shift();
          return arr;
        }
    }

    render() {
        const { formValues, formErros, submitting } = this.state;
        let firstDocument = this.getAllDocuments(true);
        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <form autoComplete="off" className='ratn-dialog-inner'>
                <Grid container spacing={2} className='loans_view p_view'>
                    <Grid item xs={12} md={3.5} className='create-input'>
                        <TextField  
                            label="Company Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.company_name}
                            onChange={(event) => this.handleDefaultChange(event, 'company_name')}
                            error={formErros.company_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Owner Name" 
                            variant="outlined"
                            fullWidth
                            value={formValues.name}
                            onChange={(event) => this.handleDefaultChange(event, 'name')}
                            error={formErros.name}
                        />
                    </Grid>
                    
                    <Grid item xs={2} className='create-input'>
                        <TextField  
                            label="Contact No" 
                            variant="outlined"
                            fullWidth
                            value={formValues.mobile}
                            onChange={(event) => this.handleDefaultChange(event, 'mobile')}
                            error={formErros.mobile}
                        />
                    </Grid>
                    <Grid item xs={3.5} className='create-input'>
                        <TextField  
                            label="Email" 
                            variant="outlined"
                            fullWidth
                            value={formValues.email}
                            onChange={(event) => this.handleDefaultChange(event, 'email')}
                            error={formErros.email}
                        />
                    </Grid>
                    {/*<Grid item xs={12} md={3} className='create-input'>
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
                    </Grid>*/}
                    <Grid item xs={6} className='create-input'>
                        <TextField  
                            label="Full Address" 
                            variant="outlined"
                            fullWidth
                            value={formValues.address}
                            onChange={(event) => this.handleDefaultChange(event, 'address')}
                            error={formErros.address}
                        />

                        {/*<FormControl fullWidth error={formErros.address}>
                            <TextareaAutosize
                                className='description'
                                minRows={3}
                                placeholder="Address"
                                style={{ width: '100%' }}
                                value={formValues.address}
                                onChange={(event) => this.handleDefaultChange(event, 'address')}
                            />
                        </FormControl>*/}
                    </Grid>
                    <Grid item xs={4} className='create-input'>
                        <TextField  
                            label="Landmark" 
                            variant="outlined"
                            fullWidth
                            value={formValues.landmark}
                            onChange={(event) => this.handleDefaultChange(event, 'landmark')}
                            error={formErros.landmark}
                        />
                    </Grid>
                    <Grid item xs={2} className='create-input'>
                        <TextField  
                            label="GST"
                            variant="outlined"
                            fullWidth
                            value={formValues.gst}
                            onChange={(event) => this.handleDefaultChange(event, 'gst')}
                            error={formErros.gst}
                        />
                    </Grid>
                    {/*<Grid item xs={6} className='create-input'>
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
                    </Grid>*/}
                    <Grid item xs={12} md={3} className='create-input'>
                        <FormControl fullWidth error={formErros.country_id}>
                            <InputLabel>Country</InputLabel>
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
                            <InputLabel>State</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.state_id}
                                fullWidth
                                label="State"
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
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={formValues.city}
                            onChange={(event) => this.handleDefaultChange(event, 'city')}
                            error={formErros.city}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Pincode"
                            variant="outlined"
                            fullWidth
                            value={formValues.pincode}
                            onChange={(event) => this.handleDefaultChange(event, 'pincode')}
                            error={formErros.pincode}
                        />
                    </Grid>
                    {/*<Grid item xs={12} md={3} className='create-input'>
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
                    </Grid>*/}
                    
                    
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Bank Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_name}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_name')}
                            error={formErros.bank_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Branch Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.branch_name}
                            onChange={(event) => this.handleDefaultChange(event, 'branch_name')}
                            error={formErros.branch_name}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Account Number"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_account_no}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_account_no')}
                            error={formErros.bank_account_no}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="IFSC Code"
                            variant="outlined"
                            fullWidth
                            value={formValues.bank_ifsc}
                            onChange={(event) => this.handleDefaultChange(event, 'bank_ifsc')}
                            error={formErros.bank_ifsc}
                        />
                    </Grid>
                </Grid>

                <div className='custom-container ml-10'>
                    <div className='custom-row pl-0'>
                        <div className='custom-col-2'>
                            <div className="admin-buttons">
                                <div className='p-single-image-wrapper'>
                                    <div className='p-single-image'>
                                    {
                                        this.state.existing_company_logo ?
                                        <>
                                            <button className='close_img' onClick={() => this.deleteExistingImage('company_logo')}>x</button>
                                            <img src={this.state.existing_company_logo} />
                                        </>
                                        :
                                        <>
                                        {
                                            this.state.company_logo ?
                                            <>
                                                <button className='close_img' onClick={() => this.deleteImage('company_logo')}>x</button>
                                                <img src={this.getImageSrc(this.state.company_logo)} />
                                            </>
                                            :
                                            <img src={noImage} />
                                        }
                                        </>
                                    }
                                    </div>
                                    <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
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
                                </div>
                            </div>
                        </div>
                        <div className='custom-col-2'>
                            <div className="admin-buttons">
                                <div className='p-single-image-wrapper'>
                                    <div className='p-single-image'>
                                    {
                                        this.state.existing_profile_image ?
                                        <>
                                            <button className='close_img' onClick={() => this.deleteExistingImage('profile_image')}>x</button>
                                            <img src={this.state.existing_profile_image} />
                                        </>
                                        :
                                        <>
                                        {
                                            this.state.profile_image ?
                                            <>
                                                <button className='close_img' onClick={() => this.deleteImage('profile_image')}>x</button>
                                                <img src={this.getImageSrc(this.state.profile_image)} />
                                            </>
                                            :
                                            <img src={noImage} />
                                        }
                                        </>
                                    }
                                    </div>
                                    <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
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
                                </div>
                            </div>
                        </div>
                        <div className='custom-col-8'>
                            <div className='all-image-wrapper'>
                                <div className='all-single-image'>
                                    <div>
                                        {
                                            firstDocument.type != "no_image" ?
                                            <>
                                                {
                                                    firstDocument.type == "existing" ?
                                                    <button className='close_img' type='button' onClick={() => this.deleteExistingDocument(0)}>x</button>
                                                    :
                                                    <button className='close_img' type='button' onClick={() => this.deleteDocument(0)}>x</button>
                                                }
                                            </>
                                            : null
                                        }
                                        <FilePreview file={firstDocument.path} viewImage={firstDocument.type == "no_image" ? false : true} />
                                    </div>
                                    <Button variant="contained" className='image-button' component="label" sx={{maxWidth: '260px'}} endIcon={<CloudUploadIcon />}>
                                        Documents
                                        <input
                                        name="documents"
                                        hidden
                                        type="file"
                                        onChange={this.onDocumentChange}
                                        ref={this.documentRef}
                                        accept="application/pdf, image/*"
                                        multiple
                                        />
                                    </Button>
                                </div>
                                {
                                    this.getAllDocuments().map((item, index) => (
                                        <div className='all-single-image' key={index}>
                                            <div>
                                                {
                                                item.type != "no_image" ?
                                                <>
                                                    {
                                                    item.type == "existing" ?
                                                    <button className='close_img' type='button' onClick={() => this.deleteExistingDocument(index+1)}>x</button>
                                                    :
                                                    <button className='close_img' type='button' onClick={() => this.deleteDocument(index+1)}>x</button>
                                                    }
                                                </>
                                                : null
                                                }
                                                <FilePreview file={item.path} viewImage={item.type == "no_image" ? false : true} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                    {/*<Grid item xs={12}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} md={3} className="admin-buttons">
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
                                    : <Grid item xs={2} className='create-input'>
                                    <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                                  </Grid>
                                }
                                <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
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

                                
                            </Grid>

                            <Grid item xs={12} md={3} className="admin-buttons">
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
                                    : <Grid item xs={2} className='create-input'>
                                    <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                                  </Grid>
                                }
                                <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
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

                               
                            </Grid>

                            <Grid item xs={6} className="admin-buttons">
                                {
                                    this.state.documents.length || this.state.existing_documents.length ?
                                    <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                                        {this.state.existing_documents.map((item, index) => (
                                        <ImageListItem key={index} style={{ height: '100px', width: '100px' }}>
                                            <div style={{ position: 'relative', width: '100px' }}>
                                                <FilePreview file={item.path} />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteExistingDocument(index)} />
                                                </span>
                                            </div>
                                        </ImageListItem>
                                        ))}
                                        {this.state.documents.map((item, index) => (
                                        <ImageListItem key={index} style={{ height: '100px', width: '100px' }}>
                                            <div style={{ position: 'relative', width: '100px' }}>
                                                <FilePreview file={item} />
                                                <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                                    <DeleteIcon color="error" onClick={() => this.deleteDocument(index)} />
                                                </span>
                                            </div>
                                        </ImageListItem>
                                        ))}
                                    </ImageList>
                                    : <Grid item xs={2} className='create-input'>
                                    <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                                  </Grid>
                                }
                                <Button variant="contained" className='image-button' component="label" sx={{maxWidth: '260px'}} endIcon={<CloudUploadIcon />}>
                                    Documents
                                    <input
                                    name="documents"
                                    hidden
                                    type="file"
                                    onChange={this.onDocumentChange}
                                    ref={this.documentRef}
                                    accept="application/pdf, image/*"
                                    multiple
                                    />
                                </Button>

                                
                            </Grid>
                            
                        </Grid>
                    </Grid>*/}
                <Grid container spacing={2} className='loans_view p_view'>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="User Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.user_name}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                            label="Password" 
                            variant="outlined"
                            fullWidth
                            value={formValues.password}
                            autoComplete="new-password"
                            type="password"
                            onChange={(event) => this.handleDefaultChange(event, 'password')}
                            error={formErros.password}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} className='create-input'>
                        &nbsp;
                    </Grid>
                   


                    <Grid item xs={12} md={3}>
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
                            <Button variant="outlined" className='close-button' onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/suppliers') }>Cancel</Button>
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
    actionCalled: state.admin.supplier.actionCalled,
    createSuccess: state.admin.supplier.createSuccess,
    editSuccess: state.admin.supplier.editSuccess,
    successMessage: state.admin.supplier.successMessage,
    errorMessage: state.admin.supplier.errorMessage,
    countryList: state.superadmin.country.items,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    countryList,
    stateList,
    supplierUpdate,
    supplierCreate
  }, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierForm)));
