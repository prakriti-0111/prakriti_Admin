import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'amount',
    'tax'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class ReportChargeForm extends React.Component {

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
      amount: '',
      tax: ''
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

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
         <Box sx={{ flexGrow: 1}} >
            <Grid container spacing={2}>
                <Grid item xs={5} className='create-input'>
                      <Field
                        name="amount"
                        component={this.renderTextField}
                        label="Amount"
                        style={{marginBottom:"5px"}}
                      />
                </Grid>
                <Grid item xs={5} className='create-input'>
                      <Field
                        name="tax"
                        component={this.renderTextField}
                        label="Tax(%)"
                        style={{marginBottom:"5px"}}
                      />
                </Grid>
                <Grid item xs={2} className='create-input'>
                  <Button variant="contained" type="submit" style={{marginBottom:"5px"}}>Submit</Button>
                </Grid>
            </Grid>
            
        </Box>
      </form>
    )
  }

}

export default withRouter(reduxForm({
  form: 'ReportChargeForm',
  validate
})(ReportChargeForm))


