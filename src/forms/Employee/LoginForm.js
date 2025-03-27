import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'role_id',
    'user_name',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      roleList: this.props.roleList
    }

  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.roleList !== state.roleList) {
      update.roleList = props.roleList;
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
      margin="normal"
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
    />
  )
  
  renderRoleField = ({
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
        <MenuItem value="">select role</MenuItem>
        {
          this.state.roleList.map((item, index) => {
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
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 1 }} className='myinput'>
  
            <Field
              name="role_id"
              component={this.renderRoleField}
              label="Role"
              type="select"
            />
          <Field
            name="user_name"
            component={this.renderTextField}
            label="User Name / Email / Mobile"
          />
  
          <Field
            name="password"
            type="password"
            component={this.renderTextField}
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

}



export default withRouter(reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm))
