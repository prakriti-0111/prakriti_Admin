import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import {isEmpty} from 'src/helpers/helper';
import noImage from 'src/assets/images/no_image.jpg';
import { useSnackbar } from 'notistack';

const validate = values => {
  const errors = {};
 // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const requiredFields = [
    'title',
    'url'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  if((!('id' in values) || !values.id) && !values['imageFile']){
    errors['imageFile'] = 'Required'
  }
  
  return errors
}

class NewArrivalForm extends React.Component {

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

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

  renderImageField = ({ 
    input: { value: omitValue, onChange, onBlur, ...inputProps }, 
    meta: { touched, error },
    label,
    ...props 
  }) => (
    <>
    <Button variant="contained" component="label">
      {label}
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
    <p className='error_text Mui-error'>{touched && error ? error : ''}</p>
    </>
  )

  getImageSrc = (item, fileKey, formKey) => {
    if(item && item[fileKey]){
      return URL.createObjectURL(item[fileKey]);
    }else{
      return (this.state.formData && this.state.formData[formKey]) ? this.state.formData[formKey] : '';
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    return (
      <form onSubmit={ handleSubmit } className="category_form">
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="title"
                  component={this.renderTextField}
                  label="Title"
                />
              </Grid>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="url"
                  component={this.renderTextField}
                  label="Url"
                />
              </Grid>
              {
                (this.getImageSrc(formValues, 'imageFile', 'image')) ? 
                <Grid item xs={2} className='create-input'>
                  <img src={this.getImageSrc(formValues, 'imageFile', 'image')} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
                :
                <Grid item xs={2} className='create-input'>
                  <img src={noImage} id="logo-img" style={{height: '100px', width: '100px'}} />
                </Grid>
              }
              <Grid item xs={4} className='create-input'>
                <Field
                  name="imageFile"
                  component={this.renderImageField}
                  label="Banner"
                  type="file"
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
  formValues: getFormValues('NewArrivalForm')(state, 'imageFile')
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NewArrivalForm',
  validate
})(NewArrivalForm)));


