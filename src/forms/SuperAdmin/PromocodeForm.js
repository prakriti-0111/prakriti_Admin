import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, change } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ListItemText, Accordion, AccordionSummary, Typography, AccordionDetails, Paper, Tab } from '@mui/material';
import { toBase64 } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { promocodeCreate, promocodeStore, promocodeUpdate } from 'actions/superadmin/promocode.actions';
import { productList } from 'actions/superadmin/product.actions';
import { categoryList } from 'actions/superadmin/category.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { materialList } from 'actions/superadmin/material.actions';
import { taxList } from 'actions/superadmin/tax.actions';
import { withSnackbar } from 'notistack';
const { updateSyncErrors } = require('redux-form/lib/actions').default;
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';
import _ from 'lodash';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { unitList } from 'actions/superadmin/unit.actions';
import { Editor } from 'react-draft-wysiwyg';
import noImage from 'src/assets/images/no_image.jpg';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { RESET_PRODUCT_LIST } from '../../actionTypes/superadmin/product.types';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'title',
    //'description',
    'category_id',
    //'sub_category_id',
    'code',
    'discount'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  console.log(errors)
  return errors
}

class PromocodeForm extends React.Component {

  constructor(props) {
    super(props);

    let formData = 'formData' in this.props ? this.props.formData : null;
    this.state = {
      auth: this.props.auth,
      formData: formData,
      isCreateFrom: !formData,
      categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      banner_file: null,
      existing_banner_image: null,
      productList: this.props.productList,
      start_date: moment().format('MM/DD/YYYY'),
      end_date: moment().format('MM/DD/YYYY'),
      start_date_err: '',
      end_date_err: '',
    }

    this.imageFileRef = React.createRef();

  }

