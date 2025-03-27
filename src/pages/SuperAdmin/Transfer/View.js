import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography} from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { salesView } from 'actions/superadmin/sales.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { paymentStore, paymentList } from 'actions/superadmin/payment.actions';

class TransferViewPage extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      sale: this.props.sale,
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
        table_type: "sale",
        is_assigned: true
      },
      auth: this.props.auth,
    }

  }

  componentDidMount() {
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.sale !== state.sale) {
      update.sale = props.sale;
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

  componentDidUpdate(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadViewData();
    }
  }

  loadViewData = () => {
    this.props.actions.salesView(this.props.params.id);
  }

  render() {
    const { sale } = this.state;
    return (
      <MainCard title="Transfer Details">
        
          {
            !sale ?
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
              :
              <>
                <div className='return-wrapper'>
                  <div className='return-header'>
                    <p>Transfer Date: {sale.invoice_date}</p>
                    {
                    sale.notes ? 
                    <p>Notes: {sale.notes}</p>
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
                            <TableCell>Transfer Date</TableCell>
                            <TableCell>Transfer Number</TableCell>
                            <TableCell>Transfer To</TableCell>
                            <TableCell>No. of Products</TableCell>
                            <TableCell>Accept/Declined At</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className='pur-details-table-body'>
                              <TableRow>
                                <TableCell component="th" scope="row">{sale.invoice_date}</TableCell>
                                <TableCell>{sale.invoice_number}</TableCell>
                                <TableCell>{sale.user_name}</TableCell>
                                <TableCell>{sale.no_of_products}</TableCell>
                                <TableCell>{sale.accept_declined_at}</TableCell>
                                <TableCell className="sales-status">{sale.approve_status}</TableCell>
                              </TableRow>
                       </TableBody>
                      </Table>
                    </div>
                  </TableContainer> 
                </Grid>
                </Grid>
                <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12}>
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
                            <TableCell>Sub Total</TableCell>
                            <TableCell>Making Charge</TableCell>
                            <TableCell colSpan="2">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sale.products.map((row, i) => (
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

        
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  sale: state.superadmin.sales.sale,
  actionCalled: state.superadmin.payment.actionCalled,
  createSuccess: state.superadmin.payment.createSuccess,
  successMessage: state.superadmin.payment.successMessage,
  errorMessage: state.superadmin.payment.errorMessage,
  items: state.superadmin.payment.items,
  total: state.superadmin.payment.total,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      salesView,
      paymentStore,
      paymentList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferViewPage)));



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
