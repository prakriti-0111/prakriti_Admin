import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues  } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import noImage from 'src/assets/images/no_image.jpg';

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

class CertificateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
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
      description: '',
      certificate_no: '',
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

  renderTextArea = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <TextareaAutosize
        minRows={3}
        label={label}
        error={touched && error ? error : ''}
        style={{ width: '100%' }}
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

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderLogoField = ({ 
    input: { value: omitValue, onChange, onBlur, ...inputProps }, 
    meta: omitMeta, 
    ...props 
  }) => (
    <Button variant="contained" component="label">
      Upload
      <input 
        hidden 
        accept="image/*" 
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    </Button>
  )

  getImageSrc = (item) => {
    if(item && item.logofile){
      return URL.createObjectURL(item.logofile);
    }else{
      return (this.state.formData && this.state.formData.logo) ? this.state.formData.logo : '';
    }
  }


  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit}>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} className='create-input'>
                      <Field
                        name="name"
                        component={this.renderTextField}
                        label="Certificate Name"
                      />
                </Grid>
                <Grid item xs={6} className='create-input'>
                      <Field
                        name="website"
                        component={this.renderTextField}
                        label="Website"
                      />
                </Grid>
                <Grid item xs={12} className='create-input'>
                  <Field
                    className='description'
                    name="description"
                    component={this.renderTextArea}
                    placeholder="Description"

                  />
                
                </Grid>
                {
                  (this.getImageSrc(formValues)) ? 
                  <Grid item xs={2} className='create-input'>
                    <img src={this.getImageSrc(formValues)} id="logo-img" style={{height: '100px', width: '100px'}} />
                  </Grid>
                  :
                  <Grid item xs={2} className='create-input'>
                    <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                  </Grid>
                }
                <Grid item xs={4} className='create-input'>
                    <Field
                      name="logofile"
                      component={this.renderLogoField}
                      label="Logo"
                      type="file"
                    />
                    
                </Grid>
                <Grid item xs={6} className='create-input'>
                    <Field
                      name="status"
                      component={this.renderStatusField}
                      label="Status"
                      type="select"
                    />
                </Grid>
            </Grid>

           
            <Stack spacing={1} mt={2} direction="row" className='modal-button-area'>
              <Button variant="contained" type="submit" disabled={submitting}>Submit</Button>
              <Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>
            </Stack>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  formValues: getFormValues('CertificateForm')(state, 'logofile')
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'CertificateForm'
})(CertificateForm))));

/*const selector = formValueSelector('CertificateForm');

export default withRouter(withSnackbar(compose(
  connect(state => {
    const { status } = selector(state, 'status')
    return {
      status
    }
  }),
  reduxForm({ form: 'CertificateForm' })
)(CertificateForm)));*/

/*export default withRouter(withSnackbar(reduxForm({
  form: 'CertificateForm',
  validate
})(CertificateForm)))*/


