import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, TextField, FormControl, Box, IconButton } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { unitList, unitDelete } from 'actions/superadmin/unit.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { unitCreate, unitUpdate } from 'actions/superadmin/unit.actions';
import UnitForm from 'forms/SuperAdmin/UnitForm';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';
import {
  ADD_UNIT,
  UPDATE_UNIT,
  DELETE_UNIT,
} from '../../../actionTypes/superadmin/unit.types';
import ClearIcon from '@mui/icons-material/Clear';

class UnitPage extends Component {

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
        name: 'name',
        display_name: 'Unit'
      },
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
    this.props.actions.unitList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit Unit'
    })
  }

  handleDelete = (row) => {
    this.props.actions.unitDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Unit',
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
      this.props.actions.unitUpdate(this.state.editRow.id, data);
    }else{
      this.props.actions.unitCreate(data);
    }
  }

  componentDidUpdate(){ 
   if(this.state.actionCalled){  
    if(this.state.createSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: ADD_UNIT,
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
        type: UPDATE_UNIT,
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
        type: DELETE_UNIT,
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
      <MainCard title="Unit" secondary={hasPermission(this.state.permissions, 'unit', 'add') ? <Button variant="contained" onClick={this.handleCreate}>Add</Button> : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
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
                show: hasPermission(this.state.permissions, 'unit', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'unit', 'delete')
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
            <UnitForm onSubmit={this.submit} formData={this.state.editRow} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.unit.items,
  total: state.superadmin.unit.total,
  actionCalled: state.superadmin.unit.actionCalled,
  createSuccess: state.superadmin.unit.createSuccess,
  editSuccess: state.superadmin.unit.editSuccess,
  deleteSuccess: state.superadmin.unit.deleteSuccess,
  successMessage: state.superadmin.unit.successMessage,
  errorMessage: state.superadmin.unit.errorMessage,
  permissions: state.employee.permissions.permissions 
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({unitList, unitCreate, unitUpdate, unitDelete, unitList}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(UnitPage)));
