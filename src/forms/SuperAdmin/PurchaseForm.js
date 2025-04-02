import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form/immutable";
import ImageUploading from "react-images-uploading";

import {
  Box,
  TextField,
  Button,
  Grid,
  Link,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  ToggleButtonGroup,
  Typography,
  Collapse,
  ImageList,
  ImageListItem,
  InputAdornment,
  IconButton,
  Autocomplete,
  RadioGroup,
  Radio,
  Alert,
  Accordion,
  AccordionSummary,
  CircularProgress
} from "@mui/material";
import {
  ContactPageSharp,
  Grid3x3,
  ThirtyFpsSelect,
} from "@mui/icons-material";
import {
  calculateProductPrice,
  convertUnitToGram,
  displayAmount,
  isEmpty,
  calculateGST,
} from "src/helpers/helper";
import { bindActionCreators } from "redux";
import {
  purchaseStore,
  purchaseUpdate,
  purchaseNewInvoiceNumber,
  purchaseReturn,
  purchaseRawEdit,
} from "actions/superadmin/purchase.actions";
import { employeeList } from "actions/superadmin/employee.actions";
import { supplierList } from "actions/superadmin/supplier.actions";
import { productList } from "actions/superadmin/product.actions";
import { unitList } from "actions/superadmin/unit.actions";
import { checkCertificateNo } from "actions/superadmin/stocks.actions";
import { materialList } from "actions/superadmin/material.actions";
import { sizeListRaw } from "actions/superadmin/size.actions";
import CloseIcon from "@mui/icons-material/Close";
import { withSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import withRouter from "src/helpers/withRouter";
import MainCard from "ui-component/cards/MainCard";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import _ from "lodash";
import { RESET_PURCHASE } from "actionTypes/superadmin/purchase.types";
import { priceFormat, weightFormat, isSuperAdmin } from "../../helpers/helper";
import moment from "moment";
import { getRoleName, getUserDashboardRoute } from "src/helpers/helper";
import { RESET_SUB_CATEGORY_LIST } from "actionTypes/superadmin/subCategory.types";
import { RESET_PRODUCT_LIST } from "actionTypes/superadmin/product.types";
import { subCategoryList } from "actions/superadmin/subCategory.actions";
import { categoryList } from "actions/superadmin/category.actions";
import { parseNonNullablePickerDate } from "@mui/x-date-pickers/internals";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fontWeight, style, width } from "@mui/system";
import { returnSaleViewRaw } from "actions/superadmin/returnSale.actions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cartList } from "actions/superadmin/cart.actions";
import { formValues } from "redux-form";

var GroseData = 0;

class PurchaseForm extends React.Component {
  constructor(props) {
    super(props);

    let formData = "formData" in this.props ? this.props.formData : null;
    this.state = {
      SubmitSave: false,
      formData: formData,
      isCreateFrom: !formData,
      isReturnForm: this.props.isReturnForm,
      supplierList: this.props.supplierList,
      productList: this.props.productList,
      workerList: this.props.workerList,
      unitList: this.props.unitList,
      categoryList: this.props.categoryList,
      subCategoryList: this.props.subCategoryList,
      materialList: this.props.materialList,
      sizeList: [],
      materials: [],
      product_type: "",
      productDialog: false,
      supplier_gst_no: "",
      current_image: [],
      formValues: {
        supplier_id: "",
        invoice_number: "",
        invoice_date: moment().format("MM/DD/YYYY"),
        products: [],
        notes: "",
        payment_mode: "cash",
        transaction_no: "",
        cheque_no: "",
        taxable_amount: "",
        tax_percentage: "",
        tax: "",
        cgst_tax: "",
        sgst_tax: "",
        igst_tax: "",
        total_amount: "",
        discount: "",
        total_payable: "",
        paid_amount: "",
        due_amount: "",
        due_date: "",
        total_sub_total: "",
        type: "product",
        advance_amount: 0,
        pay_from_advance: false,
      },
      formErros: {
        supplier_id: false,
        invoice_number: false,
        invoice_date: false,
        notes: false,
        payment_mode: false,
        transaction_no: false,
        total_amount: false,
        tax_percentage: false,
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
        name: "",
        mobile: "",
        gst: "",
        address: "",
        city: "",
        pincode: "",
      },
      return_products: [],
      returnDialogOpen: false,
      return_amount: 0,
      product_amount: 0,
      return_charge: 0,
      materialReturnDialog: false,
      actionProductIndex: 0,
      return_weight_error: false,
      return_qty_error: false,
      view_open: {},
      return_date: moment().format("MM/DD/YYYY"),
      change_default_material: true,
      payment_type: "advance",
      return_payment_mode: "cash",
      return_sale_data: null,
    };
    this.isSuperAdmin = isSuperAdmin();
  }

  componentDidMount() {
    this.props.actions.productList({ all: 1, purity_price: 1 });
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.supplierList({ all: 1 });
    this.props.actions.employeeList({ all: 1, role_id: 10 });
    this.props.actions.unitList({ all: 1 });
    this.props.actions.materialList({ all: 1 });
    if (this.state.formData) {
      this.initializeFormData();
    }

    this.getNewInvoiceNumber();
    this.loadProductsFromOnApprove();
    this.loadReturnSale();
  }

  getNewInvoiceNumber = async () => {
    let res = await purchaseNewInvoiceNumber();
    if (res.data.success) {
      this.updateFormValues(res.data.data.next_invoice, "invoice_number");
    }
  };

  loadProductsFromOnApprove = async () => {
    if (
      !isEmpty(this.props.query.get("purchase_on_approve")) &&
      this.props.query.get("purchase_on_approve") != 0
    ) {
      let res = await purchaseRawEdit(
        this.props.query.get("purchase_on_approve")
      );
      if (res.data.success) {
        this.setState(
          {
            formValues: {
              ...this.state.formValues,
              products: res.data.data.products,
              paid_amount: res.data.data.paid_amount
                ? res.data.data.paid_amount
                : "",
              supplier_id: res.data.data.supplier_id,
            },
          },
          () => {
            this.handleCalculateMainPrice();
            setTimeout(() => {
              this.handleSupplierChange({
                target: { value: res.data.data.supplier_id },
              });
            }, 1000);
          }
        );
      }
    }
  };

  loadReturnSale = async () => {
    if (
      !isEmpty(this.props.query.get("return_sale")) &&
      this.props.query.get("return_sale") != 0
    ) {
      let res = await returnSaleViewRaw(this.props.query.get("return_sale"));
      if (res.data.success) {
        this.setState({
          return_sale_data: res.data.data,
          formValues: {
            ...this.state.formValues,
            paid_amount:
              res.data.data.return_amount_from_wallet > 0
                ? res.data.data.return_amount_from_wallet
                : this.state.formValues.paid_amount,
          },
        });
      }
    }
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.supplierList !== state.supplierList) {
      update.supplierList = props.supplierList;
    }
    if (props.productList !== state.productList) {
      update.productList = props.productList;
    }
    if (props.workerList !== state.workerList) {
      update.workerList = props.workerList;
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
    if (props.isReturnForm !== state.isReturnForm) {
      update.isReturnForm = props.isReturnForm;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }

    return update;
  }

  initializeFormData = () => {
    let formValues = { ...this.state.formData };
    let return_products = [];
    for (let i = 0; i < formValues.products.length; i++) {
      return_products.push({
        id: formValues.products[i].id,
        is_return: false,
      });
    }
    let supplier_details = formValues.supplier_details;
    this.setState(
      {
        formValues: formValues,
        return_products: return_products,
        supplier_details: {
          ...supplier_details,
        },
      },
      () => {
        setTimeout(() => {
          this.getSupplierDetails();
        }, 1000);
      }
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }

    if (
      this.props.query.get("purchase_on_approve") !=
      prevProps.query.get("purchase_on_approve")
    ) {
      this.loadProductsFromOnApprove();
    }

    if (
      this.props.query.get("return_sale") != prevProps.query.get("return_sale")
    ) {
      this.loadReturnSale();
    }

    if (this.state.actionCalled) {
      if (this.state.isCreateFrom) {
        if (this.state.createSuccess) {
          this.props.enqueueSnackbar(this.state.successMessage, {
            variant: "success",
          });
          this.props.dispatch({
            type: RESET_PURCHASE,
          });
          if (this.props.query.get("purchase_on_approval") == 0) {
            this.props.navigate(
              getUserDashboardRoute(getRoleName(this.state.auth)) +
                "/purchase-on-approve"
            );
          } else {
            this.props.navigate(
              getUserDashboardRoute(getRoleName(this.state.auth)) + "/purchases"
            );
          }
        } else {
          this.setState({
            submitting: false,
          });
          this.props.enqueueSnackbar(this.state.errorMessage, {
            variant: "error",
          });
          this.props.dispatch({
            type: RESET_PURCHASE,
          });
        }
      } else {
        if (this.state.editSuccess) {
          this.props.enqueueSnackbar(this.state.successMessage, {
            variant: "success",
          });
          this.props.dispatch({
            type: RESET_PURCHASE,
          });
          this.props.navigate(-1);
        } else {
          this.setState({
            submitting: false,
          });
          this.props.enqueueSnackbar(this.state.errorMessage, {
            variant: "error",
          });
          this.props.dispatch({
            type: RESET_PURCHASE,
          });
        }
      }
    }
  }

  handleAddNewProduct = () => {
    if (isEmpty(this.state.formValues.supplier_id)) {
      this.props.enqueueSnackbar("Please select supplier for tax calculate.", {
        variant: "error",
      });
      return;
    }
    this.setState({
      productDialog: true,
      ...this.getDefaultProductFormData(),
    });
  };

  handleSupplierChange = (event) => {
    this.updateFormValues(event.target.value, "supplier_id");
    let m = _.filter(this.state.supplierList, { id: event.target.value });
    let supplier_gst_no = "",
      advance_amount = 0;
    if (m.length) {
      supplier_gst_no = m[0].gst;
      if (
        /*(this.isSalesExecutive || this.isSalesExecutive) &&*/ !this.state
          .isAssign
      ) {
        advance_amount = m[0].advance_amount;
      }
    }
    this.setState(
      {
        supplier_gst_no: supplier_gst_no,
        formValues: {
          ...this.state.formValues,
          advance_amount: advance_amount,
        },
      },
      () => {
        this.getSupplierDetails();
      }
    );
  };

