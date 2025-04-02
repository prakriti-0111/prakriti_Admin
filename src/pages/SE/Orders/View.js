import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, TextField, Stack, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, TextareaAutosize, ImageList, ImageListItem } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { orderViewRaw } from 'actions/se/order.actions';
import { orderUpdateStatus, orderSaleProceed } from 'actions/superadmin/order.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getRoleName, getUserDashboardRoute, isEmpty } from 'src/helpers/helper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataTable from 'src/utils/DataTable';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

class OrderViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: null,
      auth: this.props.auth,
      openDialog: false,
      order_status: '',
      advance_amount: '',
      processing: false,
      saleDialog: false,
      from_order_price: 0,
      imagePath: '',
      imageDialogOpen: false,
      payment_mode: 'cash',
      cheque_no: '',
      notes: '',
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

  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(previousProps) {
    if (previousProps.params.id != this.props.params.id) {
      this.loadViewData();
    }
  }

  loadViewData = () => {
    orderViewRaw(this.props.params.id)
    .then(res => {
      if(res.data.data){
        this.setState({
          order: res.data.data,
          notes: res.data.data.notes
        })
      }
    })
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
    let res = await orderUpdateStatus(this.state.order.id, { status: this.state.order_status, advance_amount: this.state.advance_amount, payment_mode: this.state.payment_mode, cheque_no: this.state.cheque_no, notes: this.state.notes });
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

  render() {
    const { order } = this.state;
    return (
      <MainCard title="Order Details" secondary={
        <Stack spacing={1} direction="row" justifyContent="flex-end">
          {
            order && order.status != 'delivered' && order.status != 'cancelled' && order.status != 'declined' ?
              <Button variant="contained" onClick={this.handleSale}>Sale</Button>
              : null
          }
          <Button variant="contained" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/orders')}>Back</Button>
        </Stack>
      }>

        {
          !order ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
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
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Status"
                    variant="outlined"
                    fullWidth
                    value={order.status_display}
                    readOnly
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
                  <DataTable
                    columns={this.columns}
                    rows={order.products}
                    page={1}
                    limit={order.products.length}
                    total={order.products.length}
                    havePagination={false}
                  />
                </Grid>
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
            </>
        }

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
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                      <MenuItem value="declined">Declined</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {
                  this.state.order_status == "accepted" ?
                    <>
                      <Grid item xs={12} md={12} className='create-input'>
                        <TextField
                          label="Advance Amount"
                          variant="outlined"
                          fullWidth
                          value={this.state.advance_amount}
                          onChange={(e) => this.setState({ advance_amount: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12} className='create-input'>
                        <FormControl fullWidth >
                          <InputLabel>Payment Mode</InputLabel>
                          <Select
                            className='input-inner'
                            value={this.state.payment_mode}
                            fullWidth
                            label="Payment Mode"
                            onChange={(e) => this.setState({ payment_mode: e.target.value })}
                          >
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="cheque">Cheque</MenuItem>
                            <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {
                        this.state.payment_mode == "cheque" ?
                          <Grid item md={12} xs={12} className='create-input'>
                            <TextField
                              label="Cheque No"
                              variant="outlined"
                              fullWidth
                              value={this.state.cheque_no}
                              onChange={(e) => this.setState({ cheque_no: e.target.value })}
                            />
                          </Grid>
                          : null
                      }
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
                    </>
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

        <Dialog onClose={this.handleImageDialogClose} open={this.state.imageDialogOpen}>
          <DialogTitle>
            <CloseIcon sx={{ cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' }} onClick={this.handleImageDialogClose} />
          </DialogTitle>
          <DialogContent>
            <img src={this.state.imagePath} width={500} height={350} />
          </DialogContent>
        </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderViewPage)));



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
