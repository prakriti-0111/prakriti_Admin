import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button, Stack } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { cartList, cartDelete } from 'actions/distributor/cart.actions';
import { withSnackbar } from 'notistack';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getNewlineText } from 'src/helpers/helper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {DISTRIBUTOR_CART_RESET} from '../../actionTypes/distributor/cart.types';

class CartPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      deleteDialogOpen: false,
      deleteRow: null,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      orderDialog: false
    }

  }

  componentDidMount() {
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }
    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
    }
    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }
    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }
    if(props.errorMessage !== state.errorMessage){
      update.errorMessage = props.errorMessage;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.cartList();
  }

  handleRemove = (item) => {
    this.setState({
      deleteDialogOpen: true,
      deleteRow: item
    })
  }

  handleClose = (e, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      deleteDialogOpen: false
    })
  }

  handleDelete = () => {
    this.props.actions.cartDelete(this.state.deleteRow.id)
  }

  componentDidUpdate(prevProps){
    if(this.state.actionCalled){
        if(this.state.deleteSuccess){
            this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
            this.props.dispatch({
                type: DISTRIBUTOR_CART_RESET
            });
            this.setState({
              deleteDialogOpen: false
            })
            this.props.actions.cartList();
        }else{
            this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
            this.props.dispatch({
                type: DISTRIBUTOR_CART_RESET
            });
        }
    }
  }

  handlePlaceOrderConfirm = () => {
    this.setState({
      orderDialog: true
    })
  }

  handleOrderDialogClose = (e, reason) => {
    if(reason && reason == "backdropClick")return;
    this.setState({
      orderDialog: false
    })
  }

  handlePlaceOrder = () => {
    
  }

  render() {

    return (
      <>
        <MainCard title="Carts" secondary={<Button variant="contained" onClick={() => this.handlePlaceOrderConfirm }>Place Order</Button>}>
          <Grid container spacing={gridSpacing}>
          <TableContainer component={Paper} className='ratn-table-wrapper'>
          <Table sx={{ minWidth: 500 }}>
            <TableHead className='ratn-table-header'>
              <TableRow>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Product Name
                </TableCell>
                <TableCell>
                  Product Type
                </TableCell>
                <TableCell>
                  Size
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {
                      item.images.length ? 
                      <img src={item.images[0].path} height="100px" width="100px" />
                      : null
                    }
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.product_type_diplay}</TableCell>
                  <TableCell>{item.sizeName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => this.handleRemove(item)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {
                this.state.items == 0 ?
                  <TableRow>
                    <TableCell align="center" colSpan="6">
                
                      No data found.
                    
                    </TableCell>
                  </TableRow>
                  : null
              }

            </TableBody>
            </Table>
            </TableContainer>
          </Grid>

          <Dialog
            className='ratn-dialog-footer delete_modal'
            open={this.state.deleteDialogOpen}
            onClose={this.handleClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure want to remove this product from cart?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div className='ratn-footer-buttons'>
                <Button onClick={this.handleClose} className='close-button'>Close</Button>
                <Button onClick={this.handleDelete} className='conf-button'>Yes, Confirm</Button>
              </div>
            </DialogActions>
          </Dialog>

          <Dialog
            className='ratn-dialog-footer delete_modal'
            open={this.state.orderDialog}
            onClose={this.handleOrderDialogClose}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Place Order</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure want to place order?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div className='ratn-footer-buttons'>
                <Button onClick={this.handleOrderDialogClose} className='close-button'>Close</Button>
                <Button onClick={this.handlePlaceOrder} className='conf-button'>Yes, Confirm</Button>
              </div>
            </DialogActions>
          </Dialog>
        </MainCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.distributor.cart.items,
  total: state.distributor.cart.total,
  actionCalled: state.distributor.cart.actionCalled,
  deleteSuccess: state.distributor.cart.deleteSuccess,
  successMessage: state.distributor.cart.successMessage,
  errorMessage: state.distributor.cart.errorMessage
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      cartList,
      cartDelete
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage)));
