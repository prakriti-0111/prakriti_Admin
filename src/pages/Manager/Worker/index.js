import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { workerList, workerDelete } from 'actions/manager/worker.actions';
import DataTable from 'src/utils/DataTable';
import {DELETE_WORKER} from '../../../actionTypes/manager/worker.types';

class WorkerPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50
      },
      deleteSuccess: this.props.deleteSuccess,
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'email',
        display_name: 'Email'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
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

    return update;
  }

  loadListData = () => {
    console.log('worker list from m - worker')
    this.props.actions.workerList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  handleEdit = (row) => {
    this.props.navigate('edit/' + row.id);
  }

  handleDelete = (row) => {
    this.props.actions.workerDelete(row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      dispatch({
        type: DELETE_WORKER,
        payload: false
      });
      this.handlePagination(1);
    }
  }

  render() {    
    
    return (
      <MainCard title="Workers" secondary={<Button variant="contained" onClick={() => this.props.navigate('create') }>Add</Button>} >
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
  items: state.manager.worker.items,
  total: state.manager.worker.total,
  deleteSuccess: state.manager.worker.deleteSuccess
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({workerList, workerDelete}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerPage));