  handleDefaultChange = (event, key) => {
    this.updateFormValues(event.target.value, key);
  };

  updateFormValues = (val, key) => {
    let formValues = this.state.formValues;
    formValues[key] = val;
    this.setState(
      {
        formValues: formValues,
      },
      () => {
        this.handleCalculateMainPrice();
      }
    );
  };

  handleProductChange = (event, val) => {
    this.updateProductFormValues(val, "product_id");
  };

  handleProductFormDefaultChange = (event, key) => {
    this.updateProductFormValues(event.target.value, key);
  };

  handleSizeChange = (event, val) => {
    this.updateProductFormValues(event.target.value, "size_id");
  };

  handleWorkerChange = (event, val) => {
    this.updateProductFormValues(event.target.value, "worker_id");
  };

  updateProductFormValues = (val, key, data) => {
    let productFormValues = this.state.productFormValues;
    let sizeList = this.state.sizeList;
    let materialFormErros = this.state.materialFormErros;
    productFormValues[key] = val;
    let change_default_material = this.state.change_default_material;
    // console.log(val, key, data);

    if (key == "product_id") {
      let m = _.filter(this.state.productList, { id: val });
      let materials = [];
      materialFormErros = [];
      console.log("m : ", m);
      if (m.length) {
        for (let item of m[0].materials) {
          //let purities = getValuesFromKey(item.purities, 'name')
          materials.push({
            id: 0,
            material_id: item.id,
            material_name: item.name,
            weight: "",
            pakka_weight: "",
            quantity: "",
            unit_id: item.unit_id,
            unit_name: item.unit_name,
            purities: item.purities,
            purity_id: "",
            rate: "",
            amount: "",
            weight_in_gram: "",
          });
          materialFormErros.push({
            weight: false,
            pakka_weight: false,
            quantity: false,
            purity_id: false,
            unit_id: false,
            rate: false,
          });
        }
      } else {
      }
      console.log("materials : ", materials);
      productFormValues.materials = [...materials];
      productFormValues.product_type = m.length ? m[0].type : "";
      productFormValues.product_name = m.length ? m[0].name : "";
      productFormValues.has_certificate = m.length
        ? m[0].certificates.length
          ? true
          : false
        : false;
      productFormValues.tax_info = m.length ? m[0].tax_info : null;
      productFormValues.product_making_charge_type = m.length
        ? m[0].making_charge_type
        : "";
      productFormValues.product_making_charge = m.length
        ? m[0].making_charge
        : 0;
      sizeList = m.length ? m[0].sizes : [];
      let paramMaterials = [...productFormValues.materials];
      let paramProductFrom = { ...productFormValues };
      let res = this.loadDefaultWeightQty(paramProductFrom, paramMaterials);
      productFormValues.materials = [...res];
      change_default_material = true;
    } else if (key == "size_id") {
      let m = _.filter(this.state.sizeList, { id: val });
      productFormValues.size_name = m.length ? m[0].name : "";
      if (this.state.change_default_material) {
        let paramMaterials = [...productFormValues.materials];
        let paramProductFrom = { ...productFormValues };
        let res = this.loadDefaultWeightQty(paramProductFrom, paramMaterials);
        productFormValues.materials = [...res];
      }
    } else if (key == "material_id") {
      let m = _.filter(this.state.materialList, { id: val });
      let materials = [];
      materialFormErros = [];
      if (m.length) {
        materials.push({
          id: 0,
          material_id: m[0].id,
          material_name: m[0].name,
          weight: "",
          pakka_weight: "",
          quantity: "",
          unit_id: m[0].unit_id,
          unit_name: m[0].unit_name,
          purities: m[0].purities,
          purity_id: "",
          rate: "",
          amount: "",
          weight_in_gram: "",
        });
        materialFormErros.push({
          weight: false,
          pakka_weight: false,
          quantity: false,
          purity_id: false,
          unit_id: false,
          rate: false,
        });
      }
      productFormValues.materials = [...materials];
      productFormValues.product_type = "material";
      productFormValues.product_name = m.length ? m[0].name : "";
      productFormValues.tax_info = null;
      productFormValues.product_making_charge_type = "";
      productFormValues.product_making_charge = 0;
      sizeList = this.state.sizeList;
      let paramMaterials = [...productFormValues.materials];
      let paramProductFrom = { ...productFormValues };
      let res = this.loadDefaultWeightQty(paramProductFrom, paramMaterials);
      productFormValues.materials = [...res];
      change_default_material = true;
    }

    this.setState(
      {
        productFormValues: productFormValues,
        sizeList: sizeList,
        materialFormErros: materialFormErros,
        change_default_material: change_default_material,
      },
      () => {
        this.calculatePrice();
      }
    );
  };

  loadDefaultWeightQty = (form, mat) => {
    let formData = { ...form };
    let materials = [...mat];
    if (!isEmpty(formData.product_id)) {
      let m = _.filter(this.state.productList, { id: formData.product_id });
      if (m.length) {
        let product = m[0];
        if (product.type == "material") {
          materials[0] = {
            ...materials[0],
            weight: product.size_materials[0].materials[0].weight,
            // weight: 0,
          };
          materials[0] = {
            ...materials[0],
            quantity: product.size_materials[0].materials[0].quantity,
          };
          materials[0] = {
            ...materials[0],
            unit_id: product.size_materials[0].materials[0].unit_id,
          };
          materials[0] = {
            ...materials[0],
            unit_name: product.size_materials[0].materials[0].unit_name,
          };
          //materials[0].weight = product.size_materials[0].materials[0].weight;
          //materials[0].quantity = product.size_materials[0].materials[0].quantity;
          //materials[0].unit_id = product.size_materials[0].materials[0].unit_id;
          //materials[0].unit_name = product.size_materials[0].materials[0].unit_name;
        } else {
          if (!isEmpty(formData.size_id)) {
            let sizeArr = _.filter(product.size_materials, {
              size_id: formData.size_id,
            });
            if (sizeArr.length) {
              let size = sizeArr[0];
              for (let i = 0; i < materials.length; i++) {
                let sm = _.filter(size.materials, {
                  material_id: materials[i].material_id,
                });
                if (sm.length) {
                  materials[i] = { ...materials[i], weight: sm[0].weight };
                  materials[i] = { ...materials[i], quantity: sm[0].quantity };
                  materials[i] = { ...materials[i], unit_id: sm[0].unit_id };
                  materials[i] = {
                    ...materials[i],
                    unit_name: sm[0].unit_name,
                  };
                }
              }
            }
          }
        }
      }
    }
    return materials;
  };

  calculatePrice = () => {
    let productFormValues = { ...this.state.productFormValues };
    let totalWeight = 0,
      tax_percentage = 0,
      tax = 0,
      rate = 0,
      totalQty = 0,
      weight = 0;
    for (let i = 0; i < productFormValues.materials.length; i++) {
      if(productFormValues.product_type == "material"){
        productFormValues.materials[i].amount =
          productFormValues.materials[i].weight &&
          productFormValues.materials[i].rate
            ? priceFormat(
                parseFloat(productFormValues.materials[i].pakka_weight) *
                  parseFloat(productFormValues.materials[i].rate)
              )
            : 0;
      } else {
        productFormValues.materials[i].amount =
          productFormValues.materials[i].weight &&
          productFormValues.materials[i].rate
            ? priceFormat(
                parseFloat(productFormValues.materials[i].weight) *
                  parseFloat(productFormValues.materials[i].rate)
              )
            : 0;
      }

      //calculateProductPrice(productFormValues.materials[i].weight, productFormValues.materials[i].rate, productFormValues.materials[i].unit_name);
      if(productFormValues.product_type == "material"){
        weight = convertUnitToGram(
          productFormValues.materials[i].unit_name,
          productFormValues.materials[i].pakka_weight
        );
      } else {
        weight = convertUnitToGram(
          productFormValues.materials[i].unit_name,
          productFormValues.materials[i].weight
        );
      }
      //  console.log("------------ this is convertUnitToGram", weight);

      productFormValues.materials[i].weight_in_gram = weight;
      totalWeight += weight;
      rate += productFormValues.materials[i].amount;
      totalQty += productFormValues.materials[i].quantity
        ? parseInt(productFormValues.materials[i].quantity)
        : 0;
    }
    let making_charge = productFormValues.making_charge
      ? parseFloat(productFormValues.making_charge)
      : 0;
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

    let result = null, gst_type = '';
    if (!isEmpty(productFormValues.tax_percentage) && parseInt(productFormValues.tax_percentage) != 0) { console.log("if");
      console.log("productFormValues.tax_percentage : ", productFormValues.tax_percentage);
      tax_percentage = parseFloat(productFormValues.tax_percentage);
      gst_type = productFormValues.gst_type;
      result = calculateGST(
        productFormValues.tax_info,
        total,
        this.state.supplier_gst_no
      );
      if (result) gst_type = result.type;
      
      if(gst_type == "igst"){
        result = {
          ...result,
          igst: (!isEmpty(tax_percentage)) ? priceFormat(total * parseFloat(tax_percentage) / 100, true) : 0 /* parseInt(tax) */
        };
        tax = result ? parseFloat(result.igst) : 0;
      } else {
        let taxHalf = parseFloat(tax_percentage/2);
        result = {
          ...result,
          cgst: (!isEmpty(taxHalf)) ? priceFormat(total * parseFloat(taxHalf) / 100, true) : 0, /* taxHalf */
          sgst: (!isEmpty(taxHalf)) ? priceFormat(total * parseFloat(taxHalf) / 100, true) : 0 /* taxHalf */
        };
        tax = result ? parseFloat(result.cgst + result.sgst) : 0;
      }
      
      //gst_type = typeof productFormValues.gst_type !== "undefined"?productFormValues.gst_type:'';
    } else { console.log("else");
      tax_percentage = parseFloat(productFormValues.gst_type == "igst"
          ? productFormValues.tax_info
            ? productFormValues.tax_info.igst
            : "0"
          : productFormValues.tax_info
          ? productFormValues.tax_info.cgst +
            productFormValues.tax_info.sgst
          : "0");
      console.log("tax_percentage : ", tax_percentage);
      result = null,
        gst_type = productFormValues.gst_type;
      if (productFormValues.tax_info) {
        result = calculateGST(
          productFormValues.tax_info,
          total,
          this.state.supplier_gst_no
        );
        tax = result ? result.total : 0;
        if (result) gst_type = result.type;
      }
    }

    let cgst_tax = result ? result.cgst : 0;
    let sgst_tax = result ? result.sgst : 0;
    let igst_tax = result ? result.igst : 0;

    total += tax;
    productFormValues.total_weight = weightFormat(totalWeight);
    productFormValues.rate = priceFormat(rate);
    productFormValues.sub_price = priceFormat(sub_price);
    //productFormValues.making_charge = priceFormat(making_charge);
    productFormValues.tax_percentage = tax_percentage;
    productFormValues.tax = priceFormat(tax);
    productFormValues.total = priceFormat(total);
    productFormValues.cgst_tax = priceFormat(cgst_tax);
    productFormValues.sgst_tax = priceFormat(sgst_tax);
    productFormValues.igst_tax = priceFormat(igst_tax);
    productFormValues.gst_type = gst_type;

    this.setState({
      productFormValues: productFormValues,
    });
  };

