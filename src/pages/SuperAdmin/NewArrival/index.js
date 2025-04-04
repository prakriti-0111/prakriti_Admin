import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, IconButton  } from '@mui/material';
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
import { newArrivalCreate, newArrivalUpdate, newArrivalList, newArrivalDelete } from 'actions/superadmin/new_arrival.actions';
import NewArrivalForm from 'forms/SuperAdmin/NewArrivalForm';
import { withSnackbar } from 'notistack';
import {
  ADD_NEW_ARRIVAL,
  UPDATE_NEW_ARRIVAL,
  DELETE_NEW_ARRIVAL,
  RESET_NEW_ARRIVAL
} from '../../../actionTypes/superadmin/newArrival.types';
import {isEmpty, toBase64, hasPermission} from 'src/helpers/helper';
import ClearIcon from '@mui/icons-material/Clear';

class NewArrivalPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: ''
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
        name: 'image',
        display_name: 'Banner',
        isImage: true,
        className: 'banner_img',
        isBanner: true
      },
      {
        name: 'title',
        display_name: 'Title'
      },
      {
        name: 'url',
        display_name: 'Url'
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
    this.props.actions.newArrivalList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit Banner'
    })
  }

  handleDelete = (row) => {
    this.props.actions.newArrivalDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Banner',
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
    let fromdata = {...data};
    if(!isEmpty(data.imageFile)){
      data.image = await toBase64(data.imageFile);
    }else{
      data.image = '';
    }
    if (this.state.editRow) {
      this.props.actions.newArrivalUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.newArrivalCreate(data);
    }
  }

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
        this.props.dispatch({type: RESET_NEW_ARRIVAL});
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
        this.props.dispatch({type: RESET_NEW_ARRIVAL});
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
        this.props.dispatch({type: RESET_NEW_ARRIVAL});
        this.handlePagination(1);
      }
      else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
        this.props.dispatch({type: RESET_NEW_ARRIVAL});
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

  render() {

    return (
      <MainCard title="New Arrivals" secondary={hasPermission(this.state.permissions, 'new-arrivals', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
        {/*<Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={3} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                  InputProps={{
                    endAdornment: (
                    <IconButton
                      sx={{ visibility: this.state.queryParams.search ? "visible" : "hidden" }}
                      onClick={(e) => this.handleSearchChange('', 'search')}
                    >
                      <ClearIcon />
                    </IconButton>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>*/}
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
                show: hasPermission(this.state.permissions, 'new-arrivals', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'new-arrivals', 'delete')
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
              <NewArrivalForm onSubmit={this.submit} formData={this.state.editRow} handleCancel={this.handleCancel} />
            </DialogContent>
          </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.newArrival.items,
  total: state.superadmin.newArrival.total,
  actionCalled: state.superadmin.newArrival.actionCalled,
  createSuccess: state.superadmin.newArrival.createSuccess,
  editSuccess: state.superadmin.newArrival.editSuccess,
  deleteSuccess: state.superadmin.newArrival.deleteSuccess,
  successMessage: state.superadmin.newArrival.successMessage,
  errorMessage: state.superadmin.newArrival.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ newArrivalList, newArrivalCreate, newArrivalUpdate, newArrivalDelete, newArrivalList }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArrivalPage)));
