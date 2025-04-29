import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link } from '@mui/material';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'mobile',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    margin="normal"
    fullWidth
    error={touched && error ? true : false}
    helperText={touched && error ? error : ''}
    {...input}
    {...custom}
  />
)

let LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 1 }} className='myinput'>
        <Field
          name="mobile"
          component={renderTextField}
          label="Mobile"
        />

        <Field
          name="password"
          type="password"
          component={renderTextField}
          label="Password"
        />

        <Button
          className='signin-btn'
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={pristine || submitting}
        >
          Sign In
        </Button>
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" className='forget-text'>
              Forgot password?
            </Link>
          </Grid>
        </Grid> */}

      </Box>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate
})(LoginForm)
