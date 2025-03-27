import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class CountryForm extends React.Component {

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
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} className='create-input'>
                      <Field
                        name="name"
                        component={this.renderTextField}
                        label="Country Name"
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

export default withRouter(reduxForm({
  form: 'CountryForm',
  validate
})(CountryForm))


