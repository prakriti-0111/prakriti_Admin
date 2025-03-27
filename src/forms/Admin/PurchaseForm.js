import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ToggleButtonGroup, Typography, Collapse, ImageList, ImageListItem, InputAdornment, IconButton, Autocomplete } from '@mui/material';
import { ContactPageSharp, ThirtyFpsSelect } from '@mui/icons-material';
import { calculateProductPrice, convertUnitToGram, displayAmount, isEmpty, calculateGST } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { purchaseStore, purchaseUpdate, purchaseNewInvoiceNumber, purchaseReturn } from 'actions/admin/purchase.actions';
import { supplierList } from 'actions/admin/supplier.actions';
import { productList } from 'actions/superadmin/product.actions';
import { unitList } from 'actions/superadmin/unit.actions';
import { checkCertificateNo } from 'actions/superadmin/stocks.actions';
import CloseIcon from '@mui/icons-material/Close';
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
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import { ADMIN_RESET_PURCHASE } from '../../actionTypes/admin/purchase.types';
import { priceFormat, weightFormat } from '../../helpers/helper';
import moment from 'moment';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';
import { RESET_SUB_CATEGORY_LIST } from '../../actionTypes/superadmin/subCategory.types';
import { RESET_PRODUCT_LIST } from '../../actionTypes/superadmin/product.types';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { categoryList } from 'actions/superadmin/category.actions';
import { parseNonNullablePickerDate } from '@mui/x-date-pickers/internals';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


class PurchaseForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
            formData: formData,
            isCreateFrom: !formData,
            supplierList: this.props.supplierList,
            productList: this.props.productList,
            unitList: this.props.unitList,
            categoryList: this.props.categoryList,
            subCategoryList: this.props.subCategoryList,
            materialList: [],
            sizeList: [],
            materials: [],
            product_type: '',
            productDialog: false,
            supplier_gst_no: '',
            formValues: {
                supplier_id: '',
                invoice_number: '',
                invoice_date: moment().format('MM/DD/YYYY'),
                products: [],
                notes: '',
                payment_mode: 'cash',
                transaction_no: '',
                cheque_no: '',
                taxable_amount: '',
                tax: '',
                cgst_tax: '',
                sgst_tax: '',
                igst_tax: '',
                total_amount: '',
                discount: '',
                total_payable: '',
                paid_amount: '',
                due_amount: '',
                due_date: '',
                total_sub_total: ''
            },
            formErros: {
                supplier_id: false,
                invoice_number: false,
                invoice_date: false,
                notes: false,
                payment_mode: false,
                transaction_no: false,
                total_amount: false,
                tax: false,
                discount: false,
                paid_amount: false,
                due_date: false,
            },
            deleteDialogOpen: false,
            deletingIndex: 0,
            submitting: false,
            ...this.getDefaultProductFormData(),

            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            editSuccess: this.props.editSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
            auth: this.props.auth,
            supplier_details: {
                name: '',
                mobile: '',
                gst: '',
                address: '',
                city: '',
                pincode: ''
            },
            return_products: [],
            returnDialogOpen: false,
            return_amount: 0,
            materialReturnDialog: false,
            actionProductIndex: 0,
            return_weight_error: false,
            return_qty_error: false,
            view_open: {},
            return_date: moment().format('MM/DD/YYYY')
        }

    }

    componentDidMount() {
        this.props.actions.productList({ all: 1 });
        this.props.actions.categoryList({ all: 1 });
        this.props.actions.supplierList({ all: 1 });
        this.props.actions.unitList({ all: 1 });
        if (this.state.formData) {
            this.initializeFormData();
        }

        this.getNewInvoiceNumber();
    }

    getNewInvoiceNumber = async() => {
        let res = await purchaseNewInvoiceNumber();
        if(res.data.success){
            this.updateFormValues(res.data.data.next_invoice, 'invoice_number');
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.supplierList !== state.supplierList) {
            update.supplierList = props.supplierList;
        }
        if (props.productList !== state.productList) {
            update.productList = props.productList;
        }
        if (props.unitList !== state.unitList) {
            update.unitList = props.unitList;
        }
        if (props.actionCalled !== state.actionCalled) {
            update.actionCalled = props.actionCalled;
        }
        if (props.createSuccess !== state.createSuccess) {
            update.createSuccess = props.createSuccess;
        }
        if (props.editSuccess !== state.editSuccess) {
            update.editSuccess = props.editSuccess;
        }
        if (props.successMessage !== state.successMessage) {
            update.successMessage = props.successMessage;
        }
        if (props.errorMessage !== state.errorMessage) {
            update.errorMessage = props.errorMessage;
        }
        if (props.auth !== state.auth) {
            update.auth = props.auth;
        }
        if (props.categoryList !== state.categoryList) {
            update.categoryList = props.categoryList;
        }
        if (props.subCategoryList !== state.subCategoryList) {
            update.subCategoryList = props.subCategoryList;
        }

        if (props.formData !== state.formData) {
            update.formData = props.formData;
        }

        return update;
    }

    initializeFormData = () => {
        let formValues = { ...this.state.formData };
        let return_products = [];
        for(let i = 0; i < formValues.products.length; i++){
            return_products.push({
                id: formValues.products[i].id,
                is_return: false
            })
        }
        this.setState({
            formValues: formValues,
            return_products: return_products
        }, () => {
            setTimeout(() => {
                this.getSupplierDetails()
            }, 1000);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.formData != prevProps.formData) {
            this.initializeFormData();
        }

        if (this.state.actionCalled) {
            if (this.state.isCreateFrom) {
                if (this.state.createSuccess) {
                    this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                    this.props.dispatch({
                        type: ADMIN_RESET_PURCHASE
                    });
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases');
                } else {
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
                    this.props.dispatch({
                        type: ADMIN_RESET_PURCHASE
                    });
                }
            } else {
                if (this.state.editSuccess) {
                    this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                    this.props.dispatch({
                        type: ADMIN_RESET_PURCHASE
                    });
                    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases');
                } else {
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
                    this.props.dispatch({
                        type: ADMIN_RESET_PURCHASE
                    });
                }
            }
        }
    }

    handleAddNewProduct = () => {
        if (isEmpty(this.state.formValues.supplier_id)) {
            this.props.enqueueSnackbar("Please select supplier for tax calculate.", { variant: 'error' });
            return;
        }
        this.setState({
            productDialog: true,
            ...this.getDefaultProductFormData()
        })
    }

    handleSupplierChange = (event) => {
        this.updateFormValues(event.target.value, 'supplier_id');
        let m = _.filter(this.state.supplierList, { id: event.target.value });
        let supplier_gst_no = '';
        if (m.length) {
            supplier_gst_no = m[0].gst;
        }
        this.setState({
            supplier_gst_no: supplier_gst_no
        }, () => {
            this.getSupplierDetails()
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
        }, () => {
            this.handleCalculateMainPrice();
        })
    }

    handleProductChange = (event, val) => {
        this.updateProductFormValues(val, 'product_id');
    }

    handleProductFormDefaultChange = (event, key) => {
        this.updateProductFormValues(event.target.value, key);
    }

    handleSizeChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'size_id');
    }

    handleWorkerChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'worker_id');
    }

    updateProductFormValues = (val, key) => {
        let productFormValues = this.state.productFormValues;
        let sizeList = this.state.sizeList;
        let materialFormErros = this.state.materialFormErros;
        productFormValues[key] = val;

        if (key == "product_id") {
            let m = _.filter(this.state.productList, { id: val });
            let materials = [];
            materialFormErros = [];
            if (m.length) {
                for (let item of m[0].materials) {
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
                        purity_id: "",
                        rate: '',
                        amount: '',
                        weight_in_gram: ''
                    });
                    materialFormErros.push({
                        weight: false,
                        quantity: false,
                        purity_id: false,
                        unit_id: false,
                        rate: false,
                    });
                }
            } else {

            }
            productFormValues.materials = [...materials];
            productFormValues.product_type = m.length ? m[0].type : '';
            productFormValues.product_name = m.length ? m[0].name : '';
            productFormValues.tax_info = m.length ? m[0].tax_info : null;
            productFormValues.product_making_charge_type = m.length ? m[0].making_charge_type : '';
            productFormValues.product_making_charge = m.length ? m[0].making_charge : 0;
            sizeList = m.length ? m[0].sizes : [];
        } else if (key == "size_id") {
            let m = _.filter(this.state.sizeList, { id: val });
            productFormValues.size_name = m.length ? m[0].name : '';
        }

        this.setState({
            productFormValues: productFormValues,
            sizeList: sizeList,
            materialFormErros: materialFormErros
        }, () => {
            this.calculatePrice()
        })
    }

    calculatePrice = () => {
        let productFormValues = {...this.state.productFormValues};
        let totalWeight = 0, tax = 0, rate = 0, totalQty = 0;
        for (let i = 0; i < productFormValues.materials.length; i++) {
            productFormValues.materials[i].amount = (productFormValues.materials[i].weight && productFormValues.materials[i].rate) ? priceFormat(parseFloat(productFormValues.materials[i].weight) * parseFloat(productFormValues.materials[i].rate)) : 0;
            
            //calculateProductPrice(productFormValues.materials[i].weight, productFormValues.materials[i].rate, productFormValues.materials[i].unit_name);
            let weight = convertUnitToGram(productFormValues.materials[i].unit_name, productFormValues.materials[i].weight);
            productFormValues.materials[i].weight_in_gram = weight;
            totalWeight += weight;
            rate += productFormValues.materials[i].amount;
            totalQty += productFormValues.materials[i].quantity ? parseInt(productFormValues.materials[i].quantity) : 0;
        }
        let making_charge = productFormValues.making_charge ? parseFloat(productFormValues.making_charge) : 0;
        /*if (!isEmpty(productFormValues.product_making_charge) && !isEmpty(productFormValues.product_making_charge_type)) {
            if (productFormValues.product_making_charge_type == "per_piece") {
                making_charge = priceFormat(parseFloat(productFormValues.product_making_charge) * totalQty);
            } else if(productFormValues.product_making_charge_type == "per_gram"){
                making_charge = priceFormat(parseFloat(productFormValues.product_making_charge) * totalWeight);
            }
        }*/
        let sub_price = rate;
        let total = rate + making_charge;
        if (!isEmpty(productFormValues.rep)) {
            total += parseFloat(productFormValues.rep);
        }
        let result = null, gst_type = productFormValues.gst_type;
        if (productFormValues.tax_info) {
            result = calculateGST(productFormValues.tax_info, total, this.state.supplier_gst_no);
            tax = result ? result.total : 0;
            if(result)
                gst_type = result.type;
        }
        let cgst_tax = result ? result.cgst : 0;
        let sgst_tax = result ? result.sgst : 0;
        let igst_tax = result ? result.igst : 0;
        total += tax;
        productFormValues.total_weight = weightFormat(totalWeight);
        productFormValues.rate = priceFormat(rate);
        productFormValues.sub_price = priceFormat(sub_price);
        //productFormValues.making_charge = priceFormat(making_charge);
        productFormValues.tax = priceFormat(tax);
        productFormValues.total = priceFormat(total);
        productFormValues.cgst_tax = priceFormat(cgst_tax);
        productFormValues.sgst_tax = priceFormat(sgst_tax);
        productFormValues.igst_tax = priceFormat(igst_tax);
        productFormValues.gst_type = gst_type;
        console.log('total - calculatePrice', total);
        
        this.setState({
            productFormValues: productFormValues
        })
    }

    getDefaultProductFormData = () => {
        return {
            productFormValues: {
                id: 0,
                product_id: '',
                product_type: '',
                product_name: '',
                certificate_no: '',
                size_id: '',
                worker_id: '',
                size_name: '',
                materials: [],
                tax_info: null,
                total_weight: 0,
                rate: 0,
                sub_price: 0,
                making_charge: 0,
                rep: 0,
                tax: 0,
                cgst_tax: 0,
                sgst_tax: 0,
                igst_tax: 0,
                total: 0,
                product_making_charge_type: '',
                product_making_charge: '',
                category_id: '',
                sub_category_id: '',
                gst_type: "igst"
            },
            productFormErros: {
                product_id: false,
                certificate_no: false,
                size_id: false,
                worker_id: false,
                category_id: false,
                sub_category_id: false
            },
            materialFormErros: []
        }
    }

    handleMaterialFormChange = (event, index, key) => {
        let productFormValues = {...this.state.productFormValues};
        let materials = [...productFormValues.materials];
        materials[index] = {... materials[index], [key] : event.target.value};
        //materials[index][key] = event.target.value;
        if (key == "unit_id") {
            let m = _.filter(this.state.unitList, { id: event.target.value });
            //materials[index].unit_name = m.length ? m[0].name : '';
            materials[index] = {... materials[index], unit_name : m.length ? m[0].name : ''};
        }
        productFormValues.materials = [...materials];

        this.setState({
            productFormValues: productFormValues
        }, () => {
            this.calculatePrice()
        })
    }

    updateProductMakingCharge = (event) => {
        let productFormValues = this.state.productFormValues;
        productFormValues.making_charge = event.target.value;
        let tax = 0;
        let making_charge = event.target.value ? parseFloat(event.target.value) : 0;
        let total = productFormValues.sub_price ? parseFloat(productFormValues.sub_price) : 0;
        total += making_charge;
        if (!isEmpty(productFormValues.rep)) {
            total += parseFloat(productFormValues.rep);
        }
        let result = null, gst_type = productFormValues.gst_type;
        if (productFormValues.tax_info) {
            result = calculateGST(productFormValues.tax_info, total, this.state.supplier_gst_no);
            tax = result ? result.total : 0;
            if(result)
                gst_type = result.type;
        }
        let cgst_tax = result ? result.cgst : 0;
        let sgst_tax = result ? result.sgst : 0;
        let igst_tax = result ? result.igst : 0;
        total += tax;
        productFormValues.tax = priceFormat(tax);
        productFormValues.total = priceFormat(total);
        productFormValues.cgst_tax = priceFormat(cgst_tax);
        productFormValues.sgst_tax = priceFormat(sgst_tax);
        productFormValues.igst_tax = priceFormat(igst_tax);
        productFormValues.gst_type = gst_type;
        console.log('total - updateProductMakingCharge', total);
        this.setState({
            productFormValues: productFormValues
        })
    }

    handleProductDialogClose = (event, reason) => {
        if (reason && reason == "backdropClick") return;
        this.setState({
            productDialog: false
        })
    }

    handleProductDelete = (index) => {
        this.setState({
            deletingIndex: index,
            deleteDialogOpen: true
        });
    }

    handleProductSubmit = async () => {
        let hasErr = this.productFormValidate();
        if (!hasErr) {
            //check certificate is unique
            let res = await checkCertificateNo({ certificate_no: this.state.productFormValues.certificate_no });
            if (res.data.success && res.data.data.is_exist) {
                return this.props.enqueueSnackbar("Certificate # is duplicate.", { variant: 'error' });
            }

            let formValues = { ...this.state.formValues };
            let products = [...formValues.products];
            let _data = { ...this.state.productFormValues };
            products.push(_data);
            formValues.products = [...products];
            this.setState({
                formValues: formValues,
                productFormValues: {
                    ...this.state.productFormValues,
                    certificate_no: '',
                    size_id: '',
                }
                //productDialog: false
            }, () => {
                this.handleCalculateMainPrice();
            });
            this.props.enqueueSnackbar("Product added successfully.", { variant: 'success' });
        }
    }

    productFormValidate = () => {
        let productFormValues = this.state.productFormValues;
        let productFormErros = this.state.productFormErros;
        let materialFormErros = this.state.materialFormErros;
        let hasErr = false;
        if (isEmpty(productFormValues.product_id)) {
            productFormErros.product_id = true;
            hasErr = true;
        } else {
            productFormErros.product_id = false;
        }
        if (productFormValues.product_type != 'material') {
            if (isEmpty(productFormValues.certificate_no)) {
                productFormErros.certificate_no = true;
                hasErr = true;
            } else {
                productFormErros.certificate_no = false;
            }
            if (isEmpty(productFormValues.size_id)) {
                productFormErros.size_id = true;
                hasErr = true;
            } else {
                productFormErros.size_id = false;
            }
        } else {
            productFormErros.certificate_no = false;
            productFormErros.size_id = false;
        }
        if (productFormValues.product_type == 'in_house') {
            /*if (isEmpty(productFormValues.worker_id)) {
                productFormErros.worker_id = true;
                hasErr = true;
            } else {
                productFormErros.worker_id = false;
            }*/
        }

        if (!productFormValues.materials.length) {
            hasErr = true;
        }
        for (let i = 0; i < productFormValues.materials.length; i++) {
            if (isEmpty(productFormValues.materials[i].weight)) {
                materialFormErros[i].weight = true;
                hasErr = true;
            } else {
                materialFormErros[i].weight = false;
            }
            /*if (isEmpty(productFormValues.materials[i].quantity)) {
                materialFormErros[i].quantity = true;
                hasErr = true;
            } else {
                materialFormErros[i].quantity = false;
            }*/
            if (isEmpty(productFormValues.materials[i].purity_id)) {
                materialFormErros[i].purity_id = true;
                hasErr = true;
            } else {
                materialFormErros[i].purity_id = false;
            }
            if (isEmpty(productFormValues.materials[i].purity_id)) {
                materialFormErros[i].purity_id = true;
                hasErr = true;
            } else {
                materialFormErros[i].purity_id = false;
            }
            if (isEmpty(productFormValues.materials[i].unit_id)) {
                materialFormErros[i].unit_id = true;
                hasErr = true;
            } else {
                materialFormErros[i].unit_id = false;
            }
            if (isEmpty(productFormValues.materials[i].rate)) {
                materialFormErros[i].rate = true;
                hasErr = true;
            } else {
                materialFormErros[i].rate = false;
            }
        }

        //check if has same certificate no
        if (!isEmpty(productFormValues.certificate_no) && productFormValues.product_type != "material") {
            for (let i = 0; i < this.state.formValues.products.length; i++) {
                if (productFormValues.certificate_no == this.state.formValues.products[i].certificate_no) {
                    hasErr = true;
                    this.props.enqueueSnackbar("Certificate # is duplicate.", { variant: 'error' });
                    break;
                }
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
            deletingIndex: 0
        })
    }

    returnDialogClose = () => {
        this.setState({
            returnDialogOpen: false
        })
    }

    handleDeleteConfirm = () => {
        let formValues = this.state.formValues;
        formValues.products.splice(this.state.deletingIndex, 1);
        this.setState({
            formValues: formValues,
            deleteDialogOpen: false
        }, () => {
            this.handleCalculateMainPrice()
        })
    }

    handleCalculateMainPrice = () => {
        let formValues = this.state.formValues;
        let return_products = this.state.return_products;
        let taxable_amount = 0, tax = 0, total_amount = 0, discount = 0, total_payable = 0, paid_amount = 0, due_amount = 0, cgst_tax = 0, sgst_tax = 0, igst_tax = 0, total_sub_total = 0;
        for (let i = 0; i < formValues.products.length; i++) {
            /*if(return_products[i].is_return){
                continue;
            }*/
            taxable_amount += (parseFloat(formValues.products[i].sub_price) + parseFloat(formValues.products[i].making_charge) + (formValues.products[i].rep ? parseFloat(formValues.products[i].rep) : 0));
            tax += formValues.products[i].tax ? parseFloat(formValues.products[i].tax) : 0;
            total_amount += parseFloat(formValues.products[i].total);
            cgst_tax += formValues.products[i].cgst_tax ? parseFloat(formValues.products[i].cgst_tax) : 0;
            sgst_tax += formValues.products[i].sgst_tax ? parseFloat(formValues.products[i].sgst_tax) : 0;
            igst_tax += formValues.products[i].igst_tax ? parseFloat(formValues.products[i].igst_tax) : 0;
            total_sub_total += parseFloat(formValues.products[i].sub_price);
            total_sub_total += parseFloat(formValues.products[i].making_charge);
        }
        taxable_amount = priceFormat(taxable_amount, true);
        tax = priceFormat(tax, true);
        total_amount = priceFormat(total_amount, true);
        if (!isEmpty(formValues.discount)) {
            discount = parseFloat(formValues.discount);
        }
        total_payable = priceFormat(total_amount - discount - this.state.return_amount, true);
        if (!isEmpty(formValues.paid_amount)) {
            paid_amount = parseFloat(formValues.paid_amount);
        }
        due_amount = priceFormat(total_payable - paid_amount, true);
        formValues.taxable_amount = taxable_amount;
        formValues.tax = tax;
        formValues.total_amount = total_amount;
        formValues.total_payable = total_payable;
        formValues.due_amount = due_amount;
        formValues.cgst_tax = priceFormat(cgst_tax, true);
        formValues.sgst_tax = priceFormat(sgst_tax, true);
        formValues.igst_tax = priceFormat(igst_tax, true);
        formValues.total_sub_total = priceFormat(total_sub_total);
        this.setState({
            formValues: formValues
        });
        console.log('okkkkk')
    }

    handleSubmit = () => {
        let formValues = this.state.formValues;
        let hasErr = this.formValidate();
        if (formValues.products.length == 0) {
            this.props.enqueueSnackbar('Please add at least one product', { variant: 'error' });
            return false;
        }
        if (!hasErr && formValues.products.length) {
            this.setState({
                submitting: true
            })
            if (this.state.isCreateFrom) {
                this.props.actions.purchaseStore(this.state.formValues);
            } else {
                this.props.actions.purchaseUpdate(this.state.formData.id, this.state.formValues);
            }
        }
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        if (isEmpty(formValues.supplier_id)) {
            formErros.supplier_id = true;
            hasErr = true;
        } else {
            formErros.supplier_id = false;
        }
        if (isEmpty(formValues.invoice_date)) {
            formErros.invoice_date = true;
            hasErr = true;
        } else {
            formErros.invoice_date = false;
        }
        /*if (isEmpty(formValues.paid_amount)) {
            formErros.paid_amount = true;
            hasErr = true;
        } else {
            formErros.paid_amount = false;
        }*/
        if (isEmpty(formValues.due_date)) {
            formErros.due_date = true;
            hasErr = true;
        } else {
            formErros.due_date = false;
        }
        if (!isEmpty(formValues.total_payable) && !isEmpty(formValues.paid_amount)) {
            if (parseFloat(formValues.paid_amount) > parseFloat(formValues.total_payable)) {
                hasErr = true;
                this.props.enqueueSnackbar('Paid amount must be less than or equal to payable amount.', { variant: 'error' });
            }
        }
        this.setState({
            formErros: formErros
        });
        return hasErr;
    }

    getSupplierDetails = () => {
        if (!isEmpty(this.state.formValues.supplier_id)) {
            console.log('this.state.supplierList', this.state.supplierList)
            let m = _.filter(this.state.supplierList, { id: this.state.formValues.supplier_id });
            if (m.length) {
                this.setState({
                    supplier_details: {
                        ...this.state.supplier_details,
                        name: (!isEmpty(m[0].name)) ? m[0].name : '',
                        company_name: (!isEmpty(m[0].company_name)) ? m[0].company_name : '',
                        mobile: (!isEmpty(m[0].mobile)) ? m[0].mobile : '',
                        city: (!isEmpty(m[0].city)) ? m[0].city : '',
                        gst: (!isEmpty(m[0].gst)) ? m[0].gst : '',
                        address: (!isEmpty(m[0].address)) ? m[0].address : '',
                        pincode: (!isEmpty(m[0].pincode)) ? m[0].pincode : '',
                    }
                })
                let details = [];
                if (!isEmpty(m[0].company_name)) {
                    details.push("Company: <strong>" + m[0].company_name + "</strong>");
                }
                if (!isEmpty(m[0].mobile)) {
                    details.push("Mobile: <strong>" + m[0].mobile + "</strong>");
                }
                if (!isEmpty(m[0].city)) {
                    details.push("City: <strong>" + m[0].city + "</strong>");
                }
                if (!isEmpty(m[0].gst)) {
                    details.push("GST: <strong>" + m[0].gst + "</strong>");
                }
                if (!isEmpty(m[0].address)) {
                    details.push("Address: <strong>" + m[0].address + "</strong>");
                }
                if (!isEmpty(m[0].pincode)) {
                    details.push("Pincode: <strong>" + m[0].pincode + "</strong>");
                }
                return details.length ? details.join(", ") : '';
            }
        }

    }

    handleCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'category_id');
        if (isEmpty(event.target.value)) {
            this.props.dispatch({
                type: RESET_SUB_CATEGORY_LIST
            })
        } else {
            this.props.actions.subCategoryList({ all: 1, category_id: event.target.value });
        }
        this.updateProductFormValues("", 'sub_category_id');
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: RESET_PRODUCT_LIST
        })

    }

    handleSubCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'sub_category_id');
        this.props.actions.productList({ all: 1, sub_category_id: event.target.value });
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: RESET_PRODUCT_LIST
        })
    }

    handleCheckBox = (e, index) => {
        let products = this.state.formValues.products;
        let return_products = this.state.return_products;
        let product = products[index];
        if(product.product_type == "material"){
            this.setState({
                materialReturnDialog: true,
                actionProductIndex: index
            })
            return;
        }
        return_products[index].is_return = e.target.checked;
        this.setState({
            return_products: return_products
        }, () => {
            this.calculateReturnAmount();
        })
    }

    handleReturn = () => {
        this.setState({
            returnDialogOpen: true
        })
    }

    handleReturnConfirm = async() => {
        let res = await purchaseReturn(this.state.formData.id, {
            return_products: this.state.return_products,
            return_data: this.state.formValues,
            return_amount: this.state.return_amount,
            return_date: this.state.return_date
        });
        if(res.data.success){
            this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
            this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases');
        }else{
            this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
        }
    }

    handleReturnDialogClose = (event, reason) => {
        if (reason && reason == "backdropClick") return;
        this.setState({
            materialReturnDialog: false
        })
    }

    handleCancelReturn = () => {
        let { formValues, actionProductIndex, return_products } = this.state;
        formValues.products[actionProductIndex].materials[0].return_weight = 0;
        formValues.products[actionProductIndex].materials[0].return_qty = 0;
        return_products[actionProductIndex].is_return = false;
        this.setState({
            return_products: return_products,
            formValues: formValues,
            materialReturnDialog: false
        })

    }

    handleReturnMaterialSubmit = () => {
        let { formValues, actionProductIndex } = this.state;
        const actionProduct = formValues.products[actionProductIndex];
        let err = false;
        if(!actionProduct.materials[0].return_weight || parseFloat(actionProduct.materials[0].return_weight) > parseFloat(actionProduct.materials[0].avl_weight)){
            err = true;
            this.setState({
                return_weight_error: true
            })
            if(parseFloat(actionProduct.materials[0].return_weight) > parseFloat(actionProduct.materials[0].avl_weight)){
                this.props.enqueueSnackbar("Weight can't be more than available weight.", { variant: 'error' });
            }
        }else{
            this.setState({
                return_weight_error: false
            })
        }
        if(!actionProduct.materials[0].return_qty || parseFloat(actionProduct.materials[0].return_qty) > parseFloat(actionProduct.materials[0].avl_qty)){
            err = true;
            this.setState({
                return_qty_error: true
            })
            if(parseFloat(actionProduct.materials[0].return_qty) > parseFloat(actionProduct.materials[0].avl_qty)){
                this.props.enqueueSnackbar("Quantity can't be more than available quantity.", { variant: 'error' });
            }
        }else{
            this.setState({
                return_qty_error: false
            })
        }
        if(!err){
            let return_products = this.state.return_products;
            return_products[actionProductIndex].is_return = true;
            this.setState({
                materialReturnDialog: false,
                return_products: return_products
            }, () => {
                this.calculateReturnAmount();
            })
        }
    }

    calculateReturnAmount = () => {
        let { formValues, actionProductIndex } = this.state;
        let return_products = this.state.return_products;
        let return_amount = 0;
        for(let i = 0; i < return_products.length; i++){
            if(return_products[i].is_return){
                if(formValues.products[i].product_type == "material"){
                    let thisAmt = priceFormat(parseFloat(formValues.products[i].materials[0].return_weight) * parseFloat(formValues.products[i].materials[0].rate));
                    return_amount += thisAmt;
                    formValues.products[i].return_amount = thisAmt;
                }else{
                    let thisAmt = priceFormat(parseFloat(formValues.products[i].sub_price) + parseFloat(formValues.products[i].making_charge));
                    return_amount += thisAmt;
                    formValues.products[i].return_amount = thisAmt
                }
            }
        }
        this.setState({
            return_amount: return_amount,
            formValues: formValues
        })
    }

    handleReturnMaterial = (val, key) => {
        let { formValues, actionProductIndex } = this.state;
        formValues.products[actionProductIndex].materials[0][key] = val;
        this.setState({
            formValues: formValues
        })
    }

    hasReturn = () => {
        let isReturn = false;
        for(let i = 0; i < this.state.return_products.length; i++){
            if(this.state.return_products[i].is_return){
                isReturn = true;
                break;
            }
        }
        return isReturn;
    }

    setOpen = (id) => {
        let view_open = this.state.view_open;
        view_open[id] = !this.checkOpen(id);
        this.setState({
          view_open: view_open
        })
    }

    checkOpen = (id) => {
        let view_open = this.state.view_open;
        return (id in view_open && view_open[id]) ? true : false;
    }

    render() {
        const { formValues, formErros, productFormValues, productFormErros, materialFormErros, submitting, actionProductIndex } = this.state;
        const actionProduct = formValues.products.length ? formValues.products[actionProductIndex] : null;
        console.log('actionProduct', actionProduct)
        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                <Grid container spacing={2} className='tax-input loans_view p_view'>
                    <Grid item xs={!formValues.supplier_id ? 6 : 4} className='create-input'>
                        <FormControl fullWidth error={formErros.supplier_id}>
                            <InputLabel>Supplier</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.supplier_id}
                                fullWidth
                                label="Supplier"
                                onChange={this.handleSupplierChange}
                                disabled={!this.state.isCreateFrom}
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            >
                                <MenuItem value=""></MenuItem>
                                {
                                    this.state.supplierList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name} </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        formValues.supplier_id ?
                        <>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="Owner Name"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.name}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="GST Number"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.gst}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="Mobile Number"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.mobile}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        </>
                        : null
                    }
                    {
                        !formValues.supplier_id ?
                        <Grid item xs={3} className='create-input'>
                            <TextField
                                label="Invoice Number"
                                variant="outlined"
                                fullWidth
                                value={formValues.invoice_number}
                                onChange={(event) => this.handleDefaultChange(event, 'invoice_number')}
                                disabled={!this.state.isCreateFrom}
                            />
                        </Grid>
                        : null
                    }
                    <Grid item xs={!formValues.supplier_id ? 3 : 2} className='p-invoice-date create-input'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Invoice Date"
                                value={formValues.invoice_date}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => this.updateFormValues(newValue, 'invoice_date')}
                                disabled={!this.state.isCreateFrom}
                                renderInput={(params) => <TextField {...params} error={formErros.invoice_date} InputProps={{
                                    className: "non_disable_text"
                                }} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {
                        formValues.supplier_id ?
                        <>
                        <Grid item xs={6} className='create-input'>
                            <TextField
                                label="Full Address"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.address}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="City"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.city}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="PinCode"
                                variant="outlined"
                                fullWidth
                                value={this.state.supplier_details.pincode}
                                disabled
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className='create-input'>
                            <TextField
                                label="Invoice Number"
                                variant="outlined"
                                fullWidth
                                value={formValues.invoice_number}
                                onChange={(event) => this.handleDefaultChange(event, 'invoice_number')}
                                disabled={!this.state.isCreateFrom}
                                InputProps={{
                                    className: "non_disable_text"
                                }}
                            />
                        </Grid>
                        </>
                        : null
                    }
                </Grid>
                <Grid container spacing={2} className='loans_view tax-input'>
                    <Grid item xs={12} className='p-add-product create-input'>
                        <h3 className='p_heading_list mb-0 mt-0'>Product List {this.state.isCreateFrom ?<Button variant="contained" className='add-button' onClick={() => this.handleAddNewProduct()} style={{width: "140px"}}>Add Product</Button> : null}</h3>
                        {
                            this.state.productDialog ?
                            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                                <Grid container spacing={2} className='loans_view tax-input p_view'>
                                    <Grid item xs={3}>
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
                                    <Grid item xs={2}>
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
                                    <Grid item xs={productFormValues.product_type == "in_house" ? 3 : 3}>
                                        {/*<FormControl fullWidth error={productFormErros.product_id}>
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
                                        </FormControl>*/}
                                        <Autocomplete
                                        className='autocomplete-selectbox'
                                            fullWidth
                                            options={this.state.productList}
                                            autoHighlight
                                            getOptionLabel={(option) => (option.name + " | " + option.product_code)}
                                            renderInput={(params) => (
                                                <TextField
                                                {...params}
                                                label="Product"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password'
                                                }}
                                                fullWidth
                                                error={productFormErros.product_id}
                                                />
                                            )}
                                            onChange={(event, newValue) => {
                                                this.handleProductChange(event, newValue ? newValue.id : '')
                                            }}
                                            />
                                    </Grid>
                                    {
                                        productFormValues.product_type != "material" ?
                                            <>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        label="Certificate Number"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={productFormValues.certificate_no}
                                                        onChange={(event) => this.handleProductFormDefaultChange(event, 'certificate_no')}
                                                        error={productFormErros.certificate_no}
                                                    />
                                                </Grid>
                                                <Grid item xs={productFormValues.product_type == "in_house" ? 2 : 2}>
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
                                    </Grid>
                                    <Grid container spacing={2} className='loans_view tax-input'>
                                    <Grid item xs={12} className='border-radius-0'>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='ratn-table-add-wrapper'>
                                                <TableHead className='ratn-table-header'>
                                                    <TableRow>
                                                        <TableCell sx={{width: '170px'}}>Material Name</TableCell>
                                                        <TableCell>Purity</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                        <TableCell>Weight</TableCell>
                                                        <TableCell>Unit</TableCell>
                                                        <TableCell>Rate</TableCell>
                                                        <TableCell>Amount</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='p-invoice-date'>
                                                    {
                                                        productFormValues.materials.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{item.material_name}</TableCell>
                                                                <TableCell style={{ minWidth: '150px' }}>
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
                                                                <TableCell style={{ minWidth: '150px' }}>
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
                                                                <TableCell>
                                                                    <TextField
                                                                        label="Rate"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        value={item.rate}
                                                                        onChange={(event) => this.handleMaterialFormChange(event, index, 'rate')}
                                                                        InputProps={{
                                                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                                        }}
                                                                        error={materialFormErros[index].rate}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        label="Amount"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        value={item.amount}
                                                                        disabled
                                                                        error={materialFormErros[index].amount}
                                                                        InputProps={{
                                                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    </Grid>
                                    <Grid container spacing={2} className='loans_view tax-input p_view'>
                                    {
                                        productFormValues.materials.length > 1 ?
                                        <Grid item xs={2}>
                                            <TextField
                                                label="TOT.WT(IN GRAM)"
                                                variant="outlined"
                                                fullWidth
                                                value={productFormValues.total_weight}
                                                disabled
                                            />
                                        </Grid>
                                        : null
                                    }
                                    <Grid item xs={2}>
                                        <TextField
                                            label="SUB TOTAL"
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.sub_price}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="MAKING CHARGE"
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.making_charge}
                                            onChange={(event) => this.updateProductMakingCharge(event)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="REP/TRANS/ETC"
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.rep}
                                            onChange={(event) => this.updateProductFormValues(event.target.value, 'rep')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="TAX"
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.tax}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    {productFormValues.gst_type == "igst" ? (productFormValues.tax_info ? productFormValues.tax_info.igst : "0") : (productFormValues.tax_info ? (productFormValues.tax_info.cgst + productFormValues.tax_info.sgst) : "0")}   % ₹
                                                </InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            label="TOTAL"
                                            variant="outlined"
                                            fullWidth
                                            value={productFormValues.total}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ paddingBottom: '15px' }}>
                                        <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                                            <Button variant="contained" className='conf-button' type="button" onClick={this.handleProductSubmit}>Save</Button>
                                            <Button variant="outlined" className='close-button' onClick={this.handleProductDialogClose}>Cancel</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                            : null
                        }
                        <TableContainer component={Paper} className='ratn-table-wrapper mt-10 purchase-table'>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table-bordered'>
                                    <TableHead className='ratn-table-header p_view'>
                                        <TableRow>
                                            {
                                                !this.state.isCreateFrom ?
                                                <TableCell></TableCell>
                                                : null
                                            }
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Certificate No</TableCell>
                                            <TableCell>Total Weight</TableCell>
                                            <TableCell>Size</TableCell>
                                            <TableCell>Material Details &</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Making</TableCell>
                                            <TableCell>ETC</TableCell>
                                            <TableCell>Sub Total</TableCell>
                                            <TableCell>Tax</TableCell>
                                            <TableCell>Total</TableCell>
                                            {
                                                this.state.isCreateFrom ?
                                                <TableCell sx={{width: '60px'}}>Action</TableCell>
                                                : null
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            formValues.products.map((item, index) => (
                                                <React.Fragment key={index} >
                                                <TableRow className={('is_return' in item && item.is_return) ? "strike_through" : ""}>
                                                    {
                                                        !this.state.isCreateFrom ?
                                                        <TableCell>
                                                            {
                                                                !item.is_return ? 
                                                                <Checkbox onChange={(e) => this.handleCheckBox(e, index)} checked={this.state.return_products[index].is_return} />
                                                                : null
                                                            }

                                                            {
                                                                (!item.is_return && item.product_type == "material" && item.materials[0].return_weight) ? 
                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() => this.setOpen(item.id)}
                                                                >
                                                                    {this.checkOpen(item.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                </IconButton>
                                                                : parseNonNullablePickerDate
                                                            }
                                                            
                                                        </TableCell>
                                                        : null
                                                    }
                                                    <TableCell>{item.product_name}</TableCell>
                                                    <TableCell>{item.certificate_no ? item.certificate_no : "-"}</TableCell>
                                                    <TableCell>
                                                        {
                                                            item.materials.length == 1 ? 
                                                            <>
                                                                {
                                                                    !this.state.isCreateFrom ?
                                                                    (weightFormat(parseFloat(item.materials[0].avl_weight) - parseFloat((item.materials[0].return_weight) ? item.materials[0].return_weight : 0)) + " " + item.materials[0].unit_name)
                                                                    :
                                                                    weightFormat(item.materials[0].weight) + " " + item.materials[0].unit_name
                                                                }
                                                            </>
                                                            :
                                                            (item.total_weight + " Gram")
                                                        }
                                                    </TableCell>
                                                    <TableCell>{item.size_name ? item.size_name : "-"}</TableCell>
                                                    <TableCell>
                                                        {
                                                            item.materials.map((m, key) => (
                                                                <p key={key} className="purchase-material m-0" style={{color: "#000"}}>
                                                                    {m.material_name} &nbsp; {(!this.state.isCreateFrom && m.quantity) ? <>{m.avl_qty - parseInt(m.return_qty ? m.return_qty : 0)} Qty&nbsp;</>:null} {m.weight} &nbsp; {m.unit_name} &nbsp; x &nbsp; {m.rate}
                                                                </p>
                                                            ))
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            item.materials.map((m, key) => (
                                                                <p key={key} className="purchase-material m-0" style={{color: "#000"}}>
                                                                    = &nbsp; {m.amount}
                                                                </p>
                                                            ))
                                                        }
                                                    </TableCell>
                                                    <TableCell>{priceFormat(item.making_charge)}</TableCell>
                                                    <TableCell>{priceFormat(item.rep)}</TableCell>
                                                    <TableCell>{priceFormat(parseFloat(item.sub_price) + parseFloat(item.making_charge))}</TableCell>
                                                    <TableCell>{priceFormat(item.tax)}</TableCell>
                                                    <TableCell>{priceFormat(item.total)}</TableCell>
                                                    {
                                                        this.state.isCreateFrom ?
                                                        <TableCell>
                                                            <IconButton className='del-icon' color="error" component="label" onClick={() => this.handleProductDelete(index)}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        : null
                                                    }
                                                </TableRow>
                                                {
                                                    (!this.state.isCreateFrom && item.materials.length == 1 && this.checkOpen(item.id)) ?
                                                    <TableRow className='table-inner-row'>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                                    <Collapse in={this.checkOpen(item.id)} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                        </Typography>
                                                        <Table size="medium" aria-label="purchases">
                                                            <TableHead>
                                                            <TableRow className='pur-details-inner-table'>
                                                                <TableCell>Quantity</TableCell>
                                                                <TableCell>Weight</TableCell>
                                                                <TableCell>Unit</TableCell>
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody className='pur-details-table-body'>
                                                                <TableRow>
                                                                    <TableCell scope="row">
                                                                        {item.materials[0].return_qty}
                                                                    </TableCell>
                                                                    <TableCell> {item.materials[0].return_weight}</TableCell>
                                                                    <TableCell>{item.materials[0].unit_name}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                        </Box>
                                                    </Collapse>
                                                    </TableCell>
                                                    </TableRow>
                                                    : null
                                                }
                                                </React.Fragment>
                                            ))
                                        }
                                        {
                                            formValues.products.length > 0 ?
                                            <TableRow>
                                                <TableCell colSpan={this.state.isCreateFrom ? 8 : 9}></TableCell>
                                                <TableCell>
                                                    <b>Sub Total<br/>
                                                    {priceFormat(formValues.total_sub_total)}
                                                    </b>
                                                </TableCell>
                                                <TableCell>
                                                <b>
                                                    Tax<br/>
                                                    {priceFormat(formValues.tax)}
                                                    </b>
                                                </TableCell>
                                                <TableCell colSpan="2">
                                                <b>
                                                    Total Amount<br/>
                                                    {priceFormat(formValues.total_amount)}
                                                    </b>
                                                </TableCell>
                                            </TableRow>
                                            : null
                                        }
                                    </TableBody>
                                </Table>
                        </TableContainer>
                    </Grid>
                    <>
                    <Grid item xs={8} className='create-input pt-0'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{paddingTop : '5px'}}>
                                <TextareaAutosize
                                    className='description'
                                    minRows={3}
                                    placeholder="Notes"
                                    style={{ width: '100%' }}
                                    value={formValues.notes}
                                    onChange={(event) => this.handleDefaultChange(event, 'notes')}
                                />
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className='create-input pt-0' style={{ paddingRight: '16px' }}>
                        <Grid container spacing={2}>
                            {/*<Grid item xs={12}>
                                <TextField
                                    label="Sub Total"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.taxable_amount}
                                    disabled
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                    }}
                                />
                            </Grid>*/}
                            {
                            !this.hasReturn() ? 
                            <>
                            {
                                formValues.cgst_tax > 0 ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    CGST Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                    <TextField
                                        fullWidth
                                        value={formValues.cgst_tax}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            className: "non_disable_text"
                                        }}
                                    />
                                    </Grid>
                                    </Grid>
                                </Grid>
                                : null
                            }
                            {
                                formValues.sgst_tax > 0 ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2}className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    SGST Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                        <TextField
                                            fullWidth
                                            value={formValues.sgst_tax}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                className: "non_disable_text"
                                            }}
                                        />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : null
                            }
                            {
                                formValues.igst_tax > 0 ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    IGST Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                    <TextField
                                    className='ft-amount'
                                        fullWidth
                                        value={formValues.igst_tax}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            className: "non_disable_text"
                                        }}
                                    />
                                    </Grid>
                                </Grid>
                                </Grid>
                                : null
                            }
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                        Tax Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                        <TextField
                                        className='ft-amount'
                                            fullWidth
                                            value={formValues.tax}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                className: "non_disable_text"
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Total Amount
                                    </Grid>
                                <Grid item xs={6} className="pt-0">
                                <TextField
                                className='ft-amount'
                                    fullWidth
                                    value={formValues.total_amount}
                                    disabled
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        className: "non_disable_text"
                                    }}
                                />
                                </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Cash Discount
                                    </Grid>
                                <Grid item xs={6} className="pt-0">
                                    <TextField
                                    className='ft-amount'
                                        fullWidth
                                        value={formValues.discount}
                                        onChange={(event) => this.handleDefaultChange(event, 'discount')}
                                        disabled={!this.state.isCreateFrom}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            className: "non_disable_text"
                                        }}
                                    />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {
                                !this.state.isCreateFrom ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                        Return Amount
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <TextField
                                                className='ft-amount'
                                                fullWidth
                                                value={this.state.return_amount}
                                                disabled
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                    className: "non_disable_text"
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : null

                            }
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Total Payable
                                    </Grid>
                                <Grid item xs={6} className="pt-0">
                                    <TextField
                                    className='ft-amount'
                                        fullWidth
                                        value={formValues.total_payable}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            className: "non_disable_text"
                                        }}
                                    />
                                </Grid>
                                </Grid>
                            </Grid>
                            </>
                            :
                            <>
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Return Product Amt
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                        <TextField
                                            className='ft-amount'
                                            fullWidth
                                            value={this.state.return_amount}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                className: "non_disable_text"
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Return Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                        <TextField
                                            className='ft-amount'
                                            fullWidth
                                            value={this.state.return_amount}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                className: "non_disable_text"
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            </>
                            }
                            <Grid item xs={12} className="pt-5">
                                <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Payment Mode
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                    <FormControl fullWidth className='ft-amount'>
                                    <Select
                                        className='input-inner'
                                        value={formValues.payment_mode}
                                        fullWidth
                                        onChange={(event) => this.handleDefaultChange(event, 'payment_mode')}
                                    >
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="cheque">Cheque</MenuItem>
                                        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                                        <MenuItem value="online">Online</MenuItem>
                                    </Select>
                                </FormControl>
                                </Grid>
                                </Grid>
                            </Grid>
                            {
                                (formValues.payment_mode == "imps_neft" || formValues.payment_mode == "upi") ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                        Transaction No
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <TextField
                                            className='ft-amount'
                                                fullWidth
                                                value={formValues.transaction_no}
                                                onChange={(event) => this.handleDefaultChange(event, 'transaction_no')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : null
                            }
                            {
                                (formValues.payment_mode == "cheque") ?
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                        Cheque No
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <TextField
                                            className='ft-amount'
                                                fullWidth
                                                value={formValues.cheque_no}
                                                onChange={(event) => this.handleDefaultChange(event, 'cheque_no')}
                                            /> 
                                        </Grid>
                                    </Grid>
                                </Grid>
                                : null
                            }

                            {
                                !this.hasReturn() ?
                                <>
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                        Pay Now
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <TextField
                                                className='ft-amount'
                                                fullWidth
                                                value={formValues.paid_amount}
                                                onChange={(event) => this.handleDefaultChange(event, 'paid_amount')}
                                                error={formErros.paid_amount}
                                                disabled={!this.state.isCreateFrom}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                    className: "non_disable_text"
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className="pt-5">
                                    <Grid container spacing={2} className="display_center">
                                    <Grid item xs={6} className="text-right pt-0">
                                    Due Amount
                                    </Grid>
                                    <Grid item xs={6} className="pt-0">
                                        <TextField
                                        className='ft-amount'
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
                                </Grid>
                                <Grid item xs={12} className='p-invoice-date create-input pt-5'>
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                            Due Date
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className='ft-amount'
                                                    value={formValues.due_date}
                                                    fullWidth
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={(newValue) => this.updateFormValues(newValue, 'due_date')}
                                                    renderInput={(params) => <TextField fullWidth {...params} error={formErros.due_date} />}
                                                    disabled={!this.state.isCreateFrom}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </>
                                :
                                <Grid item xs={12} className='p-invoice-date create-input pt-5'>
                                    <Grid container spacing={2} className="display_center">
                                        <Grid item xs={6} className="text-right pt-0">
                                            Return Date
                                        </Grid>
                                        <Grid item xs={6} className="pt-0">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className='ft-amount'
                                                    value={this.state.return_date}
                                                    fullWidth
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={(newValue) => this.setState({return_date: newValue})}
                                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end" style={{ paddingRight: '16px', paddingBottom: '16px' }}>
                            {
                                this.state.isCreateFrom ?
                                <LoadingButton
                                    className='conf-button'
                                    variant="contained"
                                    type="button"
                                    loading={submitting}
                                    disabled={submitting}
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </LoadingButton>
                                :
                                <>
                                    {
                                        this.state.return_products.length ?
                                        <Button variant="outlined" type="button" className='conf-button' onClick={this.handleReturn}>Return</Button>
                                        : null
                                    }
                                </>
                                
                            }
                            {
                                !submitting ?
                                    <Button variant="outlined" className='close-button' onClick={() => this.props.navigate(-1)}>Cancel</Button>
                                    : null
                            }
                        </Stack>
                    </Grid>
                    </>

                </Grid>

                {/*<Dialog
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
                                <Grid item xs={2}>
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
                                <Grid item xs={2}>
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
                                <Grid item xs={productFormValues.product_type == "in_house" ? 3 : 4}>
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
                                            <Grid item xs={2}>
                                                <TextField
                                                    label="Certificate Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={productFormValues.certificate_no}
                                                    onChange={(event) => this.handleProductFormDefaultChange(event, 'certificate_no')}
                                                    error={productFormErros.certificate_no}
                                                />
                                            </Grid>
                                            <Grid item xs={productFormValues.product_type == "in_house" ? 1 : 2}>
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
                                                    <TableCell>Rate</TableCell>
                                                    <TableCell>Amount</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className='p-invoice-date'>
                                                {
                                                    productFormValues.materials.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{item.material_name}</TableCell>
                                                            <TableCell style={{ minWidth: '150px' }}>
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
                                                            <TableCell style={{ minWidth: '150px' }}>
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
                                                            <TableCell>
                                                                <TextField
                                                                    label="Rate"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    value={item.rate}
                                                                    onChange={(event) => this.handleMaterialFormChange(event, index, 'rate')}
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                                    }}
                                                                    error={materialFormErros[index].rate}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    label="Amount"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    value={item.amount}
                                                                    disabled
                                                                    error={materialFormErros[index].amount}
                                                                    InputProps={{
                                                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="TOT.WT(IN GRAM)"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.total_weight}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="SUB TOTAL"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.sub_price}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="MAKING CHARGE"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.making_charge}
                                        onChange={(event) => this.updateProductMakingCharge(event)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="REP/TRANS/ETC"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.rep}
                                        onChange={(event) => this.updateProductFormValues(event.target.value, 'rep')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="TAX"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.tax}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="TOTAL"
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.total}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                                        <Button variant="contained" className='conf-button' type="button" onClick={this.handleProductSubmit}>Add Product</Button>
                                        <Button variant="outlined" className='close-button' onClick={this.handleProductDialogClose}>Cancel</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                </Dialog>*/}

                <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDialogClose}
                    fullWidth
                    maxWidth="xs"
                    className="ratn-dialog-wrapper"
                >
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to delete this record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                            <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                            <Button variant="contained" type="button" onClick={this.handleDeleteConfirm}>Yes, Confirm</Button>
                        </Stack>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.returnDialogOpen}
                    onClose={this.returnDialogClose}
                    fullWidth
                    maxWidth="xs"
                    className="ratn-dialog-wrapper"
                >
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to return these product(s)?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                            <Button variant="outlined" onClick={this.returnDialogClose}>Cancel</Button>
                            <Button variant="contained" type="button" onClick={this.handleReturnConfirm}>Yes, Confirm</Button>
                        </Stack>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.materialReturnDialog}
                    onClose={this.handleReturnDialogClose}
                    fullWidth
                    maxWidth="md"
                    className="ratn-dialog-wrapper"
                >
                <DialogTitle>Return Product</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <Box sx={{ flexGrow: 1, m: 0.5 }}>
                        {
                            actionProduct ?
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.product_name}
                                        disabled
                                        InputProps={{
                                            className: "non_disable_text"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Purity"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.materials[0].purity_name}
                                        disabled
                                        InputProps={{
                                            className: "non_disable_text"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Avl Qty"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.materials[0].avl_qty}
                                        disabled
                                        InputProps={{
                                            className: "non_disable_text"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="Avl Weight"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.materials[0].avl_weight}
                                        disabled
                                        InputProps={{
                                            className: "non_disable_text",
                                            endAdornment: <InputAdornment position="start">{actionProduct.materials[0].unit_name}</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.materials[0].return_qty}
                                        onChange={(event) => this.handleReturnMaterial(event.target.value, 'return_qty')}
                                        error={this.state.return_qty_error}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Weight"
                                        variant="outlined"
                                        fullWidth
                                        value={actionProduct.materials[0].return_weight}
                                        onChange={(event) => this.handleReturnMaterial(event.target.value, 'return_weight')}
                                        error={this.state.return_weight_error}
                                        InputProps={{
                                            className: "non_disable_text",
                                            endAdornment: <InputAdornment position="start">{actionProduct.materials[0].unit_name}</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                                        <Button variant="outlined" onClick={this.handleReturnDialogClose}>Close</Button>
                                        {
                                            this.state.return_products.length && this.state.return_products[actionProductIndex].is_return ? 
                                            <Button variant="outlined" onClick={this.handleCancelReturn}>Cancel Return</Button>
                                            : null
                                        }
                                        <Button variant="contained" type="button" onClick={this.handleReturnMaterialSubmit}>Save</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                            : null
                        }
                    </Box>
                </DialogContent>
                </Dialog>
            </Box>
        )

    }

}

const mapStateToProps = (state) => ({
    supplierList: state.admin.supplier.items,
    productList: state.superadmin.product.items,
    unitList: state.superadmin.unit.items,
    actionCalled: state.admin.purchase.actionCalled,
    createSuccess: state.admin.purchase.createSuccess,
    editSuccess: state.admin.purchase.editSuccess,
    successMessage: state.admin.purchase.successMessage,
    errorMessage: state.admin.purchase.errorMessage,
    auth: state.auth,
    categoryList: state.superadmin.category.items,
    subCategoryList: state.superadmin.subCategory.items,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({
        purchaseStore,
        purchaseUpdate,
        supplierList,
        productList,
        unitList,
        categoryList,
        subCategoryList,
    }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'PurchaseForm'
})(PurchaseForm))));