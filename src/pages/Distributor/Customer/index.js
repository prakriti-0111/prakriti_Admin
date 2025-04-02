import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { customerList } from 'actions/distributor/customer.actions';
import DataTable from 'src/utils/DataTable';

class CustomerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      }
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      {
        name: 'email',
        display_name: 'Email'
      }
    ];
    this.tableActions = [
      /*{
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary'
      },
      {
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      }*/
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

  loadListData = () => {
    this.props.actions.customerList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    //this.props.actions.customerDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){

  }

  render() {    
    
    return (
      <MainCard title="Customers" >
        <Grid container spacing={gridSpacing}>
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
  items: state.distributor.customer.items,
  total: state.distributor.customer.total
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({customerList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerPage));
