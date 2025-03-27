import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Select, Stack, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Grid, Button, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { stocksList, getPriceByCategory, getCartItemById } from 'actions/superadmin/stocks.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { cartStore, cartList } from 'actions/superadmin/cart.actions';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupIcon from '@mui/icons-material/Group';
import { SUPERADMIN_CART_RESET } from '../../../actionTypes/superadmin/cart.types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { categoryList } from 'actions/superadmin/category.actions';
import { materialList } from 'actions/superadmin/material.actions';
import { displayAmount } from 'src/helpers/helper';
import { FreeBreakfastOutlined } from '@mui/icons-material';
import { unitList } from 'actions/superadmin/unit.actions';
import { convertUnitToGram, weightFormat } from 'src/helpers/helper';
import _ from 'lodash';

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
        search: '',
        all: 0,
        by_specific: this.props.query.get('by_specific') ?? "",
        own_distributor: this.props.query.get('own_distributor') ?? "",
        own_admin: this.props.query.get('own_admin') ?? "",
        own_se: this.props.query.get('own_se') ?? "",
        total_avl_stock: this.props.query.get('total_avl_stock') ?? "",
        manager: this.props.query.get('manager') ?? "",
      },
      cart_actionCalled: this.props.cart_actionCalled,
      cart_createSuccess: this.props.cart_createSuccess,
      cart_deleteSuccess: this.props.cart_deleteSuccess,
      cart_successMessage: this.props.cart_successMessage,
      cart_errorMessage: this.props.cart_errorMessage,
      cartDialog: false,
      quantity: '',
      unit_id: '',
      weight: '',
      quantity_error: false,
      weight_error: false,
      unit_error: false,
      cart_stock: null,
      categories: this.props.categories,
      materialList: this.props.materialList,
      sub_categories: this.props.sub_categories,
      price_by_categories: [],
      unitList: [],
      //addToCartProcess: false
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
        display_name: 'Certificate No',
        width: '120px'
      },
      {
        name: 'total_weight_display',
        display_name: 'Total Wt.',
        width: '90px'
      },
      {
        name: 'stock_material_display',
        display_name: 'Materials Name',
        width: '165px'
      },
      {
        name: 'purity_display',
        display_name: 'Purity Name',
        width: '165px'
      },
      /*{
        name: 'quantity',
        display_name: 'Qty'
      },*/
      {
        name: 'weight_display',
        display_name: 'Qty'
      },
      {
        name: 'unit_display',
        display_name: 'Unit'
      },
      {
        name: 'product_code',
        display_name: 'P Code'
      },
      {
        name: 'size_name',
        display_name: 'Size'
      },
      {
        name: 'mrp_display',
        display_name: 'Price'
      },
      {
        name:'tax_prize',
        display_name: 'Tax Price'
      },
      {
        name: 'stock_user_name',
        display_name: 'Avl By'
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
        color: 'primary',
        show: this.props.query.get('by_specific') ? false : true,
        conditions: [
          {
            key: "can_add_cart",
            value: true
          }
        ]
      },
      {
        label: 'green_tick',
        onClick: this.handleCartAdded,
        color: 'primary',
        show: this.props.query.get('by_specific') ? false : true,
        conditions: [
          {
            key: "can_add_cart",
            value: false
          }
        ]
      }
    ];

    this.addToCartProcess = false;
  }

  handleCartAdded = (row) => {
    this.props.enqueueSnackbar("Item already in cart! You can not add this item.", { variant: 'error' });
  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.unitList({ all: 1 });

    this.loadPriceByCategory();
  }

  loadPriceByCategory = async () => {
    let res = await getPriceByCategory({
      own_distributor: this.state.queryParams.own_distributor,
      own_admin: this.state.queryParams.own_admin,
      own_se: this.state.queryParams.own_se,
      total_avl_stock: this.state.queryParams.total_avl_stock,
      manager: this.state.queryParams.manager,
    });
    if (res.data.success) {
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
    if (props.cart_actionCalled !== state.cart_actionCalled) {
      update.cart_actionCalled = props.cart_actionCalled;
    }
    if (props.cart_createSuccess !== state.cart_createSuccess) {
      update.cart_createSuccess = props.cart_createSuccess;
    }
    if (props.cart_deleteSuccess !== state.cart_deleteSuccess) {
      update.cart_deleteSuccess = props.cart_deleteSuccess;
    }
    if (props.cart_successMessage !== state.cart_successMessage) {
      update.cart_successMessage = props.cart_successMessage;
    }
    if (props.cart_errorMessage !== state.cart_errorMessage) {
      update.cart_errorMessage = props.cart_errorMessage;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    if (props.unitList !== state.unitList) {
      update.unitList = props.unitList;
    }

    return update;
  }

  componentDidUpdate() {
    if (this.state.cart_actionCalled) {
      if (this.state.cart_createSuccess) {
        this.props.enqueueSnackbar(this.state.cart_successMessage, { variant: 'success' });
        this.setState({
          quantity: '',
          unit_id: '',
          weight: ''
        })
        this.props.actions.cartList();
        this.loadListData();
      } else if (this.state.cart_errorMessage) {
        this.props.enqueueSnackbar(this.state.cart_errorMessage, { variant: 'error' });
      }
      this.setState({
        cartDialog: false,
        //addToCartProcess: false
      });
      this.addToCartProcess = false;
      this.props.dispatch({
        type: SUPERADMIN_CART_RESET
      });
    }
  }

  loadListData = () => {
    this.props.actions.stocksList(this.state.queryParams);
  }

  handleView = (row) => {
    if(this.state.queryParams.total_avl_stock == 1){
      window.open(`${process.env.FRONT_BASE_URL}products/${row.slug}`, '_blank').focus();
    }else{
      this.props.navigate('view/' + row.id);
    }
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

  handleAddToCart = async (row) => {
    if(this.addToCartProcess){
      this.props.enqueueSnackbar("Processing please wait.", { variant: 'error' });
      return;
    }
    //this.setState({addToCartProcess: true})
    this.addToCartProcess = true;
    let check_cart = await getCartItemById({ stock_id: row.id, product_id: row.product_id });
    if (!check_cart.data.success) {
      this.props.enqueueSnackbar("Item already in cart! You can not add this item.", { variant: 'error' });
      //this.setState({addToCartProcess: false})
      this.addToCartProcess = false;
    } else {
      if (row.type != "material") {
        let materials = [];
        for (let i = 0; i < row.stock_materials.length; i++) {
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
        this.props.actions.cartStore(data);
      } else {
        this.setState({
          cart_stock: row,
          cartDialog: true,
          unit_id: row.stock_materials.length ? row.stock_materials[0].unit_id : ''
        })
      }
    }
  }

  formValidate = () => {
    let err = false;
    if (!this.state.quantity) {
      this.setState({
        quantity_error: true
      })
      err = true;
    }
    if (!this.state.weight) {
      this.setState({
        weight_error: true
      })
      err = true;
    }
    if (!this.state.unit_id) {
      this.setState({
        unit_error: true
      })
      err = true;
    }
    return !err;

  }

  handleMaterialAddToCart = () => {
    let row = this.state.cart_stock;
    if (!this.formValidate()) {
      return false;
    } else if (parseInt(this.state.quantity) > parseInt(row.quantity)) {
      this.props.enqueueSnackbar("Quantity must be less then from stock quantity.", { variant: 'error' });
    } else {
      let materials = [];
      for (let i = 0; i < row.stock_materials.length; i++) {
        let singleQty = parseInt(row.stock_materials[i].quantity) / parseInt(row.quantity);
        materials.push({
          material_id: row.stock_materials[i].material_id,
          purity_id: row.stock_materials[i].purity_id,
          weight: this.state.weight,
          unit_id: this.state.unit_id,
          quantity: this.state.quantity,
        })
      }
      let unit = _.filter(this.state.unitList, { id: this.state.unit_id });
      let data = {
        stock_id: row.id,
        product_id: row.product_id,
        size_id: '',
        materials: materials,
        quantity: this.state.quantity,
        total_weight: convertUnitToGram(unit[0].name, this.state.weight),
        unit_id: this.state.unit_id
      }
      this.props.actions.cartStore(data);
    }
  }


  handleDialogClose = () => {
    this.setState({
      cartDialog: false,
      //addToCartProcess: false
    })
    this.addToCartProcess = false;
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

  handleCardClick = (category_id) => {
    this.props.actions.subCategoryList({ all: 1, category_id: category_id });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: category_id
      }
    }, () => {
      this.handleSearch()
    })
  }


  render() {

    return (
      <>
        <div className='sale-heading'>
          {
            this.state.queryParams.total_avl_stock == 1 ?
            <h1>Total Available Stock List</h1>
            :
            <h1>List For Sale</h1>
          }

        </div>
        {
          this.state.price_by_categories.length ?
            <Card className='dashboard_card' style={{ marginBottom: '4px' }}>
              {
                this.state.price_by_categories.map((item, key) => (
                  <CardContent className={`dashboard_card_content bg-color-1`} sx={{ display: "flex", justifyContent: "space-between" }} key={key} onClick={() => this.handleCardClick(item.category_id)}>
                    <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                      <h1>{item.category_name}</h1>
                      <h2>{displayAmount(item.total_amount)}</h2>
                      <h3>{item.quantity} Piece(s)</h3>
                    </Typography>
                    <div className="card-icon">
                      {/* <DiamondIcon /> */}
                    </div>
                  </CardContent>
                ))
              }
            </Card>
            : null
        }
        <MainCard>
          <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view' columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={6} md={3} className='create-input'>
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
              <Grid item xs={6} md={3} className='create-input'>
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
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3} className='create-input order-input button-right'>
                <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={gridSpacing} className='orders-sale-button'>
            {console.log(this.props)}
            <DataTable
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
              haveAllOption={true}
            />
          </Grid>
        </MainCard>

        <Dialog
          open={this.state.cartDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="sm"
          className="ratn-dialog-wrapper"
        >
          <DialogTitle>
            {
              this.state.cart_stock ?
                <div className='cart-item-wrapper'>
                  <span className='cart-item-header'>{this.state.cart_stock.name}</span>
                  <div className='cart-item-header-right'>
                    <p>Rate: &nbsp; &nbsp;
                      <strong> {this.state.cart_stock.mrp_display} </strong>
                    </p>
                    &nbsp; &nbsp;
                    <p>
                      <strong> {this.state.cart_stock.total_weight_display} </strong>
                    </p>
                  </div>
                </div>
                : null
            }
          </DialogTitle>
          <div>
            <DialogContentText></DialogContentText>
              {
                this.state.cart_stock ?

                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header sale-modal-header'>
                          <TableRow>
                            <TableCell>Purity</TableCell>
                            <TableCell>Available Qty</TableCell>
                            <TableCell>Avl. Weight</TableCell>
                            <TableCell>Sale Unit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{this.state.cart_stock.stock_materials[0].purity_name}</TableCell>
                            <TableCell>{this.state.cart_stock.quantity}</TableCell>
                            <TableCell>{this.state.cart_stock.total_weight_display}</TableCell>
                            <TableCell>{this.state.cart_stock.unit_display[0]}</TableCell>
                          </TableRow>
                          {/* {this.state.suppliers.map((row, i) => (
                                <Row key={i} row={row} index={i} />
                              ))} */}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>

                  : null
              }
            <div className='sale_modal_wrapper'>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
              <Grid item xs={3}>
              &nbsp;
              </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    value={this.state.quantity}
                    onChange={(event) => this.setState({ quantity: event.target.value })}
                    error={this.state.quantity_error}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Weight"
                    variant="outlined"
                    fullWidth
                    value={this.state.weight}
                    onChange={(event) => this.setState({ weight: event.target.value })}
                    error={this.state.weight_error}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth error={this.state.unit_error}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={this.state.unit_id}
                      label="Unit"
                      onChange={(event) => this.setState({ unit_id: event.target.value })}
                      className='input-inner'
                      defaultValue=""
                    >
                      <MenuItem value=""></MenuItem>
                      {
                        this.state.unitList.map((item, index) => (
                          <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{paddingTop : '12px', }}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                    <Button variant="contained" type="button" onClick={this.handleMaterialAddToCart}>Add to Cart</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            </div>


          </div>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.stocks.items,
  total: state.superadmin.stocks.total,
  actionCalled: state.superadmin.stocks.actionCalled,
  deleteSuccess: state.superadmin.stocks.deleteSuccess,
  successMessage: state.superadmin.stocks.successMessage,
  cart_actionCalled: state.superadmin.cart.actionCalled,
  cart_createSuccess: state.superadmin.cart.createSuccess,
  cart_deleteSuccess: state.superadmin.cart.deleteSuccess,
  cart_successMessage: state.superadmin.cart.successMessage,
  cart_errorMessage: state.superadmin.cart.errorMessage,
  categories: state.superadmin.category.items,
  materialList: state.superadmin.material.items,
  sub_categories: state.superadmin.subCategory.items,
  unitList: state.superadmin.unit.items
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      stocksList,
      subCategoryList,
      cartStore,
      cartList,
      categoryList,
      materialList,
      unitList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(StockPage)));
