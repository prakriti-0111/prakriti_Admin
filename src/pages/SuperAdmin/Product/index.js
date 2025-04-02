import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Select, CssBaseline, InputLabel, Box, FormControl, MenuItem, TextField, Grid, Button } from '@mui/material';
import LoginForm from 'forms/SuperAdmin/LoginForm';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { productList, productCreate, productStore, productView, productUpdate, productDelete } from 'actions/superadmin/product.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import DataTable from 'src/utils/DataTable';
import {RESET_PRODUCT} from '../../../actionTypes/superadmin/product.types';
import { categoryList } from 'actions/superadmin/category.actions';
import { materialList } from 'actions/superadmin/material.actions';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';
import { isEmpty } from 'lodash';

class ProductPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      categories: this.props.categories,
      materials: this.props.materialList,
      sub_categories: this.props.sub_categories,
      permissions: this.props.permissions,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        material_id:'',
        search: '',
        all: 0
      }
    }

    this.columns = [
      {
        name: 'default_image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Product Name'
      },
      {
        name: 'materials',
        display_name: 'Material',
        array_key: 'name',
        raw: true
      },
      {
        name: 'total_weight_display',
        display_name: 'Weight'
      },
      {
        name: 'mrp_display',
        display_name: 'Tag Price'
      },
      /*{
        name: 'type_diplay',
        display_name: 'Product Type'
      },
      {
        name: 'display_size',
        display_name: 'Size'
      },*/
      
    ];
    
  }

  componentDidMount(){
    
    this.loadListData();
    this.props.categoryList({all: 1});
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
    
    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    if(props.errorMessage !== state.errorMessage){
      update.errorMessage = props.errorMessage;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.materials !== state.materials) {
      update.materials = props.materials;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = () => {
    this.props.productList(this.state.queryParams);
  }

  handlePagination = (page, all) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page,
        all: all ? 1 : 0
      }
    }, () => {
      this.loadListData();
    })
    
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.productDelete(row.id);
  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.subCategoryList({ all: 1, category_id: val });
    if(val){
      this.props.materialList({all: 1, category_id: val});
    }else{
      this.setState({
        materials:[],
        sub_categories:[]
      })
    }
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: val
      }
    })
  }

  handleSubCategoryChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        sub_category_id: event.target.value
      }
    })
  }
  handleMaterialChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        material_id: event.target.value
      }
    })
  }
  handleSearchChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        search: event.target.value
      }
    })
  }

   handleSearch = () => {
    this.loadListData();
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: RESET_PRODUCT
      });
      this.handlePagination(1);
    }else if(!isEmpty(this.state.errorMessage)){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
      dispatch({
        type: RESET_PRODUCT
      });
    }
  }

  render() {
    
    return (
      <MainCard title="Products" secondary={hasPermission(this.state.permissions, 'products', 'add') ? (<Button variant="contained" onClick={() => this.props.navigate('create')}>Add</Button>) : null} >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view'>
              <Grid item xs={12} md={2} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={this.state.queryParams.category_id}
                    label="Category"
                    onChange={this.handleCategoryChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.categories.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    value={this.state.queryParams.sub_category_id}
                    label="Sub Category"
                    onChange={this.handleSubCategoryChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.sub_categories.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Material</InputLabel>
                  <Select
                    value={this.state.queryParams.material_id}
                    label="Material"
                    onChange={this.handleMaterialChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.materials.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} className='create-input'>
                <FormControl fullWidth>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                  />
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
                show: hasPermission(this.state.permissions, 'products', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'products', 'delete')
              }
            ]}
            haveAllOption={true}
            stickyHeader={true}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.product.items,
  total: state.superadmin.product.total,
  actionCalled: state.superadmin.product.actionCalled,
  deleteSuccess: state.superadmin.product.deleteSuccess,
  errorMessage: state.superadmin.product.errorMessage,
  successMessage: state.superadmin.product.successMessage,
  categories: state.superadmin.category.items,
  materials: state.superadmin.material.items,
  sub_categories: state.superadmin.subCategory.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
      productList,
      productCreate,
      productStore,
      productView,
      productUpdate,
      productDelete,
      subCategoryList,
      categoryList,
      subCategoryList,
      materialList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage)));
