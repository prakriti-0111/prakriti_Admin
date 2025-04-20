import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import {isEmpty, hasPermission} from 'src/helpers/helper';
import { loanList, loanPayment, loanStore, loanDelete } from 'actions/superadmin/loan.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { districtList } from 'actions/superadmin/district.actions';
import DataTable from 'src/utils/DataTable';
import {RESET_LOAN} from '../../../actionTypes/superadmin/loan.types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoanForm from 'forms/SuperAdmin/LoanForm';
import { withSnackbar } from 'notistack';

class LoanPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      openDialog: false,
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      deleteSuccess: this.props.deleteSuccess,
      paymentSuccess: this.props.paymentSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }
    this.columns = [
      {
        name: 'investor_name',
        display_name: 'Investor Name'
      },
      {
        name: 'loan_amount',
        display_name: 'Principal Amt'
      },
      {
        name: 'interest_display',
        display_name: 'INT Rate'
      },
      {
        name: 'interest_display_type',
        display_name: 'INT Type'
      },
      {
        name: 'interest_amount',
        display_name: 'Interest Amt'
      },
      {
        name: 'total_with_interest',
        display_name: 'Tot With Interest'
      },
      {
        name: 'monthly_emi',
        display_name: 'EMI Amount'
      },
      // {
      //   name: 'due_date',
      //   display_name: 'Due Date'
      // }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.actionCalled !== state.actionCalled){
        update.actionCalled = props.actionCalled;
    }
    if(props.createSuccess !== state.createSuccess){
        update.createSuccess = props.createSuccess;
    }
    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.paymentSuccess !== state.paymentSuccess){
        update.paymentSuccess = props.paymentSuccess;
    }
    if(props.successMessage !== state.successMessage){
        update.successMessage = props.successMessage;
    }
    if(props.errorMessage !== state.errorMessage){
        update.errorMessage = props.errorMessage;
    }
    if(props.permissions !== state.permissions){
      update.permissions = props.permissions;
    }

    return update;
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.loanDelete(row.id);
  }

  loadListData = () => {
    this.props.actions.loanList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleCancel = () => {
    this.handleDialogClose();
  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Loan'
    })
  }

  handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      openDialog: false
    })
  }

  submitLoan = (data) => {
    this.props.actions.loanStore(data);
  }

  componentDidUpdate(){
    if(this.state.actionCalled){  
        if(this.state.createSuccess){
            this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
            this.setState({
                queryParams: {
                    ...this.state.queryParams,
                    page: 1
                },
                openDialog: false
            }, () => {
                this.loadListData()
            })
        } else if(this.state.deleteSuccess){
          this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
          this.props.dispatch({
            type: RESET_LOAN
          });
          this.handlePagination(1);
        }

        if(!isEmpty(this.state.errorMessage)){
            this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        }

        this.props.dispatch({
            type: RESET_LOAN
        });
    }
  }

  render() {
    return (
      <MainCard title="Loans" secondary={hasPermission(this.state.permissions, 'loans', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
        <Grid container spacing={gridSpacing}>
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={[
              {
                label: 'View',
                onClick: this.handleView,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'loans', 'view'),
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                color: 'error',
                isDelete: true,
                show: hasPermission(this.state.permissions, 'loans', 'delete'),
              }
            ]}
          />
        </Grid>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="md"
        >
        <DialogTitle>
          {
            this.state.dialogTitle
          }
        </DialogTitle>
        <DialogContent>
            <DialogContentText></DialogContentText>
          <LoanForm onSubmit={this.submitLoan} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog>


      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.loan.items,
  total: state.superadmin.loan.total,
  actionCalled: state.superadmin.loan.actionCalled,
  createSuccess: state.superadmin.loan.createSuccess,
  deleteSuccess: state.superadmin.loan.deleteSuccess,
  paymentSuccess: state.superadmin.loan.paymentSuccess,
  successMessage: state.superadmin.loan.successMessage,
  successMessage: state.superadmin.loan.successMessage,
  errorMessage: state.superadmin.loan.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({loanList, loanPayment, loanStore, loanDelete}, dispatch)
  }
};  


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanPage)));
