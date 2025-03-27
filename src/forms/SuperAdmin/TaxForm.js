import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, change } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, FormHelperText, InputAdornment  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { priceFormat, isEmpty} from 'src/helpers/helper';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'cgst',
    'sgst',
    'igst'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class TaxForm extends React.Component {

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
       cgst: '',
       sgst: '',
       igst: ''
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

  renderGSTField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>
      }}
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

  handleIGST = (e) => {
    let val = e.target.value;
    if(!isEmpty(val)){
      val = priceFormat(priceFormat(val) / 2);
      this.props.change('cgst', val);
      this.props.change('sgst', val);
    }else{
      this.props.change('cgst', '');
      this.props.change('sgst', '');
    }
    
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
         <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={2} className='tax-input'>
              <Grid item xs={6} className='create-input'>
                  <Field
                      name="name"
                      component={this.renderTextField}
                      label="Tax Name"
                  />
              </Grid>
              <Grid item xs={6} className='create-input'>
                    <Field
                        name="igst"
                        component={this.renderGSTField}
                        label="IGST"
                        onChange={this.handleIGST}
                    />
                </Grid>
              <Grid item xs={6} className='create-input'>
                    <Field
                        name="cgst"
                        component={this.renderGSTField}
                        label="CGST"
                    />
                </Grid>
           
       
                <Grid item xs={6} className='create-input'>
                    <Field
                        name="sgst"
                        component={this.renderGSTField}
                        label="SGST"
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

});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    change
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'TaxForm',
  validate
})(TaxForm));


