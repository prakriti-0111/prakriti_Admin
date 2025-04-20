import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, change } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ListItemText, Accordion, AccordionSummary, Typography, AccordionDetails, Paper, Tab, CircularProgress } from '@mui/material';
import { toBase64 } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { homepagesettingList, homepagesettingUpdate } from 'actions/superadmin/homepagesetting.actions';
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
    //'title',
    //'description',
    //'category_id',
    //'sub_category_id',
    //'code',
    //'discount'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  console.log(errors)
  return errors
}

class HomepagesettingForm extends React.Component {

  constructor(props) {
    super(props);

    let formData = 'formData' in this.props ? this.props.formData : null;
    this.state = {
      actionCalled: this.props.actionCalled,
      auth: this.props.auth,
      formData: formData,
      isCreateFrom: !formData,
      homepagesettingList: this.props.homepagesettingList,
      /* categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      banner_file: null,
      existing_banner_image: null,
      productList: this.props.productList,
      start_date: moment().format('MM/DD/YYYY'),
      end_date: moment().format('MM/DD/YYYY'),
      start_date_err: '',
      end_date_err: '', */
      inProgress: false
    }

    //this.imageFileRef = React.createRef();

  }

  componentDidMount() {
    

    if (this.state.formData) {
      this.initializeFormData();
    } else {
      this.props.initialize({
        homepagesettingList: []
      });
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    if (props.homepagesettingList !== state.homepagesettingList) {
      update.homepagesettingList = props.homepagesettingList;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }

    if(this.state.actionCalled){
      this.loadFormExternalData();
      this.setState({
        inProgress: false 
      });
    }
  }

  initializeFormData = () => {
    //let formValues = { ...this.state.formData }
    //formValues.status = formValues.status ? 1 : 0;
    //delete formValues.banner;
    //this.props.actions.subCategoryList({ all: 1, category_id: formValues.category_id });
    //this.props.actions.productList({  });
    //this.props.initialize(formValues);
    
  }

  loadFormExternalData = () => {
    this.props.actions.homepagesettingList({all: 1});
  }

  getDefaultValues = () => {
    return {
      homepagesettingList: []
    }
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

  handleOrderChange = (event) => {
    let value = event.target.value;   
    let index = event.target.name.split('_')[1];
    let homepagesettingList = [...this.state.homepagesettingList];
    homepagesettingList[index].order = value;
    this.setState({
      homepagesettingList: homepagesettingList
    });
    //this.props.change('order', value);
  }

  handleStatusChange = (event) => {
    let value = event.target.value;
    let index = event.target.name.split('_')[1];
    let homepagesettingList = [...this.state.homepagesettingList];
    homepagesettingList[index].is_active = value;
    this.setState({
      homepagesettingList: homepagesettingList
    });
    //this.props.change('is_active', value);
  }

  handleFormSubmit = async (data, dispatch) => {
    //console.log("data ", data);
    console.log("this.props.formData ", this.props.formData);
    let errors = false;
    
    //values = { ...this.props.formValues, ...data };
    //values = { ...this.props.formValues, ...data };
    //let values = { ...this.getDefaultValues(), ...data };
    /*if (values.products.length == 0) {
      this.props.dispatch(updateSyncErrors('HomepagesettingForm', {
        products: 'Product is required.'
      }));
      errors = true;
    }*/
    
    if (!errors) {
      this.setState({
        inProgress: true 
      });
      
      //if (this.state.isCreateFrom) {
        return this.props.actions.homepagesettingUpdate(this.props.formData);
      /* } else {
        return this.props.actions.festiveofferUpdate(this.state.formData.id, values);
      } */
    }

    return false;
  }

  render() {
    const { handleSubmit, pristine, submitting, homepagesettingList } = this.props;
    const {inProgress} = this.state;
    console.log("homepagesettingList ", homepagesettingList);
    console.log("inProgress : ", inProgress);
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} className="ratn-dialog-wrapper" ref={this.formRef}>
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className="loans_view p_view">
          {homepagesettingList.length > 0 && homepagesettingList.map((item, index) => {
            console.log(item);
            return (<>
            <Grid item xs={1} className='create-input'>
              {/* <Field
                className='input-inner'
                name="section_name"
                defaultValue={'Home'}
                component={this.renderTextField}
                label="Section Name"
              /> */}
              {(index+1)}.
             
            </Grid>
            <Grid item xs={3} className='create-input'>
              {/* <Field
                className='input-inner'
                name="section_name"
                defaultValue={'Home'}
                component={this.renderTextField}
                label="Section Name"
              /> */}
              {item.section_name}
             
            </Grid>
            <Grid item xs={4} className='create-input'>
              {/* <Field
                className='input-inner'
                name="order"
                component={this.renderTextField}
                label="Order"
              /> */}
              {this.renderTextField({
                input: {
                  name: "order_" + index,
                  value: item.order,
                  className: 'input-inner',
                  onChange: (event) => this.handleOrderChange(event),
                  onBlur: () => { },
                  onFocus: () => { },
                },
                label: "Order",
                meta: { touched: false, error: '' }
              })}
            </Grid>
            <Grid item xs={4} className='create-input'>
              {/* <Field
                className='input-inner'
                name="is_active"
                component={this.renderStatusField}
                label="Status"
                type="select"
              /> */}
              {this.renderStatusField({
                input: {
                  name: "isactive_" + index,
                  value: item.is_active == true? '1' : '0',
                  className: 'input-inner',
                  onChange: (event) => this.handleStatusChange(event),
                  onBlur: () => { },
                  onFocus: () => { },
                },
                label: "Status",
                meta: { touched: false, error: '' }
              })}
            </Grid></>)
          })}
            
          </Grid>
          
          <Grid container spacing={0} className="loans_view p_view">
            <Grid item xs={12} className='create-input' style = {{ paddingTop: "10px" }}>
              <Stack spacing={1} direction="row" justifyContent="flex-end" className='p-submit-button' sx={{ marginTop: "0px" }}>
              {inProgress?<CircularProgress />:<>
                <LoadingButton
                  variant="contained"
                  type="button"
                  loading={submitting}
                  disabled={submitting}
                  onClick={handleSubmit(this.handleFormSubmit)}
                >
                  Submit
                </LoadingButton>
                {/*
                  !submitting ?
                    <Button variant="outlined" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/festive-offers')}>Cancel</Button>
                    : null
                */}</>
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
  auth: state.auth,
  homepagesettingList: state.superadmin.homepagesetting.items,
  //formValues: getFormValues('HomepagesettingForm')(state),
  actionCalled: state.superadmin.homepagesetting.actionCalled
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    homepagesettingList,
    homepagesettingUpdate,
    change
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'HomepagesettingForm',
  validate
})(HomepagesettingForm))));



