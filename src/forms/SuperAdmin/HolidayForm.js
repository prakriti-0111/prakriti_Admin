import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, change } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText  } from '@mui/material';
import withRouter from 'src/helpers/withRouter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'date'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class HolidayForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null
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
      name: '',
      status: 1,
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

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

  handleDate = (val) => { 
    this.props.change('date', val);
  }

  renderDateField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={input.value}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => this.handleDate(newValue)}
        renderInput={(params) => <TextField {...params} error={touched && error ? true : false}
        helperText={touched && error ? error : ''}
        {...input}
        {...custom} fullWidth />}
      />
    </LocalizationProvider>
  )


  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="category_form">
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} className='create-input'>
                <Field
                  name="name"
                  component={this.renderTextField}
                  label="Holiday Name"
                />
              </Grid>
              <Grid item xs={12} md={3} className='create-input'>
                <Field
                  name="date"
                  component={this.renderDateField}
                  label="Date"
                />
              </Grid>
            </Grid>
            <Stack spacing={1} mt={2} direction="row" className='modal-button-area'>
              <Button variant="contained" type="submit">Submit</Button>
              <Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>
            </Stack>
        </Box>
      </form>
    )
  }

}


const mapStateToProps = (state) => ({
  formValues: getFormValues('HolidayForm')(state, 'bannerFile')
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  change
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'HolidayForm'
})(HolidayForm)));


