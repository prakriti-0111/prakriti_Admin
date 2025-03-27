import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, TextField, TextareaAutosize, InputLabel, ImageList, ImageListItem } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { orderView } from 'actions/admin/order.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getRoleName, getUserDashboardRoute, isEmpty } from 'src/helpers/helper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class OrderViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: this.props.order,
      imagePath: '',
      imageDialogOpen: false,
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
    if (props.order !== state.order) {
      update.order = props.order;
    }

    return update;
  }

  componentDidUpdate(previousProps) {
    if (previousProps.params.id != this.props.params.id) {
      this.loadViewData();
    }
  }

  loadViewData = () => {
    this.props.actions.orderView(this.props.params.id);
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
      <MainCard title="Order Details" secondary={<Button variant="contained" onClick={() => this.props.navigate('/admin/orders')}>Back</Button>}>
        <Grid container spacing={gridSpacing}>
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
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
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
                          <ImageListItem  onClick={() => this.handleImageClick(order.image)} className='cursor-pointer'>
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
              </>
          }
        </Grid>

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
  order: state.admin.orders.order
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      orderView,
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderViewPage)));



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          {row.product_name}
        </TableCell>
        <TableCell>{row.size_name}</TableCell>
        <TableCell>{row.quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="orders">
                <TableHead>
                  <TableRow>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Purity</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