  getDefaultProductFormData = () => {
    return {
      productFormValues: {
        id: 0,
        product_id: "",
        material_id: "",
        product_type: "",
        product_name: "",
        certificate_no: "",
        current_image:[],
        size_id: "",
        worker_id: "",
        size_name: "",
        materials: [],
        tax_info: null,
        total_weight: 0,
        rate: 0,
        sub_price: 0,
        making_charge: 0,
        rep: 0,
        tax_percentage:0,
        tax: 0,
        cgst_tax: 0,
        sgst_tax: 0,
        igst_tax: 0,
        total: 0,
        product_making_charge_type: "",
        product_making_charge: "",
        category_id: "",
        sub_category_id: "",
        gst_type: "igst",
        has_certificate: false,
      },
      productFormErros: {
        material_id: false,
        product_id: false,
        certificate_no: false,
        size_id: false,
        worker_id: false,
        category_id: false,
        sub_category_id: false,
      },
      materialFormErros: [],
    };
  };

  handleMaterialFormChange = (event, index, key) => {
    let productFormValues = { ...this.state.productFormValues };
    let materials = [...productFormValues.materials];
    materials[index] = { ...materials[index], [key]: event.target.value };
    console.log("key : "+key);
    console.log("value : "+event.target.value);
    console.log("materials[index] : ", materials[index]);
    //materials[index][key] = event.target.value;
    
    if (key == "purity_id" && productFormValues.product_type == "material") {
      console.log("materials[index].purity_id : ", materials[index].purity_id);
      console.log("materials[index].purities : ", materials[index].purities);
      let prioritySelected = materials[index].purities.filter((itm) => itm.id==materials[index].purity_id);
      console.log("prioritySelected : ", prioritySelected);
      materials[index] = {
        ...materials[index],
        pakka_weight: prioritySelected[0].value != ""?parseFloat((parseFloat(materials[index].weight)*parseFloat(prioritySelected[0].value))/100).toFixed(2):parseFloat(materials[index].weight),
      };
      console.log("materials[index] : ", materials[index]);
    }

    if (key == "weight" && productFormValues.product_type == "material") {
      let prioritySelected = materials[index].purities.filter((itm) => itm.id==materials[index].purity_id);
      console.log("prioritySelected : ", prioritySelected);
      let wt = materials[index].weight != ""?materials[index].weight:0;
      materials[index] = {
        ...materials[index],
        pakka_weight: prioritySelected[0].value != ""?parseFloat((parseFloat(wt)*parseFloat(prioritySelected[0].value))/100).toFixed(2):parseFloat(wt),
      };
      console.log("materials[index] : ", materials[index]);
      //productFormValues.materials = [...materials];
    }

    if (key == "unit_id") {
      let m = _.filter(this.state.unitList, { id: event.target.value });
      //materials[index].unit_name = m.length ? m[0].name : '';
      materials[index] = {
        ...materials[index],
        unit_name: m.length ? m[0].name : "",
      };
    }
    productFormValues.materials = [...materials];

    if (key == "weight") {
      if (index == 0) {
        GroseData = event.target.value;
      } else {
        // console.log(materials);

        let weight = GroseData;
        let total_value = 0;
        for (let index = 1; index < materials.length; index++) {
          // total_value += Number(materials[index].weight);
          total_value += convertUnitToGram(
            productFormValues.materials[index].unit_name,
            productFormValues.materials[index].weight
          );
          // console.log("------------total value is ", total_value);
        }

        materials[0].weight = (weight - total_value).toFixed(3);
        
        let prioritySelected = materials[0].purities.filter((itm) => itm.id==materials[0].purity_id);
        console.log("prioritySelected : ", prioritySelected);

        if(productFormValues.product_type == "material"){
          materials[0].pakka_weight = prioritySelected[0].value != ""?parseFloat((parseFloat(materials[0].weight)*parseFloat(prioritySelected[0].value))/100).toFixed(3):parseFloat(materials[0].weight).toFixed(3);
        }
      }
    }

    console.log("productFormValues : ", productFormValues);
    this.setState(
      {
        productFormValues: productFormValues,
      },
      () => {
        this.calculatePrice();
      }
    );
  };

  updateProductMakingCharge = (event) => {
    let productFormValues = {...this.state.productFormValues};
    productFormValues.making_charge = event.target.value;
    let tax = 0;
    let making_charge = event.target.value ? parseFloat(event.target.value) : 0;
    let total = productFormValues.sub_price
      ? parseFloat(productFormValues.sub_price)
      : 0;
    total += making_charge;
    if (!isEmpty(productFormValues.rep)) {
      total += parseFloat(productFormValues.rep);
    }
    let result = null,
      gst_type = productFormValues.gst_type;
    if (productFormValues.tax_info) {
      result = calculateGST(
        productFormValues.tax_info,
        total,
        this.state.supplier_gst_no
      );
      tax = result ? result.total : 0;
      if (result) gst_type = result.type;
    }
    
    console.log("productFormValues : ", productFormValues);
    console.log("this.state.current_image : ", this.state.current_image);
    //productFormValues.current_image[0]=this.state.current_image;
    productFormValues.current_image = this.state.current_image[0]?.data_url;

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
    this.setState({
      productFormValues: productFormValues,
    });
  };

  handleProductDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      productDialog: false,
    });
  };

  handleProductDelete = (index) => {
    this.setState({
      deletingIndex: index,
      deleteDialogOpen: true,
    });
  };

  handleProductSubmit = async () => {
    console.log(this.state)
    let hasErr = this.productFormValidate();
    if (!hasErr) {
      //check certificate is unique
      let res = await checkCertificateNo({
        certificate_no: this.state.productFormValues.certificate_no,
      });
      if (res.data.success && res.data.data.is_exist) {
        return this.props.enqueueSnackbar("Certificate # is duplicate.", {
          variant: "error",
        });
      }

      let formValues = { ...this.state.formValues };
      let _data = { ...this.state.productFormValues,current_image:this.state.current_image[0]?.data_url };
      // console.log("this hdkh", this.state.productFormValues);
      let products = [...formValues.products];

      this.setState(
        {
          current_image:[],
          formValues: {
            ...formValues,
            products: this.state.formValues.products.concat([_data]),
          },
          productFormValues: {
            ..._data,
            certificate_no: "",
            size_id: "",
          },
          change_default_material: false,
          //productDialog: false
        },
        () => {
          this.handleCalculateMainPrice();
        }
      );
      this.props.enqueueSnackbar("Product added successfully.", {
        variant: "success",
      });
      console.log(this.state.formValues)
    }
  };

  productFormValidate = () => {
    let productFormValues = this.state.productFormValues;
    let productFormErros = this.state.productFormErros;
    let materialFormErros = this.state.materialFormErros;
    let hasErr = false;
    if (this.state.formValues.type == "product") {
      if (isEmpty(productFormValues.product_id)) {
        productFormErros.product_id = true;
        hasErr = true;
      } else {
        productFormErros.product_id = false;
      }
    } else {
      if (isEmpty(productFormValues.material_id)) {
        productFormErros.material_id = true;
        hasErr = true;
      } else {
        productFormErros.material_id = false;
      }
    }
    if (
      productFormValues.product_type != "material" &&
      productFormValues.has_certificate
    ) {
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
    if (productFormValues.product_type == "in_house") {
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

      if(productFormValues.product_type == "material"){
        if (isEmpty(productFormValues.materials[i].pakka_weight)) {
          materialFormErros[i].pakka_weight = true;
          hasErr = true;
        } else {
          materialFormErros[i].pakka_weight = false;
        }
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
    if (
      !isEmpty(productFormValues.certificate_no) &&
      productFormValues.product_type != "material"
    ) {
      for (let i = 0; i < this.state.formValues.products.length; i++) {
        if (
          productFormValues.certificate_no ==
          this.state.formValues.products[i].certificate_no
        ) {
          hasErr = true;
          this.props.enqueueSnackbar("Certificate # is duplicate.", {
            variant: "error",
          });
          break;
        }
      }
    }

    // console.log(productFormErros);
    // console.log(materialFormErros);

    this.setState({
      productFormErros: productFormErros,
      materialFormErros: materialFormErros,
    });
    return hasErr;
  };

  handleDialogClose = () => {
    this.setState({
      deleteDialogOpen: false,
      deletingIndex: 0,
    });
  };

  returnDialogClose = () => {
    this.setState({
      returnDialogOpen: false,
    });
  };

  handleDeleteConfirm = () => {
    let formValues = this.state.formValues;
    formValues.products.splice(this.state.deletingIndex, 1);
    this.setState(
      {
        formValues: formValues,
        deleteDialogOpen: false,
      },
      () => {
        this.handleCalculateMainPrice();
      }
    );
  };

  handleCalculateMainPrice = () => {
    let formValues = this.state.formValues;
    let return_products = this.state.return_products;
    let taxable_amount = 0,
      tax = 0,
      total_amount = 0,
      discount = 0,
      total_payable = 0,
      paid_amount = 0,
      due_amount = 0,
      cgst_tax = 0,
      sgst_tax = 0,
      igst_tax = 0,
      total_sub_total = 0;
    for (let i = 0; i < formValues.products.length; i++) {
      /*if(return_products[i].is_return){
                continue;
            }*/
      taxable_amount +=
        parseFloat(formValues.products[i].sub_price) +
        parseFloat(formValues.products[i].making_charge) +
        (formValues.products[i].rep
          ? parseFloat(formValues.products[i].rep)
          : 0);
      tax += formValues.products[i].tax
        ? parseFloat(formValues.products[i].tax)
        : 0;
      total_amount += parseFloat(formValues.products[i].total);
      cgst_tax += formValues.products[i].cgst_tax
        ? parseFloat(formValues.products[i].cgst_tax)
        : 0;
      sgst_tax += formValues.products[i].sgst_tax
        ? parseFloat(formValues.products[i].sgst_tax)
        : 0;
      igst_tax += formValues.products[i].igst_tax
        ? parseFloat(formValues.products[i].igst_tax)
        : 0;
      total_sub_total += parseFloat(formValues.products[i].sub_price);
      total_sub_total += parseFloat(formValues.products[i].making_charge);
    }
    taxable_amount = priceFormat(taxable_amount, true);
    tax = priceFormat(tax, true);
    total_amount = priceFormat(total_amount, true);
    if (!isEmpty(formValues.discount)) {
      discount = parseFloat(formValues.discount);
    }
    total_payable = priceFormat(
      total_amount - discount - this.state.return_amount,
      true
    );
    if (!isEmpty(formValues.paid_amount)) {
      paid_amount = parseFloat(formValues.paid_amount);
    }
    let advance_amount = formValues.advance_amount
      ? parseFloat(formValues.advance_amount)
      : 0;
    due_amount = priceFormat(total_payable - paid_amount, true);
    if (formValues.pay_from_advance) {
      due_amount =
        advance_amount > due_amount
          ? 0
          : priceFormat(due_amount - advance_amount, true);
    }
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
      formValues: formValues,
    });
  };

  handleSubmit = () => {
    let formValues = this.state.formValues;
    let return_sale_data = this.state.return_sale_data;
    let hasErr = this.formValidate();
    if (formValues.products.length == 0) {
      this.props.enqueueSnackbar("Please add at least one product", {
        variant: "error",
      });
      return false;
    }
    if (!hasErr && formValues.products.length) {
      this.setState({
        submitting: true,
      });
      if (this.state.isCreateFrom) {
        let data = {
          ...this.state.formValues,
          current_image:this.state.current_image[0]?.data_url,
          on_approval:
            this.props.query.get("purchase_on_approval") == 0 ? true : false,
          on_approval_id: this.props.query.get("purchase_on_approve"),
          return_sale_id: return_sale_data ? return_sale_data.id : "",
        };
        this.props.actions.purchaseStore(data);
      } else {
        this.props.actions.purchaseUpdate(
          this.state.formData.id,
          this.state.formValues
        );
      }
    }
  };

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
    if (
      !isEmpty(formValues.total_payable) &&
      !isEmpty(formValues.paid_amount)
    ) {
      if (
        parseFloat(formValues.paid_amount) >
        parseFloat(formValues.total_payable)
      ) {
        hasErr = true;
        this.props.enqueueSnackbar(
          "Paid amount must be less than or equal to payable amount.",
          { variant: "error" }
        );
      }
    }
    this.setState({
      formErros: formErros,
    });
    return hasErr;
  };

  getSupplierDetails = () => {
    if (!isEmpty(this.state.formValues.supplier_id)) {
      let m = _.filter(this.state.supplierList, {
        id: this.state.formValues.supplier_id,
      });
      if (m.length) {
        this.setState({
          supplier_details: {
            ...this.state.supplier_details,
            name: !isEmpty(m[0].name) ? m[0].name : "",
            company_name: !isEmpty(m[0].company_name) ? m[0].company_name : "",
            mobile: !isEmpty(m[0].mobile) ? m[0].mobile : "",
            city: !isEmpty(m[0].city) ? m[0].city : "",
            gst: !isEmpty(m[0].gst) ? m[0].gst : "",
            address: !isEmpty(m[0].address) ? m[0].address : "",
            pincode: !isEmpty(m[0].pincode) ? m[0].pincode : "",
          },
        });
      }
    }
  };

  handleCategoryChange = (event) => {
    this.updateProductFormValues(event.target.value, "category_id");
    if (isEmpty(event.target.value)) {
      this.props.dispatch({
        type: RESET_SUB_CATEGORY_LIST,
      });
    } else {
      this.props.actions.subCategoryList({
        all: 1,
        category_id: event.target.value,
      });
    }
    this.props.actions.materialList({
      all: 1,
      category_id: event.target.value,
    });
    this.updateProductFormValues("", "sub_category_id");
    this.updateProductFormValues("", "product_id");
    this.props.dispatch({
      type: RESET_PRODUCT_LIST,
    });

    if (this.state.formValues.type == "material") {
      if (event.target.value) {
        this.loadSizeMaterialsForMaterial({ category_id: event.target.value });
      } else {
        this.setState({
          sizeList: [],
        });
      }
    }
  };

  loadSizeMaterialsForMaterial = async (params) => {
    let res = await sizeListRaw({ all: 1, ...params });
    if (res.data.success) {
      this.setState({
        sizeList: res.data.data.items,
      });
    }
  };

  onChangeCurrent_image = (imageList, addUpdateIndex) => {
    // data for submit
    console.log("-----add Current image", imageList, addUpdateIndex);
    this.setState({
      current_image: imageList,
    });
    console.log(this.state.current_image);
  };

  handleSubCategoryChange = (event) => {
    this.updateProductFormValues(event.target.value, "sub_category_id");
    if (this.state.formValues.type == "material") {
      if (event.target.value) {
        this.loadSizeMaterialsForMaterial({
          sub_category_id: event.target.value,
        });
      } else {
        this.setState({
          sizeList: [],
        });
      }
    } else {
      this.props.actions.productList({
        all: 1,
        sub_category_id: event.target.value,
        purity_price: 1,
      });
      this.updateProductFormValues("", "product_id");
      this.props.dispatch({
        type: RESET_PRODUCT_LIST,
      });
    }
  };

  handleCheckBox = (e, index) => {
    let products = this.state.formValues.products;
    let return_products = this.state.return_products;
    let product = products[index];
    if (product.product_type == "material") {
      this.setState({
        materialReturnDialog: true,
        actionProductIndex: index,
      });
      return;
    }
    return_products[index].is_return = e.target.checked;
    this.setState(
      {
        return_products: return_products,
      },
      () => {
        this.calculateReturnAmount();
      }
    );
  };

  handleReturn = () => {
    this.setState({
      returnDialogOpen: true,
    });
  };

  handleReturnConfirm = async () => {
    this.setState({
      submitting: true,
    });
    let res = await purchaseReturn(this.state.formData.id, {
      return_products: this.state.return_products,
      return_data: this.state.formValues,
      return_amount: this.state.return_amount,
      product_amount: this.state.product_amount,
      return_charge: this.state.return_charge,
      return_date: this.state.return_date,
      payment_type: this.state.payment_type,
      return_payment_mode: this.state.return_payment_mode,
      return_amount_from_wallet: priceFormat(
        parseFloat(this.state.return_amount) -
          parseFloat(this.state.formValues.due_amount)
      ),
    });
    if (res.data.success) {
      this.props.actions.cartList();
      this.props.enqueueSnackbar(res.data.message, { variant: "success" });
      this.props.navigate(
        getUserDashboardRoute(getRoleName(this.state.auth)) + "/purchases"
      );
    } else {
      this.setState({
        submitting: false
      });
      this.props.enqueueSnackbar(res.data.message, { variant: "error" });
    }
  };

  handleReturnDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      materialReturnDialog: false,
    });
  };

  handleCancelReturn = () => {
    let { formValues, actionProductIndex, return_products } = this.state;
    formValues.products[actionProductIndex].materials[0].return_weight = 0;
    formValues.products[actionProductIndex].materials[0].return_qty = 0;
    return_products[actionProductIndex].is_return = false;
    this.setState({
      return_products: return_products,
      formValues: formValues,
      materialReturnDialog: false,
    });
  };

  handleReturnMaterialSubmit = () => {
    let { formValues, actionProductIndex } = this.state;
    const actionProduct = formValues.products[actionProductIndex];
    let err = false;
    if (
      !actionProduct.materials[0].return_weight ||
      parseFloat(actionProduct.materials[0].return_weight) >
        parseFloat(actionProduct.materials[0].avl_weight)
    ) {
      err = true;
      this.setState({
        return_weight_error: true,
      });
      if (
        parseFloat(actionProduct.materials[0].return_weight) >
        parseFloat(actionProduct.materials[0].avl_weight)
      ) {
        this.props.enqueueSnackbar(
          "Weight can't be more than available weight.",
          { variant: "error" }
        );
      }
    } else {
      this.setState({
        return_weight_error: false,
      });
    }
    if (
      actionProduct.materials[0].return_qty &&
      parseFloat(actionProduct.materials[0].return_qty) >
        parseFloat(actionProduct.materials[0].avl_qty)
    ) {
      err = true;
      this.setState({
        return_qty_error: true,
      });
      if (
        parseFloat(actionProduct.materials[0].return_qty) >
        parseFloat(actionProduct.materials[0].avl_qty)
      ) {
        this.props.enqueueSnackbar(
          "Quantity can't be more than available quantity.",
          { variant: "error" }
        );
      }
    } else {
      this.setState({
        return_qty_error: false,
      });
    }
    if (!err) {
      let return_products = this.state.return_products;
      return_products[actionProductIndex].is_return = true;
      this.setState(
        {
          materialReturnDialog: false,
          return_products: return_products,
        },
        () => {
          this.calculateReturnAmount();
        }
      );
    }
  };

  calculateReturnAmount = () => {
    let { formValues, actionProductIndex } = this.state;
    let return_products = this.state.return_products;
    let return_amount = 0,
      return_charge = 0,
      product_amount = 0;
    for (let i = 0; i < return_products.length; i++) {
      if (return_products[i].is_return) {
        if (formValues.products[i].product_type == "material") {
          let return_weight = parseFloat(formValues.products[i].materials[0].return_weight);
          return_weight = formValues.products[i].materials[0].purity_info.value?(return_weight*parseFloat(formValues.products[i].materials[0].purity_info.value))/100:return_weight;
          
          let thisAmt = priceFormat(
            parseFloat(return_weight) *
              parseFloat(formValues.products[i].materials[0].rate)
          );
          let thisReturnCharge = formValues.have_return_charge
            ? parseFloat(formValues.products[i].return_charge_percent) > 0
              ? priceFormat(
                  (thisAmt *
                    parseFloat(formValues.products[i].return_charge_percent)) /
                    100
                )
              : 0
            : 0;
          formValues.products[i].return_amount = thisAmt;
          formValues.products[i].return_charge = thisReturnCharge;
          
          return_amount += thisAmt - thisReturnCharge;
          return_charge += thisReturnCharge;
          product_amount += thisAmt;
        } else {
          let thisAmt = parseFloat(formValues.products[i].total);
          let thisReturnCharge = formValues.have_return_charge
            ? parseFloat(formValues.products[i].return_charge_percent) > 0
              ? (thisAmt *
                  parseFloat(formValues.products[i].return_charge_percent)) /
                100
              : 0
            : 0;
          formValues.products[i].return_amount = thisAmt;
          formValues.products[i].return_charge = thisReturnCharge;
          return_amount += thisAmt - thisReturnCharge;
          return_charge += thisReturnCharge;
          product_amount += thisAmt;
        }
      }
    }

    this.setState({
      return_amount: priceFormat(return_amount, true),
      product_amount: priceFormat(product_amount, true),
      return_charge: priceFormat(return_charge, true),
      formValues: formValues,
    });
  };

  handleReturnMaterial = (val, key) => {
    let { formValues, actionProductIndex } = this.state;
    formValues.products[actionProductIndex].materials[0][key] = val;
    this.setState({
      formValues: formValues,
    });
  };

  hasReturn = () => {
    let isReturn = false;
    for (let i = 0; i < this.state.return_products.length; i++) {
      if (this.state.return_products[i].is_return) {
        isReturn = true;
        break;
      }
    }
    return isReturn;
  };

  setOpen = (id) => {
    let view_open = this.state.view_open;
    view_open[id] = !this.checkOpen(id);
    this.setState({
      view_open: view_open,
    });
  };

  checkOpen = (id) => {
    let view_open = this.state.view_open;
    return id in view_open && view_open[id] ? true : false;
  };

  isMaterialFormDisabled = () => {
    if (
      this.state.formValues.products.length == 0 &&
      !this.state.productFormValues.size_id &&
      this.state.productFormValues.product_type != "material"
    ) {
      return true;
    } else {
      return false;
    }
  };

  handlePurchasTypeChange = (event) => {
    this.updateFormValues(event.target.value, "type");
    this.updateFormValues([], "products");
    this.setState(
      {
        ...this.getDefaultProductFormData(),
      },
      () => {
        this.handleCalculateMainPrice();
      }
    );
  };

  handleAdvance = (e) => {
    this.setState(
      {
        formValues: {
          ...this.state.formValues,
          pay_from_advance: e.target.checked,
        },
      },
      () => {
        this.handleCalculateMainPrice();
      }
    );
  };

  getMaterialPurity = (arr, id, purity_name) => {
    if (!isEmpty(purity_name)) {
      return `(${purity_name})`;
    }
    let m = _.filter(arr, { id: id });
    if (m.length) {
      return `(${m[0].name})`;
    } else {
      return "";
    }
  };

  render() {
    const {
      formValues,
      formErros,
      productFormValues,
      productFormErros,
      materialFormErros,
      submitting,
      actionProductIndex,
      return_sale_data,
    } = this.state;
    const actionProduct = formValues.products.length
      ? formValues.products[actionProductIndex]
      : null;

    return (
      <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
        {return_sale_data ? (
          <Grid item xs={12} md={12} className="create-input">
            <Accordion className="rtn_accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Return Sale # {return_sale_data.invoice_number} |{" "}
                  {`${return_sale_data.user_name}, ${return_sale_data.user_mobile}`}{" "}
                  | {return_sale_data.return_date}
                </Typography>
              </AccordionSummary>
            </Accordion>
          </Grid>
        ) : null}
        <Grid container spacing={2} className="tax-input loans_view p_view">
          {!this.state.isCreateFrom ? (
            <Grid
              item
              xs={!formValues.supplier_id ? 12 : 12}
              md={!formValues.supplier_id ? 6 : 4}
              className="create-input"
            >
              <TextField
                label="Supplier"
                variant="outlined"
                fullWidth
                value={this.state.supplier_details.name}
                disabled
                InputProps={{
                  className: "non_disable_text",
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ) : (
            <Grid
              item
              xs={!formValues.supplier_id ? 12 : 12}
              md={!formValues.supplier_id ? 6 : 4}
              className="create-input"
            >
              <FormControl fullWidth error={formErros.supplier_id}>
                <InputLabel>Supplier</InputLabel>
                <Select
                  className="input-inner non_disable_text"
                  value={formValues.supplier_id}
                  fullWidth
                  label="Supplier"
                  onChange={this.handleSupplierChange}
                  disabled={
                    !this.state.isCreateFrom ||
                    (!isEmpty(this.props.query.get("purchase_on_approve"))
                      ? true
                      : false)
                  }
                >
                  <MenuItem value=""></MenuItem>
                  {this.state.supplierList.map((item, index) => {
                    return (
                      <MenuItem value={item.id} key={index}>
                        {item.name}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          )}
          {formValues.supplier_id ? (
            <>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="Owner Name"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.name}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="GST Number"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.gst}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.mobile}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          ) : null}
          {!formValues.supplier_id ? (
            <Grid item xs={12} md={3} className="create-input">
              <TextField
                label="Invoice Number"
                variant="outlined"
                fullWidth
                value={formValues.invoice_number}
                onChange={(event) =>
                  this.handleDefaultChange(event, "invoice_number")
                }
                disabled={!this.state.isCreateFrom}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ) : null}
          <Grid
            item
            xs={!formValues.supplier_id ? 12 : 12}
            md={!formValues.supplier_id ? 3 : 2}
            className="p-invoice-date create-input"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Invoice Date"
                value={formValues.invoice_date}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) =>
                  this.updateFormValues(newValue, "invoice_date")
                }
                disabled={!this.state.isCreateFrom}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={formErros.invoice_date}
                    InputProps={{
                      className: "non_disable_text",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {formValues.supplier_id ? (
            <>
              <Grid item xs={12} md={6} className="create-input">
                <TextField
                  label="Full Address"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.address}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.city}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="PinCode"
                  variant="outlined"
                  fullWidth
                  value={this.state.supplier_details.pincode}
                  disabled
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} className="create-input">
                <TextField
                  label="Invoice Number"
                  variant="outlined"
                  fullWidth
                  value={formValues.invoice_number}
                  onChange={(event) =>
                    this.handleDefaultChange(event, "invoice_number")
                  }
                  disabled={!this.state.isCreateFrom}
                  InputProps={{
                    className: "non_disable_text",
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <Grid container spacing={2} className="loans_view tax-input">
          <Grid item xs={12} md={12} className="p-add-product create-input">
            <h3
              className="p_heading_list mb-0 mt-0"
              style={{ position: "relative" }}
            >
              {!this.state.isReturnForm ? (
                <>
                  <FormControl>
                    <InputLabel>Purchase Type</InputLabel>
                    <Select
                      className="input-inner non_disable_text"
                      value={formValues.type}
                      fullWidth
                      label="Purchase Type"
                      onChange={this.handlePurchasTypeChange}
                      disabled={!this.state.isCreateFrom}
                    >
                      <MenuItem value="product">Product</MenuItem>
                      <MenuItem value="material">Material</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    className="add-button purchase_add_p"
                    onClick={() => this.handleAddNewProduct()}
                    style={{ width: "140px" }}
                  >
                    Add Product
                  </Button>
                </>
              ) : null}
              <span className="purchase_p_title">
                Purchase{" "}
                {formValues.type == "product" ? "Products" : "Materials"}
              </span>
            </h3>

            {}
            {this.state.productDialog ? (
              <Box sx={{ flexGrow: 1, m: 0.5 }}>
                <Grid
                  container
                  spacing={2}
                  className="loans_view tax-input p_view"
                >
                  <Grid item xs={8} md={2}>
                    <FormControl fullWidth error={productFormErros.category_id}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={productFormValues.category_id}
                        label="Category"
                        onChange={this.handleCategoryChange}
                        defaultValue=""
                      >
                        <MenuItem value=""></MenuItem>
                        {this.state.categoryList.map((item, index) => (
                          <MenuItem value={item.id} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} md={2}>
                    <FormControl
                      fullWidth
                      error={productFormErros.sub_category_id}
                    >
                      <InputLabel>Sub Category</InputLabel>
                      <Select
                        value={productFormValues.sub_category_id}
                        label="Sub Category"
                        onChange={this.handleSubCategoryChange}
                        defaultValue=""
                      >
                        <MenuItem value=""></MenuItem>
                        {this.state.subCategoryList.map((item, index) => (
                          <MenuItem value={item.id} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    className="d-flex ml-2 "
                    item
                    xs={productFormValues.product_type == "in_house" ? 12 : 12}
                    md={
                      productFormValues.product_type == "in_house" ? 2.5 : 2.5
                    }
                  >
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

                    {formValues.type == "product" ? (
                      <Autocomplete
                        className="autocomplete-selectbox"
                        fullWidth
                        options={this.state.productList}
                        autoHighlight
                        getOptionLabel={(option) =>
                          option.name + " | " + option.product_code
                        }
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.name + " | " + option.product_code}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                            fullWidth
                            error={productFormErros.product_id}
                          />
                        )}
                        onChange={(event, newValue) => {
                          this.handleProductChange(
                            event,
                            newValue ? newValue.id : "",
                            this.state.productList
                          );
                        }}
                      />
                    ) : (
                      <Autocomplete
                        className="autocomplete-selectbox"
                        fullWidth
                        options={this.state.materialList}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option.name}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Material"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                            fullWidth
                            error={productFormErros.material_id}
                          />
                        )}
                        onChange={(event, newValue) => {
                          this.updateProductFormValues(
                            newValue ? newValue.id : "",
                            "material_id"
                          );
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item className="me-3">
                    {formValues.type == "product"
                      ? this.state?.productList?.map((items, index) => {
                          {
                            /* console.log("items.product--------", items.name);
                          console.log(
                            "this.state.product from value--------",
                            this.state?.productFormValues?.product_name
                          ); */
                          }
                          if (
                            items.name ==
                            this.state?.productFormValues.product_name
                          ) {
                            return (
                              <div className="ml-3">
                                <img
                                  className=" rounded"
                                  src={items.default_image}
                                  width={70}
                                  height={70}
                                />
                              </div>
                            );
                          }
                        })
                      : null}
                  </Grid>
                  {this.state.productFormValues.product_id!=""?<Grid item>
                        <ImageUploading
                          multiple
                          value={this.state.current_image}
                          onChange={this.onChangeCurrent_image}
                          maxNumber={1}
                          dataURLKey="data_url"
                          acceptType={["jpg",'jpeg','png']}
                        >
                          {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                              {imageList.map((image, index) => (
                                <div
                                  key={index}
                                  className="image-item position-relative"
                                >
                                  <img
                                    src={image.data_url}
                                    alt="this is uploade image "
                                    width="100"
                                    className="rounded object-fit-cover"
                                    onClick={() => onImageUpdate(index)}
                                  />
                                  <i
                                    class="bi bi-x-circle-fill fs-3 text-danger position-absolute"
                                    style={{ left: "4px" }}
                                    onClick={() => onImageRemove(index)}
                                  ></i>

                                </div>
                              ))}
                              {imageList.length == 0 ? (
                                <button
                                  style={
                                    isDragging
                                      ? {
                                          color: "red",
                                          width: "150px",
                                          height: "120px",
                                        }
                                      : null
                                  }
                                  className="border-1 shadow border-seconadry rounded"
                                  onClick={onImageUpload}
                                  {...dragProps}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="60"
                                    height="60"
                                    fill="currentColor"
                                    class="bi bi-card-image"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                                  </svg>
                                </button>
                              ) : null}
                            </div>
                          )}
                        </ImageUploading>
                      </Grid>:null}
                  {productFormValues.product_type !=
                  "material" /* || formValues.type == "material"*/ ? (
                    <>
                      {productFormValues.product_type != "material" &&
                      formValues.type != "material" &&
                      productFormValues.has_certificate ? (
                        <Grid item xs={12} md={2}>
                          <TextField
                            label="Certificate Number"
                            variant="outlined"
                            fullWidth
                            value={productFormValues.certificate_no}
                            onChange={(event) =>
                              this.handleProductFormDefaultChange(
                                event,
                                "certificate_no"
                              )
                            }
                            error={productFormErros.certificate_no}
                          />
                        </Grid>
                      ) : null}
                      <Grid
                        item
                        xs={
                          productFormValues.product_type == "in_house" ? 2 : 2
                        }
                        style={{ maxWidth: "fit-content " }}
                      >
                        <FormControl error={productFormErros.size_id}>
                          <InputLabel>Size</InputLabel>
                          <Select
                            style={{ width: "100px" }}
                            value={productFormValues.size_id}
                            label="Size"
                            onChange={this.handleSizeChange}
                            defaultValue=""
                          >
                            <MenuItem value=""></MenuItem>
                            {this.state.sizeList.map((item, index) => (
                              <MenuItem value={item.id} key={index}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                    </>
                  ) : null}
                  {/*{
                                            this.isSuperAdmin ?
                                                <Grid item xs={12} md={2}>
                                                    <FormControl fullWidth error={productFormErros.worker_id}>
                                                        <InputLabel>Worker</InputLabel>
                                                        <Select
                                                            value={productFormValues.worker_id}
                                                            label="Worker"
                                                            onChange={this.handleWorkerChange}
                                                            defaultValue=""
                                                        >
                                                            <MenuItem value=""></MenuItem>
                                                            {
                                                                this.state.workerList.map((item, index) => (
                                                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                : null
                                        }*/}
                </Grid>
                <Grid container spacing={2} className="loans_view tax-input">
                  <Grid item xs={12} md={12} className="border-radius-0">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        className="ratn-table-add-wrapper"
                      >
                        <TableHead className="ratn-table-header">
                          <TableRow>
                            <TableCell sx={{ width: "170px" }}>
                              Material Name
                            </TableCell>
                            <TableCell>Purity</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Weight</TableCell>
                            {productFormValues.product_type == "material"?<TableCell>Pakka</TableCell>:""}
                            <TableCell>Unit</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="p-invoice-date">
                          {productFormValues.materials.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.material_name}</TableCell>
                              <TableCell style={{ minWidth: "150px" }}>
                                <FormControl
                                  fullWidth
                                  error={materialFormErros[index].purity_id}
                                >
                                  <InputLabel>Purity</InputLabel>
                                  <Select
                                    value={item.purity_id}
                                    label="Purity"
                                    onChange={(event) =>
                                      this.handleMaterialFormChange(
                                        event,
                                        index,
                                        "purity_id"
                                      )
                                    }
                                    defaultValue=""
                                    disabled={this.isMaterialFormDisabled()}
                                  >
                                    <MenuItem value=""></MenuItem>
                                    {item.purities.map((item, index) => (
                                      <MenuItem value={item.id} key={index}>
                                        {item.name}{" "}
                                        {item.mrp_display ? (
                                          <>
                                            ({displayAmount(item.mrp_display)} /{" "}
                                            {item.unit_name})
                                          </>
                                        ) : (
                                          ""
                                        )}{" "}{item.value != ""?item.value+"%":""}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  label="Quantity"
                                  variant="outlined"
                                  fullWidth
                                  value={item.quantity}
                                  onChange={(event) =>
                                    this.handleMaterialFormChange(
                                      event,
                                      index,
                                      "quantity"
                                    )
                                  }
                                  error={materialFormErros[index].quantity}
                                  disabled={this.isMaterialFormDisabled()}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  label="Total Weight"
                                  variant="outlined"
                                  fullWidth
                                  value={item.weight}
                                  onChange={(event) =>
                                    this.handleMaterialFormChange(
                                      event,
                                      index,
                                      "weight"
                                    )
                                  }
                                  error={materialFormErros[index].weight}
                                  disabled={this.isMaterialFormDisabled()}
                                />
                              </TableCell>
                              {productFormValues.product_type == "material"?<TableCell>
                                <TextField
                                  label="Pakka"
                                  variant="outlined"
                                  fullWidth
                                  value={item.pakka_weight}
                                  onChange={(event) =>
                                    this.handleMaterialFormChange(
                                      event,
                                      index,
                                      "pakka_weight"
                                    )
                                  }
                                  error={materialFormErros[index].pakka_weight}
                                  disabled={this.isMaterialFormDisabled()}
                                />
                              </TableCell>:""}
                              <TableCell style={{ minWidth: "150px" }}>
                                <FormControl
                                  fullWidth
                                  error={materialFormErros[index].unit_id}
                                >
                                  <InputLabel>Unit</InputLabel>
                                  <Select
                                    value={item.unit_id}
                                    label="Purity"
                                    onChange={(event) =>
                                      this.handleMaterialFormChange(
                                        event,
                                        index,
                                        "unit_id"
                                      )
                                    }
                                    defaultValue=""
                                    disabled={this.isMaterialFormDisabled()}
                                  >
                                    <MenuItem value=""></MenuItem>
                                    {this.state.unitList.map((item, index) => (
                                      <MenuItem value={item.id} key={index}>
                                        {item.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  label="Rate"
                                  variant="outlined"
                                  fullWidth
                                  value={item.rate}
                                  onChange={(event) =>
                                    this.handleMaterialFormChange(
                                      event,
                                      index,
                                      "rate"
                                    )
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        ₹
                                      </InputAdornment>
                                    ),
                                  }}
                                  error={materialFormErros[index].rate}
                                  disabled={this.isMaterialFormDisabled()}
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
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        ₹
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className="loans_view tax-input p_view"
                >
                  {productFormValues.materials.length > 1 ? (
                    <Grid item xs={12} md={2}>
                      <TextField
                        label="TOT.WT(IN GRAM)"
                        variant="outlined"
                        fullWidth
                        value={GroseData}
                        disabled
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="SUB TOTAL"
                      variant="outlined"
                      fullWidth
                      value={productFormValues.sub_price}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="MAKING CHARGE"
                      variant="outlined"
                      fullWidth
                      value={productFormValues.making_charge}
                      onChange={(event) =>
                        this.updateProductMakingCharge(event)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="REP/TRANS/ETC"
                      variant="outlined"
                      fullWidth
                      value={productFormValues.rep}
                      onChange={(event) =>
                        this.updateProductFormValues(event.target.value, "rep")
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {productFormValues.product_type == "material" &&
                      formValues.type == "material" ? <><Grid item xs={12} md={2}>
                    <TextField
                      label="TAX%"
                      variant="outlined"
                      fullWidth
                      value={productFormValues.tax_percentage != 0?productFormValues.tax_percentage : (parseFloat(productFormValues.gst_type == "igst"
                        ? productFormValues.tax_info
                          ? productFormValues.tax_info.igst
                          : "0"
                        : productFormValues.tax_info
                        ? productFormValues.tax_info.cgst +
                          productFormValues.tax_info.sgst
                        : "0"))}
                      onChange={(event) =>
                        this.updateProductFormValues(event.target.value, "tax_percentage")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            %
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="TAX"
                      variant="outlined"
                      disabled
                      fullWidth
                      value={productFormValues.tax}
                      onChange={(event) =>
                        this.updateProductFormValues(event.target.value, "tax")
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  </>
                  : <>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="TAX"
                      variant="outlined"
                      disabled
                      fullWidth
                      value={productFormValues.tax}
                      onChange={(event) =>
                        this.updateProductFormValues(event.target.value, "tax")
                      }
                      
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {
                              productFormValues.gst_type == "igst"
                              ? productFormValues.tax_info
                                ? productFormValues.tax_info.igst
                                : "0"
                              : productFormValues.tax_info
                              ? productFormValues.tax_info.cgst +
                                productFormValues.tax_info.sgst
                              : "0"
                            }%&nbsp;
                            ₹
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  </>}
                  
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="TOTAL"
                      variant="outlined"
                      fullWidth
                      value={productFormValues.total}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} style={{ paddingBottom: "15px" }}>
                    <Stack
                      spacing={1}
                      direction="row"
                      className="ratn-footer-buttons"
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="contained"
                        className="conf-button PurshasFormSave"
                        type="button"
                        // disabled={this.saveDisabled()}
                        onClick={this.handleProductSubmit}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        className="close-button"
                        onClick={this.handleProductDialogClose}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            ) : null}
            <TableContainer
              component={Paper}
              className="ratn-table-wrapper mt-10 purchase-table"
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="table-bordered"
              >
                <TableHead className="ratn-table-header p_view">
                  <TableRow>
                    {this.state.isReturnForm ? <TableCell></TableCell> : null}
                    <TableCell>#</TableCell>
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
                    {!this.state.isReturnForm ? (
                      <TableCell sx={{ width: "60px" }}>Action</TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formValues.products.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        className={
                          "is_return" in item && item.is_return
                            ? "strike_through"
                            : ""
                        }
                      >
                        {this.state.isReturnForm ? (
                          <TableCell>
                            {!item.is_return ? (
                              <Checkbox
                                onChange={(e) => this.handleCheckBox(e, index)}
                                checked={
                                  this.state.return_products[index].is_return
                                }
                              />
                            ) : null}

                            {!item.is_return &&
                            item.product_type == "material" &&
                            item.materials[0].return_weight ? (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => this.setOpen(item.id)}
                              >
                                {this.checkOpen(item.id) ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            ) : (
                              parseNonNullablePickerDate
                            )}
                          </TableCell>
                        ) : null}
                        <TableCell>
                          {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                        </TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>
                          {item.certificate_no ? item.certificate_no : "-"}
                        </TableCell>
                        <TableCell>
                          {item.materials.length == 1 ? (
                            <>
                              {this.state.isReturnForm
                                ? weightFormat(
                                    parseFloat(item.materials[0].avl_weight) -
                                      parseFloat(
                                        item.materials[0].return_weight
                                          ? item.materials[0].return_weight
                                          : 0
                                      )
                                  ) +
                                  " " +
                                  item.materials[0].unit_name
                                : weightFormat(item.materials[0].weight) +
                                  " " +
                                  item.materials[0].unit_name}
                            </>
                          ) : (
                            item.total_weight + " Gram"
                          )}
                        </TableCell>
                        <TableCell>
                          {item.size_name ? item.size_name : "-"}
                        </TableCell>
                        <TableCell>
                          {item.materials.map((m, key) =>
                            m.weight != 0 ||
                            (m.quantity != 0 && m.rate != 0) ? (
                              <p
                                key={key}
                                className="purchase-material m-0"
                                style={{ color: "#000" }}
                              >
                                {m.material_name}
                                {this.getMaterialPurity(
                                  m.purities,
                                  m.purity_id,
                                  m.purity_name
                                )}{" "}
                                &nbsp;{" "}
                                {this.state.isReturnForm && m.quantity ? (
                                  <>
                                    {m.avl_qty -
                                      parseInt(
                                        m.return_qty ? m.return_qty : 0
                                      )}{" "}
                                    Qty&nbsp;
                                  </>
                                ) : null}{" "}
                                {item.product_type == "material"?m.pakka_weight:m.weight} &nbsp; {m.unit_name}{item.product_type == "material"?"(Pakka)":""} &nbsp; x &nbsp;{" "}
                                {m.rate}
                              </p>
                            ) : null
                          )}
                        </TableCell>
                        <TableCell>
                          {item.materials.map((m, key) =>
                            m.amount != 0 ? (
                              <p
                                key={key}
                                className="purchase-material m-0"
                                style={{ color: "#000" }}
                              >
                                = &nbsp; {m.amount}
                              </p>
                            ) : null
                          )}
                        </TableCell>
                        <TableCell>{priceFormat(item.making_charge)}</TableCell>
                        <TableCell>{priceFormat(item.rep)}</TableCell>
                        <TableCell>
                          {priceFormat(
                            parseFloat(item.sub_price) +
                              parseFloat(item.making_charge) +
                                priceFormat(item.rep)
                          )}
                        </TableCell>
                        <TableCell>{priceFormat(item.tax)}</TableCell>
                        <TableCell>{priceFormat(item.total)}</TableCell>
                        {!this.state.isReturnForm ? (
                          <TableCell>
                            <IconButton
                              className="del-icon"
                              color="error"
                              component="label"
                              onClick={() => this.handleProductDelete(index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </TableCell>
                        ) : null}
                      </TableRow>
                      {this.state.isReturnForm &&
                      item.materials.length == 1 &&
                      this.checkOpen(item.id) ? (
                        <TableRow className="table-inner-row">
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={12}
                          >
                            <Collapse
                              in={this.checkOpen(item.id)}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 1 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                ></Typography>
                                <Table size="medium" aria-label="purchases">
                                  <TableHead>
                                    <TableRow className="pur-details-inner-table">
                                      <TableCell>Quantity</TableCell>
                                      <TableCell>Weight</TableCell>
                                      <TableCell>Unit</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody className="pur-details-table-body">
                                    <TableRow>
                                      <TableCell scope="row">
                                        {item.materials[0].return_qty}
                                      </TableCell>
                                      <TableCell>
                                        {" "}
                                        {item.materials[0].return_weight}
                                      </TableCell>
                                      <TableCell>
                                        {item.materials[0].unit_name}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
                  ))}
                  {formValues.products.length > 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={!this.state.isReturnForm ? 8 : 9}
                      ></TableCell>
                      <TableCell>
                        <b>
                          Sub Total
                          <br />
                          {priceFormat(formValues.taxable_amount)}
                        </b>
                      </TableCell>
                      <TableCell>
                        <b>
                          Tax
                          <br />
                          {priceFormat(formValues.tax)}
                        </b>
                      </TableCell>
                      <TableCell colSpan="2">
                        <b>
                          Total Amount
                          <br />
                          {priceFormat(formValues.total_amount)}
                        </b>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <>
            <Grid item xs={12} md={8} className="create-input pt-0">
              <Grid
                container
                spacing={2}
                className="mob_responsive_purchase_input"
              >
                <Grid item xs={12} md={12} style={{ paddingTop: "5px" }}>
                  <TextareaAutosize
                    className="description purchase-description"
                    minRows={3}
                    placeholder="Notes"
                    style={{ width: "100%" }}
                    value={formValues.notes}
                    onChange={(event) =>
                      this.handleDefaultChange(event, "notes")
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="create-input pt-0"
              style={{ paddingRight: "16px" }}
            >
              <Grid
                container
                spacing={2}
                className="mob_responsive_purchase_input"
              >
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
                {!this.hasReturn() ? (
                  <>
                    {formValues.cgst_tax > 0 ? (
                      <Grid item xs={12} className="pt-5">
                        <Grid container spacing={2} className="display_center">
                          <Grid item xs={12} md={6} className="text-right pt-0">
                            CGST Amount
                          </Grid>
                          <Grid item xs={12} md={6} className="pt-0">
                            <TextField
                              fullWidth
                              value={formValues.cgst_tax}
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                className: "non_disable_text",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                    {formValues.sgst_tax > 0 ? (
                      <Grid item xs={12} md={12} className="pt-5">
                        <Grid container spacing={2} className="display_center">
                          <Grid item xs={12} md={6} className="text-right pt-0">
                            SGST Amount
                          </Grid>
                          <Grid item xs={12} md={6} className="pt-0">
                            <TextField
                              fullWidth
                              value={formValues.sgst_tax}
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                className: "non_disable_text",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                    {formValues.igst_tax > 0 ? (
                      <Grid item xs={12} md={12} className="pt-5">
                        <Grid container spacing={2} className="display_center">
                          <Grid item xs={12} md={6} className="text-right pt-0">
                            IGST Amount
                          </Grid>
                          <Grid item xs={12} md={6} className="pt-0">
                            <TextField
                              className="ft-amount"
                              fullWidth
                              value={formValues.igst_tax}
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                className: "non_disable_text",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Tax Amount
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.tax}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Total Amount
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.total_amount}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Cash Discount
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.discount}
                            onChange={(event) =>
                              this.handleDefaultChange(event, "discount")
                            }
                            disabled={this.state.isReturnForm}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Total Payable
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.total_payable}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {formValues.advance_amount > 0 ? (
                      <Grid item xs={12} className="pt-5">
                        <Grid
                          container
                          spacing={2}
                          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                          className="display_center"
                        >
                          <Grid item xs={4} md={6} className="text-right pt-0">
                            <span className="tax-text"> Advance Amount </span>
                          </Grid>
                          <Grid item xs={8} md={6} className="pt-0">
                            <TextField
                              className="ft-amount"
                              fullWidth
                              value={formValues.advance_amount}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                className: "non_disable_text",
                                endAdornment: (
                                  <Checkbox
                                    checked={formValues.pay_from_advance}
                                    onChange={this.handleAdvance}
                                  />
                                ),
                                disabled: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Return Product Amt
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={this.state.product_amount}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {formValues.have_return_charge ? (
                      <Grid item xs={12} md={12} className="pt-5">
                        <Grid container spacing={2} className="display_center">
                          <Grid item xs={12} md={6} className="text-right pt-0">
                            Return Charge
                          </Grid>
                          <Grid item xs={12} md={6} className="pt-0">
                            <TextField
                              className="ft-amount"
                              fullWidth
                              value={this.state.return_charge}
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                className: "non_disable_text",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          <b>Return Amount</b>
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={this.state.return_amount}
                            onChange={(e) =>
                              this.setState({ return_amount: e.target.value })
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={12} className="pt-5">
                  <Grid container spacing={2} className="display_center">
                    <Grid item xs={12} md={6} className="text-right pt-0">
                      Payment Mode
                    </Grid>
                    <Grid item xs={12} md={6} className="pt-0">
                      <FormControl fullWidth className="ft-amount">
                        <Select
                          className="input-inner"
                          value={formValues.payment_mode}
                          fullWidth
                          onChange={(event) =>
                            this.handleDefaultChange(event, "payment_mode")
                          }
                        >
                          <MenuItem value="cash">Cash</MenuItem>
                          <MenuItem
                            value="cheque"
                            disabled={return_sale_data ? true : false}
                          >
                            Cheque
                          </MenuItem>
                          <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                          <MenuItem value="online">Online</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {formValues.payment_mode == "imps_neft" ||
                formValues.payment_mode == "upi" ? (
                  <Grid item xs={12} md={12} className="pt-5">
                    <Grid container spacing={2} className="display_center">
                      <Grid item xs={12} md={6} className="text-right pt-0">
                        Transaction No
                      </Grid>
                      <Grid item xs={12} md={6} className="pt-0">
                        <TextField
                          className="ft-amount"
                          fullWidth
                          value={formValues.transaction_no}
                          onChange={(event) =>
                            this.handleDefaultChange(event, "transaction_no")
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
                {formValues.payment_mode == "cheque" ? (
                  <Grid item xs={12} md={12} className="pt-5">
                    <Grid container spacing={2} className="display_center">
                      <Grid item xs={12} md={6} className="text-right pt-0">
                        Cheque No
                      </Grid>
                      <Grid item xs={12} md={6} className="pt-0">
                        <TextField
                          className="ft-amount"
                          fullWidth
                          value={formValues.cheque_no}
                          onChange={(event) =>
                            this.handleDefaultChange(event, "cheque_no")
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}

                {!this.hasReturn() ? (
                  <>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Pay Now
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.paid_amount}
                            onChange={(event) =>
                              this.handleDefaultChange(event, "paid_amount")
                            }
                            error={formErros.paid_amount}
                            disabled={
                              !this.state.isCreateFrom ||
                              (return_sale_data ? true : false)
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className="pt-5">
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Due Amount
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <TextField
                            className="ft-amount"
                            fullWidth
                            value={formValues.due_amount}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              className: "non_disable_text",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className="p-invoice-date create-input pt-5"
                    >
                      <Grid container spacing={2} className="display_center">
                        <Grid item xs={12} md={6} className="text-right pt-0">
                          Due Date
                        </Grid>
                        <Grid item xs={12} md={6} className="pt-0">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              className="ft-amount"
                              value={formValues.due_date}
                              fullWidth
                              inputFormat="DD/MM/YYYY"
                              onChange={(newValue) =>
                                this.updateFormValues(newValue, "due_date")
                              }
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  {...params}
                                  error={formErros.due_date}
                                />
                              )}
                              disabled={!this.state.isCreateFrom}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className="p-invoice-date create-input pt-5"
                  >
                    <Grid container spacing={2} className="display_center">
                      <Grid item xs={12} md={6} className="text-right pt-0">
                        Return Date
                      </Grid>
                      <Grid item xs={12} md={6} className="pt-0">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="ft-amount"
                            value={this.state.return_date}
                            fullWidth
                            inputFormat="DD/MM/YYYY"
                            onChange={(newValue) =>
                              this.setState({ return_date: newValue })
                            }
                            renderInput={(params) => (
                              <TextField fullWidth {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              {!submitting ? <Stack
                spacing={1}
                direction="row"
                className="ratn-footer-buttons"
                justifyContent="flex-end"
                style={{ paddingRight: "16px", paddingBottom: "16px" }}
              >
                {!this.state.isReturnForm ? (
                  <LoadingButton
                    className="conf-button"
                    variant="contained"
                    type="button"
                    loading={submitting}
                    disabled={submitting}
                    onClick={this.handleSubmit}
                  >
                    {this.props.query.get("purchase_on_approval") == 0
                      ? "Purchase On Approval"
                      : "Submit"}
                  </LoadingButton>
                ) : (
                  <>
                    {this.state.return_products.length ? (
                      <Button
                        variant="outlined"
                        type="button"
                        className="conf-button"
                        onClick={this.handleReturn}
                      >
                        Return
                      </Button>
                    ) : null}
                  </>
                )}
                
                  <Button
                    variant="outlined"
                    className="close-button"
                    onClick={() => this.props.navigate(-1)}
                  >
                    Cancel
                  </Button>
                
              </Stack>:<Stack
                spacing={1}
                direction="row"
                className="ratn-footer-buttons"
                justifyContent="flex-end"
                style={{ paddingRight: "16px", paddingBottom: "16px" }}
              ><CircularProgress /></Stack> }
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
                                {
                                    productFormValues.product_type == "in_house" ?
                                        <Grid item xs={2}>
                                            <FormControl fullWidth error={productFormErros.worker_id}>
                                                <InputLabel>Worker</InputLabel>
                                                <Select
                                                    value={productFormValues.worker_id}
                                                    label="Worker"
                                                    onChange={this.handleWorkerChange}
                                                    defaultValue=""
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    {
                                                        this.state.workerList.map((item, index) => (
                                                            <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
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
              <Button variant="outlined" onClick={this.handleDialogClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={this.handleDeleteConfirm}
              >
                Yes, Confirm
              </Button>
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
          <DialogTitle>Return</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure want to return these product(s)?
            </DialogContentText>
            {this.state.formValues.due_amount &&
            parseFloat(this.state.return_amount) >
              parseFloat(this.state.formValues.due_amount) ? (
              <>
                <FormControl>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={this.state.payment_type}
                    onChange={(e) =>
                      this.setState({ payment_type: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="advance"
                      control={<Radio />}
                      label={
                        "Payment move to advance " +
                        displayAmount(
                          parseFloat(this.state.return_amount) -
                            parseFloat(this.state.formValues.due_amount)
                        )
                      }
                    />
                    <FormControlLabel
                      value="return"
                      control={<Radio />}
                      label={
                        "Payment Return " +
                        displayAmount(
                          parseFloat(this.state.return_amount) -
                            parseFloat(this.state.formValues.due_amount)
                        )
                      }
                    />
                  </RadioGroup>
                </FormControl>
                {this.state.payment_type == "return" ? (
                  <FormControl fullWidth>
                    <InputLabel>Payment Mode</InputLabel>
                    <Select
                      className="input-inner"
                      value={this.state.return_payment_mode}
                      fullWidth
                      label="Payment Mode"
                      onChange={(e) =>
                        this.setState({ return_payment_mode: e.target.value })
                      }
                    >
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="cheque">Cheque</MenuItem>
                      <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                      <MenuItem value="online">Online</MenuItem>
                    </Select>
                  </FormControl>
                ) : null}
              </>
            ) : null}
          </DialogContent>
          <DialogActions>
            {!submitting ? <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={this.returnDialogClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={this.handleReturnConfirm}
              >
                Yes, Confirm
              </Button>
            </Stack> : <Stack spacing={2} direction="row" justifyContent="flex-end"><CircularProgress /></Stack>}
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
              {actionProduct ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.product_name}
                      disabled
                      InputProps={{
                        className: "non_disable_text",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Purity"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.materials[0].purity_name}
                      disabled
                      InputProps={{
                        className: "non_disable_text",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Avl Qty"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.materials[0].avl_qty}
                      disabled
                      InputProps={{
                        className: "non_disable_text",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Avl Weight"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.materials[0].avl_weight}
                      disabled
                      InputProps={{
                        className: "non_disable_text",
                        endAdornment: (
                          <InputAdornment position="start">
                            {actionProduct.materials[0].unit_name}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Quantity"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.materials[0].return_qty}
                      onChange={(event) =>
                        this.handleReturnMaterial(
                          event.target.value,
                          "return_qty"
                        )
                      }
                      error={this.state.return_qty_error}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Weight"
                      variant="outlined"
                      fullWidth
                      value={actionProduct.materials[0].return_weight}
                      onChange={(event) =>
                        this.handleReturnMaterial(
                          event.target.value,
                          "return_weight"
                        )
                      }
                      error={this.state.return_weight_error}
                      InputProps={{
                        className: "non_disable_text",
                        endAdornment: (
                          <InputAdornment position="start">
                            {actionProduct.materials[0].unit_name}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {!submitting ? <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="flex-end"
                    >
                      <Button
                        variant="outlined"
                        onClick={this.handleReturnDialogClose}
                      >
                        Close
                      </Button>
                      {this.state.return_products.length &&
                      this.state.return_products[actionProductIndex]
                        .is_return ? (
                        <Button
                          variant="outlined"
                          onClick={this.handleCancelReturn}
                        >
                          Cancel Return
                        </Button>
                      ) : null}
                      <Button
                        variant="contained"
                        type="button"
                        onClick={this.handleReturnMaterialSubmit}
                      >
                        Save
                      </Button>
                    </Stack> : <Stack
                      spacing={1}
                      direction="row"
                      justifyContent="flex-end"
                    ><CircularProgress /></Stack>}
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  supplierList: state.superadmin.supplier.items,
  productList: state.superadmin.product.items,
  materialList: state.superadmin.material.items,
  workerList: state.superadmin.employee.items,
  unitList: state.superadmin.unit.items,
  actionCalled: state.superadmin.purchase.actionCalled,
  createSuccess: state.superadmin.purchase.createSuccess,
  editSuccess: state.superadmin.purchase.editSuccess,
  successMessage: state.superadmin.purchase.successMessage,
  errorMessage: state.superadmin.purchase.errorMessage,
  auth: state.auth,
  categoryList: state.superadmin.category.items,
  subCategoryList: state.superadmin.subCategory.items,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      purchaseStore,
      purchaseUpdate,
      supplierList,
      productList,
      employeeList,
      unitList,
      categoryList,
      subCategoryList,
      materialList,
      cartList,
    },
    dispatch
  ),
});

export default withRouter(
  withSnackbar(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(
      reduxForm({
        form: "PurchaseForm",
      })(PurchaseForm)
    )
  )
);
