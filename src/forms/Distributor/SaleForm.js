import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ToggleButtonGroup, ToggleButton, FormLabel, ImageList, ImageListItem, InputAdornment, IconButton, RadioGroup, Radio, Collapse } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import { calculateAdminProductPrice, priceFormat, getValuesFromKey, isEmpty, convertToString, calculateGST, displayAmount, weightFormat } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { salesStore, salesUpdate } from 'actions/distributor/sales.actions';
import { stocksProductList, stocksProducDetails } from 'actions/distributor/stocks.actions';
import { materialPriceProductPriceInfo } from 'actions/distributor/materialPrice.actions';
import { retailerList } from 'actions/distributor/retailer.actions';
import { productList } from 'actions/distributor/product.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { withSnackbar } from 'notistack';
const { updateSyncErrors } = require('redux-form/lib/actions').default;
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
import { DISTRIBUTOR_RESET_SALES } from '../../actionTypes/distributor/sales.types';
import { DISTRIBUTOR_RESET_SUB_CATEGORY_LIST } from '../../actionTypes/distributor/subCategory.types';
import { DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS_RESET } from '../../actionTypes/distributor/stocks.types';
import { subCategoryList } from 'actions/distributor/subCategory.actions';
import { categoryList } from 'actions/distributor/category.actions';
import moment from 'moment';
import { orderView } from 'actions/distributor/order.actions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { saleCartDelete, saleCartListRaw } from 'actions/distributor/saleCart.actions';
import { formValues } from 'redux-form';


class SaleForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
            formData: formData,
            isCreateFrom: !formData,
            retailerList: this.props.retailerList,
            productList: this.props.productList,
            productPriceInfo: this.props.productPriceInfo,
            stockProductList: this.props.stockProductList,
            stockProductDetails: this.props.stockProductDetails,
            categoryList: this.props.categoryList,
            subCategoryList: this.props.subCategoryList,
            materialList: [],
            sizeList: [],
            materials: [],
            product_type: '',
            productDialog: false,
            user_gst_no: '',
            formValues: {
                user_id: '',
                invoice_number: '',
                invoice_date: moment().format('MM/DD/YYYY'),
                products: [],
                notes: '',
                payment_mode: 'cash',
                transaction_no: '',
                cheque_no: '',
                taxable_amount: '',
                total_amount: '',
                discount: '',
                total_payable: '',
                paid_amount: '',
                due_amount: '',
                due_date: '',
                cgst_tax: '',
                sgst_tax: '',
                igst_tax: '',
                settlement_date: ''
            },
            formErros: {
                user_id: false,
                invoice_number: false,
                invoice_date: false,
                notes: false,
                payment_mode: false,
                transaction_no: false,
                total_amount: false,
                tax: false,
                discount: false,
                sub_total: false,
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
            order_id: this.props.order_id,
            order: this.props.order,
            cartList: []
        }

    }

    componentDidMount() {
        //this.props.actions.productList({all: 1});
        this.props.actions.retailerList({ all: 1 });
        //this.props.actions.stocksProductList();
        this.props.actions.categoryList({ all: 1 });
        if (this.state.formData) {
            let formValues = { ...this.state.formData };
            this.setState({
                formValues: formValues
            })
        }
        if (this.state.order_id) {
            this.props.actions.orderView(this.state.order_id);
        }

        this.loadCart();
    }

    loadCart = async () => {
        let response = await saleCartListRaw();
        if(response.data.success){
            let cartList = response.data.data.items;
            let products = [];
            for(let i = 0; i < cartList.length; i++){
                let cart = cartList[i];
                let materials = [];
                for (let item of cart.materials) {
                    materials.push({
                        id: item.id,
                        material_id: item.material_id,
                        material_name: item.material_name,
                        weight: item.weight,
                        quantity: item.quantity,
                        unit_name: item.unit_name,
                        unit_id: item.unit_id,
                        purity: item.purity,
                        purity_id: item.purity_id,
                        amount: item.amount,
                        rate: item.rate,
                        discount_percent: item.discount_percent,
                        discount_amount: item.discount_amount,
                        total_gram: item.total_gram,
                    });
                }
                let result2 = calculateGST(cart.tax_info, (parseFloat(cart.sub_price) + parseFloat(cart.making_charge) + parseFloat(cart.rep)), this.state.user_gst_no);
                let cgst_tax = result2 ? result2.cgst : 0;
                let sgst_tax = result2 ? result2.sgst : 0;
                let igst_tax = result2 ? result2.igst : 0;
                let total_tax = priceFormat(cgst_tax + sgst_tax + igst_tax);
                let total = priceFormat(cart.total_amount + parseFloat(cart.rep) + cgst_tax + sgst_tax + igst_tax);
                products.push({
                    id: cart.id,
                    product_id: cart.product_id,
                    product_type: cart.product_type,
                    product_name: cart.product_name,
                    certificate_no: cart.certificate_no,
                    size_id: cart.size_id,
                    size_name: cart.size_name,
                    materials: materials,
                    making_charge: cart.making_charge,
                    making_charge_discount_percent: cart.making_charge_discount_percent,
                    making_charge_discount_amount: cart.making_charge_discount_amount,
                    total_discount: cart.total_discount,
                    stock_id: cart.stock_id,
                    category_id: cart.category_id,
                    sub_category_id: cart.sub_category_id,
                    total_weight: cart.total_weight,
                    sub_price: cart.sub_price,
                    rep: cart.rep,
                    cgst_tax: cgst_tax,
                    sgst_tax: sgst_tax,
                    igst_tax: igst_tax,
                    total: total,
                    tax_info: cart.tax_info,
                    total_tax: total_tax,
                    sub_cat_making_charge: cart.sub_cat_making_charge,
                    sub_cat_making_charge_type: cart.sub_cat_making_charge_type
                })
            }
            let formValues = this.state.formValues;
            formValues.products = [...products];
            formValues.invoice_number = response.data.data.next_invoice;
            this.setState({
                formValues: formValues
            }, () => {
                this.handleCalculateMainPrice()
            })
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.retailerList !== state.retailerList) {
            update.retailerList = props.retailerList;
        }
        if (props.productList !== state.productList) {
            update.productList = props.productList;
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
        if (props.productPriceInfo !== state.productPriceInfo) {
            update.productPriceInfo = props.productPriceInfo;
        }
        if (props.stockProductList !== state.stockProductList) {
            update.stockProductList = props.stockProductList;
        }
        if (props.stockProductDetails !== state.stockProductDetails) {
            update.stockProductDetails = props.stockProductDetails;
        }
        if (props.categoryList !== state.categoryList) {
            update.categoryList = props.categoryList;
        }
        if (props.subCategoryList !== state.subCategoryList) {
            update.subCategoryList = props.subCategoryList;
        }
        if (props.order !== state.order) {
            update.order = props.order;
        }
        return update;
    }

    componentDidUpdate() {
        if (this.state.actionCalled) {
            if (this.state.isCreateFrom) {
                if (this.state.createSuccess) {
                    this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                    this.props.dispatch({
                        type: DISTRIBUTOR_RESET_SALES
                    });
                    this.props.navigate('/admin/sales');
                } else {
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
                    this.props.dispatch({
                        type: DISTRIBUTOR_RESET_SALES
                    });
                }
            } else {
                if (this.state.editSuccess) {
                    this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                    this.props.dispatch({
                        type: DISTRIBUTOR_RESET_SALES
                    });
                    this.props.navigate('/admin/sales');
                } else {
                    this.setState({
                        submitting: false
                    })
                    this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
                    this.props.dispatch({
                        type: DISTRIBUTOR_RESET_SALES
                    });
                }
            }
        }
    }

    handleAddNewProduct = () => {
        if (isEmpty(this.state.formValues.user_id)) {
            this.props.enqueueSnackbar("Please select admin for tax calculate.", { variant: 'error' });
            return;
        }

        this.setState({
            productDialog: true,
            ...this.getDefaultProductFormData()
        })
    }

    handleUserChange = (event) => {
        this.updateFormValues(event.target.value, 'user_id');
        let m = _.filter(this.state.retailerList, { id: event.target.value });
        let user_gst_no = '';
        if (m.length) {
            user_gst_no = m[0].gst;
        }
        this.setState({
            user_gst_no: user_gst_no
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
            //this.handleCalculateMainPrice();
            this.calculateProductPrice();
        })
    }

    handleProductChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'product_id');
        this.props.actions.stocksProducDetails({ product_id: event.target.value });
    }

    handleProductFormDefaultChange = (event, key) => {
        this.updateProductFormValues(event.target.value, key);
    }

    handleProductFormStockChange = (event) => {
        let val = (event.target.value == undefined) ? event.target.parentNode.value : event.target.value;
        this.updateProductFormValues(val, 'stock_id');
    }

    handleSizeChange = (event, val) => {
        this.updateProductFormValues(event.target.value, 'size_id');
    }

    handleCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'category_id');
        if (isEmpty(event.target.value)) {
            this.props.dispatch({
                type: DISTRIBUTOR_RESET_SUB_CATEGORY_LIST
            })
        } else {
            this.props.actions.subCategoryList({ all: 1, category_id: event.target.value });
        }
        this.updateProductFormValues("", 'sub_category_id');
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS_RESET
        })

    }

    handleSubCategoryChange = (event) => {
        this.updateProductFormValues(event.target.value, 'sub_category_id');
        this.props.actions.stocksProductList({ sub_category_id: event.target.value });
        this.updateProductFormValues("", 'product_id');
        this.props.dispatch({
            type: DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS_RESET
        })
    }

    updateProductFormValues = (val, key) => {
        let productFormValues = this.state.productFormValues;
        let sizeList = this.state.sizeList;
        let materialFormErros = this.state.materialFormErros;
        productFormValues[key] = val;

        if (key == "product_id") {
            this.props.actions.materialPriceProductPriceInfo(val ? val : 0);
            let m = _.filter(this.state.stockProductList, { id: val });
            /*let materials = [];
            for(let item of m[0].materials){
                let purities = getValuesFromKey(item.purities, 'name')
                materials.push({
                    id: 0,
                    material_id: item.id,
                    material_name: item.name,
                    weight: '',
                    quantity: '',
                    unit_name: item.unit_name,
                    unit_id: item.unit_id,
                    purities: purities.join(', '),
                    amount: 0
                });
                materialFormErros.push({
                    weight: false,
                    quantity: false
                });
            }*/
            productFormValues.materials = [];
            productFormValues.product_type = m.length ? m[0].type : '';
            productFormValues.product_name = m.length ? m[0].name : '';
            productFormValues.tax_info = m.length ? m[0].tax_info : null;
            //productFormValues.size_id = 0;
            //sizeList = m[0].sizes;
        } else if (key == "size_id") {
            //let m = _.filter(this.state.sizeList, {id: val});
            //productFormValues.size_name = m[0].name;
        } else if (key == "stock_id") {
            let stock = _.filter(this.state.stockProductDetails, function (s) {
                return s.stock_id == val;
            });
            let materials = [];
            for (let item of stock[0].materials) {
                //let purities = getValuesFromKey(item.purities, 'name')
                materials.push({
                    id: 0,
                    material_id: item.material_id,
                    material_name: item.material_name,
                    weight: (stock[0].product_type != "material") ? item.weight : '',
                    quantity: (stock[0].product_type != "material") ? item.quantity : '',
                    unit_name: item.unit_name,
                    unit_id: item.unit_id,
                    purity: item.purity,
                    purity_id: item.purity_id,
                    amount: 0,
                    rate: 0
                });
                materialFormErros.push({
                    weight: false,
                    quantity: false
                });
            }
            productFormValues.materials = materials;
            productFormValues.size_id = stock[0].size_id;
            productFormValues.size_name = stock[0].size_name;
            productFormValues.certificate_no = stock[0].certificate_no;
        }

        this.setState({
            productFormValues: productFormValues,
            sizeList: sizeList,
            materialFormErros: materialFormErros
        }, () => {
            this.calculateProductPrice();
        })
    }

    calculateProductPrice = () => {
        /*if (this.state.productPriceInfo) {
            let productFormValues = this.state.productFormValues;
            let result = calculateAdminProductPrice(this.state.productPriceInfo, productFormValues.materials);
            if (result) {
                for (let i = 0; i < result.materials_price.length; i++) {
                    productFormValues.materials[i].amount = result.materials_price[i].amount;
                    productFormValues.materials[i].rate = result.materials_price[i].rate;
                }
                productFormValues.sub_price = result.sub_total;
                productFormValues.making_charge = result.making_charge;
                let rep = (!isEmpty(productFormValues.rep)) ? parseFloat(productFormValues.rep) : 0;
                let result2 = calculateGST(productFormValues.tax_info, (result.sub_total + result.making_charge + rep), this.state.user_gst_no);
                productFormValues.cgst_tax = result2 ? result2.cgst : 0;
                productFormValues.sgst_tax = result2 ? result2.sgst : 0;
                productFormValues.igst_tax = result2 ? result2.igst : 0;
                productFormValues.total_tax = priceFormat(productFormValues.cgst_tax + productFormValues.sgst_tax + productFormValues.igst_tax);
                productFormValues.total = priceFormat(result.total_amount + rep + productFormValues.cgst_tax + productFormValues.sgst_tax + productFormValues.igst_tax);
                productFormValues.total_weight = result.total_weight;
                this.setState({
                    productFormValues: productFormValues
                })
            }
        }*/
        //new code
        let formValues = this.state.formValues;
        let products = formValues.products;
        for(let x = 0; x < products.length; x++){
            let total_price = 0, total_making_charge = 0, total_discount = 0, total_quantity = 0;
            for (let i = 0; i < products[x].materials.length; i++) {
                let discountAmt = priceFormat(parseFloat(products[x].materials[i].rate) - parseFloat(products[x].materials[i].rate * products[x].materials[i].discount_percent / 100));
                let thisPrice = priceFormat(discountAmt * parseFloat(products[x].materials[i].total_gram));
                total_price += thisPrice;
                products[x].materials[i].amount = thisPrice;
                products[x].materials[i].discount_amount = parseFloat(products[x].materials[i].rate * products[x].materials[i].discount_percent / 100);
                total_quantity += products[x].materials[i].quantity ? parseInt(products[x].materials[i].quantity) : 0;
                total_discount += parseFloat(products[x].materials[i].rate * products[x].materials[i].discount_percent / 100);
            }
            
            let isMaterial = products[x].product_type == "material" ? true : false;
            if(products[x].sub_cat_making_charge_type == "per_piece"){
                total_making_charge = parseFloat(products[x].sub_cat_making_charge);
            }else if(products[x].sub_cat_making_charge_type == "per_gram"){
                total_making_charge = priceFormat(parseFloat(products[x].total_weight) * parseFloat(parseFloat(products[x].sub_cat_making_charge)));
            }
            
            let discount_amount = priceFormat(total_making_charge * parseFloat(products[x].making_charge_discount_percent) / 100);
            total_making_charge = priceFormat(total_making_charge - discount_amount);
            total_discount += discount_amount;
            console.log({
                total_making_charge: total_making_charge,
                total_price: total_price,
                tax_info: products[x].tax_info
            })

            let result2 = calculateGST(products[x].tax_info, (parseFloat(total_price) + parseFloat(total_making_charge)), this.state.user_gst_no);
            let cgst_tax = result2 ? result2.cgst : 0;
            let sgst_tax = result2 ? result2.sgst : 0;
            let igst_tax = result2 ? result2.igst : 0;
            let total_tax = priceFormat(cgst_tax + sgst_tax + igst_tax);
            let total_amount = priceFormat(total_making_charge + total_price);
            let total = priceFormat(total_amount + cgst_tax + sgst_tax + igst_tax);
            console.log('total_tax', total_tax)

            products[x].making_charge_discount_amount = discount_amount;
            products[x].total_discount = total_discount;
            products[x].sub_price = total_price;
            products[x].making_charge = total_making_charge;
            products[x].total = total;
            products[x].total_tax = total_tax;
        }
        formValues.products = products;
        this.setState({
            formValues: formValues
        }, () => {
            this.handleCalculateMainPrice()
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
                size_name: '',
                materials: [],
                making_charge: 0,
                stock_id: 0,
                category_id: '',
                sub_category_id: '',
                total_weight: 0,
                sub_price: 0,
                rep: 0,
                cgst_tax: 0,
                sgst_tax: 0,
                igst_tax: 0,
                total: 0,
                tax_info: null,
                total_tax: 0
            },
            productFormErros: {
                product_id: false,
                certificate_no: false,
                size_id: false,
                category_id: false,
                sub_category_id: false
            },
            materialFormErros: []
        }
    }

    handleMaterialFormChange = (event, index, key) => {
        let productFormValues = this.state.productFormValues;
        let materials = productFormValues.materials;
        materials[index][key] = event.target.value;
        productFormValues.materials = materials;
        this.setState({
            productFormValues: productFormValues
        }, () => {
            this.calculateProductPrice();
        })
    }

    handleProductDialogClose = (event, reason) => {
        if (reason && reason == "backdropClick") return;
        this.setState({
            productDialog: false
        })
    }

    getTotalWeightByProduct = (index) => {
        let formValues = this.state.formValues;
        let products = formValues.products;
        let totalWeight = 0;
        for (let item of products[index].materials) {
            totalWeight += (item.weight ? parseFloat(item.weight) : 0);
        }
        return totalWeight;
    }

    handleProductDelete = (index) => {
        this.setState({
            deletingIndex: index,
            deleteDialogOpen: true
        });
    }

    handleProductSubmit = () => {
        let hasErr = this.productFormValidate();
        if (!hasErr) {
            let formValues = { ...this.state.formValues };
            let _data = { ...this.state.productFormValues };
            formValues.products.push(_data);
            this.setState({
                formValues: formValues,
                //productDialog: false,
                productFormValues: {
                    ...this.state.productFormValues,
                    size_id: '',
                    size_name: '',
                    materials: [],
                    making_charge: 0,
                    stock_id: 0,
                    total_weight: 0,
                    sub_price: 0,
                    making_charge: 0,
                    rep: 0,
                    cgst_tax: 0,
                    sgst_tax: 0,
                    igst_tax: 0,
                    total: 0,
                    tax_info: null,
                    total_tax: 0
                }
            }, () => {
                this.handleCalculateMainPrice()
            })
        }
    }

    calculatePrice = () => {
        /*let formValues = this.state.formValues;
        let sub_total = 0, total_amount = 0;
        for(let i = 0; i < formValues.products.length; i++){
            sub_total += priceFormat(formValues.products[i].amount, true);
            total_amount += priceFormat(formValues.products[i].total_amount, true);
        }
        formValues.sub_total = priceFormat(sub_total, true);
        if(!isEmpty(formValues.tax)){
            total_amount += priceFormat((formValues.sub_total * priceFormat(formValues.tax))/ 100);
        }
        if(!isEmpty(formValues.discount)){
            total_amount -= priceFormat(formValues.discount);
        }
        formValues.total_amount = priceFormat(total_amount, true);
        this.setState({
            formValues: formValues
        })*/
    }

    handleCalculateMainPrice = () => {
        let formValues = this.state.formValues;
        let taxable_amount = 0, cgst_tax = 0, sgst_tax = 0, igst_tax = 0, total_amount = 0, discount = 0, total_payable = 0, paid_amount = 0, due_amount = 0;
        for (let i = 0; i < formValues.products.length; i++) {
            taxable_amount += (parseFloat(formValues.products[i].sub_price) + parseFloat(formValues.products[i].making_charge) + (formValues.products[i].rep ? parseFloat(formValues.products[i].rep) : 0));
            cgst_tax += formValues.products[i].cgst_tax ? parseFloat(formValues.products[i].cgst_tax) : 0;
            sgst_tax += formValues.products[i].sgst_tax ? parseFloat(formValues.products[i].sgst_tax) : 0;
            igst_tax += formValues.products[i].igst_tax ? parseFloat(formValues.products[i].igst_tax) : 0;
            total_amount += parseFloat(formValues.products[i].total);
        }
        taxable_amount = priceFormat(taxable_amount, true);
        cgst_tax = priceFormat(cgst_tax, true);
        sgst_tax = priceFormat(sgst_tax, true);
        igst_tax = priceFormat(igst_tax, true);
        total_amount = priceFormat(total_amount, true);
        if (!isEmpty(formValues.discount)) {
            discount = parseFloat(formValues.discount);
        }
        total_payable = priceFormat(total_amount - discount, true);
        if (!isEmpty(formValues.paid_amount)) {
            paid_amount = parseFloat(formValues.paid_amount);
        }
        due_amount = priceFormat(total_payable - paid_amount, true);
        formValues.taxable_amount = taxable_amount;
        formValues.cgst_tax = cgst_tax;
        formValues.sgst_tax = sgst_tax;
        formValues.igst_tax = igst_tax;
        formValues.total_amount = total_amount;
        formValues.total_payable = total_payable;
        formValues.due_amount = due_amount;
        this.setState({
            formValues: formValues
        });
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
            if (!productFormValues.stock_id) {
                //this.props.enqueueSnackbar('Please select stock', {variant: 'error'});
                //hasErr = true;
            }
        } else {
            productFormErros.certificate_no = false;
            productFormErros.size_id = false;
        }

        if (!productFormValues.materials.length) {
            this.props.enqueueSnackbar('Please select stock', { variant: 'error' });
            hasErr = true;
        }
        for (let i = 0; i < productFormValues.materials.length; i++) {
            if (isEmpty(productFormValues.materials[i].weight)) {
                materialFormErros[i].weight = true;
                hasErr = true;
            } else {
                materialFormErros[i].weight = false;
            }
            if (isEmpty(productFormValues.materials[i].quantity)) {
                materialFormErros[i].quantity = true;
                hasErr = true;
            } else {
                materialFormErros[i].quantity = false;
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

    handleDeleteConfirm = async() => {
        let products = this.state.formValues.products;
        let response = await saleCartDelete(products[this.state.deletingIndex].id, true);
        if(response.data.success){
            this.props.enqueueSnackbar(response.data.message, { variant: 'success' });
            this.loadCart();
        }else{
            this.props.enqueueSnackbar(response.data.message, { variant: 'error' });
        }
        this.setState({
            deleteDialogOpen: false
        }, () => {
            this.handleCalculateMainPrice();
        });
        
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
            });
            let data = { ...this.state.formValues };
            data.order_id = this.state.order ? this.state.order.id : 0;
            if (this.state.isCreateFrom) {
                this.props.actions.salesStore(data);
            } else {
                this.props.actions.salesUpdate(this.state.formData.id, data);
            }
        }
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        if (isEmpty(formValues.user_id)) {
            formErros.user_id = true;
            hasErr = true;
        } else {
            formErros.user_id = false;
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
        if (isEmpty(formValues.settlement_date)) {
            formErros.settlement_date = true;
            hasErr = true;
        } else {
            formErros.settlement_date = false;
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

    checkIfStockAdded = (id) => {
        let stock = _.filter(this.state.formValues.products, function (s) {
            return s.stock_id == id;
        });
        return stock.length;
    }

    checkIfAllStockAdded = () => {
        let x = true;
        for (let i = 0; i < this.state.stockProductDetails.length; i++) {
            if (!this.checkIfStockAdded(this.state.stockProductDetails[i].stock_id)) {
                x = false;
                break;
            }
        }

        return x;
    }

    handleMaterialDisc = (event, productKey, materialKey) => {
        let formValues = this.state.formValues;
        console.log(formValues, productKey, materialKey)
        formValues.products[productKey].materials[materialKey].discount_percent = event.target.value;
        this.setState({
            formValues: formValues
        }, () => {
            this.calculateProductPrice();
        })
    }

    handleMakingDiscount = (event, productKey) => {
        let formValues = this.state.formValues;
        formValues.products[productKey].making_charge_discount_percent = event.target.value;
        this.setState({
            formValues: formValues
        }, () => {
            this.calculateProductPrice();
        })
    }

    render() {
        const { formValues, formErros, productFormValues, productFormErros, materialFormErros, submitting, order } = this.state;
        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                <Grid container spacing={2} className='tax-input loans_view p_view'>
                    {
                        order ?
                            <Grid item xs={12} className='create-input'>
                                <Accordion className='rtn_accordion'>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Order # {order.order_no} | {order.order_from} | {order.order_date}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper} className='ratn-table-product-wrapper table-wrapper-heading'>
                                            <Table aria-label="collapsible table">
                                                <TableHead className='ratn-table-header'>
                                                    <TableRow >
                                                        <TableCell />
                                                        <TableCell>Product Name</TableCell>
                                                        <TableCell>Size</TableCell>
                                                        <TableCell>Quantity</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className='order-inner-table'>
                                                    {order.products.map((row, i) => (
                                                        <Row key={i} row={row} />
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            : null
                    }
                    <Grid container spacing={2} style={{padding : '0 16px'}}>
                    <Grid item xs={6} className='create-input'>
                        <FormControl fullWidth error={formErros.user_id}>
                            <InputLabel>Retailer</InputLabel>
                            <Select
                                className='input-inner'
                                value={formValues.user_id}
                                fullWidth
                                label="Retailer"
                                onChange={this.handleUserChange}
                            >
                                <MenuItem value="">select retailer</MenuItem>
                                {
                                    this.state.retailerList.map((item, index) => {
                                        return <MenuItem value={item.id} key={index}>{item.name} | {item.mobile}</MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={3} className='create-input'>
                        <TextField
                            label="Invoice Number"
                            variant="outlined"
                            fullWidth
                            value={formValues.invoice_number}
                            onChange={(event) => this.handleDefaultChange(event, 'invoice_number')}
                        />
                    </Grid>
                    <Grid item xs={3} className='create-input p-invoice-date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Invoice Date"
                                value={formValues.invoice_date}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => this.updateFormValues(newValue, 'invoice_date')}
                                renderInput={(params) => <TextField {...params} error={formErros.invoice_date} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className='tax-input loans_view'>
                    <Grid item xs={12} className=' create-input p-add-product border-radius-0'>
                        <h3 className='p_heading_list'>Product List {/*<Button variant="contained" className='add-button' onClick={() => this.handleAddNewProduct()}>Add Product</Button>*/}</h3>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='ratn-table-product-wrapper'>
                                <TableHead className='ratn-table-header p_view'>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Cert.No.</TableCell>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell align="center">Material</TableCell>
                                        <TableCell>Mat.price</TableCell>
                                        <TableCell>M.Charge</TableCell>
                                        <TableCell>Tag Price</TableCell>
                                        <TableCell>Tax</TableCell>
                                        <TableCell>Disc</TableCell>
                                        <TableCell>Net Total</TableCell>
                                        <TableCell sx={{maxWidth: '50px'}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        formValues.products.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{item.product_name}</TableCell>
                                                <TableCell>{item.certificate_no}</TableCell>
                                                <TableCell>{item.total_weight} gm</TableCell>
                                                <TableCell>{item.size_name}</TableCell>
                                                <TableCell>
                                                    <Table aria-label="simple table" className='ratn-table-product-wrapper'>
                                                        <TableHead className='ratn-table-header p_view'>
                                                            <TableRow>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell>Weight</TableCell>
                                                                <TableCell>Rate</TableCell>
                                                                <TableCell>Disc</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody className='sale-table-inner'>
                                                        {
                                                            item.materials.map((m, key) => (
                                                                <TableRow key={key}>
                                                                    <TableCell>{m.material_name}</TableCell>
                                                                    <TableCell>{m.total_gram} gm</TableCell>
                                                                    <TableCell>{displayAmount(m.rate)}</TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            label=""
                                                                            sx={{maxWidth: '75px'}}
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            value={m.discount_percent}
                                                                            onChange={(event) => this.handleMaterialDisc(event, index, key)}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                                <TableCell>{displayAmount(item.sub_price)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                    {displayAmount(item.making_charge)}
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            className='sale-table-inner'
                                                            label=""
                                                            variant="outlined"
                                                            fullWidth
                                                            sx={{maxWidth: '100px'}}
                                                            value={item.making_charge_discount_percent}
                                                            onChange={(event) => this.handleMakingDiscount(event, index)}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell>{displayAmount(item.making_charge + item.sub_price)}</TableCell>
                                                <TableCell>{displayAmount(item.total_tax)}</TableCell>
                                                <TableCell>{displayAmount(item.total_discount)}</TableCell>
                                                <TableCell>{displayAmount(item.total)}</TableCell>
                                                <TableCell>
                                                    <IconButton className='del-icon' color="error" component="label" onClick={() => this.handleProductDelete(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} className='create-input'>
                                <TextareaAutosize
                                    className='description'
                                    minRows={3}
                                    placeholder="Notes"
                                    style={{ width: '100%' }}
                                    value={formValues.notes}
                                    onChange={(event) => this.handleDefaultChange(event, 'notes')}
                                />
                            </Grid>
                            <Grid item xs={6} className='create-input'>
                                <FormControl fullWidth>
                                    <InputLabel>Payment Mode</InputLabel>
                                    <Select
                                        className='input-inner'
                                        value={formValues.payment_mode}
                                        fullWidth
                                        label="Payment Mode"
                                        onChange={(event) => this.handleDefaultChange(event, 'payment_mode')}
                                    >
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="cheque">Cheque</MenuItem>
                                        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                                        <MenuItem value="online">Online</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                (formValues.payment_mode == "imps_neft" || formValues.payment_mode == "upi") ?
                                <Grid item xs={6} className='create-input'>
                                    <TextField
                                        label="Transaction No"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.transaction_no}
                                        onChange={(event) => this.handleDefaultChange(event, 'transaction_no')}
                                    />
                                </Grid>
                                : null
                            }
                            {
                                (formValues.payment_mode == "cheque") ?
                                <Grid item xs={6}>
                                    <TextField
                                        label="Cheque No"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.cheque_no}
                                        onChange={(event) => this.handleDefaultChange(event, 'cheque_no')}
                                    />
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{ paddingRight: '16px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Taxable Amount"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.taxable_amount}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="CGST Tax"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.cgst_tax}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="SGST Tax"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.sgst_tax}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="IGST Tax"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.igst_tax}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Total Amount"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.total_amount}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Discount"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.discount}
                                    onChange={(event) => this.handleDefaultChange(event, 'discount')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Total Payable"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.total_payable}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Paid Amount"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.paid_amount}
                                    onChange={(event) => this.handleDefaultChange(event, 'paid_amount')}
                                    error={formErros.paid_amount}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Due Amount"
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.due_amount}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} className='p-invoice-date create-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Due Date"
                                        value={formValues.due_date}
                                        fullWidth
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newValue) => this.updateFormValues(newValue, 'due_date')}
                                        renderInput={(params) => <TextField fullWidth {...params} error={formErros.due_date} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} className='p-invoice-date create-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Settlement Date"
                                        value={formValues.settlement_date}
                                        fullWidth
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newValue) => this.updateFormValues(newValue, 'settlement_date')}
                                        renderInput={(params) => <TextField fullWidth {...params} error={formErros.settlement_date} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end" style={{ paddingRight: '16px', paddingBottom: '16px' }}>
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
                            {
                                !submitting ?
                                    <Button variant="outlined" className='close-button' onClick={() => this.props.navigate('/super-admin/sales')}>Cancel</Button>
                                    : null
                            }
                        </Stack>
                    </Grid>
                </Grid>

                <Dialog
                    open={this.state.productDialog}
                    onClose={this.handleProductDialogClose}
                    fullWidth
                    maxWidth="lg"
                    className="ratn-dialog-wrapper"
                >
                    <DialogTitle>
                        Add Product
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <Box sx={{ flexGrow: 1, m: 0.5 }}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={3}>
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
                                <Grid item xs={6}>
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
                                                this.state.stockProductList.map((item, index) => (
                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {
                                    productFormValues.product_type != "material" ?
                                        <>
                                            {/*<Grid item xs={3}>
                                            <TextField  
                                                label="Certificate Number" 
                                                variant="outlined"
                                                fullWidth
                                                value={productFormValues.certificate_no}
                                                onChange={(event) => this.handleProductFormDefaultChange(event, 'certificate_no')}
                                                error={productFormErros.certificate_no}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
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
                                                </Grid>*/}
                                        </>
                                        : null
                                }
                                {
                                    this.state.stockProductDetails.length && productFormValues.product_id ?

                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <RadioGroup
                                                    name="stock_id"
                                                    value={productFormValues.stock_id}
                                                    onChange={this.handleProductFormStockChange}
                                                >
                                                    {
                                                        !this.checkIfAllStockAdded() ?
                                                            <TableContainer component={Paper}>
                                                                <Table>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Size Name</TableCell>
                                                                            <TableCell>Material Name</TableCell>
                                                                            <TableCell>Purity</TableCell>
                                                                            <TableCell>Weight</TableCell>
                                                                            <TableCell>Unit</TableCell>
                                                                            <TableCell>Quantity</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>

                                                                        {
                                                                            this.state.stockProductDetails.map((itm, i) => {
                                                                                return !this.checkIfStockAdded(itm.stock_id) ?
                                                                                    <React.Fragment key={i}>
                                                                                        <TableRow>
                                                                                            <TableCell rowSpan={itm.materials.length + 1}><FormControlLabel value={itm.stock_id} control={<Radio />} /> {itm.size_name}</TableCell>
                                                                                        </TableRow>
                                                                                        {
                                                                                            itm.materials.map((x, indx) => (
                                                                                                <React.Fragment key={indx}>
                                                                                                    <TableRow>
                                                                                                        <TableCell>{x.material_name}</TableCell>
                                                                                                        <TableCell>{x.purity}</TableCell>
                                                                                                        <TableCell>{weightFormat(x.weight, true)}</TableCell>
                                                                                                        <TableCell>{x.unit_name}</TableCell>
                                                                                                        <TableCell>{x.quantity}</TableCell>
                                                                                                    </TableRow>
                                                                                                </React.Fragment>
                                                                                            ))
                                                                                        }
                                                                                    </React.Fragment>
                                                                                    :
                                                                                    null

                                                                            })
                                                                        }
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                            : null
                                                    }
                                                </RadioGroup>
                                            </FormControl>


                                            <FormControl fullWidth>
                                                {/*<ToggleButtonGroup
                                                className='product-button'
                                                color="primary"
                                                value={productFormValues.stock_id}
                                                exclusive
                                                onChange={this.handleProductFormStockChange}
                                                aria-label="Stock"
                                            >
                                                {
                                                    this.state.stockProductDetails.map((itm, i) => {
                                                        return !this.checkIfStockAdded(itm.stock_id) ? 
                                                        <ToggleButton value={convertToString(itm.stock_id)} key={i}>
                                                            {
                                                                itm.size_name ? 
                                                                <>
                                                                {itm.size_name}<br />
                                                                </>
                                                                : null
                                                            }
                                                            {
                                                                itm.materials.map((x, indx) => (
                                                                    <React.Fragment key={indx}>
                                                                        {x.material_name} | {priceFormat(x.weight, true)}{x.unit_name} | {x.quantity}
                                                                        {
                                                                            (itm.materials.length - 1) > indx ? 
                                                                            <br />
                                                                            : null
                                                                        }
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </ToggleButton>
                                                        : 
                                                        null
                                                        
                                                    })
                                                }
                                            </ToggleButtonGroup>*/}
                                                {
                                                    this.checkIfAllStockAdded() ?
                                                        <h3>No Stock available</h3>
                                                        : null
                                                }
                                            </FormControl>
                                        </Grid>
                                        : null
                                }
                                {
                                    productFormValues.product_type == "material" ?
                                        <Grid item xs={12}>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table" className='ratn-table-product-wrapper'>
                                                    <TableHead className='ratn-table-header'>
                                                        <TableRow className='pur-details-inner-table'>
                                                            <TableCell>Material Name</TableCell>
                                                            <TableCell>Purity</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>Weight</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className='pur-details-table-body'>
                                                        {
                                                            productFormValues.materials.map((item, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>{item.material_name}</TableCell>
                                                                    <TableCell>{item.purity}</TableCell>
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
                                                                            InputProps={{
                                                                                endAdornment: <InputAdornment position="start">{item.unit_name}</InputAdornment>,
                                                                            }}
                                                                            error={materialFormErros[index].weight}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        : null

                                }
                                {/*<Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Material Name</TableCell>
                                                    <TableCell>Purities</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Weight</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    productFormValues.materials.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{item.material_name}</TableCell>
                                                            <TableCell>{item.purities}</TableCell>
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
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment position="start">{item.unit_name}</InputAdornment>,
                                                                    }}
                                                                    error={materialFormErros[index].weight}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>*/}
                                {/*<Grid item xs={2}>
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
                                        label="SUB PRICE" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.sub_price}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="MAKING CHARGE" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.making_charge}
                                        onChange={(event) => this.updateProductMakingCharge(event)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="REP/TRANS/ETC" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.rep}
                                        onChange={(event) => this.updateProductFormValues(event.target.value, 'rep')}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="TAX" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.cgst_tax}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="TAX" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.sgst_tax}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="TAX" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.igst_tax}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField  
                                        label="TOTAL" 
                                        variant="outlined"
                                        fullWidth
                                        value={productFormValues.total}
                                        disabled
                                    />
                                </Grid>*/}
                                <Grid item xs={12}>
                                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                                        <Button variant="contained" type="button" onClick={this.handleProductSubmit}>Add Product</Button>
                                        <Button variant="outlined" onClick={this.handleProductDialogClose}>Cancel</Button>
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
                    maxWidth="xs"
                    className="ratn-dialog-wrapper"
                >
                    <DialogTitle>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to delete this record?
                        </DialogContentText>
                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                            <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                            <Button variant="contained" type="button" onClick={this.handleDeleteConfirm}>Yes, Confirm</Button>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </Box>
        )

    }

}

const mapStateToProps = (state) => ({
    retailerList: state.distributor.retailer.items,
    productList: state.distributor.product.items,
    actionCalled: state.distributor.sales.actionCalled,
    createSuccess: state.distributor.sales.createSuccess,
    editSuccess: state.distributor.sales.editSuccess,
    successMessage: state.distributor.sales.successMessage,
    errorMessage: state.distributor.sales.errorMessage,
    productPriceInfo: state.distributor.materialPrice.productPriceInfo,
    stockProductList: state.distributor.stocks.productList,
    stockProductDetails: state.distributor.stocks.productDetails,
    categoryList: state.distributor.category.items,
    subCategoryList: state.distributor.subCategory.items,
    order: state.distributor.orders.order,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({
        salesStore,
        salesUpdate,
        retailerList,
        productList,
        materialPriceProductPriceInfo,
        stocksProducDetails,
        stocksProductList,
        categoryList,
        subCategoryList,
        orderView
    }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SaleForm'
})(SaleForm))));

function Row(props) {
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
                <TableCell component="th" scope="row">
                    {row.product_name}
                </TableCell>
                <TableCell>{row.size_name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="medium" aria-label="orders">
                                <TableHead>
                                    <TableRow className='pur-details-inner-table'>
                                        <TableCell>Material Name</TableCell>
                                        <TableCell>Purity</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>Unit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='pur-details-table-body'>
                                    {row.materials.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell scope="row">
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