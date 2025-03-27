import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Select, Stack, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Grid, Button, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { stocksList, getPriceByCategory } from 'actions/distributor/stocks.actions';
import { subCategoryList } from 'actions/distributor/subCategory.actions';
import { saleCartStore, saleCartList } from 'actions/distributor/saleCart.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupIcon from '@mui/icons-material/Group';
import {DISTRIBUTOR_SALE_CART_RESET} from '../../actionTypes/distributor/saleCart.types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { categoryList } from 'actions/distributor/category.actions';
import { displayAmount } from 'src/helpers/helper';

class StockPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        search: ''
      },
      cart_actionCalled: this.props.cart_actionCalled,
      cart_createSuccess: this.props.cart_createSuccess,
      cart_deleteSuccess: this.props.cart_deleteSuccess,
      cart_successMessage: this.props.cart_successMessage,
      cart_errorMessage: this.props.cart_errorMessage,
      cartDialog: false,
      quantity: '',
      quantity_error: false,
      cart_stock: null,
      categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      price_by_categories: []
    }

    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Product Name'
      },
      {
        name: 'certificate_no',
        display_name: 'Certificate No'
      },
      {
        name: 'total_weight_display',
        display_name: 'Total Weight'
      },
      {
        name: 'stock_material_display',
        display_name: 'Materials',
        helper_text: 'Name | Weight | Quantity'
      },
      {
        name: 'product_code',
        display_name: 'Product Code'
      },
      {
        name: 'size_name',
        display_name: 'Size Name'
      },
      {
        name: 'mrp_display',
        display_name: 'MRP'
      }
    ];

    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      },
      {
        label: '+',
        onClick: this.handleAddToCart,
        color: 'primary'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({all: 1});

    this.loadPriceByCategory();
  }

  loadPriceByCategory = async() => {
    let res = await getPriceByCategory();
    if(res.data.success){
      this.setState({
        price_by_categories: res.data.data
      })
    }
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

    if (props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }
    if(props.cart_actionCalled !== state.cart_actionCalled){
      update.cart_actionCalled = props.cart_actionCalled;
    }
    if(props.cart_createSuccess !== state.cart_createSuccess){
        update.cart_createSuccess = props.cart_createSuccess;
    }
    if(props.cart_deleteSuccess !== state.cart_deleteSuccess){
        update.cart_deleteSuccess = props.cart_deleteSuccess;
    }
    if(props.cart_successMessage !== state.cart_successMessage){
        update.cart_successMessage = props.cart_successMessage;
    }
    if(props.cart_errorMessage !== state.cart_errorMessage){
        update.cart_errorMessage = props.cart_errorMessage;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }

    return update;
  }

  componentDidUpdate(){
    if(this.state.cart_actionCalled){
      if(this.state.cart_createSuccess){
        this.props.enqueueSnackbar(this.state.cart_successMessage, {variant: 'success'});
        this.props.actions.saleCartList();
      }else if(this.state.cart_errorMessage){
        this.props.enqueueSnackbar(this.state.cart_errorMessage, {variant: 'error'});
      }
      this.setState({
        cartDialog: false
      });
      this.props.dispatch({
          type: DISTRIBUTOR_SALE_CART_RESET
      });
    }
  }

  loadListData = () => {
    this.props.actions.stocksList(this.state.queryParams);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
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

  handleAddToCart = (row) => {
    if(row.type != "material"){
      let materials = [];
      for(let i = 0; i < row.stock_materials.length; i++){
        materials.push({
          material_id: row.stock_materials[i].material_id,
          purity_id: row.stock_materials[i].purity_id,
          weight: row.stock_materials[i].weight,
          unit_id: row.stock_materials[i].unit_id,
          quantity: row.stock_materials[i].quantity,
        })
      }
      let data = {
        stock_id: row.id,
        product_id: row.product_id,
        size_id: row.size_id,
        materials: materials,
        quantity: 1
      }
      this.props.actions.saleCartStore(data);
    }else{
      this.setState({
        cart_stock: row,
        cartDialog: true
      })
    }
  }

  handleMaterialAddToCart = () => {
    let err = false, row = this.state.cart_stock;
    if(!this.state.quantity){
      this.setState({
        quantity_error: true
      })
    }else if(parseInt(this.state.quantity) > parseInt(row.quantity)){
      this.props.enqueueSnackbar("Quantity must be less then from stock quantity.", {variant: 'error'});
    }else{
      let materials = [];
      for(let i = 0; i < row.stock_materials.length; i++){
        let singleQty = parseInt(row.stock_materials[i].quantity) / parseInt(row.quantity);
        materials.push({
          material_id: row.stock_materials[i].material_id,
          purity_id: row.stock_materials[i].purity_id,
          weight: row.stock_materials[i].weight,
          unit_id: row.stock_materials[i].unit_id,
          quantity: singleQty * parseInt(this.state.quantity),
        })
      }
      let data = {
        stock_id: row.id,
        product_id: row.product_id,
        size_id: '',
        materials: materials,
        quantity: this.state.quantity
      }
      this.props.actions.saleCartStore(data);
    }
  }


  handleDialogClose = () => {
    this.setState({
      cartDialog: false
    })
  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.actions.subCategoryList({ all: 1, category_id: val });
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


  render() {

    return (
      <>
        {
          this.state.price_by_categories.length ?
          <Card className='dashboard_card' style={{marginBottom: '16px'}}>
            {
              this.state.price_by_categories.map((item, key) => (
                <CardContent className={`dashboard_card_content bg-color-${(key+1) > 10 ? (key+1-10) : (key+1)}`} sx={{ display: "flex", justifyContent: "space-between" }} key={key}>
                  <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                    <h1>{item.category_name}</h1>
                    <h2>{displayAmount(item.total_amount)}</h2>
                  </Typography>
                  <div className="card-icon">
                    <DiamondIcon />
                  </div>
                </CardContent>
              ))
            }
          </Card>
          : null
        }
        <MainCard title="Stocks" >
          <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view'>
              <Grid item xs={3} className='create-input'>
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
              <Grid item xs={3} className='create-input'>
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
          <Grid container spacing={gridSpacing} className='orders-sale-button'>
            <DataTable
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
            />
          </Grid>
        </MainCard>

        <Dialog
          open={this.state.cartDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="xs"
          className="ratn-dialog-wrapper"
        >
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      label="Quantity"
                      variant="outlined"
                      fullWidth
                      value={this.state.quantity}
                      onChange={(event) => this.setState({quantity: event.target.value})}
                      error={this.state.quantity_error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                    <Button variant="contained" type="button" onClick={this.handleMaterialAddToCart}>Add to Cart</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.distributor.stocks.items,
  total: state.distributor.stocks.total,
  actionCalled: state.distributor.stocks.actionCalled,
  deleteSuccess: state.distributor.stocks.deleteSuccess,
  successMessage: state.distributor.stocks.successMessage,
  cart_actionCalled: state.distributor.saleCart.actionCalled,
  cart_createSuccess: state.distributor.saleCart.createSuccess,
  cart_deleteSuccess:  state.distributor.saleCart.deleteSuccess,
  cart_successMessage: state.distributor.saleCart.successMessage,
  cart_errorMessage: state.distributor.saleCart.errorMessage,
  categories: state.distributor.category.items,
  sub_categories: state.distributor.subCategory.items,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      stocksList,
      subCategoryList,
      saleCartStore,
      saleCartList,
      categoryList,
      subCategoryList,
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(StockPage)));
