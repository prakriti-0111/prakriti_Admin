import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues, change } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack,  Select, MenuItem, InputLabel, FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from 'src/assets/images/no_image.jpg';
import { ConstructionOutlined, ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import moment from 'moment';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';
import {isSuperAdmin, isDistributor } from 'src/helpers/helper';


const validate = values => {
  const errors = {}
  let requiredFields = [
    'date',
    'reason_id',
    'amount',
    //'description'
  ];
  if(isDistributor()){
    requiredFields.push('user_id')
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class ExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
      reasons: this.props.reasons,
      submitSuccess: this.props.submitSuccess,
      userList: this.props.userList
    },

    this.bill_imageRef = React.createRef();
    this.isSuperAdmin = isSuperAdmin();
    this.isDistributor = isDistributor();
  }

  componentDidMount(){ 
    if(this.state.formData){
      let data = {...this.state.formData};
      delete data.bill_image;
      this.props.initialize(data)
      setTimeout(() => {
        this.loadExpenseData();
      }, 500);
    }else{
      this.props.initialize(this.getDefaultValues());
      setTimeout(() => {
        this.loadExpenseData();
      }, 500);
    }
    
    this.props.salesExecutiveList({all: 1, role_id: 4});
  }

  getDefaultValues = () => {
    return {
      date: moment().format('MM/DD/YYYY'),
      reason_id: '',
      description: '',
      amount: '',
      bill_image: null,
      existing_bill_image: null,
      payment_mode: 'cash'
    }
  }

  updateDate = (val) => { 
    this.props.change('date', val);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.reasons !== state.reasons){
      update.reasons = props.reasons;
    }
    if (props.submitSuccess !== state.submitSuccess) {
      update.submitSuccess = props.submitSuccess;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    if (props.userList !== state.userList) {
      update.userList = props.userList;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitSuccess) {
      this.resetForm();
    }
    if (this.props.formData != prevProps.formData && this.state.formData) {
      let data = {...this.state.formData};
      delete data.bill_image;
      this.props.initialize(data)
      setTimeout(() => {
        this.loadExpenseData();
      }, 500);
    }
  }

  resetForm = () => {
    this.props.initialize(this.getDefaultValues());
    this.props.change('bill_image', '');
    this.setState({
      bill_image: ''
    })
    setTimeout(() => {
      this.loadExpenseData();
    }, 500);
  }

  onImageChange = (e, key) => {
    let existingKey = 'existing_' + key;
    this.props.change('bill_image', e.target.files[0]);
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
      this.props.change('bill_image', '');
  }

  /*getImageSrc = (item) => {
    return URL.createObjectURL(item);
  }*/

  getImageSrc = () => {
    if(this.state.bill_image){
      return URL.createObjectURL(this.state.bill_image);
    }else{
      return (this.state.formData && this.state.formData.bill_image) ? this.state.formData.bill_image : '';
    }

    /*if(item && this.props.formValues.bill_image){
      this.props.formValues.bill_image = item;
      return URL.createObjectURL(item);
    }else{
      return (this.state.formData && this.state.formData.bill_image) ? this.state.formData.bill_image : '';
    }*/
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


  renderDateField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          label="Date"
          inputFormat="DD/MM/YYYY"
          value={input.value}
          onChange={(newValue) => this.updateDate(newValue)}
          renderInput={(params) => <TextField fullWidth {...params}
          error={touched && error ? true : false}
          helperText={touched && error ? error : ''}
          {...input}
          {...custom}
          />
        }
      />
     </LocalizationProvider>
  )
 
  renderReasonField = ({
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
          this.state.reasons.map((item, index) => {
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

  renderUserField = ({
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
          this.state.userList.map((item, index) => {
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

  renderPaymentModeField = ({
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
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="cheque">Cheque</MenuItem>
        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
        <MenuItem value="online">Online</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )


  loadExpenseData = () => {

  }

  handleReasonChange = (val) => {
    this.props.reasonChange(val);
  }

  handleUserChange = (val) => {
    this.props.userChange(val);
  }

  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
              <Grid item md={(this.isSuperAdmin || this.isDistributor) ? 2 : 3} xs={6}>
              <Field
                name="date"
                component={this.renderDateField}
                label="Date"
              />
              </Grid>
              {
                (this.isSuperAdmin || this.isDistributor) ?
                <Grid item md={2} xs={6} className='create-input'>
                  <Field
                    name="user_id"
                    component={this.renderUserField}
                    label="Sales Executive"
                    type="select"
                    onChange={(event, val) => this.handleUserChange(val)}
                  />
                </Grid>
                : null
              }
              
              <Grid item md={(this.isSuperAdmin || this.isDistributor) ? 2 : 3} xs={(this.isSuperAdmin || this.isDistributor) ? 6 : 12} className='create-input'>
                <Field
                  name="reason_id"
                  component={this.renderReasonField}
                  label="Reason"
                  type="select"
                  onChange={(event, val) => this.handleReasonChange(val)}
                />
              </Grid>
              <Grid item md={(this.isSuperAdmin || this.isDistributor) ? 1.5 : 3} xs={6} className='create-input'>
                <Field
                  name="amount"
                  component={this.renderTextField}
                  label="Amount"
                  amount={this.state.amount}
                />
              </Grid>
              {
                (this.isSuperAdmin || this.isDistributor) ?
                <Grid item md={2} xs={12} className='create-input'>
                  <Field
                    name="payment_mode"
                    component={this.renderPaymentModeField}
                    label="Mode"
                    type="select"
                  />
                </Grid>
                : null
              }
              <Grid item md={(this.isSuperAdmin || this.isDistributor) ? 2.5 : 3} xs={12} className='create-input'>
                <Field
                  name="description"
                  component={this.renderTextField}
                  label="Description"
                  description={this.state.description}
                />
              </Grid>
              <Grid item md={2}>
                <div className='custom-row pl-0'>
                    <div className='custom-col-2'>
                        <div className="admin-buttons">
                            <div className='p-single-image-wrapper'>
                                <div className='p-single-image' style={{textAlign: 'center'}}>
                                {
                                  this.state.bill_image ?
                                  <>
                                      <button className='close_img' onClick={() => this.deleteImage('bill_image')} type="button">x</button>
                                      <img src={this.getImageSrc()} /> 
                                  </>
                                  :
                                  <>
                                    {
                                      this.state.formData && this.state.formData.existing_bill_image ?
                                      <>
                                          {/*<button type='button' className='close_img' onClick={() => this.deleteExistingImage('bill_image')}>x</button>*/}
                                          <img src={this.state.formData.existing_bill_image} />
                                      </>
                                      :
                                      <img src={noImage} />
                                    }
                                  </>
                                }
                                </div>
                                <Button variant="contained" className='image-button' component="label" endIcon={<CloudUploadIcon />}>
                                    Bill Image
                                    <input
                                    name="bill_image"
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => this.onImageChange(e, 'bill_image')}
                                    ref={this.bill_imageRef}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Stack 
                  spacing={1} 
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-end" className='ratn-footer-buttons' sx={{height: '100%'}}>
                  <Button variant="contained" className='conf-button' type="submit">Submit</Button>
                  {/*<Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>*/}
                </Stack>
              </Grid>
          </Grid>
           
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  formValues: getFormValues('ExpenseForm')(state, 'bill_image'),
  userList: state.superadmin.salesExecutive.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    salesExecutiveList,
    change
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ExpenseForm',
  validate
})(ExpenseForm));


