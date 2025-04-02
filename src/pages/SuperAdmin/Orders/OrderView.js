import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, TextField, RadioGroup, FormControlLabel, Radio, FormControl, Stack, MenuItem, Select, InputLabel, Checkbox, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, TextareaAutosize, ImageList, ImageListItem, Backdrop } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { orderViewRaw, orderSaleProceed, orderUpdateStatus, updateOrderProducts } from 'actions/superadmin/order.actions';
import { stocksHistoryStoreByProduct } from 'actions/superadmin/stockHistory.actions';
import { bindActionCreators } from 'redux';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getRoleName, getUserDashboardRoute, isManager, getNewlineText, isSuperAdmin, isEmpty, convertUnitToGram, weightFormat } from 'src/helpers/helper';
import DataTable from 'src/utils/DataTable';
import CloseIcon from '@mui/icons-material/Close';
import { employeeList } from 'actions/superadmin/employee.actions';
import _ from 'lodash';

class OrderView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: null,
      auth: this.props.auth,
      employeeList: this.props.employeeList,
      saleDialog: false,
      from_order_price: 0,
      processing: false,
      openDialog: false,
      order_status: '',
      advance_amount: '',
      imageDialogOpen: false,
      imagePath: '',
      action_products: {},
      productDialog: false,
      user_id: '',
      user_id_err: false,
      is_updating: false,
      receiving_product: null,
      receiveDialog: false,
      notes: ''
    }

    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'product_name',
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
        name: 'quantity',
        display_name: 'Quantity'
      },
      {
        name: 'rate',
        display_name: 'Price'
      }
    ];
    this.isManager = isManager();
    this.isSuperAdmin = isSuperAdmin();
    this.timer = 0;
  }

  componentDidMount() {
    this.loadViewData();

    this.props.actions.employeeList({ role_id: 10 })
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.employeeList !== state.employeeList) {
      update.employeeList = props.employeeList;
    }

    return update;
  }

  loadViewData = () => {
    orderViewRaw(this.props.params.id)
      .then(res => {
        if (res.data.success) {
          this.setState({
            order: res.data.data,
            notes: res.data.data.notes ?? ''
          })
        }
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }

  }

  handleSale = () => {
    this.setState({
      saleDialog: true
    })
  }

  handleSaleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      saleDialog: false
    })
  }

  handleSaleSubmit = async () => {
    this.setState({
      processing: true
    })
    let res = await orderSaleProceed(this.state.order.id);
    if (res.data.success) {
      this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/sales/create?order_id=' + this.state.order.id + '&from_order_price=' + this.state.from_order_price + '&all_added=' + res.data.data.all_added);
    } else {
      this.setState({
        processing: false
      })
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
  }

  handleStatus = () => {
    this.setState({
      order_status: this.state.order.status,
      openDialog: true
    })
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false
    })
  }

  handleSubmit = async () => {
    this.setState({
      processing: true
    });
    let res = await orderUpdateStatus(this.state.order.id, { status: this.state.order_status, advance_amount: this.state.advance_amount });
    let openDialog = false;
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.loadViewData();
      this.setState({
        advance_amount: ''
      });
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
      openDialog = true;
    }
    this.setState({
      processing: false,
      openDialog: openDialog
    });
  }

  handleImageClick = (url) => {
    this.setState({
      imageDialogOpen: true,
      imagePath: url
    })
  }

  handleImageDialogClose = () => {
    this.setState({
      imageDialogOpen: false
    })
  }

  handleCheckBox = (e, index) => {
    let action_products = this.state.action_products;
    let order = this.state.order;
    let key = 'item_' + index;
    if (e.target.checked) {
      let materials = [];
      for (let x = 0; x < order.products[index].materials.length; x++) {
        let item = order.products[index].materials[x];
        materials.push({
          id: item.id,
          material_id: item.material_id,
          unit_id: item.unit_id,
          purity_id: item.purity_id,
          quantity: '',
          weight: '',
          weight_err: false
        })
      }
      action_products[key] = {
        id: order.products[index].id,
        product_id: order.products[index].product_id,
        product_type: order.products[index].product_type,
        materials: materials,
        certificate_no: '',
        certificate_no_err: false
      }
    } else {
      delete action_products[key]
    }
    this.setState({
      action_products: action_products
    })
  }

  hasChecked = (i) => {
    let action_products = this.state.action_products;
    let key = 'item_' + i;
    return key in action_products ? true : false;
  }

  handleProduct = (e, p_key) => {
    let action_products = this.state.action_products;
    const { name, value } = e.target;
    action_products['item_' + p_key][name] = value;
    this.setState({
      action_products: action_products
    })
  }

  handleCertificate = (e, c_key) => {
    // let receiving_product = {...this.state.receiving_product};
    // let products = [...receiving_product.products];
    // const { name, value } = e.target;
    // products[c_key][name] = value;
    // receiving_product.products = products
    const { name, value } = e.target;
    let receiving_product = this.state.receiving_product;
    receiving_product.products[c_key][name] = value;
    this.setState({
      receiving_product: receiving_product
    })
  }

  handleMaterial = (e, p_key, m_key) => {
    let action_products = this.state.action_products;
    const { name, value } = e.target;
    action_products['item_' + p_key].materials[m_key][name] = value;
    this.setState({
      action_products: action_products
    })
  }

  handleProductConfirmSubmit = () => {
    let err = false;
    let action_products = this.state.action_products;
    for (let key of Object.keys(action_products)) {
      for (let i = 0; i < action_products[key].materials.length; i++) {
        if (!action_products[key].materials[i].weight) {
          action_products[key].materials[i].weight_err = true;
          err = true;
        } else {
          action_products[key].materials[i].weight_err = false;
        }
      }
      // if (this.state.order.status != "accepted" && action_products[key].product_type != "material" && !action_products[key].certificate_no) {
      //   action_products[key].certificate_no_err = true;
      //   err = true;
      // } else {
      //   action_products[key].certificate_no_err = false;
      // }
    }
    this.setState({
      action_products: action_products
    })
    if (!err) {
      this.setState({
        productDialog: true
      })
    }
  }

  handleProductDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      productDialog: false
    })
  }

  handleProductSubmit = async () => {
    let { order, action_products } = this.state;
    let err = false;
    if (!this.state.user_id) {
      this.setState({
        user_id_err: true
      })
      err = true;
    } else {
      this.setState({
        user_id_err: false
      })
    }
    if (!err) {
      this.setState({
        processing: true
      })
      let data = {
        user_id: this.state.user_id,
        order_id: order.id,
        products: Object.values(action_products),
        type: 'send'
      }
      let res = await stocksHistoryStoreByProduct(data);
      if (res.data.success) {
        this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
        this.loadViewData();
        this.setState({
          productDialog: false,
          action_products: {}
        });
      } else {
        this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
      }
      this.setState({
        processing: false
      })
    }
  }

  getArrayComponent = (components) => {
    return <>
      {
        components.map((component, index) => (
          <React.Fragment key={index}>
            {component}
          </React.Fragment>
        ))
      }
    </>
  }

  handleSizeChange = async (e, p) => {
    const { name, value } = e.target;
    let item = p.cart_data;
    let sizeMaterial = _.filter(item.size_materials, function (s) {
      return s.size_id == value;
    });
    sizeMaterial = sizeMaterial[0];
    let data = null;
    for (let i = 0; i < item.cart_material.length; i++) {
      let material = _.filter(sizeMaterial.materials, function (s) {
        return s.material_id == item.cart_material[i].material_id;
      });
      material = material[0];
      let purity = _.filter(material.purities, function (s) {
        return s.id == item.cart_material[i].purity_id;
      });
      if (purity.length > 0) {
        let total_weight = 0;
        let materials = [];
        for (let i = 0; i < sizeMaterial.materials.length; i++) {
          let thisM = sizeMaterial.materials[i];
          let cartMaterial = _.filter(item.cart_material, function (s) {
            return s.material_id == thisM.material_id;
          });
          let m = _.filter(thisM.purities, function (s) {
            return s.id == cartMaterial[0].purity_id;
          });
          let total_gram = convertUnitToGram(thisM.unit_name, thisM.weight);
          total_gram = weightFormat(total_gram);
          total_weight += parseFloat(total_gram);

          materials.push({
            material_id: thisM.material_id,
            purity_id: m[0].id,
            weight: thisM.weight,
            unit_id: thisM.unit_id,
            quantity: thisM.quantity,
          })
        }
        data = {
          total_weight: total_weight,
          size_id: sizeMaterial.size_id,
          materials: materials,
          update_type: 'size',
          order_id: this.state.order.id,
          id: p.id,
          cart_id: item.id,
          role_id: this.state.order.role_id
        }
      }
    }

    if (data) {
      this.setState({
        is_updating: true
      })
      let res = await updateOrderProducts(data)
      if (res.data.success) {
        this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
        this.loadViewData();
      }
      this.setState({
        is_updating: false
      })
    }
  }

  handlPurityChange = async (e, row, m) => {
    this.setState({
      is_updating: true
    })
    let item = row.cart_data;
    let res = await updateOrderProducts({
      material_id: m.material_id,
      purity_id: e.target.value,
      update_type: 'purity_id',
      order_id: this.state.order.id,
      id: row.id,
      cart_id: item.id,
      role_id: this.state.order.role_id,
      product_m_id: m.id
    })
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.loadViewData();
    }
    this.setState({
      is_updating: false
    })
  }

  getPurityList = (row, mItem) => {
    let cart_data = row.cart_data;
    let size_materials = null;
    if (cart_data?.product_type == "material") {
      size_materials = cart_data.size_materials[0];
    } else {
      let sizeMaterial = _.filter(cart_data?.size_materials, function (s) {
        return s.size_id == row.size_id;
      });
      size_materials = sizeMaterial[0];
    }
    let singleMaterial = _.filter(size_materials?.materials, function (s) {
      return s.material_id == mItem.material_id;
    });
    return singleMaterial[0]?.purities;
  }

  handleRecive = (row) => {
    let materials = [], certificates = [];
    for (let x = 0; x < row.materials.length; x++) {
      let item = row.materials[x];
      materials[x] = {
        material_id: item.material_id,
        unit_id: item.unit_id,
        unit_name: item.unit_name,
        purity_id: item.purity_id,
        quantity: item.sent_quantity,
        weight: item.sent_weight,
        weight_err: false
      }
    }
    // for (let i = 0; i < row.quantity; i++) {
    //   certificates.push({
    //     certificate_no: '',
    //     certificate_no_err: false,
    //   })
    // }
    let singleObj = {
      id: row.id,
      product_id: row.product_id,
      product_type: row.product_type,
      certificate_no: '',
      certificate_no_err: false,
    };
    
    let products = [];
    if (row.product_type == 'material') {
      products[0] = {...singleObj, materials: [...materials]};
    } else {
      for (let i = 0; i < row.quantity; i++) {

        let m = [];
        for (let x = 0; x < row.materials.length; x++) {
          let item = row.materials[x];
          m[x] = {
            material_id: item.material_id,
            unit_id: item.unit_id,
            unit_name: item.unit_name,
            purity_id: item.purity_id,
            quantity: item.sent_quantity,
            weight: item.sent_weight,
            weight_err: false
          }
        }

        let p = [...m];
        products[i] = {...singleObj, materials: [...p]};
      }
    }

    let receiving_product = {
      id: row.id,
      product_id: row.product_id,
      product_type: row.product_type,
      products: products,
      user_id: row.worker_id,
      cart_id: row.cart_data.id,
    };

    this.setState({
      receiving_product: receiving_product
    })
  }

  handleCancelRecive = () => {
    this.setState({
      receiving_product: null
    })
  }

  isRecieving = (row) => {
    let receiving_product = this.state.receiving_product;
    return (receiving_product && receiving_product.id == row.id) ? true : false;
  }

  handleReciveSubmit = (row) => {
    let err = false;
    let receiving_product = this.state.receiving_product;
    for (let x = 0; x < receiving_product.products.length; x++) {
      let item = receiving_product.products[x];
      for (let i = 0; i < item.materials.length; i++) {
        if (!item.materials[i].weight) {
          receiving_product.products[x].materials[i].weight_err = true;
          err = true;
        } else {
          receiving_product.products[x].materials[i].weight_err = false;
        }
      }

      if (receiving_product.product_type != "material") {
        if (!item.certificate_no) {
          receiving_product.products[x].certificate_no_err = true;
          err = true;
        } else {
          receiving_product.products[x].certificate_no_err = false;
        }
      }
    }

    this.setState({
      receiving_product: receiving_product
    })
    if (!err) {
      this.setState({
        receiveDialog: true
      })
    }
  }

  handleReceiveMaterial = (e, m_key, k) => {
    const { name, value } = e.target;
    let receiving_product = this.state.receiving_product;
    let products = [...receiving_product.products];
    let materials = [...products[k].materials];
    materials[m_key][name] = value;
    products[k].materials = materials;
    receiving_product.products = products
    this.setState({
      receiving_product: receiving_product
    }, () => {
      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {

      // }, 500);
    })
  }

  handleReceiveDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      receiveDialog: false
    })
  }

  handleReceiveSubmitProceed = async () => {
    let { order, receiving_product } = this.state;
    let err = false;
    if (!err) {
      this.setState({
        processing: true
      })
      let data = {
        user_id: receiving_product.user_id,
        order_id: order.id,
        products: [{ ...receiving_product }],
        type: 'receive',
        role_id: this.state.order.role_id,
        cart_id: receiving_product.cart_id
      }
      let res = await stocksHistoryStoreByProduct(data);
      if (res.data.success) {
        this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
        this.loadViewData();
        this.setState({
          receiveDialog: false,
          receiving_product: null
        });
      } else {
        this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
      }
      this.setState({
        processing: false
      })
    }
  }

  render() {
    const { order, action_products, is_updating, receiving_product } = this.state;
    let statusArr = [];
    if (order) {
      if (order.is_customer || order.is_retailer) {
        statusArr = [
          {
            label: 'On Process',
            value: 'on_process'
          },
          {
            label: 'Is Ready',
            value: 'is_ready'
          },
          {
            label: 'Shipped',
            value: 'shipped'
          },
          {
            label: 'Out For Delivery',
            value: 'out_for_delivery'
          },
          {
            label: 'Delivered',
            value: 'delivered'
          },
          {
            label: 'Cancelled',
            value: 'cancelled'
          }
        ]
      } else {
        statusArr = [
          {
            label: 'Accepted',
            value: 'accepted'
          },
          {
            label: 'On Process',
            value: 'on_process'
          },
          {
            label: 'Is Ready',
            value: 'is_ready'
          },
          {
            label: 'Shipped',
            value: 'shipped'
          },
          {
            label: 'Out For Delivery',
            value: 'out_for_delivery'
          },
          {
            label: 'Delivered',
            value: 'delivered'
          },
          {
            label: 'Cancelled',
            value: 'cancelled'
          }
        ]
      }
    }


    return (
      <>

        {
          !order ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={is_updating}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Grid container spacing={2} className='loans_view p_view'>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Order #"
                    variant="outlined"
                    fullWidth
                    value={order.order_no}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Order Date"
                    variant="outlined"
                    fullWidth
                    value={order.order_date}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Order From"
                    variant="outlined"
                    fullWidth
                    value={order.order_from}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    value={order.mobile}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                {
                  order.is_customer || order.is_retailer ?
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField
                        label="Total Amount"
                        variant="outlined"
                        fullWidth
                        value={order.total_amount}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                {
                  order.is_customer || order.is_retailer ?
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField
                        label="Paid Amount"
                        variant="outlined"
                        fullWidth
                        value={order.paid_amount_display}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Status"
                    variant="outlined"
                    fullWidth
                    value={order.status_display}

                    InputProps={{
                      className: "non_disable_text cursor-pointer"
                    }}
                    inputProps={{
                      className: "cursor-pointer"
                    }}
                    role="button"
                    onClick={this.handleStatus}
                  />
                </Grid>
                {
                  order.is_customer || order.is_retailer ?
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        value={order.formated_address}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                {
                  order.is_customer || order.is_retailer ?
                    <Grid item xs={12} md={2} className='create-input'>
                      <TextField
                        label="Assign To"
                        variant="outlined"
                        fullWidth
                        value={order.sale_executive_name}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                {
                  order.status == "cancelled" && order.cancel_reason ?
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField
                        label="Cancel Reason"
                        variant="outlined"
                        fullWidth
                        value={order.cancel_reason}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                {
                  !isEmpty(order.notes) ?
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField
                        label="Notes"
                        variant="outlined"
                        fullWidth
                        value={order.notes}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    : null
                }
                {
                  !isEmpty(order.image) ?
                    <Grid item xs={6} md={1} className='create-input'>
                      <ImageList>
                        <ImageListItem onClick={() => this.handleImageClick(order.image)} className='cursor-pointer'>
                          <img
                            src={order.image}
                            srcSet={order.image}
                            loading="lazy"
                          />
                        </ImageListItem>
                      </ImageList>
                    </Grid>
                    : null
                }
              </Grid>
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12} className="p-add-product create-input">
                  <h3 className='p_heading_list'>Product List</h3>
                  {/*<DataTable
                      columns={this.columns}
                      rows={order.products}
                      page={1}
                      limit={order.products.length}
                      total={order.products.length}
                      havePagination={false}
                    />*/}
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            {
                              (this.isManager || this.isSuperAdmin) && (order.status == "accepted" || order.status == "on_process") ?
                                <TableCell sx={{ width: '10px' }} ></TableCell>
                                : null
                            }
                            <TableCell sx={{ width: '30px' }}>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell sx={{ width: '150px' }}>Certificate No</TableCell>
                            <TableCell sx={{ width: '450px' }}>Materials</TableCell>
                            <TableCell>P Code</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Quantity</TableCell>
                            {
                              order.is_customer || order.is_retailer ?
                                <>
                                  <TableCell>Old Price</TableCell>
                                  <TableCell>Price</TableCell>
                                </>
                                : null
                            }
                            <TableCell>Worker</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.products.map((row, i) => (
                            <TableRow key={i}>
                              {
                                (this.isManager || this.isSuperAdmin) && (order.status == "accepted" || order.status == "on_process") ?
                                  <TableCell>
                                    {
                                      row.status == 'pending' ?
                                        <Checkbox onChange={(e) => this.handleCheckBox(e, i)} checked={this.hasChecked(i)} />
                                        : null
                                    }
                                  </TableCell>
                                  : null
                              }
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>
                                <img src={row.image} style={{ width: '60px', height: '40px' }} className='table-data-image cursor-pointer' onClick={() => this.handleImageClick(row.image)} />
                              </TableCell>
                              <TableCell>{row.product_name}</TableCell>
                              <TableCell>
                                {
                                  this.isRecieving(row) && row.product_type != 'material' ?
                                    <>
                                      {
                                        receiving_product.products.map((c, ck) => (
                                          <input
                                            key={ck}
                                            type="text"
                                            value={c.certificate_no}
                                            name="certificate_no"
                                            onChange={(e) => this.handleCertificate(e, ck)}
                                            className={"custom_input" + (c.certificate_no_err ? ' error_input' : '')}
                                            style={{ width: '80%', height: '30px', padding: '5px 8px', marginTop: '2px' }}
                                          />
                                        ))
                                      }

                                    </>
                                    :
                                    row.certificate_no
                                }
                              </TableCell>
                              <TableCell sx={{ paddingTop: '0px' }}>
                                {
                                  row.status == 'pending' ?
                                    <>
                                      <Table className='table-bordered'>
                                        <TableHead className='ratn-table-header'>
                                          <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Weight</TableCell>
                                            <TableCell>Purity</TableCell>
                                            <TableCell>Unit</TableCell>
                                            <TableCell>Qty</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {
                                            row.materials.map((item, key) => (
                                              <TableRow key={key}>
                                                <TableCell>
                                                  {item.material_name}
                                                </TableCell>
                                                <TableCell>
                                                  {item.weight}
                                                  {
                                                    this.hasChecked(i) ?
                                                      <div style={{ position: 'relative' }}>
                                                        <input
                                                          type="text"
                                                          value={action_products['item_' + i].materials[key].weight}
                                                          name="weight"
                                                          onChange={(e) => this.handleMaterial(e, i, key)}
                                                          className={"custom_input" + (action_products['item_' + i].materials[key].weight_err ? ' error_input' : '')}
                                                          style={{ width: '100%', height: '30px' }}
                                                        />
                                                      </div>
                                                      : null
                                                  }
                                                </TableCell>
                                                <TableCell>
                                                  {
                                                    item.purity_name ?
                                                      <>
                                                        {
                                                          (row.status == 'pending' || row.status == 'on_process') && (order.status == "accepted" || order.status == "on_process") ?
                                                            <select onChange={(e) => this.handlPurityChange(e, row, item)} name="purity_id" value={item.purity_id}>
                                                              {
                                                                this.getPurityList(row, item).map((x, kk) => (
                                                                  <option value={x.id} key={kk}>{x.name}</option>
                                                                ))
                                                              }
                                                            </select>
                                                            :
                                                            item.purity_name
                                                        }
                                                      </>
                                                      : null
                                                  }
                                                </TableCell>
                                                <TableCell>
                                                  {item.unit_name}
                                                </TableCell>
                                                <TableCell>
                                                  {item.quantity}
                                                  {
                                                    this.hasChecked(i) ?
                                                      <div style={{ position: 'relative' }}>
                                                        <input
                                                          type="text"
                                                          value={action_products['item_' + i].materials[key].quantity}
                                                          name="quantity"
                                                          onChange={(e) => this.handleMaterial(e, i, key)}
                                                          className="custom_input"
                                                          style={{ width: '100%', height: '30px' }}
                                                        />
                                                      </div>
                                                      : null
                                                  }
                                                </TableCell>
                                              </TableRow>
                                            ))
                                          }
                                        </TableBody>
                                      </Table>
                                    </>
                                    :
                                    <>
                                      {
                                        this.isRecieving(row) ?
                                          <>
                                            {
                                              receiving_product.products.map((x, k) => (
                                                <Table className='table-bordered input_table' key={k}>
                                                  <TableHead className='ratn-table-header'>
                                                    <TableRow>
                                                      <TableCell>Name</TableCell>
                                                      <TableCell>Weight</TableCell>
                                                      <TableCell>Purity</TableCell>
                                                      <TableCell>Unit</TableCell>
                                                      <TableCell>Qty</TableCell>
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    {
                                                      row.materials.map((item, key) => (
                                                        <TableRow key={key}>
                                                          <TableCell>
                                                            {item.material_name}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item.weight}
                                                            <div style={{ position: 'relative' }}>
                                                              <input
                                                                type="text"
                                                                value={receiving_product.products[k].materials[key].weight}
                                                                name="weight"
                                                                onChange={(e) => this.handleReceiveMaterial(e, key, k)}
                                                                className={"custom_input" + (receiving_product.products[k].materials[key].weight_err ? ' error_input' : '')}
                                                                style={{ width: '100%', height: '20px', padding: 0 }}
                                                              />
                                                            </div>
                                                          </TableCell>
                                                          <TableCell>
                                                            {item.purity_name}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item.unit_name}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item.quantity}
                                                            <div style={{ position: 'relative' }}>
                                                              <input
                                                                type="text"
                                                                value={receiving_product.products[k].materials[key].quantity}
                                                                name="quantity"
                                                                onChange={(e) => this.handleReceiveMaterial(e, key, k)}
                                                                className="custom_input"
                                                                style={{ width: '100%', height: '20px', padding: 0 }}
                                                              />
                                                            </div>
                                                          </TableCell>
                                                        </TableRow>
                                                      ))
                                                    }
                                                  </TableBody>
                                                </Table>
                                              ))
                                            }

                                          </>
                                          :
                                          <Table className='table-bordered'>
                                            <TableHead className='ratn-table-header'>
                                              <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Weight</TableCell>
                                                <TableCell>Purity</TableCell>
                                                <TableCell>Unit</TableCell>
                                                <TableCell>Qty</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {
                                                row.materials.map((item, key) => (
                                                  <TableRow key={key}>
                                                    <TableCell>
                                                      {item.material_name}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.weight}
                                                    </TableCell>
                                                    <TableCell>
                                                      {
                                                        item.purity_name ?
                                                          <>
                                                            {
                                                              (row.status == 'pending' || row.status == 'on_process') && (order.status == "accepted" || order.status == "on_process") ?
                                                                <select onChange={(e) => this.handlPurityChange(e, row, item)} name="purity_id" value={item.purity_id}>
                                                                  {
                                                                    this.getPurityList(row, item).map((x, kk) => (
                                                                      <option value={x.id} key={kk}>{x.name}</option>
                                                                    ))
                                                                  }
                                                                </select>
                                                                :
                                                                item.purity_name
                                                            }
                                                          </>
                                                          : null
                                                      }
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.unit_name}
                                                    </TableCell>
                                                    <TableCell>
                                                      {item.quantity}
                                                    </TableCell>
                                                  </TableRow>
                                                ))
                                              }
                                            </TableBody>
                                          </Table>
                                      }
                                    </>
                                }


                                {/*<Table>
                                  <TableBody>
                                    {
                                      row.materials.map((item, key) => (
                                        <TableRow key={key}>
                                          <TableCell>
                                            {item.material_name}
                                            {
                                              this.hasChecked(i) ?
                                                <div>
                                                  <span style={{ position: 'relative' }}>
                                                    <input
                                                      type="text"
                                                      value={action_products['item_' + i].materials[key].weight}
                                                      name="weight"
                                                      onChange={(e) => this.handleMaterial(e, i, key)}
                                                      className={"custom_input" + (action_products['item_' + i].materials[key].weight_err ? ' error_input' : '')}
                                                      style={{ width: '45%', height: '30px', padding: '5px 8px' }}
                                                    />
                                                    <span style={{ position: 'absolute', right: '5px', top: "0px" }}> Wt</span>
                                                  </span>
                                                  <span style={{ position: 'relative' }}>
                                                    <input
                                                      type="text"
                                                      value={action_products['item_' + i].materials[key].quantity}
                                                      name="quantity"
                                                      onChange={(e) => this.handleMaterial(e, i, key)}
                                                      className="custom_input"
                                                      style={{ width: '45%', height: '30px', padding: '5px 8px', marginLeft: '1px' }}
                                                    />
                                                    <span style={{ position: 'absolute', right: '5px', top: "0px" }}> Qty</span>
                                                  </span>
                                                </div>
                                                : null
                                            }
                                          </TableCell>
                                        </TableRow>
                                      ))
                                    }
                                  </TableBody>
                                  </Table>*/}
                              </TableCell>
                              <TableCell>{row.product_code}</TableCell>
                              <TableCell>
                                {
                                  row.size_name ?
                                    <>
                                      {
                                        (row.status == 'pending' || row.status == 'on_process') && (order.status == "accepted" || order.status == "on_process") && row.product_type != 'material' ?
                                          <select onChange={(e) => this.handleSizeChange(e, row)} name="size_id" value={row.size_id}>
                                            {
                                              row.cart_data.size_materials.map((p, k) => (
                                                <option value={p.size_id} key={k}>{p.size_name}</option>
                                              ))
                                            }
                                          </select>
                                          :
                                          row.size_name
                                      }
                                    </>
                                    : null
                                }
                              </TableCell>
                              <TableCell>{row.quantity}</TableCell>
                              {
                                order.is_customer || order.is_retailer ?
                                  <>
                                    <TableCell>{row.old_rate}</TableCell>
                                    <TableCell>{row.rate}</TableCell>
                                  </>
                                  : null
                              }
                              <TableCell>
                                {row.worker_name}
                                {
                                  row.status == 'on_process' ?
                                    <>
                                      {
                                        this.isRecieving(row) ?
                                          <>
                                            <div>
                                              <button onClick={() => this.handleReciveSubmit(row)} className='receive_btn' style={{
                                                marginBottom: '2px'
                                              }}>Submit</button>
                                            </div>
                                            <div>
                                              <button onClick={() => this.handleCancelRecive()} className='receive_cancel_btn'>Cancel</button>
                                            </div>
                                          </>
                                          :
                                          <div>
                                            <button onClick={() => this.handleRecive(row)} className='receive_btn'>Receive</button>
                                          </div>
                                      }

                                    </>
                                    :
                                    <>
                                      {
                                        row.status == 'received' ?
                                          <div>
                                            <button className='receive_success_btn'>Received</button>
                                          </div>
                                          : null
                                      }
                                    </>
                                }

                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
                {
                  Object.keys(action_products).length > 0 ?
                    <Grid item xs={12} md={12} style={{ paddingBottom: '15px' }}>
                      <Stack spacing={1} direction="row" className='ratn-footer-buttons' justifyContent="flex-end">
                        <Button variant="contained" className='conf-button' type="button" onClick={this.handleProductConfirmSubmit}>Send</Button>
                      </Stack>
                    </Grid>
                    : null
                }
              </Grid>

              <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.saleDialog}
                onClose={this.handleSaleDialogClose}
                fullWidth
                maxWidth="xs"
              >
                <DialogTitle>
                  Sale Order
                </DialogTitle>
                <DialogContent>
                  Are you sure want to sale this order?
                  {
                    (order.is_customer && order.paid_amount > 0) ?
                      <>
                        <FormControl>
                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={this.state.from_order_price}
                            onChange={(e) => this.setState({ from_order_price: e.target.value })}
                          >
                            <FormControlLabel value={1} control={<Radio />} label="Price will be same as order price." />
                            <FormControlLabel value={0} control={<Radio />} label="Price will be same as current price." />
                          </RadioGroup>
                        </FormControl>
                      </>
                      :
                      <FormControl>
                        <RadioGroup
                          row
                          name="row-radio-buttons-group"
                          value={this.state.from_order_price}
                        >
                          <FormControlLabel value={0} control={<Radio />} label="Price will be same as current price." />
                        </RadioGroup>
                      </FormControl>
                  }
                </DialogContent>
                <DialogActions>
                  <Stack spacing={2} direction="row" justifyContent="flex-end">
                    <Button variant="outlined" onClick={this.handleSaleDialogClose}>Cancel</Button>
                    <Button variant="contained" type="button" onClick={this.handleSaleSubmit}>Yes, Confirm</Button>
                  </Stack>
                </DialogActions>
              </Dialog>

              <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.openDialog}
                onClose={this.handleDialogClose}
                fullWidth
                maxWidth="xs"
              >
                <DialogTitle>
                  Order Status
                </DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  <Box sx={{ flexGrow: 1, m: 0.5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className='create-input'>
                        <FormControl fullWidth>
                          <InputLabel>Order Status</InputLabel>
                          <Select
                            className='input-inner'
                            value={this.state.order_status}
                            fullWidth
                            label="Order Status"
                            onChange={(e) => this.setState({ order_status: e.target.value })}
                          >
                            {
                              statusArr.map((item, key) => (
                                <MenuItem value={item.value} key={key}>{item.label}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      {
                        this.state.order_status == 'accepted' ?
                          <Grid item xs={12} md={12} className='create-input'>
                            <TextareaAutosize
                              className='description'
                              minRows={3}
                              placeholder="Notes"
                              style={{ width: '100%' }}
                              value={this.state.notes}
                              onChange={(e) => this.setState({ notes: e.target.value })}
                            />
                          </Grid>
                          : null
                      }
                      <Grid item xs={12}>
                        <Stack spacing={1} direction="row" justifyContent="flex-end">
                          <Button variant="contained" type="button" disabled={this.state.processing || (this.state.order && this.state.order.status == this.state.order_status)} onClick={this.handleSubmit}>
                            {
                              this.state.processing ? "Processing" : "Submit"
                            }
                          </Button>
                          <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
              </Dialog>

              <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.productDialog}
                onClose={this.handleProductDialogClose}
                fullWidth
                maxWidth="xs"
              >
                <DialogTitle>
                  Send Material
                </DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  <Box sx={{ flexGrow: 1, m: 0.5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className='create-input'>
                        <FormControl fullWidth error={this.state.user_id_err}>
                          <InputLabel>Worker</InputLabel>
                          <Select
                            value={this.state.user_id}
                            label='Worker'
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
                      <Grid item xs={12}>
                        <Stack spacing={1} direction="row" justifyContent="flex-end">
                          <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleProductSubmit}>
                            {
                              this.state.processing ? "Processing" : "Submit"
                            }
                          </Button>
                          <Button variant="outlined" onClick={this.handleProductDialogClose}>Cancel</Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
              </Dialog>

              <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.receiveDialog}
                onClose={this.handleReceiveDialogClose}
                fullWidth
                maxWidth="xs"
              >
                <DialogTitle>
                  Receive Product
                </DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  <Box sx={{ flexGrow: 1, m: 0.5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className='create-input'>
                        Are you sure want to received ?
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1} direction="row" justifyContent="flex-end">
                          <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleReceiveSubmitProceed}>
                            {
                              this.state.processing ? "Processing" : "Submit"
                            }
                          </Button>
                          <Button variant="outlined" onClick={this.handleReceiveDialogClose}>Cancel</Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
              </Dialog>

              <Dialog onClose={this.handleImageDialogClose} open={this.state.imageDialogOpen}>
                <DialogTitle>
                  <CloseIcon sx={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' }} onClick={this.handleImageDialogClose} />
                </DialogTitle>
                <DialogContent>
                  <img src={this.state.imagePath} width={500} height={350} />
                </DialogContent>
              </Dialog>

            </>
        }


      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  employeeList: state.superadmin.employee.items
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      employeeList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderView)));



function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const sl_no = index + 1;
  const odd_even_class = sl_no % 2 == 0 ? 'even' : 'odd';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={odd_even_class}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {(sl_no <= 9) ? '0' + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.product_name}
        </TableCell>
        <TableCell>{row.category_name}</TableCell>
        <TableCell>{row.certificate_no}</TableCell>
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.quantity}</TableCell>
      </TableRow>
      <TableRow className={'table-inner-row sub_table ' + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="orders">
                <TableHead>
                  <TableRow className='pur-details-inner-table'>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='pur-details-table-body'>
                  {row.materials.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell scope="row">
                        {item.material_name}
                      </TableCell>
                      <TableCell>{item.purity_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.unit_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
