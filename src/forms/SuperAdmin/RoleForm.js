import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import {Box, TextField, Button, Grid, Stack, FormGroup, FormControlLabel, Switch, MenuItem, FormHelperText  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { roleCreate, roleUpdate} from 'actions/superadmin/role.actions';

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

class RoleForm extends React.Component {

  constructor(props) {
    super(props);

    let formData = 'formData' in this.props ? this.props.formData : null;
    this.state = {
      formData: formData,
      isCreateFrom: !formData,
      permissions: {
        master: false,
        product_master: false,
        user_management: false,
        employee: false,
        investor: false,
        stock: false,
        invoice: false,
        orders: false,
        hr_management: false,
        settings: false
      }
    }
    
  }

  componentDidMount(){
    if(this.state.formData){
      this.props.initialize(this.state.formData);
      /*this.setState({
        permissions: this.state.formData.permissions
      })*/
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

  permissionChange = (e) => {
    const {name, checked} = e.target;
    this.setState({
      permissions: {
        ...this.state.permissions,
        [name]: checked ? true : false
      }
    })
  }

  handleFormSubmit = async (data, dispatch) => {
    let formValues = {...data};
    //formValues.permissions = this.state.permissions;
    if (this.state.isCreateFrom) {
      return this.props.actions.roleCreate(formValues);
    }else{
      return this.props.actions.roleUpdate(this.state.formData.id, formValues);
    }
  }

  isDisabled = () => {
    return (this.state.formData && (this.state.formData.id == 9 || this.state.formData.id == 10)) ? true : false;
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { permissions } = this.state;
    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit) }>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} className='create-input'>
                <Field
                  name="name"
                  component={this.renderTextField}
                  label="Role Name"
                  disabled={this.isDisabled()}
                />
              </Grid>
              {/*<Grid item xs={12} className='create-input'>
                <h3>Permissions</h3>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.product_master} onChange={this.permissionChange} inputProps={{'name' : 'product_master', 'value': 1}} />} 
                        label="Product Master" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.invoice} onChange={this.permissionChange} inputProps={{'name' : 'invoice', 'value': 1}} />} 
                        label="Invoice" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.orders} onChange={this.permissionChange} inputProps={{'name' : 'orders', 'value': 1}} />} 
                        label="Order Management" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.user_management} onChange={this.permissionChange} inputProps={{'name' : 'user_management', 'value': 1}} />} 
                        label="User Management" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.employee} onChange={this.permissionChange} inputProps={{'name' : 'employee', 'value': 1}} />} 
                        label="Employee Management" 
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.investor} onChange={this.permissionChange} inputProps={{'name' : 'investor', 'value': 1}} />} 
                        label="Investor Management" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.hr_management} onChange={this.permissionChange} inputProps={{'name' : 'hr_management', 'value': 1}} />} 
                        label="HR Management" 
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.stock} onChange={this.permissionChange} inputProps={{'name' : 'stock', 'value': 1}} />} 
                        label="Stock Management" 
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.master} onChange={this.permissionChange} inputProps={{'name' : 'master', 'value': 1}} />} 
                        label="Master" 
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={4}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Switch checked={permissions.settings} onChange={this.permissionChange} inputProps={{'name' : 'settings', 'value': 1}} />} 
                        label="Settings" 
                      />
                    </FormGroup>
                  </Grid>
                  
                </Grid>
              </Grid>*/}
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
  actions: bindActionCreators({
    roleCreate,
    roleUpdate
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'RoleForm',
  validate
})(RoleForm)));


