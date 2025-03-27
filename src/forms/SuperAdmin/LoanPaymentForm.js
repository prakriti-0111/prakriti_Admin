import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText, InputAdornment  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'amount',
    'payment_mode'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required.'
    }
  });
  
  return errors
}

class LoanPaymentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }

  componentDidMount(){

  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    return update;
  }

  renderAmountField = ({
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
      InputProps={{
        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      }}
      {...input}
      {...custom}
    />
  )

  renderPaymentModeField = ({
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
        <MenuItem value=""></MenuItem>
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="cheque">Cheque</MenuItem>
        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
        <MenuItem value="online">Online</MenuItem>
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
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className='tax-input'>
              <Grid item xs={12}>
                <Field
                  name="amount"
                  component={this.renderAmountField}
                  label="Amount"
                />
              </Grid>
              <Grid item xs={12} className='create-input'>
                <Field
                  name="payment_mode"
                  component={this.renderPaymentModeField}
                  label="Payment Mode"
                  type="select"
                />
              </Grid>
            </Grid>
            <Stack spacing={1} mt={2} direction="row" justifyContent="flex-end" className='p-submit-button modal-button-area'>
              <Button variant="contained" type="submit" disabled={submitting}>Submit</Button>
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
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'LoanPaymentForm',
  validate
})(LoanPaymentForm)));


