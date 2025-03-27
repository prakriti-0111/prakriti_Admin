import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, InputAdornment } from '@mui/material';
import { Link as ReactLink } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  passwordShow,
  setPasswordShow,
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
    InputProps={{
      endAdornment: input.name == "password" ? <InputAdornment position="end">{passwordShow ? <Visibility onClick={() => setPasswordShow(false)} className="cursor-pointer" /> : <VisibilityOff onClick={() => setPasswordShow(true)} className="cursor-pointer" />}</InputAdornment> : null,
    }}
  />
)

let LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  const [passwordShow, setPasswordShow] = React.useState(false);

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
          type={passwordShow ? "text" : "password"}
          component={renderTextField}
          label="Password"
          passwordShow={passwordShow}
          setPasswordShow={setPasswordShow}
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
        <Grid container>
          <Grid item xs>
            <Link href="/super-admin/forgot-password" variant="body2" className='forget-text'>
              Forgot password?
            </Link>
          </Grid>
        </Grid>

      </Box>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate
})(LoginForm)
