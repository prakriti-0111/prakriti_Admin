import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, InputAdornment, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem  } from '@mui/material';
import {isEmpty, toBase64} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import {SUPERADMIN_RESET_ADMIN} from '../../actionTypes/superadmin/admin.types';
import { stateList, rawStateList } from 'actions/superadmin/state.actions';
import { getNextUserName } from 'actions/superadmin/profile.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { adminCreate, adminUpdate } from 'actions/superadmin/admin.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from 'lodash';
import {getRoleName, getUserDashboardRoute} from 'src/helpers/helper';
import FilePreview from 'src/utils/FilePreview';
import noImage from 'src/assets/images/no_image.jpg';
import DataTable from 'src/utils/DataTable';
import { gridSpacing } from 'store/constant';




class AdminForm extends React.Component {

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
                branch_name: '',
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
                branch_name: false,
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
            remove_documents: [],

            items: this.props.items,
            total: this.props.total,
            actionCalled: this.props.actionCalled,
            deleteSuccess: this.props.deleteSuccess,
            successMessage: this.props.successMessage,
            queryParams: {
                page: 1,
                limit: 50,
                user_id: '',
                search: '',
                date_from: null,
                date_to: null,
            },
            adminList: this.props.adminList
        }

        this.columns = [
            {
              name: 'invoice_date',
              display_name: 'Date'
            },
            {
              name: 'invoice_number',
              display_name: 'Invoice No'
            },
            {
              name: 'total_amount',
              display_name: 'Bill Amount'
            },
            {
              name: 'return_amt',
              display_name: 'Return'
            },
            {
              name: 'paid_amt',
              display_name: 'Paid'
            },
            {
              name: 'due_amt',
              display_name: 'Dues'
            },
            {
              name: 'status_display',
              display_name: 'Status',
              show_tag: true,
              color_conditions: [
                {
                  key: "status",
                  value: "due",
                  color: "error"
                },
                {
                  key: "status",
                  value: "paid",
                  color: "success"
                }
              ]
            }
          ];
        this.tableActions = [
            {
              label: 'View',
              onClick: this.handleView,
              color: 'primary'
            },
            {
              label: 'Download',
              onClick: this.handleDownload,
              color: 'primary'
            }
          ];
        
        
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
        let res = await getNextUserName('admin', id);
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
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/admins');
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
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/admins');
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

            let thisDocuments = [...this.state.documents];
            for (let i = 0; i < thisDocuments.length; i++) {
                thisDocuments[i] = await toBase64(thisDocuments[i]);
            }
            postData.documents = thisDocuments;
            postData.remove_documents = this.state.remove_documents;

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
        if (totalDoc > 5) {
          this.props.enqueueSnackbar('Maximum 5 document are allowed.', { variant: 'error' });
          return;
        }
        for(let i = 0; i < e.target.files.length; i++){
            console.log(e.target.files[i])
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
                    <Grid item xs={12} md={6}  className='create-input'>
                        <TextField  
                            label="Company Name"
                            variant="outlined"
                            fullWidth
                            value={formValues.company_name}
                            disabled
                            InputProps={{
                                className: "non_disable_text"
                              }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                            label="Owner Name" 
                            variant="outlined"
                            fullWidth
                            value={formValues.name}
                            disabled
                            InputProps={{
                                className: "non_disable_text"
                              }}
                        />
                    </Grid>
                
                    <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                            label="GST Number"
                            variant="outlined"
                            fullWidth
                            value={formValues.gst}
                            disabled
                            InputProps={{
                                className: "non_disable_text"
                              }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={formValues.city}
                            disabled
                            InputProps={{
                                className: "non_disable_text"
                              }}
                        />
                    </Grid>
                   
                    <Grid item xs={2.4} className='create-input'>
                        <TextField  
                            label="Total Amount"
                            variant="outlined"
                            fullWidth
                            value={formValues.total_amount}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                className: "non_disable_text"
                            }}
                        />
                    </Grid>
                    <Grid item xs={2.4} className='create-input'>
                        <TextField  
                            label="Total Return"
                            variant="outlined"
                            fullWidth
                            value={formValues.total_return}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                className: "non_disable_text"
                            }}
                        />
                    </Grid>
                    <Grid item xs={2.4} className='create-input'>
                        <TextField  
                            label="Total Paid"
                            variant="outlined"
                            fullWidth
                            value={formValues.paid_amount}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                className: "non_disable_text"
                            }}
                        />
                    </Grid>
                    <Grid item xs={2.4} className='create-input'>
                        <TextField  
                            label="Total Dues"
                            variant="outlined"
                            fullWidth
                            value={formValues.due_amount}
                            disabled
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                className: "non_disable_text"
                              }}
                        />
                    </Grid>
                
                </Grid>

                <Grid container spacing={2} className='loans_view p_view'>
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                    <Grid container spacing={2} className='tax-input loans_view p_view'>
                        <Grid item xs={12} md={2} className='create-input'>
                            <Button variant="contained" className='search-btn' >Filter</Button>
                        </Grid>
                       
                       
                        <Grid item xs={3} className='create-input'>
                        <FormControl fullWidth>
                            <TextField
                            label="Search"
                            variant="outlined"
                            value={this.state.queryParams.search}
                            onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                            />
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2} className='create-input order-input button-right'>
                        <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
                        </Grid>
                    </Grid>
                    </Box>

                    <Grid item xs={24} className='create-input'>
                    <DataTable 
                            columns={this.columns}
                            rows={this.state.items}
                            page={this.state.queryParams.page}
                            limit={this.state.queryParams.limit}
                            total={this.state.total}
                            handlePagination={this.handlePagination}
                            actions={this.tableActions}
                        />
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
    countryList: state.superadmin.country.items,
	auth: state.auth
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
