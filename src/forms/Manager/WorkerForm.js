import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, FormControl , InputLabel, TextareaAutosize, Stack, Select, MenuItem} from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class WorkerForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
    }
  }

  componentDidMount(){
    if(this.state.formData){
      this.props.initialize(this.state.formData)
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
        <Box sx={{ flexGrow: 1 }}  className='ratn-dialog-inner'>
            <Grid container spacing={2} className="details-header ratn-pur-wrapper loans_view p_view">
                <Grid item xs={6}>
                    <Field
                        name="name"
                        required
                        component={this.renderTextField}
                        label="Name"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        name="email"
                        component={this.renderTextField}
                        label="Email"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Field
                        name="mobile"
                        required
                        component={this.renderTextField}
                        label="Mobile"
                    />
                </Grid>
                <Grid item xs={12}>
                <Stack spacing={1} mt={2} direction="row"  className='ratn-footer-buttons' justifyContent="flex-end">
              <Button variant="contained" type="submit" className='conf-button'>Submit</Button>
              <Button variant="outlined" onClick={() => this.props.navigate('/employee/workers') }  className='close-button'>Cancel</Button>
            </Stack>
            </Grid>
            </Grid>
            
        </Box>
      </form>
    )
  }

}

export default withRouter(reduxForm({
  form: 'WorkerForm',
  validate
})(WorkerForm))
