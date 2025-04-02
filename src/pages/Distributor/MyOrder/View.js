import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography  } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { orderView } from 'actions/distributor/myorder.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

class MyOrderViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: this.props.order
    }
    

  }

  componentDidMount(){
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.order !== state.order){
      update.order = props.order;
    }

    return update;
  }

  loadViewData = () => {
    this.props.actions.orderView(this.props.params.id);
  }
  
  render() {
    const {order} = this.state;
    return (
      <MainCard title="Order Details" className="order-details-para" secondary={<Button variant="contained" onClick={() => this.props.navigate('/distributor/my-order') }>Back</Button>}>
        <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper">
            {
                !order ? 
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
                :
                <>
                    <Grid item xs={2}>
                        <p><span>Order #: </span> <br /> {order.order_no}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Order Date: </span> <br /> {order.order_date}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Status: </span>  <br />{order.status_display}</p>
                    </Grid>

                    <Grid item xs={12}>
                      <TableContainer component={Paper} className='ratn-table-wrapper table-wrapper-heading'>
                        <Table aria-label="collapsible table">
                          <TableHead className='ratn-table-header'>
                            <TableRow>
                              <TableCell />
                              <TableCell>Product Name</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Quantity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.products.map((row, i) => (
                              <Row key={i} row={row} />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                </>
            }
            
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
    order: state.distributor.myorders.order
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({
      orderView,
    }, dispatch)
  }
};  


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyOrderViewPage)));



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
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
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
                      <TableCell component="th" scope="row">
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
