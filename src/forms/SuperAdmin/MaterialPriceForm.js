import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ToggleButtonGroup, ToggleButton, FormLabel, ImageList, ImageListItem, InputAdornment, OutlinedInput, Input, Alert } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import { convertToFormData, toBase64, getValuesFromKey } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { materialPriceStore, materialPriceUpdate } from 'actions/superadmin/materialPrice.actions';
import { categoryList } from 'actions/superadmin/category.actions';
import { materialList } from 'actions/superadmin/material.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { withSnackbar } from 'notistack';
const { updateSyncErrors } = require('redux-form/lib/actions').default;
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getRoleName, getUserDashboardRoute, isEmpty, priceFormat } from 'src/helpers/helper';
import _ from 'lodash';
import { materialCreate } from 'actions/superadmin/material.actions';
import {
    RESET_MATERIAL
} from '../../actionTypes/superadmin/material.types';
import MaterialForm from 'forms/SuperAdmin/MaterialForm';
import { purityList } from 'actions/superadmin/purity.actions';
import { unitList } from 'actions/superadmin/unit.actions';

class MaterialPriceForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        let material = 'material' in this.props ? this.props.material : null;
        this.state = {
            auth: this.props.auth,
            formData: formData,
            isCreateFrom: !formData,
            categories: this.props.categories,
            materials: this.props.materials,
            material_id: '',
            material_name: '',
            category_name: '',
            unit_name: '',
            purities: [],
            category_id: '',
            puritiesFormData: [],
            submitting: false,
            openDialog: false,
            createSuccess: this.props.createSuccess,
            actionCalled: this.props.actionCalled,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
            materialPurityList: this.props.materialPurityList,
            material: material
        }

    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.categories !== state.categories) {
            update.categories = props.categories;
        }
        if (props.materials !== state.materials) {
            update.materials = props.materials;
        }
        if (props.formData !== state.formData) {
            update.formData = props.formData;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }
        if('createSuccess' in props && props.createSuccess !== state.createSuccess){
            update.createSuccess = props.createSuccess;
        }
    
        if('editSuccess' in props && props.editSuccess !== state.editSuccess){
            update.editSuccess = props.editSuccess;
        }
    
        if('deleteSuccess' in props && props.deleteSuccess !== state.deleteSuccess){
            update.deleteSuccess = props.deleteSuccess;
        }
        if(props.materialPurityList !== state.materialPurityList){
            update.materialPurityList = props.materialPurityList;
        }
        if(props.units !== state.units){
            update.units = props.units;
        }
        if(props.material !== state.material){
            update.material = props.material;
        }

        return update;
    }

    componentDidMount() {
        this.initializeFormData();
        this.props.actions.purityList({all: 1});
        this.props.actions.unitList({all: 1});
        if(this.state.material){
            this.initializeMaterialData();
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.formData != prevProps.formData) {
            this.initializeFormData();
        }

        if (this.props.material != prevProps.material) {
            this.initializeMaterialData();
        }

        if(this.state.actionCalled){  
            if(this.state.createSuccess){
              this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
              this.props.dispatch({
                type: RESET_MATERIAL
            });
              this.setState({
                openDialog: false
              }, () => {
                this.props.actions.materialList({ all: 1, category_id: this.state.category_id });
              })
            }
        }
    }

    initializeFormData = () => {
        if (this.state.formData) {
            let puritiesFormData = [];
            let formData = this.state.formData;
            for (let i = 0; i < formData.purities.length; i++) {
                puritiesFormData.push({
                    id: formData.purities[i].id,
                    purity_id: formData.purities[i].purity_id,
                    price: formData.purities[i].price,
                    increase: formData.purities[i].increase,
                    mrp: formData.purities[i].mrp,
                    admin_discount: formData.purities[i].admin_discount,
                    distributor_discount: formData.purities[i].distributor_discount,
                    se_discount: formData.purities[i].se_discount,
                    retailer_max_discount: formData.purities[i].retailer_max_discount,
                    customer_discount: formData.purities[i].customer_discount,
                    admin_price: formData.purities[i].admin_price,
                    distributor_price: formData.purities[i].distributor_price,
                    se_price: formData.purities[i].se_price,
                    retailer_max_price: formData.purities[i].retailer_max_price,
                    customer_price: formData.purities[i].customer_price,
                    price_error: false,
                    admin_discount_error: false,
                    distributor_discount_error: false,
                    retailer_max_discount_error: false,
                    se_discount_error: false,
                    customer_discount_error: false,
                })
            }
            this.setState({
                material_id: formData.material_id,
                material_name: formData.material_name,
                unit_name: formData.unit_name,
                purities: formData.purities,
                puritiesFormData: puritiesFormData
            })
        } else {
            this.props.actions.categoryList({ all: 1 });
        }
    }

    initializeMaterialData = () => {
        if(this.state.material){
            let material_name = '', unit_name = '', purities = [], puritiesFormData = [];
            material_name = this.state.material.name;
            unit_name = this.state.material.unit;
            purities = this.state.material.purities;
            for (let i = 0; i < purities.length; i++) {
                puritiesFormData.push({
                    purity_id: purities[i].id,
                    price: '',
                    increase: '',
                    mrp: '',
                    admin_discount: '',
                    admin_price: '',
                    distributor_discount: '',
                    distributor_price: '',
                    se_discount: '',
                    se_price: '',
                    retailer_max_discount: '',
                    retailer_max_price: '',
                    customer_discount: '',
                    customer_price: '',
                    price_error: false,
                    admin_discount_error: false,
                    distributor_discount_error: false,
                    retailer_max_discount_error: false,
                    se_discount_error: false,
                    customer_discount_error: false,
                })
            }
            this.setState({
                material_id: this.state.material.id,
                material_name: material_name,
                unit_name: unit_name,
                purities: purities,
                puritiesFormData: puritiesFormData
            })
        }
    }

    handleCategoryChange = (event) => {
        let m = _.filter(this.state.categories, { id: event.target.value });
        let category_name = m.length ? m[0].name : '';
        this.setState({
            category_id: event.target.value,
            material_id: '',
            material_name: '',
            purities: [],
            puritiesFormData: [],
            category_name: category_name
        })
        this.props.actions.materialList({ all: 1, category_id: event.target.value })
    }

    handleMaterialChange = (event) => {
        let id = event.target.value;
        let m = _.filter(this.state.materials, { id: id });
        let material_name = '', unit_name = '', purities = [], puritiesFormData = [];
        if (m) {
            material_name = m[0].name;
            unit_name = m[0].unit;
            purities = m[0].purities;
            for (let i = 0; i < purities.length; i++) {
                puritiesFormData.push({
                    purity_id: purities[i].id,
                    price: '',
                    increase: '',
                    mrp: '',
                    admin_discount: '',
                    admin_price: '',
                    distributor_discount: '',
                    distributor_price: '',
                    se_discount: '',
                    se_price: '',
                    retailer_max_discount: '',
                    retailer_max_price: '',
                    customer_discount: '',
                    customer_price: '',
                    price_error: false,
                    admin_discount_error: false,
                    distributor_discount_error: false,
                    retailer_max_discount_error: false,
                    se_discount_error: false,
                    customer_discount_error: false,
                })
            }
        }
        this.setState({
            material_id: id,
            material_name: material_name,
            unit_name: unit_name,
            purities: purities,
            puritiesFormData: puritiesFormData
        })
    }

    handlePriceChange = (event, index, key) => {
        let puritiesFormData = this.state.puritiesFormData;
        puritiesFormData[index][key] = event.target.value;
        this.setState({
            puritiesFormData: puritiesFormData
        }, () => {
            this.priceCalculation()
        })
    }

    handleSubmit = () => {
        let err = false;
        let puritiesFormData = this.state.puritiesFormData;
        if (puritiesFormData.length == 0) {
            return;
        }
        for (let i = 0; i < puritiesFormData.length; i++) {
            if (puritiesFormData[i].price == '') {
                puritiesFormData[i].price_error = true;
                err = true;
            } else {
                puritiesFormData[i].price_error = false;
            }
            /*if (puritiesFormData[i].admin_discount == '') {
                puritiesFormData[i].admin_discount_error = true;
                err = true;
            } else {
                puritiesFormData[i].admin_discount_error = false;
            }
            if (puritiesFormData[i].distributor_discount == '') {
                puritiesFormData[i].distributor_discount_error = true;
                err = true;
            } else {
                puritiesFormData[i].distributor_discount_error = false;
            }
            if (puritiesFormData[i].se_discount == '') {
                puritiesFormData[i].se_discount_error = true;
                err = true;
            } else {
                puritiesFormData[i].se_discount_error = false;
            }
            if (puritiesFormData[i].retailer_max_discount == '') {
                puritiesFormData[i].retailer_max_discount_error = true;
                err = true;
            } else {
                puritiesFormData[i].retailer_max_discount_error = false;
            }
            if (puritiesFormData[i].customer_discount == '') {
                puritiesFormData[i].customer_discount_error = true;
                err = true;
            } else {
                puritiesFormData[i].customer_discount_error = false;
            }*/
        }
        this.setState({
            puritiesFormData: puritiesFormData,
            //submitting: !err
        }, () => {
            if (!err) {
                let values = this.generateFormValues();
                console.log('values', values)
                if (this.state.isCreateFrom) {
                    this.props.actions.materialPriceStore(values);
                } else {
                    this.props.actions.materialPriceUpdate(this.state.formData.id, values);
                }

            }
        })

    }

    generateFormValues = () => {
        let purities = [];
        let puritiesFormData = this.state.puritiesFormData;
        for (let i = 0; i < puritiesFormData.length; i++) {
            purities.push({
                id: 'id' in puritiesFormData[i] ? puritiesFormData[i].id : 0,
                purity_id: puritiesFormData[i].purity_id,
                price: puritiesFormData[i].price,
                admin_discount: puritiesFormData[i].admin_discount,
                distributor_discount: puritiesFormData[i].distributor_discount,
                se_discount: puritiesFormData[i].se_discount,
                retailer_max_discount: puritiesFormData[i].retailer_max_discount,
                customer_discount: puritiesFormData[i].customer_discount,
                increase: puritiesFormData[i].increase,
                mrp: puritiesFormData[i].mrp,
                admin_price: puritiesFormData[i].admin_price,
                distributor_price: puritiesFormData[i].distributor_price,
                se_price: puritiesFormData[i].se_price,
                retailer_max_price: puritiesFormData[i].retailer_max_price,
                customer_price: puritiesFormData[i].customer_price
            })
        }
        return {
            material_id: this.state.material_id,
            purities: purities
        }
    }

    priceCalculation = () => {
        let puritiesFormData = [...this.state.puritiesFormData];
        for (let i = 0; i < puritiesFormData.length; i++) {
            if(!isEmpty(puritiesFormData[i].price)){
                puritiesFormData[i].mrp = priceFormat((!isEmpty(puritiesFormData[i].increase) && puritiesFormData[i].increase != 0) ? ((parseFloat(puritiesFormData[i].price) * 100 / parseFloat(puritiesFormData[i].increase) )) : parseFloat(puritiesFormData[i].price));
                
                puritiesFormData[i].admin_price = priceFormat(!isEmpty(puritiesFormData[i].admin_discount) ? (parseFloat(puritiesFormData[i].mrp) - (parseFloat(puritiesFormData[i].mrp) * parseFloat(puritiesFormData[i].admin_discount) / 100)) : parseFloat(puritiesFormData[i].mrp));

                puritiesFormData[i].distributor_price = priceFormat(!isEmpty(puritiesFormData[i].distributor_discount) ? (parseFloat(puritiesFormData[i].mrp) - (parseFloat(puritiesFormData[i].mrp) * parseFloat(puritiesFormData[i].distributor_discount) / 100)) : parseFloat(puritiesFormData[i].mrp));

                puritiesFormData[i].se_price = priceFormat(!isEmpty(puritiesFormData[i].se_discount) ? (parseFloat(puritiesFormData[i].mrp) - (parseFloat(puritiesFormData[i].mrp) * parseFloat(puritiesFormData[i].se_discount) / 100)) : parseFloat(puritiesFormData[i].mrp));

                puritiesFormData[i].retailer_max_price = priceFormat(!isEmpty(puritiesFormData[i].retailer_max_discount) ? (parseFloat(puritiesFormData[i].mrp) - (parseFloat(puritiesFormData[i].mrp) * parseFloat(puritiesFormData[i].retailer_max_discount) / 100)) : parseFloat(puritiesFormData[i].mrp));

                puritiesFormData[i].customer_price = priceFormat(!isEmpty(puritiesFormData[i].customer_discount) ? (parseFloat(puritiesFormData[i].mrp) - (parseFloat(puritiesFormData[i].mrp) * parseFloat(puritiesFormData[i].customer_discount) / 100)) : parseFloat(puritiesFormData[i].mrp));
            }else{
                puritiesFormData[i].mrp = '';
                puritiesFormData[i].admin_price = '';
                puritiesFormData[i].distributor_price = '';
                puritiesFormData[i].se_price = '';
                puritiesFormData[i].retailer_max_price = '';
                puritiesFormData[i].customer_price = '';
            }
            
        }
        
        this.setState({
            puritiesFormData: puritiesFormData
        })
    }

    handleCancel = () => {
        this.handleDialogClose();
    }

    handleCreate = () => {
        this.setState({
            openDialog: true
        })
    }

    handleDialogClose = (event, reason) => {
        if(reason && reason == "backdropClick")return;
        this.setState({
            openDialog: false
        })
    }

    submit = (data) => {
        this.props.actions.materialCreate(data);
    }

    handleClose = () => {
        if('handleCancel' in this.props){
            this.props.handleCancel();
        }else{
            this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/material-prices')
        }
    }

    render() {
        return (
            <div className="ratn-dialog-wrapper">
                {
                    (this.state.isCreateFrom && !this.state.material) ?
                        <Box sx={{ flexGrow: 1, m: 0.5 }} className=''>
                            <Grid container spacing={2} className='tax-input loans_view price_view'>
                                {/*<Grid item xs={12} className='create-input pt-0'>
                                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                                        <Button variant="contained" className='conf-button' onClick={() => this.handleCreate()}>Add Material</Button>
                                    </Stack>
                                </Grid>*/}
                                <Grid item xs={6} className='create-input'>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={this.state.category_id}
                                            label="Category"
                                            onChange={this.handleCategoryChange}
                                            defaultValue=""
                                            className='input-inner'
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {
                                                this.state.categories.map((item, index) => (
                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} className='create-input'>
                                    <FormControl fullWidth>
                                        <InputLabel>Material</InputLabel>
                                        <Select
                                            value={this.state.material_id}
                                            label="Material"
                                            onChange={this.handleMaterialChange}
                                            defaultValue=""
                                            className='input-inner'
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {
                                                this.state.materials.map((item, index) => (
                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Box>
                        : null
                }
                {
                    this.state.material_id ?
                        <>
                            {
                                this.state.purities.length == 0 ?
                                    <Alert variant="filled" severity="error">
                                        No purity found.
                                    </Alert>
                                    :
                                    <>
                                        <h3 className='price_list_heading' style={{ marginTop: '10px' }}>{(this.state.material_name + ' Price List / ' + this.state.unit_name)}</h3>

                                        <TableContainer component={Paper} className='ratn-table-wrapper table-wrapper-heading'>
                                            <Table className='price-table' style={{ maxWidth: '100%', margin: 'auto' }}>
                                                <TableHead className='ratn-table-header'>
                                                    <TableRow>
                                                        {/*--<TableCell rowSpan={4}>
                                                        {this.state.material_name}
                            </TableCell> ---*/}
                                                        <TableCell style={{ width: "100px", fontWeight: "600" }}>
                                                            Purity
                                                        </TableCell>
                                                        {
                                                            this.state.purities.map((item, index) => (
                                                                <TableCell key={index} style={{ fontWeight: "600" }}>
                                                                    {'purity_name' in item ? item.purity_name : item.name}
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='pricelist-body'>

                                                    <TableRow>
                                                        <TableCell>
                                                            Price
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index} className='table-data'>
                                                                    <FormControl fullWidth sx={{ m: 1 }}>
                                                                        <TextField
                                                  
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            value={item.price}
                                                                            onChange={(event) => this.handlePriceChange(event, index, 'price')}
                                                                            InputProps={{
                                                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                                            }}

                                                                            error={item.price_error}
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Increase
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                   
                                                                    <div className='m-price-wrapper'>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.increase}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'increase')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="start">%</InputAdornment>
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                                className="pl-12"
                                                                                    label="MRP"
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.mrp}
                                                                                    
                                                                                    error={item.price_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        </div>
                                                                
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Admin Discount
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                <div className='m-price-wrapper'>
                                                                <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                
                                                                                    variant="outlined"
                                                                                    value={item.admin_discount}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'admin_discount')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="end" className='i-icon-right'>%</InputAdornment>
                                                                                    }}
                                                                                    error={item.admin_discount_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                             
                                                                                    label=""
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.admin_price}
                                                                                    
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Distributor Discount
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                <div className='m-price-wrapper'>
                                                                <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    value={item.distributor_discount}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'distributor_discount')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="end" className='i-icon-right'>%</InputAdornment>
                                                                                    }}
                                                                                    error={item.distributor_discount_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                              
                                                                                    label=""
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.distributor_price}
                                                                                    
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        {/*--- <TableCell rowSpan={3}>
                                                        Per {this.state.unit_name}
                                                </TableCell> ---*/}
                                                        <TableCell>
                                                            Se Discount
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                <div className='m-price-wrapper'>
                                                                <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    value={item.se_discount}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'se_discount')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="end" className='i-icon-right'>%</InputAdornment>
                                                                                    }}
                                                                                    error={item.se_discount_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                             
                                                                                    label=""
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.se_price}
                                                                                   
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Retailer Discount
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                <div className='m-price-wrapper'>
                                                                <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    value={item.retailer_max_discount}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'retailer_max_discount')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="end" className='i-icon-right'>%</InputAdornment>
                                                                                    }}
                                                                                    error={item.retailer_max_discount_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                               
                                                                                    label=""
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.retailer_max_price}
                                                                                   
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Customer Discount
                                                        </TableCell>
                                                        {
                                                            this.state.puritiesFormData.map((item, index) => (
                                                                <TableCell key={index}>
                                                                <div className='m-price-wrapper'>
                                                                <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    value={item.customer_discount}
                                                                                    onChange={(event) => this.handlePriceChange(event, index, 'customer_discount')}
                                                                                    InputProps={{
                                                                                        endAdornment: <InputAdornment position="end" className='i-icon-right'>%</InputAdornment>
                                                                                    }}
                                                                                    error={item.customer_discount_error}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                        <div className='m-price-input'>
                                                                            <FormControl fullWidth sx={{ m: 1 }} className='right-radius'>
                                                                                <TextField
                                                                            
                                                                                    label=""
                                                                                    disabled
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    value={item.customer_price}
                                                                                   
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                            ))
                                                        }
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                            <Stack spacing={1} direction="row" justifyContent="flex-end" className='ratn-footer-buttons price-inner-button'>
                                                <LoadingButton
                                                    className='conf-button'
                                                    variant="contained"
                                                    type="button"
                                                    onClick={this.handleSubmit}
                                                    disabled={this.state.submitting}
                                                    loading={this.state.submitting}
                                                >
                                                    Submit
                                                </LoadingButton>
                                                <Button variant="outlined" className='close-button' onClick={this.handleClose}>Cancel</Button>
                                            </Stack>

                                        </TableContainer>
                                    </>
                            }
                        </>
                        :
                        <Grid container justifyContent="center">
                            <Alert severity="warning" icon={false} className='no-data-found'></Alert>
                        </Grid>

                }


        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="md"
        >
        <DialogTitle>
          Create Material
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
            <MaterialForm onSubmit={this.submit} categories={this.state.categories} units={this.state.units} purities={this.state.materialPurityList} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog>

            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    categories: state.superadmin.category.items,
    materials: state.superadmin.material.items,
    auth: state.auth,
    actionCalled: state.superadmin.material.actionCalled,
    createSuccess: state.superadmin.material.createSuccess,
    successMessage: state.superadmin.material.successMessage,
    errorMessage: state.superadmin.material.errorMessage,
    materialPurityList: state.superadmin.purity.items || [],
    units: state.superadmin.unit.items || [],
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        actions: bindActionCreators({
            materialPriceStore,
            materialPriceUpdate,
            categoryList,
            materialList,
            materialCreate,
            purityList,
            unitList
        }, dispatch)
    }
};

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialPriceForm)));