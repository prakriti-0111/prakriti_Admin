import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress  } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { shipOrderView } from 'actions/distributor/shipOrder.actions';
import { bindActionCreators } from 'redux';



class ShipOrderViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: this.props.order
    }
    

  }

  componentDidMount(){
    console.log('hello')
    console.log(this.state)
    this.loadViewData();
  }

  static getDerivedStateFromProps(props, state){
    console.log(props)
    let update = {};
    if(props.order !== state.order){
      update.order = props.order;
    }

    return update;
  }

  loadViewData = () => {
    this.props.actions.shipOrderView(this.props.params.id);
  }
  
  render() {
    const {order} = this.state;
    return (
      <MainCard title="Ship Order Details">
        <Grid container spacing={gridSpacing} className="abc">
            {
                !order ? 
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
                :
                <>
                    <Grid item xs={2}>
                        <p><span>Supplier: </span> <br />{order.supplier_name}, {order.supplier_mobile}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Order Number: </span> <br /> {order.order_no}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Order Date: </span> <br /> {order.order_date}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Delivery Address: </span> <br /> {order.delivery_address}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Payment Mode: </span>  <br />{order.payment_mode_display}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Sub Total: </span> <br /> {order.sub_total}</p>
                    </Grid>
                    <Grid item xs={1}>
                        <p><span>Discount: </span>  <br />{order.discount_amount}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p><span>Total: </span>  <br />{order.total_amount}</p>
                    </Grid>
                </>
            }
            
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
    order: state.distributor.shipOrder.order
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({
      shipOrderView,
    }, dispatch)
  }
};  


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ShipOrderViewPage)));



