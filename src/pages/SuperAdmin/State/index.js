import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { stateList, stateDelete, } from 'actions/superadmin/state.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { stateCreate, stateUpdate } from 'actions/superadmin/state.actions';
import StateForm from 'forms/SuperAdmin/StateForm';
import { countryList } from 'actions/superadmin/country.actions';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';
import {
  ADD_STATE,
  UPDATE_STATE,
  DELETE_STATE,
} from '../../../actionTypes/superadmin/state.types';
import ClearIcon from '@mui/icons-material/Clear';

class StatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: '',
        country_id: ''
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      countries: this.props.countries,
      states: this.props.states,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'State'
      },
      {
        name: 'country',
        display_name: 'Country'
      }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.countryList({all: 1});
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }

    if(props.countries !== state.countries){
      update.countries = props.countries;
    }

    if(props.states !== state.states){
      update.states = props.states;
    }

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    
    if(props.errorMessage !== state.errorMessage){
      update.errorMessage = props.errorMessage;
    }

    if('createSuccess' in props && props.createSuccess !== state.createSuccess){
      update.createSuccess = props.createSuccess;
    }

    if('editSuccess' in props && props.editSuccess !== state.editSuccess){
      update.editSuccess = props.editSuccess;
    }

    if('deleteSuccess' in props && props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.permissions !== state.permissions){
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
    this.props.actions.stateList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit State'
    })
  }

  handleDelete = (row) => {
    this.props.actions.stateDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create State',
      editRow: null
    })
  }

  handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      openDialog: false,
      editRow: null
    })
  }

  submit = (data) => {
    if(this.state.editRow){
      this.props.actions.stateUpdate(this.state.editRow.id, data);
    }else{
      this.props.actions.stateCreate(data);
    }
  }

  componentDidUpdate(){
  if(this.state.actionCalled){  
    if(this.state.createSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: ADD_STATE,
        payload: false
      });
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
    }else if(this.state.editSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: UPDATE_STATE,
        payload: false
      });
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
    } else if(this.state.deleteSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: DELETE_STATE,
        payload: false
      });
      this.handlePagination(1);
    }
    else if(this.state.errorMessage != null){ 
      this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
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
      <MainCard title="States" secondary={hasPermission(this.state.permissions, 'state', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={5} className='create-input'>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={this.state.queryParams.country_id}
                  label="Country"
                  onChange={(e) => this.handleSearchChange(e.target.value, 'country_id')}
                  className='input-inner'
                  defaultValue=""
                >
                  <MenuItem value="">All</MenuItem>
                  {
                    this.state.countries.map((item, index) => (
                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5} className='create-input'>
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
            <Grid item xs={2} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing} className="abc">
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
                show: hasPermission(this.state.permissions, 'state', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'state', 'delete')
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
            <StateForm onSubmit={this.submit} formData={this.state.editRow} countries={this.state.countries} states={this.state.states} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.countryState.items,
  total: state.superadmin.countryState.total,
  countries: state.superadmin.country.items || [],
  states: state.superadmin.countryState.items || [],
  actionCalled: state.superadmin.countryState.actionCalled,
  createSuccess: state.superadmin.countryState.createSuccess,
  editSuccess: state.superadmin.countryState.editSuccess,
  deleteSuccess: state.superadmin.countryState.deleteSuccess,
  successMessage: state.superadmin.countryState.successMessage,
  errorMessage: state.superadmin.countryState.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({stateList, stateCreate, stateUpdate, stateDelete, countryList}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(StatePage)));
