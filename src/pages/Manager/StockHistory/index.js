import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { stockHistoryList, stockHistoryDelete } from 'actions/manager/stockHistory.actions';
import DataTable from 'src/utils/DataTable';
import {DELETE_STOCK_HISTORY} from '../../../actionTypes/manager/stockHistory.types';
import { withSnackbar } from 'notistack';

class StockHistoryPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
    }
    this.columns = [
      {
        name: 'from_user_name',
        display_name: 'From'
      },
      {
        name: 'to_user_name',
        display_name: 'To'
      },
      {
        name: 'date',
        display_name: 'Date'
      },
      {
        name: 'materials_display',
        display_name: 'Materials',
        helper_text: 'Name - Weight - Quantity'
      },

      
    ];
    this.tableActions = [
      {
        label: 'Edit',
        onClick: this.handleEdit,
        color: 'primary'
      },
      {
        label: 'Delete',
        onClick: this.handleDelete,
        isDelete: true,
        color: 'error'
      }
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

    if(props.deleteSuccess !== state.deleteSuccess){
      update.deleteSuccess = props.deleteSuccess;
    }

    if(props.successMessage !== state.successMessage){
      update.successMessage = props.successMessage;
    }

    return update;
  }

  loadListData = () => {
    this.props.actions.stockHistoryList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.stockHistoryDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: DELETE_STOCK_HISTORY,
        payload: false
      });
      this.handlePagination(1);
    }
  }

  render() {    
    
    return (
      <MainCard title="Stock Histories" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
        <Grid container spacing={gridSpacing} className="abc">
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
  items: state.manager.stockHistory.items,
  total: state.manager.stockHistory.total,
  deleteSuccess: state.manager.stockHistory.deleteSuccess,
  successMessage: state.manager.stockHistory.successMessage
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({stockHistoryList, stockHistoryDelete}, dispatch)
  }
};  


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(StockHistoryPage)));
