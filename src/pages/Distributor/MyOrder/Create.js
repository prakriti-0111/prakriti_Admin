import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ToggleButtonGroup, ToggleButton, FormLabel, ImageList, ImageListItem, InputAdornment, IconButton, Collapse, Typography  } from '@mui/material';
import { ContactPageSharp, ThirtyFpsSelect } from '@mui/icons-material';
import {calculateProductPrice, convertUnitToGram, getValuesFromKey, isEmpty, priceFormat} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { productList } from 'actions/superadmin/product.actions';
import { unitList } from 'actions/superadmin/unit.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import MainCard from 'ui-component/cards/MainCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Table, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import moment from 'moment';
import { subCategoryList } from 'actions/distributor/subCategory.actions';
import { categoryList } from 'actions/distributor/category.actions';
import { orderStore } from 'actions/distributor/myorder.actions';
import {DISTRIBUTOR_RESET_PRODUCT_LIST} from '../../../actionTypes/distributor/product.types';
import {DISTRIBUTOR_RESET_SUB_CATEGORY_LIST} from '../../../actionTypes/distributor/subCategory.types';
import { cartStore, cartList } from 'actions/distributor/cart.actions';
import {DISTRIBUTOR_CART_RESET, DISTRIBUTOR_CART_RESET_LIST} from '../../../actionTypes/distributor/cart.types';
import {DISTRIBUTOR_RESET_MYORDERS} from '../../../actionTypes/distributor/myorders.types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


class OrderCreatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cartItems: this.props.cartItems,
            productList: this.props.productList,
            unitList: this.props.unitList,
            categoryList: this.props.categoryList,
            subCategoryList: this.props.subCategoryList,
            materialList: [],
            sizeList: [],
            materials: [],
            product_type: '',
            productDialog: false,
            orderCofirmDialog: false,
            formValues: {
                order_date: moment().format('MM/DD/YYYY'),
                notes: ''
            },
            formErros: {
                order_date: false,
                notes: false
            },
            deleteDialogOpen: false,
            deletingCartItem: null,
            submitting: false,
            cartSubmitting: false,
            ...this.getDefaultProductFormData(),

            cart_actionCalled: this.props.cart_actionCalled,
            cart_createSuccess: this.props.cart_createSuccess,
            cart_deleteSuccess: this.props.cart_deleteSuccess,
            cart_successMessage: this.props.cart_successMessage,
            cart_errorMessage: this.props.cart_errorMessage,

            order_actionCalled: this.props.order_actionCalled,
            order_createSuccess: this.props.order_createSuccess,
            order_successMessage: this.props.order_successMessage,
            order_errorMessage: this.props.order_errorMessage,
        }
    
    }

    componentDidMount(){
        this.props.actions.categoryList({all: 1});
        this.props.actions.unitList({all: 1});
        this.props.actions.cartList();
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
    
        if(props.cartItems !== state.cartItems){
          update.cartItems = props.cartItems;
        }
        if(props.productList !== state.productList){
            update.productList = props.productList;
        }
        if(props.unitList !== state.unitList){
            update.unitList = props.unitList;
        }
        if(props.categoryList !== state.categoryList){
            update.categoryList = props.categoryList;
        }
        if(props.subCategoryList !== state.subCategoryList){
            update.subCategoryList = props.subCategoryList;
        }
        if(props.cart_actionCalled !== state.cart_actionCalled){
            update.cart_actionCalled = props.cart_actionCalled;
        }
        if(props.cart_createSuccess !== state.cart_createSuccess){
            update.cart_createSuccess = props.cart_createSuccess;
        }
        if(props.cart_deleteSuccess !== state.cart_deleteSuccess){
            update.cart_deleteSuccess = props.cart_deleteSuccess;
        }
        if(props.cart_successMessage !== state.cart_successMessage){
            update.cart_successMessage = props.cart_successMessage;
        }
        if(props.cart_errorMessage !== state.cart_errorMessage){
            update.cart_errorMessage = props.cart_errorMessage;
        }
        if(props.order_actionCalled !== state.order_actionCalled){
            update.order_actionCalled = props.order_actionCalled;
        }
        if(props.order_createSuccess !== state.order_createSuccess){
            update.order_createSuccess = props.order_createSuccess;
        }
        if(props.order_successMessage !== state.order_successMessage){
            update.order_successMessage = props.order_successMessage;
        }
        if(props.order_errorMessage !== state.order_errorMessage){
            update.order_errorMessage = props.order_errorMessage;
        }
        
        return update;
    }

    componentDidUpdate(){
        if(this.state.cart_actionCalled){
            if(this.state.cart_createSuccess){
                this.props.enqueueSnackbar(this.state.cart_successMessage, {variant: 'success'});
                this.props.actions.cartList();
                this.setState({
                    cartSubmitting: false
                });
                this.resetProductMaterialValues();
            }else if(this.state.cart_deleteSuccess){
                this.props.enqueueSnackbar(this.state.cart_successMessage, {variant: 'success'});
                this.props.actions.cartList();
                this.setState({
                    productDialog: false,
                    deleteDialogOpen: false
                })
            }else if(this.state.cart_errorMessage){
                this.props.enqueueSnackbar(this.state.cart_errorMessage, {variant: 'error'});
            }
            this.setState({
                cartSubmitting: false
            })
            this.props.dispatch({
                type: DISTRIBUTOR_CART_RESET
            });
        }else if(this.state.order_actionCalled){
            if(this.state.order_createSuccess){
                this.props.enqueueSnackbar(this.state.order_successMessage, {variant: 'success'});
                this.props.dispatch({
                    type: DISTRIBUTOR_RESET_MYORDERS
                });
                this.props.dispatch({
                    type: DISTRIBUTOR_CART_RESET_LIST
                });
                this.props.navigate('/distributor/my-order');
            }else {
                this.props.enqueueSnackbar(this.state.order_errorMessage, {variant: 'error'});
                this.props.dispatch({
                    type: DISTRIBUTOR_RESET_MYORDERS
                });
            }
            
        }
    }

    handleAddNewProduct = () => {
        this.setState({
            productDialog: true,
            ...this.getDefaultProductFormData()
        })
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

    handleCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'category_id');
        if(isEmpty(event.target.value)){
            this.props.dispatch({
                type: DISTRIBUTOR_RESET_SUB_CATEGORY_LIST
            })
        }else{
            this.props.actions.subCategoryList({ all: 1, category_id: event.target.value });
        }
        this.updateProductFormValues("", 'sub_category_id');
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: DISTRIBUTOR_RESET_PRODUCT_LIST
        })
        
    }

    handleSubCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'sub_category_id');
        this.props.actions.productList({ all: 1, sub_category_id: event.target.value });
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: DISTRIBUTOR_RESET_PRODUCT_LIST
        })
    }

    handleProductChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'product_id');
    }

    handleProductFormDefaultChange = (event, key) => {
        this.updateProductFormValues(event.target.value, key);
    }

    handleSizeChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'size_id');
    }

    updateProductFormValues = (val, key) => {
        let productFormValues = this.state.productFormValues;
        let sizeList = this.state.sizeList;
        let materialFormErros = this.state.materialFormErros;
        productFormValues[key] = val;

        if(key == "product_id"){
            let m = _.filter(this.state.productList, {id: val});
            let materials = [];
            materialFormErros = [];
            if(m.length){
                for(let item of m[0].materials){
                    //let purities = getValuesFromKey(item.purities, 'name')
                    materials.push({
                        id: 0,
                        material_id: item.id,
                        material_name: item.name,
                        weight: '',
                        quantity: '',
                        unit_id: item.unit_id,
                        unit_name: item.unit_name,
                        purities: item.purities,
                        purity_id: ""
                    });
                    materialFormErros.push({
                        weight: false,
                        quantity: false,
                        purity_id: false,
                        unit_id: false
                    });
                }
            }else{

            }
            productFormValues.materials = materials;
            productFormValues.product_type = m.length ? m[0].type : '';
            productFormValues.product_name = m.length ? m[0].name : '';
            sizeList = m.length ? m[0].sizes : [];
        }else if(key == "size_id"){
            let m = _.filter(this.state.sizeList, {id: val});
            productFormValues.size_name = m.length ? m[0].name : '';
        }

        this.setState({
            productFormValues: productFormValues,
            sizeList: sizeList,
            materialFormErros: materialFormErros
        },  () => {
            this.calculatePrice();
        });
    }

    calculatePrice = () => {
        let productFormValues = this.state.productFormValues;
        let totalWeight = 0;
        for(let i = 0; i < productFormValues.materials.length; i++){
            totalWeight += convertUnitToGram(productFormValues.materials[i].unit_name, productFormValues.materials[i].weight);
        }
        productFormValues.total_weight = priceFormat(totalWeight);
        this.setState({
            productFormValues: productFormValues
        })
    }

    getDefaultProductFormData = () => {
        return {
            productFormValues : {
                id: 0,
                product_id: '',
                product_type: '',
                product_name: '',
                size_id: '',
                size_name: '',
                materials: [],
                quantity: 1,
                category_id: '',
                sub_category_id: ''
            },
            productFormErros: {
                product_id: false,
                certificate_no: false,
                size_id: false,
                worker_id: false,
                quantity: false,
                category_id: false,
                sub_category_id: false,
            },
            materialFormErros: []
        }
    }

    resetProductMaterialValues = () => {
        let productFormValues = this.state.productFormValues;
        for(let i = 0; i < productFormValues.materials.length; i++){
            productFormValues.materials[i].weight = '';
            productFormValues.materials[i].quantity = '';
        }
        this.setState({
            productFormValues: productFormValues
        })
    }

    handleMaterialFormChange = (event, index, key) => {
        let productFormValues = this.state.productFormValues;
        let materials = productFormValues.materials;
        materials[index][key] = event.target.value;
        if(key == "unit_id"){
            let m = _.filter(this.state.unitList, {id: event.target.value});
            materials[index].unit_name = m.length ? m[0].name : '';
        }
        productFormValues.materials = materials;

        this.setState({
            productFormValues: productFormValues
        }, () => {
            this.calculatePrice()
        })
    }

    handleProductDialogClose = (event, reason) => {
        if(reason && reason == "backdropClick")return;
        this.setState({
            productDialog: false
        })
    }

    handleProductDelete = (item) => {
        this.setState({
            deletingCartItem: item,
            deleteDialogOpen: true
        });
    }

    handleProductSubmit = async() => {
        let hasErr = this.productFormValidate();
        if(!hasErr){
            let _data = {...this.state.productFormValues};
            this.setState({
                cartSubmitting: true
            })
            this.props.actions.cartStore(_data);
        }
    }

    productFormValidate = () => {
        let productFormValues = this.state.productFormValues;
        let productFormErros = this.state.productFormErros;
        let materialFormErros = this.state.materialFormErros;
        let hasErr = false;
        if(isEmpty(productFormValues.product_id)){
            productFormErros.product_id = true;
            hasErr = true;
        }else{
            productFormErros.product_id = false;
        }
        if(isEmpty(productFormValues.quantity)){
            productFormErros.quantity = true;
            hasErr = true;
        }else{
            productFormErros.quantity = false;
        }
        if(productFormValues.product_type != 'material'){
            if(isEmpty(productFormValues.size_id)){
                productFormErros.size_id = true;
                hasErr = true;
            }else{
                productFormErros.size_id = false;
            }
        }

        if(!productFormValues.materials.length){
            hasErr = true;
        }
        for(let i = 0; i < productFormValues.materials.length; i++){
            if(isEmpty(productFormValues.materials[i].weight)){
                materialFormErros[i].weight = true;
                hasErr = true;
            }else{
                materialFormErros[i].weight = false;
            }
            if(isEmpty(productFormValues.materials[i].quantity)){
                materialFormErros[i].quantity = true;
                hasErr = true;
            }else{
                materialFormErros[i].quantity = false;
            }
            if(isEmpty(productFormValues.materials[i].purity_id)){
                materialFormErros[i].purity_id = true;
                hasErr = true;
            }else{
                materialFormErros[i].purity_id = false;
            }
            if(isEmpty(productFormValues.materials[i].purity_id)){
                materialFormErros[i].purity_id = true;
                hasErr = true;
            }else{
                materialFormErros[i].purity_id = false;
            }
            if(isEmpty(productFormValues.materials[i].unit_id)){
                materialFormErros[i].unit_id = true;
                hasErr = true;
            }else{
                materialFormErros[i].unit_id = false;
            }
        }
        this.setState({
            productFormErros: productFormErros,
            materialFormErros: materialFormErros
        })
        return hasErr;
    }

    handleDialogClose = () => {
        this.setState({
            deleteDialogOpen: false,
            deletingCartItem: null
        })
    }

    handleDeleteConfirm = () => {
        let formValues = this.state.formValues;
        this.props.actions.cartDelete(this.state.deletingCartItem.id);
    }

    handleSubmit = () => {
        this.props.actions.orderStore();
    }

    formValidate = () => {
        let hasErr = false;
        if(this.state.cartItems.length == 0){
            hasErr = true;
            this.props.enqueueSnackbar('Please add at least one product.', {variant: 'error'});
        }
        return hasErr;
    }

    Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.product_name}
                </TableCell>
                <TableCell>{row.total_weight} gram</TableCell>
                <TableCell>{row.size_name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                    <IconButton className='del-icon' color="error" component="label" onClick={() => this.handleProductDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="medium" aria-label="purchases" className='ratn-table-wrapper'>
                      <TableHead className='ratn-table-header'>
                        <TableRow>
                          <TableCell>Material Name</TableCell>
                          <TableCell>Purity</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Unit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.materials.map((item, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              {item.material_name}
                            </TableCell>
                            <TableCell>{item.purity_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.weight}</TableCell>
                            <TableCell>{item.unit_name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
    }

    handleConfirmSubmit = () => {
        let hasErr = this.formValidate();
        if(!hasErr){
            this.setState({
                orderCofirmDialog: true
            })
        }
    }

    handleOrderDialogCofirmClose = (e, reason) => {
        if(reason && reason == "backdropClick")return;
        this.setState({
            orderCofirmDialog: false
        })
    }

    render() {
        const { formValues, cartItems, productFormValues, productFormErros, materialFormErros, submitting } = this.state;
        return (
            <MainCard title="Create Order">
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view '>
                        <Grid item xs={12} className='p-add-product create-input'>
                            <h3>Product List <Button variant="contained" className='add-button' onClick={() => this.handleAddNewProduct() }>Add Product</Button></h3>
                            <TableContainer component={Paper} className='ratn-table-wrapper'>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead className='ratn-table-header'>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Total Weight</TableCell>
                                            <TableCell>Size</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {cartItems.map((row, i) => (
                                        <this.Row key={i} row={row} />
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                            <LoadingButton
                            className='conf-button'
                                variant="contained"
                                type="button" 
                                loading={submitting} 
                                disabled={submitting}
                                onClick={this.handleConfirmSubmit}
                            >
                                Place Order
                            </LoadingButton>
                            {
                                !submitting ? 
                                <Button variant="outlined" className='close-button' onClick={() => this.props.navigate('/distributor/my-order') }>Cancel</Button>
                                : null
                            }
                            </Stack>
                        </Grid>
                    </Grid>

                    <Dialog
                    className='ratn-dialog-wrapper'
                        open={this.state.productDialog}
                        onClose={this.handleProductDialogClose}
                        fullWidth
                        maxWidth="lg"
                        >
                        <DialogTitle>
                            Add Product
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <FormControl fullWidth error={productFormErros.category_id}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={productFormValues.category_id}
                                                label="Category"
                                                onChange={this.handleCategoryChange}
                                                defaultValue=""
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {
                                                    this.state.categoryList.map((item, index) => (
                                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl fullWidth error={productFormErros.sub_category_id}>
                                            <InputLabel>Sub Category</InputLabel>
                                            <Select
                                                value={productFormValues.sub_category_id}
                                                label="Sub Category"
                                                onChange={this.handleSubCategoryChange}
                                                defaultValue=""
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {
                                                    this.state.subCategoryList.map((item, index) => (
                                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl fullWidth error={productFormErros.product_id}>
                                            <InputLabel>Product</InputLabel>
                                            <Select
                                                value={productFormValues.product_id}
                                                label="Product"
                                                onChange={this.handleProductChange}
                                                defaultValue=""
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {
                                                    this.state.productList.map((item, index) => (
                                                        <MenuItem value={item.id} key={index}>{item.name} | {item.product_code}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        productFormValues.product_type != "material" ?
                                        <>
                                            <Grid item xs={12} md={2}>
                                                <FormControl fullWidth error={productFormErros.size_id}>
                                                    <InputLabel>Size</InputLabel>
                                                    <Select
                                                        value={productFormValues.size_id}
                                                        label="Size"
                                                        onChange={this.handleSizeChange}
                                                        defaultValue=""
                                                    >
                                                        <MenuItem value=""></MenuItem>
                                                        {
                                                            this.state.sizeList.map((item, index) => (
                                                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </>
                                        : null
                                    }
                                    <Grid item xs={productFormValues.product_type != "material" ? 1 : 3}>
                                        <TextField  
                                            label="Quantity" 
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.quantity}
                                            onChange={(event) => this.handleProductFormDefaultChange(event, 'quantity')}
                                            error={productFormErros.quantity}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className='border-radius-0'>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='ratn-table-add-wrapper'>
                                                <TableHead className='ratn-table-header'>
                                                    <TableRow>
                                                        <TableCell>Material Name</TableCell>
                                                        <TableCell>Purity</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Weight</TableCell>
                                                        <TableCell>Unit</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='p-invoice-date'>
                                                    {
                                                        productFormValues.materials.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{item.material_name}</TableCell>
                                                                <TableCell style={{minWidth: '150px'}}>
                                                                    <FormControl fullWidth error={materialFormErros[index].purity_id}>
                                                                        <InputLabel>Purity</InputLabel>
                                                                        <Select
                                                                            value={item.purity_id}
                                                                            label="Purity"
                                                                            onChange={(event) => this.handleMaterialFormChange(event, index, 'purity_id')}
                                                                            defaultValue=""
                                                                        >
                                                                            <MenuItem value=""></MenuItem>
                                                                            {
                                                                                item.purities.map((item, index) => (
                                                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField  
                                                                        label="Quantity" 
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        value={item.quantity}
                                                                        onChange={(event) => this.handleMaterialFormChange(event, index, 'quantity')}
                                                                        error={materialFormErros[index].quantity}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField  
                                                                        label="Weight" 
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        value={item.weight}
                                                                        onChange={(event) => this.handleMaterialFormChange(event, index, 'weight')}
                                                                        error={materialFormErros[index].weight}
                                                                    />
                                                                </TableCell>
                                                                <TableCell style={{minWidth: '150px'}}>
                                                                    <FormControl fullWidth error={materialFormErros[index].unit_id}>
                                                                        <InputLabel>Unit</InputLabel>
                                                                        <Select
                                                                            value={item.unit_id}
                                                                            label="Purity"
                                                                            onChange={(event) => this.handleMaterialFormChange(event, index, 'unit_id')}
                                                                            defaultValue=""
                                                                        >
                                                                            <MenuItem value=""></MenuItem>
                                                                            {
                                                                                this.state.unitList.map((item, index) => (
                                                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    {/*<Grid item xs={12} md={2}>
                                        <TextField  
                                            label="TOT.WT(IN GRAM)" 
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.total_weight}
                                            disabled
                                        />
                                    </Grid>*/}
                                    <Grid item xs={12}>
                                        <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                                            <LoadingButton
                                                className='conf-button'
                                                variant="contained"
                                                type="button" 
                                                loading={this.state.cartSubmitting} 
                                                disabled={this.state.cartSubmitting}
                                                onClick={this.handleProductSubmit}
                                            >
                                                Add Product
                                            </LoadingButton>
                                            <Button variant="outlined" className='close-button' onClick={this.handleProductDialogClose}>Cancel</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={this.state.deleteDialogOpen}
                        onClose={this.handleDialogClose}
                        fullWidth
                        maxWidth="md"
                        >
                        <DialogTitle>Delete</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to delete this record?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose}>Close</Button>
                            <Button onClick={this.handleDeleteConfirm}>Yes, Confirm</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.orderCofirmDialog}
                        onClose={this.handleOrderDialogCofirmClose}
                        className='ratn-dialog-footer delete_modal'
                        fullWidth
          maxWidth="md"
                        >
                        <DialogTitle>Place Order</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to place order?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <div className='ratn-footer-buttons'>
                                <Button onClick={this.handleOrderDialogCofirmClose} className='close-button'>Close</Button>
                                <Button onClick={this.handleSubmit} className='conf-button'>
                                {
                                    this.state.submitting ? "Processing" : "Yes, Confirm"
                                }
                                </Button>
                            </div>
                        </DialogActions>
                    </Dialog>
                </Box>
            </MainCard>
        )

    }

}

const mapStateToProps = (state) => ({
    productList: state.superadmin.product.items,
    cartItems: state.distributor.cart.items,
    unitList: state.superadmin.unit.items,
    cart_actionCalled: state.distributor.cart.actionCalled,
    cart_createSuccess: state.distributor.cart.createSuccess,
    cart_deleteSuccess:  state.distributor.cart.deleteSuccess,
    cart_successMessage: state.distributor.cart.successMessage,
    cart_errorMessage: state.distributor.cart.errorMessage,
    order_actionCalled: state.distributor.myorders.actionCalled,
    order_createSuccess: state.distributor.myorders.createSuccess,
    order_successMessage: state.distributor.myorders.successMessage,
    order_errorMessage: state.distributor.myorders.errorMessage,
    categoryList: state.distributor.category.items,
    subCategoryList: state.distributor.subCategory.items,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    categoryList,
    subCategoryList,
    productList,
    unitList,
    cartList,
    cartStore,
    orderStore
  }, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderCreatePage)));

