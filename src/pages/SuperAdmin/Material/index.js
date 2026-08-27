import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { materialList, materialDelete, materialCreate, materialUpdate } from 'actions/superadmin/material.actions';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MaterialForm from 'forms/SuperAdmin/MaterialForm';
import { categoryList } from 'actions/superadmin/category.actions';
import { unitList } from 'actions/superadmin/unit.actions';
import { purityList } from 'actions/superadmin/purity.actions';
import { withSnackbar } from 'notistack';
import {RESET_MATERIAL} from '../../../actionTypes/superadmin/material.types';
import {hasPermission} from 'src/helpers/helper';

class MaterialPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        search: ''
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      categories: this.props.categories,
      units: this.props.units,
      purities: this.props.purities,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      submitSuccess: false
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Material'
      },
      {
        name: 'category',
        display_name: 'Category'
      },
      {
        name: 'unit',
        display_name: 'Unit'
      },
      {
        name: 'purities',
        display_name: 'Purities',
        array_key: 'name',
        raw: true
      },
      {
        name: 'status_display',
        display_name: 'Status'
      }
    ];
    
  }

  componentDidMount(){
    this.loadListData();
    this.props.actions.categoryList({all: 1});
    this.props.actions.unitList({all: 1});
    this.props.actions.purityList({all: 1});
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

    if(props.categories !== state.categories){
      update.categories = props.categories;
    }

    if(props.units !== state.units){
      update.units = props.units;
    }

    if(props.purities !== state.purities){
      update.purities = props.purities;
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
    this.props.actions.materialList(this.state.queryParams);
  }

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      //openDialog: true,
      //dialogTitle: 'Edit Material'
    })
  }

  handleDelete = (row) => {
    this.props.actions.materialDelete(row.id);

  }

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: 'Create Material',
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
      this.props.actions.materialUpdate(this.state.editRow.id, data);
    }else{
      this.props.actions.materialCreate(data);
    }
  }

  componentDidUpdate(){
   if(this.state.actionCalled){  
    if(this.state.createSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: RESET_MATERIAL
      });
      this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: 1
        },
        openDialog: false,
        editRow: null,
        submitSuccess: true
      }, () => {
        this.loadListData();
        this.setState({
          submitSuccess: false
        })
      })
    }else if(this.state.editSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: RESET_MATERIAL
      });
      this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: 1
        },
        openDialog: false,
        editRow: null,
        submitSuccess: true
      }, () => {
        this.loadListData();
        this.setState({
          submitSuccess: false
        })
      })
    } else if(this.state.deleteSuccess){
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      this.props.dispatch({
        type: RESET_MATERIAL
      });
      this.handlePagination(1);
    }
    else if(this.state.errorMessage != null){ 
      this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
      this.props.dispatch({
        type: RESET_MATERIAL
      });
    }
   }
  }

  handleCancel = () => {
    this.handleDialogClose();
    this.setState({
      submitSuccess: true
    }, () => {
      this.setState({
        submitSuccess: false
      })
    })
  }

  categoryChange = (vl) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1,
        category_id: vl
      }
    }, () => {
      this.loadListData();
    })
  }

  handleMaterialChange = (vl) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1,
        search: vl
      }
    }, () => {
      this.loadListData();
    })
  }

  render() { 
    
    return (
      <MainCard title="Material"  >
        {
          hasPermission(this.state.permissions, 'material', 'add') ?
          <div className='tax-input p_view loans_view'>
            <MaterialForm onSubmit={this.submit} formData={this.state.editRow} categories={this.state.categories} units={this.state.units} purities={this.state.purities} handleCancel={this.handleCancel} categoryChange={this.categoryChange} submitSuccess={this.state.submitSuccess} handleMaterialChange={this.handleMaterialChange} />
          </div>
          : null
        }
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
                show: hasPermission(this.state.permissions, 'material', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'material', 'delete')
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
            <MaterialForm onSubmit={this.submit} formData={this.state.editRow} categories={this.state.categories} units={this.state.units} purities={this.state.purities} handleCancel={this.handleCancel} />
        </DialogContent>
      </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.material.items,
  total: state.superadmin.material.total,
  categories: state.superadmin.category.items || [],
  units: state.superadmin.unit.items || [],
  purities: state.superadmin.purity.items || [],
  actionCalled: state.superadmin.material.actionCalled,
  createSuccess: state.superadmin.material.createSuccess,
  editSuccess: state.superadmin.material.editSuccess,
  deleteSuccess: state.superadmin.material.deleteSuccess,
  successMessage: state.superadmin.material.successMessage,
  errorMessage: state.superadmin.material.errorMessage,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({materialList, materialCreate, materialUpdate, materialDelete, categoryList, unitList, purityList}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialPage)));