  componentDidMount() {
    this.loadFormExternalData();

    if (this.state.formData) {
      this.initializeFormData();
    } else {
      this.props.initialize({
        status: 1,
        discount_type: 'percentage'
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }
  }

  initializeFormData = () => {
    let formValues = { ...this.state.formData }
    formValues.status = formValues.status ? 1 : 0;
    delete formValues.banner;
    this.props.actions.subCategoryList({ all: 1, category_id: formValues.category_id });
    this.props.actions.productList({ all: 1, sub_category_id: formValues.sub_category_id });
    this.props.initialize(formValues);
    this.setState({
      existing_banner_image: this.state.formData.banner,
      start_date: formValues.start_date,
      end_date: formValues.end_date,
    });
  }

  loadFormExternalData = () => {
    this.props.actions.categoryList({all: 1});
  }

  getDefaultValues = () => {
    return {
      category_id: '',
      sub_category_id: '',
      title: '',
      description: '',
      code: '',
      products: [],
      discount: '',
      discount_type: 'percentage',
      status: '1',
      start_date: moment().format('MM/DD/YYYY'),
      end_date: moment().format('MM/DD/YYYY')
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    if (props.productList !== state.productList) {
      update.productList = props.productList;
    }

    return update;
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
    />
  )

  renderCategoriesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <div className='list-menu'>
        <Select
          label={label}
          fullWidth
          {...input}
          {...custom}
        >

          <MenuItem value=""></MenuItem>
          {
            this.state.categories.map((item, index) => {
              return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
            })
          }
        </Select>
      </div>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  renderSubCategoriesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value=""></MenuItem>
        {
          this.state.sub_categories.map((item, index) => {
            return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
          })
        }
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  renderProductField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <Select
        label={label}
        fullWidth
        multiple
        {...input}
        {...custom}
        value={input.value === "" ? [] : input.value}
        multi="true"
        renderValue={(selected) => this.getSelectedProductNames(selected).join(", ")}
      >
        {this.state.productList.map((item) => (
          <MenuItem key={item.id} value={item.id} className='multi-select'>
            <Checkbox checked={(input.value && input.value.indexOf(item.id) > -1) ? true : false} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}

      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  getSelectedProductNames = (selected) => {
    let arr = [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(this.state.productList, { id: selected[i] });
      if (item.length)
        arr.push(item[0].name);

    }
    return arr;
  }

  renderStatusField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="1">Active</MenuItem>
        <MenuItem value="0">Inactive</MenuItem>
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  renderTextArea = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextareaAutosize
      minRows={2}
      label={label}
      error={touched && error ? error : ''}
      style={{ width: '100%' }}
      {...input}
      {...custom}
    />
  )

  renderDiscountField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <Select
        label={label}
        fullWidth
        {...input}
        {...custom}
      >
        <MenuItem value="percentage">Percentage</MenuItem>
        <MenuItem value="flat">Flat</MenuItem>
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  handleCategoryChange = (event, val) => {
    this.props.actions.subCategoryList({ all: 1, category_id: val });
    this.props.dispatch(change('PromocodeForm', 'sub_category_id', ''));
    this.props.dispatch({
      type: RESET_PRODUCT_LIST
    });

  }

  handleSubCategoryChange = (event, val) => {
    if (val) {
      this.props.actions.productList({ all: 1, sub_category_id: val });
    } else {
      this.props.dispatch({
        type: RESET_PRODUCT_LIST
      })
    }
  }

  getImageSrc = (item) => {
    return URL.createObjectURL(item);
  }

  handleFormSubmit = async (data, dispatch) => {
    let errors = false;
    let values = { ...this.getDefaultValues(), ...data };
    /*if (values.products.length == 0) {
      this.props.dispatch(updateSyncErrors('PromocodeForm', {
        products: 'Product is required.'
      }));
      errors = true;
    }*/
    if (this.state.banner_file) {
      values.banner = await toBase64(this.state.banner_file);
    }else{
      if(this.state.isCreateFrom){
        this.props.enqueueSnackbar('Please select banner image', { variant: 'error' });
        errors = true;
      }
    }
    if(!this.state.start_date){
      this.setState({
        start_date_err: 'Required'
      })
      errors = true;
    }else{
      this.setState({
        start_date_err: ''
      })
    }
    if(!this.state.end_date){
      this.setState({
        end_date_err: 'Required'
      })
      errors = true;
    }else{
      this.setState({
        end_date_err: ''
      })
    }

    if (!errors) {
      values.start_date = this.state.start_date;
      values.end_date = this.state.end_date;
      if (this.state.isCreateFrom) {
        return this.props.actions.promocodeStore(values);
      } else {
        return this.props.actions.promocodeUpdate(this.state.formData.id, values);
      }
    }

    
  }

  handleFieldChange = (e, vl) => {

  }

  onChangeBannerImage = (e) => {
    this.setState({
      banner_file: e.target.files[0],
      existing_banner_image: null
    })

    if (this.imageFileRef) {
      this.imageFileRef.current.value = null;
    }
  }

  deleteBannerImage = () => {
    this.setState({
      banner_file: null
    })

    if (this.imageFileRef) {
      this.imageFileRef.current.value = null;
    }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} className="ratn-dialog-wrapper" ref={this.formRef}>
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className="loans_view p_view">
            <Grid item xs={3} className='create-input'>
              <Field
                className='input-inner'
                name="category_id"
                component={this.renderCategoriesField}
                label="Category"
                type="select"
                onChange={(event, val) => this.handleCategoryChange(event, val)}
              />
            </Grid>
            <Grid item xs={3} className='create-input'>
              <Field
                className='input-inner'
                name="sub_category_id"
                component={this.renderSubCategoriesField}
                label="Sub Category"
                type="select"
                onChange={(event, val) => this.handleSubCategoryChange(event, val)}
              />
            </Grid>
            <Grid item xs={6} className='create-input'>
              <Field
                className='input-inner'
                name="products"
                component={this.renderProductField}
                label="Products"
                multi
                type="select"
                defaultValue={[]}
                onChange={(event) => this.handleFieldChange(event)}
              />
            </Grid>
            <Grid item xs={6} className='create-input'>
              <Field
                className='input-inner'
                name="title"
                component={this.renderTextField}
                label="Title"
              />
            </Grid>
            <Grid item xs={6} className='create-input'>
              <Field
                className='description'
                name="description"
                component={this.renderTextArea}
                placeholder="Description"
              />
            </Grid>
            <Grid item xs={2} className='create-input'>
              <Field
                className='input-inner'
                name="code"
                component={this.renderTextField}
                label="Code"
              />
            </Grid>
            <Grid item xs={2} className='create-input'>
              <Field
                className='input-inner'
                name="discount"
                component={this.renderTextField}
                label="Discount"
              />
            </Grid>
            <Grid item xs={2} className='create-input'>
              <Field
                className='input-inner'
                name="discount_type"
                component={this.renderDiscountField}
                label="Discount Type"
                type="select"
                onChange={(event) => this.handleFieldChange(event)}
              />
            </Grid>
            <Grid item xs={2} className='create-input'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={this.state.start_date}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => this.setState({start_date: newValue})}
                  renderInput={(params) => <TextField {...params} error={this.state.start_date_err ? true : false} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} className='create-input'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={this.state.end_date}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => this.setState({end_date: newValue})}
                  renderInput={(params) => <TextField {...params} error={this.state.end_date_err ? true : false} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} className='create-input'>
              <Field
                className='input-inner'
                name="status"
                component={this.renderStatusField}
                label="Status"
                type="select"
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
                      this.state.existing_banner_image ?
                      <img src={this.state.existing_banner_image} />
                      :
                      <>
                        {
                          this.state.banner_file ?
                          <img src={this.getImageSrc(this.state.banner_file)} />
                          :
                          <img src={noImage} />
                        }
                      </>
                    }
                    
                  </div>
                  <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
                    Banner
                    <input
                      name="banner_image"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => this.onChangeBannerImage(e)}
                      ref={this.imageFileRef}
                    />
                  </Button>
                </div>
              </div>
              </div>
              <div className='custom-col-8'>&nbsp;</div>
              <div className='custom-col-2'>&nbsp;</div>
            </div>
          </div>
          <Grid container spacing={0} className="loans_view p_view">
            <Grid item xs={12} className='create-input' style = {{ paddingTop: "10px" }}>
              <Stack spacing={1} direction="row" justifyContent="flex-end" className='p-submit-button' sx={{ marginTop: "0px" }}>
                <LoadingButton
                  variant="contained"
                  type="button"
                  loading={submitting}
                  disabled={submitting}
                  onClick={handleSubmit(this.handleFormSubmit)}
                >
                  Submit
                </LoadingButton>
                {
                  !submitting ?
                    <Button variant="outlined" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/promocodes')}>Cancel</Button>
                    : null
                }
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  categories: state.superadmin.category.items,
  sub_categories: state.superadmin.subCategory.items,
  auth: state.auth,
  productList: state.superadmin.product.items,
  formValues: getFormValues('PromocodeForm')(state, 'status')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    promocodeCreate,
    promocodeUpdate,
    promocodeStore,
    subCategoryList,
    productList,
    categoryList,
    change
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'PromocodeForm',
  validate
})(PromocodeForm))));



