import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import {Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText, InputAdornment, TextareaAutosize} from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { investorList } from 'actions/superadmin/investor.actions';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'user_id',
    'amount',
    'interest',
    'duration',
    'interest_display_type',
    'payment_mode'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required.'
    }
  });
  
  return errors
}

class LoanForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      investors: this.props.investors
    }
    
  }

  componentDidMount(){
    this.props.actions.investorList({all: 1});
    this.props.initialize({interest_display_type: 'yearly'});
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if (props.investors !== state.investors) {
      update.investors = props.investors;
    }

    return update;
  }

  renderInvestorField = ({
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
        {
          this.state.investors.map((item, index) => {
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

  renderInterestField = ({
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
        endAdornment: <InputAdornment position="start">%</InputAdornment>,
      }}
      {...input}
      {...custom}
    />
  )

  renderDurationField = ({
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
        endAdornment: <InputAdornment position="start">months</InputAdornment>,
      }}
      {...input}
      {...custom}
    />
  )

  renderInterestTypeField = ({
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
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
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

  renderTextArea = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextareaAutosize
      minRows={2}
      label={label}
      error={touched && error ? error : ''}
      style={{ width: '100%' }}
      {...input}
      {...custom}
    />
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className='tax-input'>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="user_id"
                  component={this.renderInvestorField}
                  label="Investor"
                  type="select"
                />
              </Grid>
              <Grid item xs={6} className='create-input'>
                <Field
                  name="amount"
                  component={this.renderAmountField}
                  label="Loan Amount"
                />
              </Grid>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="interest"
                  component={this.renderInterestField}
                  label="Interest"
                />
              </Grid>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="interest_display_type"
                  component={this.renderInterestTypeField}
                  label="Interest Type"
                  type="select"
                />
              </Grid>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="duration"
                  component={this.renderDurationField}
                  label="Duration"
                />
              </Grid>
              <Grid item xs={3} className='create-input'>
                <Field
                  name="payment_mode"
                  component={this.renderPaymentModeField}
                  label="Payment Mode"
                  type="select"
                />
              </Grid>
              <Grid item xs={12} className='create-input'>
                <Field
                  className='description'
                  name="notes"
                  component={this.renderTextArea}
                  placeholder="Notes"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={{mt: 2}} direction="row" className='ratn-footer-buttons gap-1' justifyContent="flex-end" >
                <Button variant="contained" type="submit" className='conf-button' disabled={submitting}>Submit</Button>
                <Button variant="outlined" className='close-button' onClick={() => this.props.handleCancel() }>Cancel</Button>
              </Stack>
            </Grid>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  investors: state.superadmin.investor.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    investorList
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'LoanForm',
  validate
})(LoanForm)));


