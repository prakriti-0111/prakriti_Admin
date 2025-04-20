import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, IconButton, Select, MenuItem, InputLabel  } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { holidayCreate, holidayUpdate, holidayList, holidayDelete } from 'actions/superadmin/holiday.actions';
import HolidayForm from 'forms/SuperAdmin/HolidayForm';
import { withSnackbar } from 'notistack';
import {RESET_HOLIDAY} from '../../../actionTypes/superadmin/holiday.types';
import {isEmpty, hasPermission} from 'src/helpers/helper';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';

class HolidayPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: '',
        year: moment().format("YYYY")
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }
    this.columns = [
      {
        name: 'date_display',
        display_name: 'Date'
      },
      {
        name: 'name',
        display_name: 'Name'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
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
    this.props.actions.holidayList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit Holiday'
    })
  }

  handleDelete = (row) => {
    this.props.actions.holidayDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Holiday',
      editRow: null
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
      editRow: null
    })
  }

  submit = async(data) => {
    if (this.state.editRow) {
      this.props.actions.holidayUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.holidayCreate(data);
    }
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_HOLIDAY});
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null
        }, () => {
          this.loadListData()
        })
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_HOLIDAY});
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            page: 1
          },
          openDialog: false,
          editRow: null
        }, () => {
          this.loadListData()
        })
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_HOLIDAY});
        this.handlePagination(1);
      }
      else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
        this.props.dispatch({type: RESET_HOLIDAY});
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
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

  getYears = () => {
    let years = [];
    for(let i = 2022; i <= moment().format("YYYY"); i++){
      years.push(i);
    }
    return years;
  }

  render() {

    return (
      <MainCard title="Holidays" secondary={hasPermission(this.state.permissions, 'holidays', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={12} md={3} className='create-input'>
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
                    this.getYears().map((item, index) => (
                      <MenuItem value={item} key={index}>{item}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
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
            actions={[
              {
                label: 'Edit',
                onClick: this.handleEdit,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'holidays', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'holidays', 'delete')
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
              <HolidayForm onSubmit={this.submit} formData={this.state.editRow} handleCancel={this.handleCancel} />
            </DialogContent>
          </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.holiday.items,
  total: state.superadmin.holiday.total,
  actionCalled: state.superadmin.holiday.actionCalled,
  createSuccess: state.superadmin.holiday.createSuccess,
  editSuccess: state.superadmin.holiday.editSuccess,
  deleteSuccess: state.superadmin.holiday.deleteSuccess,
  successMessage: state.superadmin.holiday.successMessage,
  errorMessage: state.superadmin.holiday.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ holidayList, holidayCreate, holidayUpdate, holidayDelete, holidayList }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(HolidayPage)));
