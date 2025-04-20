import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'country_id'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class StateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
      countries: this.props.countries
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
      country_id: '',
      name: '',
      is_certificate: false
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.countries !== state.countries){
      update.countries = props.countries;
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
  
  renderCountryField = ({
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
        <MenuItem value="">select country</MenuItem>
        {
          this.state.countries.map((item, index) => {
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


  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <Box sx={{ flexGrow: 1, m: 0.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="country_id"
                  component={this.renderCountryField}
                  label="Country"
                  type="select"
                />
              </Grid>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="name"
                component={this.renderTextField}
                  label="State"
                />
              </Grid>
            
              <Grid item xs={12}>
                <Stack spacing={1} direction="row" justifyContent="flex-end">
                  <Button variant="contained" type="submit">Submit</Button>
                  <Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>
                </Stack>
              </Grid>
            </Grid>
        </Box>
      </form>
    )
  }

}

export default withRouter(reduxForm({
  form: 'StateForm',
  validate
})(StateForm))


