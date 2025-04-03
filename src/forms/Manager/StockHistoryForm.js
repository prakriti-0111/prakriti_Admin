import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ToggleButtonGroup, ToggleButton, FormLabel, ImageList, ImageListItem, InputAdornment, IconButton, Autocomplete  } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import {convertToFormData, toBase64, getValuesFromKey, isEmpty} from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { stockHistoryCreate, stockHistoryUpdate, stockHistoryMaterials} from 'actions/manager/stockHistory.actions';
import { employeeList } from 'actions/superadmin/employee.actions';
import DeleteIcon from '@mui/icons-material/Delete';
import { withSnackbar } from 'notistack';
const { updateSyncErrors } = require('redux-form/lib/actions').default;
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import MainCard from 'ui-component/cards/MainCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Table, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import {RESET_STOCK_HISTORY, RESET_STOCK_HISTORY_MATERIALS} from '../../actionTypes/manager/stockHistory.types';
import moment from 'moment';
import { categoryList } from 'actions/superadmin/category.actions';


const validate = values => {
  const errors = {}
  const requiredFields = [
    // 'name'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  
  return errors
}

class StockHistoryForm extends React.Component {

  constructor(props) {
    super(props);

    let formData = 'formData' in this.props ? this.props.formData : null;
    this.state = {
      formData: formData,
      isCreateFrom: !formData,
      workers: this.props.workers,
      materials: this.props.materials,
      categoryList: this.props.categoryList,
      formValues: {
        user_id : "",
        date: moment().format('MM/DD/YYYY'),
        materials: []
      },
      formErros: {
        user_id: false,
        date: false,
      },
      materialDialog: false,
      deleteDialogOpen: false,
      deletingIndex: 0,
      submitting: false,
      ...this.getResetMaterial(),

      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      editSuccess: this.props.editSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    }
  }

  componentDidMount(){
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.employeeList({all: 1, role_id: 10});
    this.props.actions.stockHistoryMaterials();

    this.initializeFormData();
  }

  initializeFormData = () => {
    if(this.state.formData){
      let formData = this.state.formData;
      let formValues = {
        user_id: formData.to_user_id,
        date: formData.editable_date,
        materials: formData.materials
      }
      this.setState({
        formValues: formValues
      })
      
    }
  }

  getResetMaterial = () => {
    return {
      materialFormValues: {
        id: 0,
        category_id: "",
        material_id: "",
        material_name: "",
        weight: '',
        quantity: '',
        unit_name: "",
        unit_id: ""
      },
      materialFormErrors: {
        category_id: false,
        material_id: false,
        weight: false,
        quantity: false,
      }
    }
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.formData !== state.formData){
      update.formData = props.formData;
    }
    if(props.workers !== state.workers){
      update.workers = props.workers;
    }
    if(props.materials !== state.materials){
      update.materials = props.materials;
    }
    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if(props.createSuccess !== state.createSuccess){
        update.createSuccess = props.createSuccess;
    }
    if(props.editSuccess !== state.editSuccess){
        update.editSuccess = props.editSuccess;
    }
    if(props.successMessage !== state.successMessage){
        update.successMessage = props.successMessage;
    }
    if(props.errorMessage !== state.errorMessage){
        update.errorMessage = props.errorMessage;
    }
    if (props.categoryList !== state.categoryList) {
      update.categoryList = props.categoryList;
    }

    return update;
  }

  handleWorkerChange = (event) => {
    this.updateFormValues(event.target.value, 'user_id');
  }

  updateFormValues = (val, key) => {
    let formValues = this.state.formValues;
    formValues[key] = val;
    this.setState({
      formValues: formValues
    })
  }

  handleCategoryChange = (event) => {
    this.handleMaterialFormChange(event, 'category_id');
    this.handleMaterialFormChange({target: {value: ""}}, 'material_id');
    this.props.actions.stockHistoryMaterials({category_id: event.target.value});
  }

  handleMaterialFormChange = (event, key) => {
    let materialFormValues = this.state.materialFormValues;
    materialFormValues[key] = event.target.value;
    this.setState({
      materialFormValues: materialFormValues
    });

    if(key == "material_id" && event.target.value){
      let m = _.filter(this.state.materials, {id: event.target.value});
      materialFormValues.material_name = m[0].name;
      materialFormValues.unit_id = m[0].unit_id;
      materialFormValues.unit_name = m[0].unit;
      this.setState({
        materialFormValues: materialFormValues
      });
    }
  }

  handleAddNewMaterial = () => {
    this.setState({
      materialDialog: true,
      ...this.getResetMaterial()
    })
  }

  handleMaterialDelete = (index) => {
    this.setState({
      deletingIndex: index,
      deleteDialogOpen: true
    });
  }

  handleDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      deleteDialogOpen: false
    })
  }

  handleDeleteConfirm = () => {
    let formValues = this.state.formValues;
    formValues.materials.splice(this.state.deletingIndex, 1);
    this.setState({
      formValues: formValues,
      deleteDialogOpen: false
    })
  }

  handleMaterialDialogClose = (event, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      materialDialog: false
    })
  }

  handleMaterialSubmit = () => {
    let hasErr = this.materialFormValidate();
    if(!hasErr){
        let formValues = this.state.formValues;
        formValues.materials.push(this.state.materialFormValues);
        this.setState({
            formValues: formValues,
            materialDialog: false
        })
    }
  }

  materialFormValidate = () => {
    let materialFormValues = this.state.materialFormValues;
    let materialFormErrors = this.state.materialFormErrors;
    let hasErr = false;
    if(isEmpty(materialFormValues.material_id)){
      materialFormErrors.material_id = true;
      hasErr = true;
    }else{
      materialFormErrors.material_id = false;
    }

    if(isEmpty(materialFormValues.weight)){
      materialFormErrors.weight = true;
      hasErr = true;
    }else{
      materialFormErrors.weight = false;
    }

    /*if(isEmpty(materialFormValues.quantity)){
      materialFormErrors.quantity = true;
      hasErr = true;
    }else{
      materialFormErrors.quantity = false;
    }*/
    this.setState({
      materialFormErrors: materialFormErrors
    })
    return hasErr;
  }

  handleSubmit = () => {
    let hasErr = this.formValidate();
    if(!hasErr){
      this.setState({
        submitting: true
      })
      if(this.state.isCreateFrom){
          this.props.actions.stockHistoryCreate(this.state.formValues);
      }else{
          this.props.actions.stockHistoryUpdate(this.state.formData.id, this.state.formValues);
      }
    }
  }

  formValidate = () => {
    let formValues = this.state.formValues;
    let formErros = this.state.formErros;
    let hasErr = false;
    if(isEmpty(formValues.user_id)){
      formErros.user_id = true;
      hasErr = true;
    }else{
      formErros.user_id = false;
    }

    if(isEmpty(formValues.date)){
      formErros.date = true;
      hasErr = true;
    }else{
      formErros.date = false;
    }

    if(formValues.materials.length == 0){
      this.props.enqueueSnackbar('Please add at least one material', {variant: 'error'});
      hasErr = true;
    }

    this.setState({
      formErros: formErros
    })

    return hasErr;
  }

  componentDidUpdate(prevProps){
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }
    if(this.state.actionCalled){
        if(this.state.isCreateFrom){
            if(this.state.createSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.props.dispatch({
                    type: RESET_STOCK_HISTORY
                });
                this.props.navigate('/employee/stock-histories');
            }else{
                this.setState({
                    submitting: false
                })
                this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                this.props.dispatch({
                    type: RESET_STOCK_HISTORY
                });
            }
        }else{
            if(this.state.editSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.props.dispatch({
                    type: RESET_STOCK_HISTORY
                });
                this.props.navigate('/employee/stock-histories');
            }else{
                this.setState({
                    submitting: false
                })
                this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                this.props.dispatch({
                    type: RESET_STOCK_HISTORY
                });
            }
        }
    }
  }


  render() {
    const { formValues, materialFormValues, formErros, materialFormErrors } = this.state;
    return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
              <Grid item xs={6} className='create-input'>
                <FormControl fullWidth error={formErros.user_id}>
                  <InputLabel>Worker</InputLabel>
                  <Select
                      value={formValues.user_id}
                      fullWidth
                      label="Supplier"
                      className='input-inner'
                      onChange={this.handleWorkerChange}
                  >
                      <MenuItem value=""></MenuItem>
                      {
                          this.state.workers.map((item, index) => {
                              return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                          })
                      }
                  </Select>
                    
                </FormControl>
              </Grid>
              <Grid item xs={6} className='create-input'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Date"
                      value={formValues.date}
                      inputFormat="DD/MM/YYYY"
                      onChange={(newValue) => this.updateFormValues(newValue, 'date')}
                      renderInput={(params) => <TextField {...params} fullWidth error={formErros.date} />}
                  />
                </LocalizationProvider>
              </Grid>
              </Grid>
              <Grid container spacing={2} className='tax-input loans_view'>
              <Grid item xs={12} className='p-add-product create-input'>
                <h3 className='p_heading_list'>Material List <Button variant="contained"  className='add-button' onClick={() => this.handleAddNewMaterial() }>Add Material</Button></h3>
                <TableContainer component={Paper} className='ratn-table-wrapper'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className='ratn-table-header p_view'>
                            <TableRow>
                                <TableCell>Material Name</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                formValues.materials.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.material_name}</TableCell>
                                        <TableCell>{item.weight ? (item.weight + ' ' + item.unit_name) : ''}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <IconButton color="error" component="label" onClick={() => this.handleMaterialDelete(index)}>
                                            <span className='del-hr-icon'>
                                                <DeleteIcon />
                                                </span>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end" style={{paddingRight : '16px', paddingBottom : '16px'}}>
                <Button variant="contained" className='conf-button' type="button" onClick={this.handleSubmit}>Save</Button>
                <Button variant="outlined"  className='close-button' onClick={() => this.props.navigate('/employee/stock-histories') }>Cancel</Button>
              </Stack>
            </Grid>
          </Grid>

          <Dialog
              open={this.state.materialDialog}
              onClose={this.handleMaterialDialogClose}
              fullWidth
              maxWidth="md"
              className="ratn-dialog-wrapper"
              >
              <DialogTitle>
                  Add Material
              </DialogTitle>
              <DialogContent>
                  <DialogContentText></DialogContentText>
                  <Box sx={{ flexGrow: 1, m: 0.5 }}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <FormControl fullWidth error={materialFormErrors.category_id}>
                              <InputLabel>Category</InputLabel>
                              <Select
                                value={materialFormValues.category_id}
                                label="Category"
                                onChange={this.handleCategoryChange}
                                defaultValue=""
                              >
                                <MenuItem value=""></MenuItem>
                                {
                                  this.state.categoryList.map((item, index) => (
                                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                  ))
                                }
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4} className='create-input'>
                            {/*<FormControl fullWidth error={materialFormErrors.material_id}>
                                <InputLabel>Material</InputLabel>
                                <Select
                                  value={materialFormValues.material_id}
                                  label="Material"
                                  onChange={(event) => this.handleMaterialFormChange(event, 'material_id')}
                                  defaultValue=""
                                >
                                  <MenuItem value=""></MenuItem>
                                  {
                                    this.state.materials.map((item, index) => (
                                      <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>*/}
                              <Autocomplete
                                className='autocomplete-selectbox'
                                fullWidth
                                options={this.state.materials}
                                autoHighlight
                                getOptionLabel={(option) => (option.name)}
                                renderOption={(props, option) => <li {...props} key={option.id}>{option.name}</li>}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Material"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password'
                                    }}
                                    fullWidth
                                    error={materialFormErrors.material_id}
                                  />
                                )}
                                onChange={(event, newValue) => {
                                  this.handleMaterialFormChange({target: {value: newValue ? newValue.id : ''}}, 'material_id')
                                }}
                              />
                          </Grid>
                          <Grid item xs={6} md={2} className='create-input'>
                            <TextField  
                              label="Weight" 
                              variant="outlined"
                              fullWidth
                              value={materialFormValues.weight}
                              onChange={(event) => this.handleMaterialFormChange(event, 'weight')}
                              error={materialFormErrors.weight}
                              InputProps={{
                                endAdornment: <InputAdornment position="start">{materialFormValues.unit_name}</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item xs={6} md={2} className='create-input'>
                            <TextField  
                              label="Quantity" 
                              variant="outlined"
                              fullWidth
                              value={materialFormValues.quantity}
                              onChange={(event) => this.handleMaterialFormChange(event, 'quantity')}
                              error={materialFormErrors.quantity}
                            />
                          </Grid>
                          <Grid item xs={12} className='create-input'>
                            <Stack spacing={1} direction="row" justifyContent="flex-end">
                              <Button variant="contained" type="button" onClick={this.handleMaterialSubmit}>Add</Button>
                              <Button variant="outlined" onClick={this.handleMaterialDialogClose}>Cancel</Button>
                            </Stack>
                          </Grid>
                      </Grid>
                  </Box>
              </DialogContent>
          </Dialog>

          <Dialog
            open={this.state.deleteDialogOpen}
            onClose={this.handleDialogClose}
            fullWidth
            maxWidth="xs"
            className="ratn-dialog-wrapper"
            >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Are you sure want to delete this record?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" onClick={this.handleDialogClose}>Close</Button>
                    <Button variant="contained" type="button" onClick={this.handleDeleteConfirm}>Yes, Confirm</Button>
                </Stack>
            </DialogActions>
        </Dialog>
      </Box>
    )

  }

}

const mapStateToProps = (state) => ({
  workers: state.superadmin.employee.items,
  materials: state.manager.stockHistory.materials,
  actionCalled: state.manager.stockHistory.actionCalled,
  createSuccess: state.manager.stockHistory.createSuccess,
  editSuccess: state.manager.stockHistory.editSuccess,
  successMessage: state.manager.stockHistory.successMessage,
  errorMessage: state.manager.stockHistory.errorMessage,
  categoryList: state.superadmin.category.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    stockHistoryCreate,
    stockHistoryUpdate,
    employeeList,
    stockHistoryMaterials,
    categoryList
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
form: 'StockHistoryForm'
})(StockHistoryForm))));
