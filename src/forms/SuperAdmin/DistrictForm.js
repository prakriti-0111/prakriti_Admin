import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { bindActionCreators } from 'redux';
import { stateList } from 'actions/superadmin/state.actions';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'country_id',
    'state_id'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class DistrictForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
      states: this.props.states,
      countries: this.props.countries
    }
  }

  componentDidMount(){
    if(this.state.formData){
      this.props.actions.stateList({ all: 1, country_id: this.state.formData.country_id });
      this.props.initialize(this.state.formData);
    }else{
      this.props.initialize(this.getDefaultValues());
    }
  }

  getDefaultValues = () => {
    return {
      name: '',
      country_id: '',
      is_certificate: false
    }
  }

  handleCountryChange = (event, val) => {
    this.props.actions.stateList({ all: 1, country_id: val });
  }

  handleStateChange = (event, val) => {
   
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.states !== state.states){
      update.states = props.states;
    }

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
  
  renderStateField = ({
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
        <MenuItem value="">select state</MenuItem>
        {
          this.state.states.map((item, index) => {
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
            <Grid item xs={6} md={6} className='create-input'>
                <Field
                  name="country_id"
                  component={this.renderCountryField}
                  label="Country"
                  type="select"
                  onChange={(event, val) => this.handleCountryChange(event, val)}
                />
              </Grid>

              <Grid item xs={6} md={6} className='create-input'>
                <Field
                  name="state_id"
                  component={this.renderStateField}
                  label="State"
                  type="select"
                  onChange={(event, val) => this.handleStateChange(event, val)}
                />
              </Grid>
              <Grid item xs={6} md={6} className='create-input'>
                <Field
                  name="name"
                component={this.renderTextField}
                  label="District"
                />
              </Grid>
            
              <Grid item xs={12} className='p-submit-button'>
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

const mapStateToProps = (state) => ({
  states: state.superadmin.countryState.items,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    stateList,
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'DistrictForm',
  validate
})(DistrictForm)));


