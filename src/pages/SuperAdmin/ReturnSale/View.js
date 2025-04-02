import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { returnSaleView, returnSaleUpdateStatus } from 'actions/superadmin/returnSale.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { isSuperAdmin, isDistributor, isAdmin, isSalesExecutive, ucWords, getRoleName, getUserDashboardRoute } from 'src/helpers/helper';

class ReturnSaleViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      returnSale: this.props.returnSale,
      confirmDialog: false,
      status_changing: '',
      auth: this.props.auth,
    }

    this.isSuperAdmin = isSuperAdmin();
    this.isAdmin = isAdmin();
    this.isDistributor = isDistributor();
    this.isSalesExecutive = isSalesExecutive();
  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.returnSale !== state.returnSale) {
      update.returnSale = props.returnSale;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }
  }

  loadViewData = () => {
    this.props.actions.returnSaleView(this.props.params.id);
  }

  handleStatusChange = async (val) => {
    this.setState({
      status_changing: val,
      confirmDialog: true
    })

  }

  handleConfirmSubmit = async () => {
    let data = { status: this.state.status_changing };
    let status_response = await returnSaleUpdateStatus(this.props.params.id, data);
    if (status_response.data.success == true) {
      this.props.enqueueSnackbar(status_response.data.message, { variant: 'success' });
      this.setState({
        confirmDialog: false
      });
      this.loadViewData();
      if (this.state.status_changing == 'complete') {
        this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases/create?return_sale=' + this.props.params.id);
      }
    } else {
      this.props.enqueueSnackbar(status_response.data.message, { variant: 'error' });
    }
  }

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false
    })
  }

  render() {
    const { returnSale } = this.state;
    return (
      <MainCard title="Return Sale Details" secondary={
        <>
          {
            returnSale ?
              <>
                {
                  returnSale.status == 'pending' ?
                    <Chip label={returnSale.status_display} color="primary" className='approved_status' />
                    :
                    <>
                      {
                        returnSale.status == 'accepted' || returnSale.status != 'declined' ?
                          <Chip label={returnSale.status_display} color="success" className='approved_status' />
                          :
                          <Chip label={returnSale.status_display} color="error" className='approved_status' />
                      }
                    </>
                }
              </>
              : null
          }
          &nbsp; <Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>
        </>
      }>

        {
          !returnSale ?
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
            :
            <>
              <Grid container spacing={2} className='loans_view p_view'>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Owner"
                    variant="outlined"
                    fullWidth
                    value={`${returnSale.user_name}, ${returnSale.user_mobile}`}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Invoice Number"
                    variant="outlined"
                    fullWidth
                    value={returnSale.invoice_number}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Invoice Date"
                    variant="outlined"
                    fullWidth
                    value={returnSale.invoice_date}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Return Date"
                    variant="outlined"
                    fullWidth
                    value={returnSale.return_date}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Bill Amount"
                    variant="outlined"
                    fullWidth
                    value={returnSale.bill_amount}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2} className='create-input'>
                  <TextField
                    label="Total Return"
                    variant="outlined"
                    fullWidth
                    value={returnSale.return_amount}
                    disabled
                    InputProps={{
                      className: "non_disable_text"
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={9} className='create-input'>

                </Grid>
                <Grid item xs={12} md={3} className='create-input'>
                  <div className='sale-view-button'>
                  {
                    this.isSalesExecutive || this.isDistributor ?
                      <>
                        {
                          returnSale.status == 'pending' ?
                            <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('send_to_superadmin')}>Send to Superadmin</Button>
                            :
                            <>
                              {
                                returnSale.status == 'superadmin_declined' ?
                                  <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('declined_accept')}>Declined Accept</Button>
                                  :
                                  <>
                                    {
                                      returnSale.status == 'declined_accept' ?
                                        <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('send_to_customer')}>Send to Customer</Button>
                                        : null
                                    }
                                  </>
                              }
                            </>
                        }
                      </>
                      :
                      <>
                        {
                          this.isSuperAdmin ?
                            <>
                              {
                                returnSale.from_retailer_customer ?
                                  <>
                                    {
                                      returnSale.status == 'send_to_superadmin' ?
                                        <>
                                          <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('superadmin_accepted')}>Accept</Button>
                                          <Button variant="contained" className='danger decline' onClick={() => this.handleStatusChange('superadmin_declined')}>Decline</Button>
                                        </>
                                        :
                                        <>
                                          {
                                            returnSale.status == 'superadmin_accepted' ?
                                              <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('complete')}>Purchase</Button>
                                              : null
                                          }
                                        </>
                                    }
                                  </>
                                  :
                                  <>
                                    {
                                      returnSale.status == 'pending' ?
                                        <>
                                          <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('accepted')}>Accept</Button>
                                          <Button variant="contained" className='danger decline' onClick={() => this.handleStatusChange('declined')}>Decline</Button>
                                        </>
                                        : null
                                    }
                                  </>
                              }
                            </>
                            :
                            <>
                              {
                                returnSale.status == 'pending' ?
                                  <>
                                    <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange('accepted')}>Accept</Button>
                                    <Button variant="contained" className='danger decline' onClick={() => this.handleStatusChange('declined')}>Decline</Button>
                                  </>
                                  : null
                              }
                            </>
                        }
                      </>
                  }
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12} className="p-add-product create-input">
                  <h3 className='p_heading_list'>Return Products</h3>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table">
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Certificate Number</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {returnSale.products.map((row, i) => (
                            <Row key={i} row={row} index={i} />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
        }

        <Dialog
          open={this.state.confirmDialog}
          onClose={this.handleConfirmDialogClose}
          fullWidth
          maxWidth="xs"
          className="ratn-dialog-wrapper"
        >
          <DialogTitle>
            {
              ucWords((this.state.status_changing.split("_")).join(" "))
            }
          </DialogTitle>
          <DialogContent>
            {
              returnSale ?
                <DialogContentText id="alert-dialog-slide-description">
                  {
                    this.state.status_changing == 'accepted' ?
                      `Are you sure want to accept this return? Request ${returnSale.return_amount_from_wallet} amount to ${returnSale.payment_type} by payment mode ${returnSale.return_payment_mode}.`
                      :
                      <>
                        {
                          this.state.status_changing == 'declined' ?
                            `Are you sure want to decline this return? Request ${returnSale.return_amount_from_wallet} amount to ${returnSale.payment_type}.`
                            :
                            `Are you sure want to ${ucWords((this.state.status_changing.split("_")).join(" "))} this return?`
                        }
                      </>

                  }
                </DialogContentText>
                : null
            }
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={this.handleConfirmDialogClose}>Cancel</Button>
              <Button variant="contained" type="button" onClick={this.handleConfirmSubmit}>Yes, Confirm</Button>
            </Stack>
          </DialogActions>
        </Dialog>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  returnSale: state.superadmin.returnSale.returnSale,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      returnSaleView
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnSaleViewPage)));



