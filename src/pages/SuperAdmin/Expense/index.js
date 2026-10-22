import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, Stack, Typography, OutlinedInput, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
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
import { isEmpty, toBase64, isSuperAdmin, displayAmount, hasPermission, isDistributor, isAdmin } from 'src/helpers/helper';
import {
  SUPERADMIN_RESET_EXPENSE
} from '../../../actionTypes/superadmin/expense.types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { salesExecutiveList } from 'actions/superadmin/salesExecutive.actions';

/* The API sends `type` already rendered as its label, so these are the two
   values a row can carry. Money issued to the executive goes into their wallet,
   an expense comes out of it - hence credit and debit. */
const TYPE_ISSUE = 'Issue Amount';
const TYPE_EXPENSE = 'Expense';

/**
 * The list shows dates day-first, the way the wallet's credit/debit table does.
 *
 * Display only, deliberately: the fetch endpoint hands the edit dialog the very
 * same ExpenseCollection, and ExpenseForm builds its dates as MM/DD/YYYY - so
 * switching the API to a day-first format would feed 20/10/2026 into a
 * month-first picker. Anything that is not the MM/DD/YYYY the API sends is left
 * untouched, so a future change there shows up as an unswapped date rather than
 * a silently wrong one.
 */
const toDayFirst = (value) => {
  const parts = String(value || '').split('/');
  if (parts.length !== 3) return value;
  const [month, day, year] = parts;
  return `${day}/${month}/${year}`;
};

class ExpensePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
    this.isAdmin = isAdmin();
    /* Roles that review other people's expenses rather than file their own:
       they get the Sales Executive column and filter, and the wallet figure of
       whoever is selected instead of their own. */
    this.managesOthers = this.isSuperAdmin || this.isDistributor || this.isAdmin;

    this.columns = [
      {
        name: 'date',
        display_name: 'Date'
      }
    ];
    if (this.managesOthers) {
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
        name: 'credit',
        display_name: 'Credit',
        class_conditions: [
          {
            key: "action_value",
            value: "Declined",
            class_name: "strike_through"
          }
        ]
      },
      {
        name: 'debit',
        display_name: 'Debit',
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
    /* The Sales Executive filter reads this slice. It used to be filled only as
       a side effect of the add form mounting, so a reviewer without add
       permission saw an empty dropdown. */
    if (this.managesOthers) {
      this.props.actions.salesExecutiveList({ all: 1, role_id: 4 });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.items !== state.items) {
      update.items = props.items;
      update.isLoading = false;
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
    this.setState({ isLoading: true });
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

  /* A row is either money in or money out, never both, so the other column is
     left blank rather than showing a 0 that reads like a real entry. */
  getRows = () => {
    return (this.state.items || []).map((row) => ({
      ...row,
      date: toDayFirst(row.date),
      credit: row.type === TYPE_ISSUE ? row.amount : '',
      debit: row.type === TYPE_EXPENSE ? row.amount : '',
    }));
  }

  render() {
    let typeList = [{label: TYPE_ISSUE, value: 'issue'}, {label: TYPE_EXPENSE, value: 'expense'}]


    return (
      <MainCard title="Add Daily Expense" secondary={!this.managesOthers ? <><div className='expense_wallet'><AccountBalanceWalletIcon /> <span>{displayAmount(this.state.wallet_balance)}</span></div></> : null}>
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
              this.managesOthers ?
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
              (this.managesOthers && this.state.queryParams.user_id) ?
              <Grid item xs={5} md={5} className='create-input'>
                <div className='expense_wallet by_user'><AccountBalanceWalletIcon /> <span>{displayAmount(this.state.wallet_balance)}</span></div>
              </Grid>
              : null
            }
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing}>
          {this.state.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataTable
              columns={this.columns}
              rows={this.getRows()}
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
          )}
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
