import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { shipOrderList } from 'actions/distributor/shipOrder.actions';
import DataTable from 'src/utils/DataTable';

import { withSnackbar } from 'notistack';


class SizePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
     
    }
    this.columns = [
      {
        name: 'order_no',
        display_name: 'Order #'
      },
      {
        name: 'status',
        display_name: 'Status'
      },
      {
        name: 'order_date',
        display_name: 'Order Date'
      },
    ];
    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      },
    ];
    
  }

  componentDidMount(){
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.items !== state.items){
      update.items = props.items;
    }

    if(props.total !== state.total){
      update.total = props.total;
    }


    return update;
  }

  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadListData();
    })
    
  }

  loadListData = () => {
    this.props.actions.shipOrderList(this.state.queryParams);
  }

  handleView = (row) => {
    this.props.navigate('view/' + row.id);
  }


  render() {
    
    return (
      <MainCard title="Ship Orders"  >
        <Grid container spacing={gridSpacing} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className="abc">
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={this.tableActions}
          />
        </Grid>

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.distributor.shipOrder.items,
  total: state.distributor.shipOrder.total,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({shipOrderList}, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SizePage)));
