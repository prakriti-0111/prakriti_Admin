import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, Stack, Typography, OutlinedInput, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { expenseList, expenseCreate, expenseFetch, expenseUpdate, expenseUpdateStatus } from 'actions/superadmin/expense.actions';
import { reasonList } from 'actions/superadmin/reason.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExpenseForm from 'forms/SuperAdmin/ExpenseForm';
import { withSnackbar } from 'notistack';
import { isEmpty, toBase64, isSuperAdmin, displayAmount, hasPermission, isDistributor } from 'src/helpers/helper';
import {
  SUPERADMIN_RESET_EXPENSE
} from '../../../actionTypes/superadmin/expense.types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';

class ExpensePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        reason_id: '',
        search: '',
        user_id: '',
        type: ''
      },
      openDialog: false,
      actionRow: null,
      isCreate: true,
      editRow: null,
      reasons: this.props.reasons,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      submitSuccess: false,
      status: '',
      processing: false,
      userList: this.props.userList
    }
    this.isSuperAdmin = isSuperAdmin();
    this.isDistributor = isDistributor();

    this.columns = [
      {
        name: 'date',
        display_name: 'Date'
      }
    ];
    if (this.isSuperAdmin || this.isDistributor) {
      this.columns = [...this.columns,
      {
        name: 'user_name',
        display_name: 'Sales Executive'
      }]
    }

    this.columns = [
      ...this.columns,
      {
        name: 'reason',
        display_name: 'Reason'
      },
      {
        name: 'description',
        display_name: 'Description'
      },
      {
        name: 'bill_image',
        display_name: 'Bill Image',
        isImage: true
      },
      {
        name: 'amount',
        display_name: 'Amount',
        class_conditions: [
          {
            key: "action_value",
            value: "Declined",
            class_name: "strike_through"
          }
        ]
      },
      {
        name: 'type',
        display_name: 'Type'
      },
      /*{
          name: 'display_explanation', 
          display_name: 'Explanation'
      }*/
    ];


  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.reasonList();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if (props.wallet_balance !== state.wallet_balance) {
      update.wallet_balance = props.wallet_balance;
    }
    if (props.have_action !== state.have_action) {
      update.have_action = props.have_action;
    }

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }

    if (props.reasons !== state.reasons) {
      update.reasons = props.reasons;
    }

    if ('createSuccess' in props && props.createSuccess !== state.createSuccess) {
      update.createSuccess = props.createSuccess;
    }

    if ('editSuccess' in props && props.editSuccess !== state.editSuccess) {
      update.editSuccess = props.editSuccess;
    }

    if ('deleteSuccess' in props && props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }
    if (props.userList !== state.userList) {
      update.userList = props.userList;
    }

    return update;
  }

  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadListData();
    })

  }

  loadListData = () => {
    this.props.actions.expenseList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row
    })
  }

  handleDelete = (row) => {
    this.props.actions.expenseDelete(row.id);
  }

  submit = async (data) => {
    if ('bill_image' in data && !isEmpty(data.bill_image)) {
      data.bill_image = await toBase64(data.bill_image);
    } else {
      data.bill_image = '';
    }
    if (this.state.editRow) {
      this.props.actions.expenseUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.expenseCreate(data);
    }
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({ type: SUPERADMIN_RESET_EXPENSE });
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1,
            reason_id: '',
            user_id: ''
          },
          editRow: null,
          submitSuccess: true
        }, () => {
          this.loadListData();
          this.setState({
            submitSuccess: false
          })
        })
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({ type: SUPERADMIN_RESET_EXPENSE });
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1,
            reason_id: '',
            user_id: ''
          },
          editRow: null,
          submitSuccess: true
        }, () => {
          this.loadListData();
          this.setState({
            submitSuccess: false
          })
        })
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({ type: SUPERADMIN_RESET_EXPENSE });
        this.handlePagination(1);
      }
      else if (this.state.errorMessage != null) {
        this.props.dispatch({ type: SUPERADMIN_RESET_EXPENSE });
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
  }

  reasonChange = (vl) => {
    // this.setState({
    //   queryParams: {
    //     ...this.state.queryParams,
    //     page: 1,
    //     reason_id: vl
    //   }
    // }, () => {
    //   this.loadListData()
    // })
  }

  userChange = (val) => {
    // this.setState({
    //   queryParams: {
    //     ...this.state.queryParams,
    //     page: 1,
    //     user_id: val
    //   }
    // }, () => {
    //   this.loadListData()
    // })
  }

  handleAccept = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      status: "accepted"
    })
  }

  handleDeclined = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      status: "declined"
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
      actionRow: null
    })
  }

  handleSubmit = async () => {
    let res = await expenseUpdateStatus(this.state.actionRow.id, { status: this.state.status });
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.setState({
        openDialog: false
      })
      this.loadListData();
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
  }

  getTableActions = () => {
    let tableActions = [
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary',
        show: hasPermission(this.state.permissions, 'expense', 'edit'),
        conditions: [
          {
            key: "can_edit",
            value: true
          }
        ]
      }
    ];
    //if(this.isSuperAdmin || this.isDistributor){
    tableActions = [
      ...tableActions,
      {
        label: 'green_tick',
        onClick: this.handleAccept,
        color: 'primary',
        show: this.isDistributor ? this.state.have_action : hasPermission(this.state.permissions, 'expense', 'edit'),
        conditions: [
          {
            key: "can_accept",
            value: true
          }
        ]
      },
      {
        label: 'Close',
        onClick: this.handleDeclined,
        color: 'error',
        show: this.isDistributor ? this.state.have_action : hasPermission(this.state.permissions, 'expense', 'edit'),
        conditions: [
          {
            key: "can_accept",
            value: true
          }
        ]
      }
    ]
    //}
    return tableActions;
  }


  handleSearchChange = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value
      }
    })
  }

  handleSearch = () => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1
      }
    }, () => {
      this.loadListData();
    })
  }

  render() {
    let typeList = [{label: 'Issue Amount', value: 'issue'}, {label: 'Expense', value: 'expense'}]


    return (
      <MainCard title="Add Daily Expense" secondary={!this.isSuperAdmin && !this.isDistributor ? <><div className='expense_wallet'><AccountBalanceWalletIcon /> <span>{displayAmount(this.state.wallet_balance)}</span></div></> : null}>
        {
          hasPermission(this.state.permissions, 'expense', 'add') || this.isDistributor ?
            <div className='tax-input loans_view p_view'>
              <ExpenseForm onSubmit={this.submit} formData={this.state.editRow} reasons={this.state.reasons} handleCancel={this.handleCancel} reasonChange={this.reasonChange} submitSuccess={this.state.submitSuccess} userChange={this.userChange} />
            </div>
            : null
        }

        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            {
              this.isSuperAdmin || this.isDistributor ?
                <Grid item xs={12} md={3} className='create-input'>
                  <FormControl fullWidth>
                    <InputLabel shrink>Sales Executive</InputLabel>
                    <Select
                      value={this.state.queryParams.user_id}
                      onChange={(e) => this.handleSearchChange(e.target.value, 'user_id')}
                      className='input-inner'
                      input={<OutlinedInput notched label="Sales Executive" />}
                      displayEmpty
                    >
                      <MenuItem value="">All</MenuItem>
                      {
                        this.state.userList.map((item, key) => (
                          <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                : null
            }
            <Grid item xs={12} md={3} className='create-input'>
              <FormControl fullWidth>
                <InputLabel shrink>Type</InputLabel>
                <Select
                  value={this.state.queryParams.type}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'type')}
                  className='input-inner'
                  input={<OutlinedInput notched label="Type" />}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    typeList.map((item, key) => (
                      <MenuItem value={item.value} key={key}>{item.label}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={7} md={1} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
            {
              ((this.isSuperAdmin || this.isDistributor) && this.state.queryParams.user_id) ?
              <Grid item xs={5} md={5} className='create-input'>
                <div className='expense_wallet by_user'><AccountBalanceWalletIcon /> <span>{displayAmount(this.state.wallet_balance)}</span></div>
              </Grid>
              : null
            }
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing}>
          <DataTable
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={this.getTableActions()}
            actionValue={'action_value'}
            actionValueColorConditions={[
              {
                value: "Declined",
                color: "red"
              },
              {
                value: "Pending",
                color: "#ff9800"
              },
              {
                value: "Accepted",
                color: "green"
              },
            ]}
          />
        </Grid>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            {
              this.state.status == "accepted" ?
                "Accept"
                :
                "Decline"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} className='create-input'>
                  Are you sure want to {this.state.status == "accepted" ? "Accept" : "Decline"} ?
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                    <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                      {
                        this.state.processing ? "Processing" : "Submit"
                      }
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.expense.items,
  total: state.superadmin.expense.total,
  wallet_balance: state.superadmin.expense.wallet_balance,
  have_action: state.superadmin.expense.have_action,
  reasons: state.superadmin.reason.items || [],
  actionCalled: state.superadmin.expense.actionCalled,
  createSuccess: state.superadmin.expense.createSuccess,
  editSuccess: state.superadmin.expense.editSuccess,
  deleteSuccess: state.superadmin.expense.deleteSuccess,
  successMessage: state.superadmin.expense.successMessage,
  errorMessage: state.superadmin.expense.errorMessage,
  permissions: state.employee.permissions.permissions,
  userList: state.superadmin.salesExecutive.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ expenseList, expenseCreate, expenseUpdate, reasonList, salesExecutiveList }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExpensePage)));
