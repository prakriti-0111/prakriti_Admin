import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, IconButton, CircularProgress } from '@mui/material';
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
import { reportChargeFetch, reportChargeUpdate } from 'actions/superadmin/reportCharge.actions';
import ReportChargeForm from 'forms/SuperAdmin/ReportChargeForm';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';
import {
  GET_REPORT_CHARGE,
  UPDATE_REPORT_CHARGE
} from '../../../actionTypes/superadmin/reportCharge.types';
import ClearIcon from '@mui/icons-material/Clear';

class ReportChargePage extends Component {

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
      editSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }

    /* this.columns = [
      {
        name: 'amount',
        display_name: 'Amount'
      },
      {
        name: 'tax',
        display_name: 'Tax(%)'
      },
    ]; */
    
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

    if('editSuccess' in props && props.editSuccess !== state.editSuccess){
      update.editSuccess = props.editSuccess;
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
    this.props.actions.reportChargeFetch(this.state.queryParams);
  }

  handleEdit = (row) => { 
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: 'Edit Purity'
    })
  }

  /* handleDelete = (row) => {
    this.props.actions.purityDelete(row.id);

  } */

  /* handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Purity',
      editRow: null
    })
  } */

  /* handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      openDialog: false,
      editRow: null
    })
  } */

  submit = (data) => { 
    //if(this.state.editRow){ 
      this.props.actions.reportChargeUpdate(this.state.editRow?this.state.editRow.id:"1", data);
    /* }else{
      this.props.actions.purityCreate(data);
    } */
  }

  componentDidUpdate(){ 
   if(this.state.actionCalled){ 

    if(this.state.editSuccess == true){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: UPDATE_REPORT_CHARGE,
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
        //this.loadListData()
      })
    } 
    else if(this.state.errorMessage != null){ 
      this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
    }
   }
  }

  handleCancel = () => {
    //this.handleDialogClose();
  }

  /* handleSearchChange = (value, key) => {
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
  } */

  render() {
    console.log(this.state.items.length > 0?this.state.items[0]:"");
    return (
      <MainCard title="Report Charge"  >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            {/* <Grid item xs={3} className='create-input'>
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
            </Grid> */}
          </Grid>
        </Box>
        
        <Grid container spacing={gridSpacing} className="abc" >
          {this.state.items.length > 0 ? <ReportChargeForm onSubmit={this.submit} formData={this.state.items.length > 0?this.state.items[0]:""} handleCancel={this.handleCancel} /> : <><Grid container justifyContent='center'>
                      <CircularProgress size='30px' />
                    </Grid></>}
        </Grid> 
        {/* <Grid container spacing={gridSpacing} className="abc">
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
                show: hasPermission(this.state.permissions, 'purity', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'purity', 'edit')
              }
            ]}
          />
        </Grid> */}

        {/* <Dialog
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
            <ReportChargeForm onSubmit={this.submit} formData={this.state.editRow} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog> */}

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.reportCharge.items,
  total: state.superadmin.reportCharge.total,
  actionCalled: state.superadmin.reportCharge.actionCalled,
  editSuccess: state.superadmin.reportCharge.editSuccess,
  successMessage: state.superadmin.reportCharge.successMessage,
  errorMessage: state.superadmin.reportCharge.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({reportChargeFetch, reportChargeUpdate}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportChargePage)));