function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(true);
  const sl_no = index + 1;
  let odd_even_class = sl_no % 2 == 0 ? 'even' : 'odd';
  if (row.is_return) {
    odd_even_class += ' strike_through';
  }
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={odd_even_class}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="expand_icon"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{color: "#fff"}}>
          {sl_no <= 9 ? "0" + sl_no : sl_no}
        </TableCell>
        <TableCell component="th" scope="row"  style={{color: "#fff"}}>
          {row.product_name}
        </TableCell>
        <TableCell  style={{color: "#fff"}}>{row.category_name}</TableCell>
        <TableCell  style={{color: "#fff"}}>{row.certificate_no}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total_weight}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.size_name}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.making_charge}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.rep}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.sub_total}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total_discount}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.tax}</TableCell>
        <TableCell style={{color: "#fff"}}>{row.total}</TableCell>
      </TableRow>
      <TableRow className={"table-inner-row sub_table " + odd_even_class}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow className="pur-details-inner-table">
                    <TableCell className={odd_even_class}>Material Name</TableCell>
                    <TableCell className={odd_even_class}>Purity</TableCell>
                    <TableCell className={odd_even_class}>Quantity</TableCell>
                    <TableCell className={odd_even_class}>Total Weight</TableCell>
                    {row.product_code == ""?<TableCell className={odd_even_class}>Pakka Weight</TableCell>:""}
                    <TableCell className={odd_even_class}>Unit</TableCell>
                    <TableCell className={odd_even_class}>Rate</TableCell>
                    <TableCell className={odd_even_class}>Amount</TableCell>
                    <TableCell className={odd_even_class}>Dist</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pur-details-table-body">
                  {row.materials.map((item, i) =>
                    !(item.weight == 0 && item.quantity == 0) ? (
                      <TableRow key={i}>
                        {/* {console.log(
                          "---------------- view",
                          item.weight != 0 ||
                            (item.quantity != 0 && item.rate != 0.0)
                        )}
                        {console.log(
                          "--------------row.materials",
                          row.materials
                        )} */}
                        <TableCell scope="row" className={odd_even_class}>{item.material_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.purity_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.quantity}</TableCell>
                        <TableCell className={odd_even_class}>{item.weight}</TableCell>
                        {row.product_code == ""?<TableCell className={odd_even_class}>{item.pakka_weight}</TableCell>:""}
                        <TableCell className={odd_even_class}>{item.unit_name}</TableCell>
                        <TableCell className={odd_even_class}>{item.rate}</TableCell>
                        <TableCell className={odd_even_class}>{item.amount}</TableCell>
                        <TableCell className={odd_even_class}>{item.discount_amount}</TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
