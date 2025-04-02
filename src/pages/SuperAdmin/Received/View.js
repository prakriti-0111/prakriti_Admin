import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Chip, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { purchaseView, purchaseStatusChange } from 'actions/superadmin/purchase.actions';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { paymentStore, paymentList } from 'actions/superadmin/payment.actions';
import {SUPERADMIN_RESET_PAYMENT} from '../../../actionTypes/superadmin/payment.types';

class ReceivedViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      purchase: this.props.purchase,
      openDialog: false,
      actionCalled: this.props.actionCalled,
      createSuccess: this.props.createSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      processing: false,
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        date_from: null,
        date_to: null,
        table_type: "purchase",
        is_assigned: true
      },
      confirmDialog: false,
      status_changing: 0,
      auth: this.props.auth,
      wallet_balance: 0,
      decline_type: 'advance'
    }


  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.purchase !== state.purchase) {
      update.purchase = props.purchase;
    }
    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if(props.createSuccess !== state.createSuccess){
        update.createSuccess = props.createSuccess;
    }
    if(props.successMessage !== state.successMessage){
        update.successMessage = props.successMessage;
    }
    
    if(props.errorMessage !== state.errorMessage){
        update.errorMessage = props.errorMessage;
    }
    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
        update.total = props.total;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    return update;
  }

  componentDidUpdate(prevProps){
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }
    if(this.state.actionCalled){
      if(this.state.createSuccess){
        this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
        this.setState({
            processing: false,
            openDialog: false,
            queryParams: {
              ...this.state.queryParams,
              page: 1
            }
        });
        this.loadViewData();
      }else{
        this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
        this.setState({
            processing: false
        });
      }
      this.props.dispatch({
        type: SUPERADMIN_RESET_PAYMENT
      });
    }
    
  }

  loadViewData = () => {
    this.props.actions.purchaseView(this.props.params.id);
  }

  handleStatusChange = async(val) =>{
    this.setState({
      status_changing: val,
      confirmDialog: true
    })
    
  }

  handleConfirmSubmit = async() => {
    let data = {approve_status: this.state.status_changing, decline_type: this.state.decline_type};
    let status_response = await purchaseStatusChange(this.props.params.id, data);
    if(status_response.data.success == true){
        this.props.enqueueSnackbar(status_response.data.message, {variant: 'success'});
        this.setState({
          confirmDialog: false
        });
        this.loadViewData();
    }else{
        this.props.enqueueSnackbar(status_response.data.message, {variant: 'error'});
    }
  }

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: false
    })
  }

  render() {
    const { purchase } = this.state;
    return (
      <MainCard title="Received Details">
        
          {
            !purchase ?
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
              :
              <>
              <div className='return-wrapper'>
                <div className='return-header'>
                  <p>Received</p>
                  <p>Received Date: {purchase.invoice_date}</p>
                  {
                    purchase.notes ? 
                    <p>Notes: {purchase.notes}</p>
                    : null
                  }
                </div>
                <div className=''>
                  <Button className="add-button" variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>
                </div>
              </div>
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12}>
                <TableContainer component={Paper}>
                <div className='ratn-table-purchase-wrapper'>
                  <Table aria-label="collapsible table" className='invoice_product_list'>
                    <TableHead className='ratn-table-header'>
                      <TableRow>
                        <TableCell>Received Date</TableCell>
                        <TableCell>Received Number</TableCell>
                        <TableCell>Received From</TableCell>
                        <TableCell>No. of Products</TableCell>
                        <TableCell>Accept/Declined At</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className='pur-details-table-body'>
                          <TableRow>
                            <TableCell component="th" scope="row">{purchase.invoice_date}</TableCell>
                            <TableCell>{purchase.invoice_number}</TableCell>
                            <TableCell>{purchase.supplier_name}</TableCell>
                            <TableCell>{purchase.no_of_products}</TableCell>
                            <TableCell>{purchase.accept_declined_at}</TableCell>
                            <TableCell className="sales-status">{purchase.approve_status}</TableCell>
                          </TableRow>
                  </TableBody>
                  </Table>
                </div>
                </TableContainer> 
                </Grid>
              </Grid>
              {
                purchase.is_approved == 0 ?
                <div className='sale-view-button'>
                  <Button variant="contained" className='primary accept' onClick={() => this.handleStatusChange(1)}>Accept</Button>
                  <Button variant="contained" className='danger decline' onClick={() => this.handleStatusChange(2)}>Decline</Button>
                </div>
                : null
              }
              <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12} className="p-add-product create-input">
                  <h3 className='p_heading_list'>Product List</h3>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell />
                            <TableCell>#</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Certificate Number</TableCell>
                            <TableCell>Total Weight</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Making Charge</TableCell>
                            <TableCell>Sub Total</TableCell>
                            <TableCell colSpan="2">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {purchase.products.map((row, i) => (
                            <Row key={i} row={row} index={i}  />
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
                    this.state.status_changing == 1 ? "Accept" : "Decline"
                  }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {
                        this.state.status_changing == 1 ?
                        "Are you sure want to accept this?"
                        :
                        "Are you sure want to decline this?"
                      }
                    </DialogContentText>
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
  purchase: state.superadmin.purchase.purchase,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  items: state.superadmin.payment.items,
  total: state.superadmin.payment.total,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      purchaseView,
      paymentStore,
      paymentList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceivedViewPage)));



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
