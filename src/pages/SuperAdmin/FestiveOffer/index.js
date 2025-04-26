import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Select, CssBaseline, InputLabel, Box, FormControl, MenuItem, TextField, Grid, Button } from '@mui/material';

import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { festiveofferList, festiveofferCreate, festiveofferStore, festiveofferView, festiveofferUpdate, festiveofferDelete } from 'actions/superadmin/festiveoffer.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import DataTable from 'src/utils/DataTable';
import {RESET_FESTIVEOFFER} from '../../../actionTypes/superadmin/festiveoffer.types';
import { categoryList } from 'actions/superadmin/category.actions';
import { withSnackbar } from 'notistack';
import {hasPermission} from 'src/helpers/helper';

class FestiveOfferPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      permissions: this.props.permissions,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        search: ''
      }
    }

    this.columns = [
      {
        name: 'banner',
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
        name: 'category_name',
        display_name: 'Category Name'
      },
      {
        name: 'sub_category_name',
        display_name: 'Sub Category Name'
      },
      {
        name: 'display_products',
        display_name: 'Products'
      },
      {
        name: 'discount_display',
        display_name: 'Discount'
      },
      {
        name: 'code',
        display_name: 'Code'
      }
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
    if (props.categories !== state.categories) {
      update.categories = props.categories;
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
    this.props.festiveofferList(this.state.queryParams);
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
    this.props.festiveofferDelete(row.id);
  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.subCategoryList({ all: 1, category_id: val });
    if(val){

    }else{
      this.setState({
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
        type: RESET_FESTIVEOFFER
      });
      this.handlePagination(1);
    }
  }

  render() {
    
    return (
      <MainCard title="Festive Offer Banners" secondary={hasPermission(this.state.permissions, 'festiveoffers', 'add') ? (<Button variant="contained" onClick={() => this.props.navigate('create')}>Add</Button>) : null} >
        {/*<Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
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
              <Grid item xs={3} className='create-input'>
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
              <Grid item xs={3} className='create-input'>
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
        </Box>*/}
        <Grid container spacing={gridSpacing}>
          <DataTable
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={ [
              {
                label: 'Edit',
                onClick: this.handleEdit,
                color: 'primary',
                show: hasPermission(this.state.permissions, 'festiveoffers', 'edit')
              },
              {
                label: 'Delete',
                onClick: this.handleDelete,
                isDelete: true,
                color: 'error',
                show: hasPermission(this.state.permissions, 'festiveoffers', 'delete')
              }
            ]}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.festiveoffer.items,
  total: state.superadmin.festiveoffer.total,
  actionCalled: state.superadmin.festiveoffer.actionCalled,
  deleteSuccess: state.superadmin.festiveoffer.deleteSuccess,
  successMessage: state.superadmin.festiveoffer.successMessage,
  categories: state.superadmin.category.items,
  sub_categories: state.superadmin.subCategory.items,
  permissions: state.employee.permissions.permissions
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
      festiveofferList,
      festiveofferCreate,
      festiveofferStore,
      festiveofferView,
      festiveofferUpdate,
      festiveofferDelete,
      subCategoryList,
      categoryList,
      subCategoryList,
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(FestiveOfferPage)));
