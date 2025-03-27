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
import { stocksHistoryStore } from 'actions/superadmin/stockHistory.actions';
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
import { convertUnitToGram, weightFormat, isManager } from 'src/helpers/helper';
import { employeeList } from 'actions/superadmin/employee.actions';
import _ from 'lodash';

class MaterialStockPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      employeeList: this.props.employeeList,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        search: '',
        type: 'material',
        all: 0,
        by_specific: this.props.query.get('by_specific') ?? "",
        manager: this.props.query.get('manager') ?? "",
      },
      cart_actionCalled: this.props.cart_actionCalled,
      cart_createSuccess: this.props.cart_createSuccess,
      cart_deleteSuccess: this.props.cart_deleteSuccess,
      cart_successMessage: this.props.cart_successMessage,
      cart_errorMessage: this.props.cart_errorMessage,
      cartDialog: false,
      quantity: '',
      unit: '',
      weight: '',
      user_id: '',
      quantity_error: false,
      weight_error: false,
      unit_error: false,
      user_id_error: false,
      cart_stock: null,
      categories: this.props.categories,
      materialList: this.props.materialList,
      sub_categories: this.props.sub_categories,
      price_by_categories: [],
      unitList: [],
      processing: false
    }

    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Material Name'
      },
      {
        name: 'purity_name',
        display_name: 'Purity Name'
      },
      {
        name: 'total_weight_display',
        display_name: 'Total Wt.',
        width: '90px'
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
      /*{
        name: 'size_name',
        display_name: 'Size'
      },*/
      {
        name: 'mrp_display',
        display_name: 'Price'
      }
    ];

    this.isManager = isManager();
  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.unitList({ all: 1 });

    this.loadPriceByCategory();

    this.props.actions.employeeList({ role_id: this.isManager ? 1 : 9 })
  }

  loadPriceByCategory = async () => {
    let res = await getPriceByCategory({ 
      type: 'material',
      manager: this.props.query.get('manager') ?? "",
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
    if (props.employeeList !== state.employeeList) {
      update.employeeList = props.employeeList;
    }

    return update;
  }

  componentDidUpdate() {
    if (this.state.cart_actionCalled) {
      if (this.state.cart_createSuccess) {
        this.props.enqueueSnackbar(this.state.cart_successMessage, { variant: 'success' });
        this.props.actions.cartList();
        this.loadListData();
      } else if (this.state.cart_errorMessage) {
        this.props.enqueueSnackbar(this.state.cart_errorMessage, { variant: 'error' });
      }
      this.setState({
        cartDialog: false
      });
      this.props.dispatch({
        type: SUPERADMIN_CART_RESET
      });
    }
  }

  loadListData = () => {
    this.props.actions.stocksList(this.state.queryParams);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
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

  handleSend = async (row) => {
    this.setState({
      cart_stock: row,
      cartDialog: true,
      unit_id: row.stock_materials[0].unit_id
    })
  }

  formValidate = () => {
    let row = this.state.cart_stock;
    let err = false;
    if (!this.state.weight) {
      this.setState({
        weight_error: true
      })
      err = true;
    }else{
      this.setState({
        weight_error: false
      })
    }
    if (!this.state.user_id) {
      this.setState({
        user_id_error: true
      })
      err = true;
    }else{
      this.setState({
        user_id_error: false
      })
    }
    if(this.state.quantity && row.quantity && parseInt(this.state.quantity) > parseInt(row.quantity)){
      this.props.enqueueSnackbar("Quantity must be less then from stock quantity.", { variant: 'error' });
      err = true;
    }

    if(this.state.weight && parseFloat(this.state.weight) > parseFloat(row.weight)){
      this.props.enqueueSnackbar("Weight must be less then from stock weight.", { variant: 'error' });
      err = true;
    }

    return !err;

  }

  handleMaterialSend = async() => {
    let row = this.state.cart_stock;
    if (!this.formValidate()) {
      return false;
    }
    this.setState({
      processing: true
    })
    let data = {
      user_id: this.state.user_id,
      quantity: this.state.quantity,
      unit_id: this.state.unit_id,
      weight: this.state.weight,
      purity_id: row.stock_materials[0].purity_id,
      material_id: row.stock_materials[0].material_id
    }
    let res = await stocksHistoryStore(data);
    if(res.data.success){
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.loadListData();
      this.loadPriceByCategory();
      this.setState({
        cartDialog: false
      });
    }else{
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
    this.setState({
      processing: false
    })
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
          <h1>Material Stock List</h1>
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
              {/*<Grid item xs={6} md={3} className='create-input'>
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
              </Grid>*/}
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
              <Grid item xs={6} md={1} className='create-input order-input button-right'>
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
              actions={[
                {
                  label: '+',
                  onClick: this.handleSend,
                  color: 'primary',
                  show: this.props.query.get('by_specific') ? false : true,
                }
              ]}
              haveAllOption={true}
            />
          </Grid>
        </MainCard>

        <Dialog
          open={this.state.cartDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="md"
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
          <DialogContent>
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
                        <TableCell>Unit</TableCell>
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
                    <FormControl fullWidth error={this.state.user_id_error}>
                      <InputLabel>{this.isManager ? 'Super Admin' : 'Manager'}</InputLabel>
                      <Select
                        value={this.state.user_id}
                        label={this.isManager ? 'Super Admin' : 'Manager'}
                        onChange={(event) => this.setState({ user_id: event.target.value })}
                        className='input-inner'
                        defaultValue=""
                      >
                        <MenuItem value=""></MenuItem>
                        {
                          this.state.employeeList.map((item, index) => (
                            <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
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
                        //onChange={(event) => this.setState({ unit_id: event.target.value })}
                        className='input-inner'
                        defaultValue=""
                        disabled
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
                  <Grid item xs={12} style={{ paddingTop: '12px', }}>
                    <Stack spacing={1} direction="row" justifyContent="flex-end">
                      <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                      <Button variant="contained" type="button" onClick={this.handleMaterialSend} disabled={this.state.processing}>Send</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          </DialogContent>
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
  unitList: state.superadmin.unit.items,
  employeeList: state.superadmin.employee.items
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      stocksList,
      subCategoryList,
      categoryList,
      materialList,
      unitList,
      employeeList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialStockPage)));
