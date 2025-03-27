import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues, change } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack,  Select, MenuItem, InputLabel, FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import {priceFormat, displayAmount} from 'src/helpers/helper';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'amount',
    'category_id',
    'role',
    'days'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class ReturnPolicyForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
      categories: this.props.categories,
      submitSuccess: this.props.submitSuccess
    }
    
  }

  componentDidMount(){
    if(this.state.formData){
      this.props.initialize(this.state.formData)
    }else{
      this.props.initialize(this.getDefaultValues());
    }
    
  }

  getDefaultValues = () => {
    return {
      category_id: '',
      amount: '',
      days: '',
      role: ''
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.categories !== state.categories){
      update.categories = props.categories;
    }
    if (props.submitSuccess !== state.submitSuccess) {
      update.submitSuccess = props.submitSuccess;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    
    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitSuccess) {
      this.resetForm();
    }
    if (this.props.formData != prevProps.formData && this.state.formData) {
      this.props.initialize(this.state.formData)
    }
  }

  resetForm = () => {
    let data = {...this.getDefaultValues()};
    data.category_id = this.props.formValues.category_id;
    data.role = this.props.formValues.role;
    this.props.initialize(data);
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

  renderAmountField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>
      }}
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
    />
  )
  
  renderCategoryField = ({
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
          this.state.categories.map((item, index) => {
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

  renderRoleField = ({
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
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="distributor">Distributor</MenuItem>
        <MenuItem value="retailer">Retailer</MenuItem>
        <MenuItem value="customer">Customer</MenuItem>
      </Select>
      {
        touched && error ? 
        <FormHelperText>{error}</FormHelperText>
        : null
      }
      
    </FormControl>
  )

  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="category_id"
                  component={this.renderCategoryField}
                  label="Category"
                  type="select"
                  onChange={(event, val) => this.props.categoryChange(val)}
                />
              </Grid>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="role"
                  component={this.renderRoleField}
                  label="Role"
                  type="select"
                  onChange={(event, val) => this.props.roleChange(val)}
                />
              </Grid>
              <Grid item xs={2} className='create-input'>
                <Field
                  name="amount"
                  component={this.renderAmountField}
                  label="Amount"
                />
              </Grid>
              <Grid item xs={2} className='create-input'>
                <Field
                  name="days"
                  component={this.renderTextField}
                  label="Days"
                />
              </Grid>
              <Grid item xs={2}>
                <Stack spacing={1} direction="row" className='modal-button-area ratn-footer-buttons'>
                  <Button variant="contained" className='conf-button' type="submit">Submit</Button>
                </Stack>
              </Grid>
            </Grid>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  formValues: getFormValues('ReturnPolicyForm')(state, 'days')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    change
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ReturnPolicyForm',
  validate
})(ReturnPolicyForm));


