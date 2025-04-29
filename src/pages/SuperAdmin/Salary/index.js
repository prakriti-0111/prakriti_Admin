import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, TableContainer, Table, TableRow, TableCell, Checkbox, Paper, TableHead, TableBody, DialogActions, Stack, Box, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salaryList, salaryCreate, salaryPay, salaryDownload, salaryEmployeeList, salaryAdvancePay } from 'actions/superadmin/salary.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RoleForm from 'forms/SuperAdmin/RoleForm';
import { withSnackbar } from 'notistack';
import { hasPermission, displayAmount } from 'src/helpers/helper';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import moment from 'moment';
import { isEmpty } from '../../../helpers/helper';
import _ from 'lodash';

class SalaryPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 50,
        month: '',
        year: '',
        user_id: '',
        status: '',
        type: 'salary'
      },
      all_checked: false,
      total_amount: 0,
      openDialog: false,
      processing: false,
      employees: [],
      payRow: null,
      advanceDialoge: false,
      advanceForm: {
        user_id: '',
        amount: '',
        cheque_no: '',
        payment_mode: 'cash',
        payment_type: "advance"
      },
      advanceFormErrors: {
        user_id: false,
        amount: false
      },
      employe_advance: 0,
      amount: '',
      payment_mode: 'cash',
      amount_err: false,
      payment_mode_err: false
    }

  }

  componentDidMount() {
    this.loadListData();
    this.generateSalaries();
    this.loadEmployees();
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

  loadListData = async () => {
    let res = await salaryList(this.state.queryParams);
    if (res.data.success) {
      this.setState({
        items: res.data.data.items,
        total: res.data.data.total
      })
    }
  }

  generateSalaries = async () => {
    let res = await salaryCreate();
    if (res.data.success && res.data.data.is_generated) {
      this.loadListData();
    }
  }

  loadEmployees = async () => {
    let res = await salaryEmployeeList();
    if (res.data.success) {
      this.setState({
        employees: res.data.data
      })
    }
  }

  handleDownload = async (row) => {
    let res = await salaryDownload(row.id);
    if (res.data.success) {
      window.open(res.data.data.url, '_blank').focus();
    }
  }

  handlePay = (row) => {
    this.setState({
      openDialog: true,
      payRow: row
    })
  }

  handleDialogClose = () => {
    this.setState({
      openDialog: false
    })
  }

  handleAdvancePayConfirm = async () => {
    if (this.advanceFormValodate()) {
      return;
    }
    this.setState({
      processing: true
    })

    let res = await salaryAdvancePay(this.state.advanceForm);
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.setState({
        advanceDialoge: false
      })
      this.loadListData();
      this.loadEmployees();
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
    this.setState({
      processing: false
    })

  }

  advanceFormValodate = () => {
    let advanceForm = this.state.advanceForm;
    let advanceFormErrors = this.state.advanceFormErrors;
    let err = false;
    if (isEmpty(advanceForm.user_id)) {
      advanceFormErrors.user_id = true;
      err = true;
    } else {
      advanceFormErrors.user_id = false;
    }
    if (isEmpty(advanceForm.amount)) {
      advanceFormErrors.amount = true;
      err = true;
    } else {
      advanceFormErrors.amount = false;
    }
    this.setState({
      advanceFormErrors: advanceFormErrors
    })
    return err;
  }

  handlePayConfirm = async () => {
    let err = false;
    if (isEmpty(this.state.amount)) {
      this.setState({
        amount_err: true
      });
      err = true;
    } else {
      this.setState({
        amount_err: false
      })
    }
    if (isEmpty(this.state.payment_mode)) {
      this.setState({
        payment_mode_err: true
      });
      err = true;
    } else {
      this.setState({
        payment_mode_err: false
      })
    }
    if(err){
      return;
    }

    this.setState({
      processing: true
    })
    let res = await salaryPay({ id: this.state.payRow.id, amount: this.state.amount, payment_mode: this.state.payment_mode });
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.setState({
        openDialog: false,
        all_checked: false
      })
      this.loadListData();
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
    this.setState({
      processing: false
    })
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
    this.loadListData();
  }

  getYears = () => {
    let years = [];
    for (let i = 2022; i <= moment().format("YYYY"); i++) {
      years.push(i);
    }
    return years;
  }

  handleAdvance = () => {
    this.setState({
      advanceDialoge: true,
      employe_advance: 0,
      advanceForm: {
        user_id: '',
        amount: '',
        cheque_no: '',
        payment_mode: 'cash',
        payment_type: "advance"
      }
    })
  }

  handleAdvanceClose = () => {
    this.setState({
      advanceDialoge: false
    })
  }

  handleAdvanceForm = (e) => {
    const { name, value } = e.target;
    this.setState({
      advanceForm: {
        ...this.state.advanceForm,
        [name]: value
      }
    }, () => {
      if (name == 'user_id') {
        let employe_advance = 0;
        if (value) {
          let m = _.filter(this.state.employees, { id: value });
          employe_advance = m[0].advance_amount;
        }
        this.setState({
          employe_advance: employe_advance
        })
      }
    })
  }

  render() {
    const { items, total, all_checked, total_amount, employees, payRow, advanceForm, advanceFormErrors } = this.state;
    let years = this.getYears();
    let payment_modes_list = [];
    if (advanceForm.payment_type == "advance") {
      payment_modes_list = [
        {
          value: 'cash',
          label: 'Cash'
        },
        {
          value: 'cheque',
          label: 'Cheque'
        },
        {
          value: 'imps_neft',
          label: 'NEFT/IMPS/UPI'
        },
        {
          value: 'online',
          label: 'Online'
        }
      ]
    } else {
      payment_modes_list = [
        {
          value: 'cash',
          label: 'Cash'
        },
        {
          value: 'imps_neft',
          label: 'NEFT/IMPS/UPI'
        },
        {
          value: 'online',
          label: 'Online'
        }
      ]
    }

    return (
      <MainCard title="Salaries" secondary={<Button variant="contained" onClick={this.handleAdvance}>Advance / Repayment</Button>}>
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='tax-input loans_view p_view'>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={this.state.queryParams.month}
                  label="Month"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'month')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="01">Jan</MenuItem>
                  <MenuItem value="02">Feb</MenuItem>
                  <MenuItem value="03">Mar</MenuItem>
                  <MenuItem value="04">Apr</MenuItem>
                  <MenuItem value="05">May</MenuItem>
                  <MenuItem value="06">Jun</MenuItem>
                  <MenuItem value="07">Jul</MenuItem>
                  <MenuItem value="08">Aug</MenuItem>
                  <MenuItem value="09">Sep</MenuItem>
                  <MenuItem value="10">Oct</MenuItem>
                  <MenuItem value="11">Nov</MenuItem>
                  <MenuItem value="12">Dec</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={this.state.queryParams.year}
                  label="Year"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'year')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    years.map((item, index) => (
                      <MenuItem value={item} key={index}>{item}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={this.state.queryParams.user_id}
                  label="Employee"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'user_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    employees.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={this.state.queryParams.status}
                  label="Status"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'status')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={this.state.queryParams.type}
                  label="Type"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'type')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="salary">Salary</MenuItem>
                  <MenuItem value="advance">Advance</MenuItem>
                  <MenuItem value="repayment">Repayment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing}>
          <TableContainer component={Paper} className='ratn-table-wrapper'>
            <Table sx={{ minWidth: 500 }}>
              <TableHead className='ratn-table-header'>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Employee</TableCell>
                  <TableCell>Designation</TableCell>
                  {
                    this.state.queryParams.type == 'salary' ?
                      <>
                        <TableCell>Absent</TableCell>
                        <TableCell>Gross</TableCell>
                        <TableCell>Ptax</TableCell>
                        <TableCell>Absent Amt</TableCell>
                      </>
                      : null
                  }
                  <TableCell>Total</TableCell>
                  {
                    this.state.queryParams.type == 'salary' ?
                      <TableCell>Actions</TableCell>
                      : null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.display_date}</TableCell>
                    <TableCell>{row.user_name}</TableCell>
                    <TableCell>{row.role_name}</TableCell>
                    {
                      this.state.queryParams.type == 'salary' ?
                        <>
                          <TableCell>{row.absent}</TableCell>
                          <TableCell>{row.gross}</TableCell>
                          <TableCell>{row.ptax}</TableCell>
                          <TableCell>{row.absent_amount}</TableCell>
                        </>
                        : null
                    }

                    <TableCell>{row.net}</TableCell>
                    {
                      this.state.queryParams.type == 'salary' ?
                        <TableCell className="action_btn">
                          <Stack spacing={1} direction="row">
                            {
                              row.type == "salary" ?
                                <>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.handleDownload(row)}
                                  >
                                    <FileDownloadIcon />
                                  </Button>
                                  {
                                    row.status != "paid" ?
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.handlePay(row)}
                                        className='label_btn'
                                      >
                                        Pay
                                      </Button>
                                      : null
                                  }
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.props.navigate('history/' + row.user_id)}
                                    className='label_btn'
                                  >
                                    History
                                  </Button>
                                </>
                                : null
                            }

                          </Stack>
                        </TableCell>
                        : null
                    }
                  </TableRow>
                ))}
                {
                  items.length == 0 ?
                    <TableRow>
                      <TableCell align="center" colSpan={this.state.queryParams.type == 'salary' ? 10 : 5}>
                        No data found.
                      </TableCell>
                    </TableRow>
                    : null
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Pay Salary
          </DialogTitle>
          <DialogContent>
            {
              payRow ?
                <Box sx={{ flexGrow: 1, m: 0.5 }}>
                  <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={payRow.user_name}
                        name="Name"
                        disabled
                        inputProps={{ className: "non_disable_text" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Advance Amount"
                        variant="outlined"
                        fullWidth
                        value={payRow.advance_amount}
                        name="Advance Amount"
                        disabled
                        InputProps={{
                          className: "non_disable_text",
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Due Amount"
                        variant="outlined"
                        fullWidth
                        value={payRow.due_amount}
                        name="Due Amount"
                        disabled
                        InputProps={{
                          className: "non_disable_text",
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Incentive"
                        variant="outlined"
                        fullWidth
                        value={payRow.incentive}
                        name="Incentive"
                        disabled
                        InputProps={{
                          className: "non_disable_text",
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Net"
                        variant="outlined"
                        fullWidth
                        value={payRow.net}
                        name="Net"
                        disabled
                        InputProps={{
                          className: "non_disable_text",
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Paid Amount"
                        variant="outlined"
                        fullWidth
                        value={this.state.amount}
                        name="Paid Amount"
                        onChange={(e) => this.setState({ amount: e.target.value })}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>
                        }}
                        error={this.state.amount_err}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                      <FormControl fullWidth error={this.state.payment_mode_err}>
                        <InputLabel>Payment Mode</InputLabel>
                        <Select
                          className='input-inner'
                          value={this.state.payment_mode}
                          fullWidth
                          label="Payment Mode"
                          onChange={(event) => this.setState({payment_mode: event.target.value})}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="cash">Cash</MenuItem>
                          <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                          <MenuItem value="online">Online</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                : null
            }
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
              <Button variant="contained" type="button" onClick={this.handlePayConfirm} disabled={this.state.processing}>{this.state.processing ? "Processing" : "Yes, Confirm"}</Button>
            </Stack>
          </DialogActions>
        </Dialog>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.advanceDialoge}
          onClose={this.handleAdvanceClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            Advance / Repayment
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <Grid item xs={12} md={8}>
                  <FormControl>
                    <RadioGroup
                      row
                      value={advanceForm.payment_type}
                      name="payment_type"
                      onChange={(e) => this.handleAdvanceForm(e)}
                    >
                      <FormControlLabel value="advance" control={<Radio />} label="Advance" />
                      <FormControlLabel value="repayment" control={<Radio />} label="Repayment" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  {
                    advanceForm.payment_type == "repayment" && this.state.employe_advance !== 0 ?
                      <>
                        <p>Advance: <b>{this.state.employe_advance}</b></p>
                      </>
                      : null
                  }
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={advanceFormErrors.user_id}>
                    <InputLabel>Employee</InputLabel>
                    <Select
                      className='input-inner'
                      value={advanceForm.user_id}
                      fullWidth
                      label="Employee"
                      name="user_id"
                      onChange={(e) => this.handleAdvanceForm(e)}
                    >
                      <MenuItem value=""></MenuItem>
                      {
                        employees.map((item, index) => (
                          <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={advanceForm.amount}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    onChange={(e) => this.handleAdvanceForm(e)}
                    error={advanceFormErrors.amount}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Mode</InputLabel>
                    <Select
                      className='input-inner'
                      value={advanceForm.payment_mode}
                      fullWidth
                      label="Payment Mode"
                      name="payment_mode"
                      onChange={(e) => this.handleAdvanceForm(e)}
                    >
                      {
                        payment_modes_list.map((item, key) => (
                          <MenuItem value={item.value} key={key}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                {
                  advanceForm.payment_mode == "cheque" ?
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Cheque No"
                        variant="outlined"
                        fullWidth
                        value={advanceForm.cheque_no}
                        name="cheque_no"
                        onChange={(e) => this.handleAdvanceForm(e)}
                      />
                    </Grid>
                    : null
                }

              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={this.handleAdvanceClose}>Cancel</Button>
              <Button variant="contained" type="button" onClick={this.handleAdvancePayConfirm} disabled={this.state.processing}>{this.state.processing ? "Processing" : "Yes, Confirm"}</Button>
            </Stack>
          </DialogActions>
        </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SalaryPage)));
