import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, Box, TextField } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { isEmpty } from 'src/helpers/helper';
import { loanView, loanPayment } from 'actions/superadmin/loan.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { districtList } from 'actions/superadmin/district.actions';
import DataTable from 'src/utils/DataTable';
import { RESET_LOAN } from '../../../actionTypes/superadmin/loan.types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoanPaymentForm from 'forms/SuperAdmin/LoanPaymentForm';
import { withSnackbar } from 'notistack';

class LoanViewPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loan: this.props.loan,
      processing: false,
      openDialog: false,
      actionCalled: this.props.actionCalled,
      paymentSuccess: this.props.paymentSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }

    // this.columns = [
    //   {
    //     name: 'type',
    //     display_name: 'Payment Type'
    //   },
    //   {
    //     name: 'principal_amount',
    //     display_name: 'Total Amount'
    //   },
    //   {
    //     name: 'principal_due_amount',
    //     display_name: 'Due Amount'
    //   },
    //   {
    //     name: 'interest_amount',
    //     display_name: 'Interest Amount'
    //   },
    //   {
    //     name: 'amount',
    //     display_name: 'Amount'
    //   },
    //   {
    //     name: 'interest_due_date',
    //     display_name: 'Interest Due Date'
    //   },
    //   {
    //     name: 'payment_receive_date',
    //     display_name: 'Payment Received Date'
    //   },
    //   {
    //     name: 'status',
    //     display_name: 'Status'
    //   }

    // ];

    this.columns = [
      {
        name: 'amount',
        display_name: 'Payment'
      },
      {
        name: 'payment_mode',
        display_name: 'Payment Mode'
      },
      {
        name: 'payment_receive_date',
        display_name: 'Payment Date'
      },
      {
        name: 'status',
        display_name: 'Status'
      }
    ];

  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.loan !== state.loan) {
      update.loan = props.loan;
    }
    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }
    if (props.paymentSuccess !== state.paymentSuccess) {
      update.paymentSuccess = props.paymentSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }
    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }

    return update;
  }

  loadViewData = () => {
    this.props.actions.loanView(this.props.params.id);
  }

  handleCancel = () => {
    this.handleDialogClose();
  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Make Payment'
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false
    })
  }

  submitLoanPayment = (data) => {
    this.props.actions.loanPayment(this.props.params.id, data);
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.paymentSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.setState({
          openDialog: false
        }, () => {
          this.loadViewData()
        })
      }

      if (!isEmpty(this.state.errorMessage)) {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
      }

      this.props.dispatch({
        type: RESET_LOAN
      });
    }
  }

  render() {
    const { loan } = this.state;
    let userDetails = "";
    if(loan){
      userDetails = loan.investor_name;
      userDetails += "   " + loan.investor_mobile;
      userDetails += "   " + loan.investor_address;
    }
    return (
      <MainCard title={userDetails} secondary={loan && loan.status == 'pending' ? <Button variant="contained" onClick={this.handleCreate}>Payment</Button> : null} >

        {
          !loan ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
              <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <div autoComplete="off" className='ratn-dialog-inner'>
                  <Grid container spacing={2} className='loans_view p_view'>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Principal Amount"
                        variant="outlined"
                        fullWidth
                        value={loan.loan_amount}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Interest Rate"
                        variant="outlined"
                        fullWidth
                        value={loan.interest_display}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Total Amt With INT"
                        variant="outlined"
                        fullWidth
                        value={loan.total_with_interest}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Total Paid Amt"
                        variant="outlined"
                        fullWidth
                        value={loan.total_paid}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Total Rest Due Amt"
                        variant="outlined"
                        fullWidth
                        value={loan.due_amount}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Loan Start Date"
                        variant="outlined"
                        fullWidth
                        value={loan.start_date}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                      }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Duration"
                        variant="outlined"
                        fullWidth
                        value={loan.total_months}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                      }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Interest Type"
                        variant="outlined"
                        fullWidth
                        value={loan.interest_display_type}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                      }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="Monthly EMI"
                        variant="outlined"
                        fullWidth
                        value={loan.monthly_emi}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                      }}
                      />
                    </Grid>
                    {/*<Grid item xs={12} md={2} className='create-input'>
                      <TextField  
                        label="EMI Due Date"
                        variant="outlined"
                        fullWidth
                        value={loan.due_date}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                      }}
                      />
                    </Grid>*/}
                  </Grid>
                </div>
              </Box>
              <Grid item xs={12} className='create-input'>
                <DataTable
                  columns={this.columns}
                  rows={loan.loan_details}
                  page={1}
                  limit={20}
                  total={this.state.total}
                  havePagination={false}
                />
              </Grid>
            </>
        }



        <Dialog
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="xs"
          className="ratn-dialog-wrapper"
        >
          <DialogTitle>
            {
              this.state.dialogTitle
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <LoanPaymentForm onSubmit={this.submitLoanPayment} handleCancel={this.handleCancel} />
          </DialogContent>
        </Dialog>


      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  loan: state.superadmin.loan.loan,
  actionCalled: state.superadmin.loan.actionCalled,
  paymentSuccess: state.superadmin.loan.paymentSuccess,
  successMessage: state.superadmin.loan.successMessage,
  errorMessage: state.superadmin.loan.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({ loanView, loanPayment }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanViewPage)));
