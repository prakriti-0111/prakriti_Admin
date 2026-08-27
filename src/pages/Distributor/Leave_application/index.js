import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { leaveApplicationList, leaveApplicationStore, leaveApplicationFetch } from 'actions/distributor/leaveApplication.action';
import DataTable from 'src/utils/DataTable';
import {RESET_LEAVEAPPLICATION} from '../../actionTypes/distributor/leaveApplication.types';
import { withSnackbar } from 'notistack';

class LeaveApplicationPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      queryParams: {
        page: 1,
        limit: 50
      }
    }

    this.columns = [
      {
        name: 'userName',
        display_name: 'User Name'
      },
      {
        name: 'title',
        display_name: 'title'
      },
      {
        name: 'message',
        display_name: 'message'
      },
      {
        name: 'role',
        display_name: 'Role'
      },
      {
        name: 'status',
        display_name: 'status'
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

    if(props.actionCalled !== state.actionCalled){
      update.actionCalled = props.actionCalled;
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
    const userId=localStorage.getItem('auth')
    this.props.leaveApplicationFetch(JSON.parse(userId).user.id)
    // this.props.leaveApplicationList(this.state.queryParams);
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

  handleEdit = (row) => {
    this.props.navigate('Accept/' + row.id);
  }

  componentDidUpdate(previousProps, previousState){
    if(this.state.deleteSuccess){
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
      dispatch({
        type: RESET_LEAVEAPPLICATION
      });
      this.handlePagination(1);
    }
  }

  render() {
    
    return (
      <MainCard title="Leave Application" >
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
  items: state.distributor.leaveApplication.items,
  total: state.distributor.leaveApplication.total,
  actionCalled: state.distributor.leaveApplication.actionCalled,
  deleteSuccess: state.distributor.leaveApplication.deleteSuccess,
  successMessage: state.distributor.leaveApplication.successMessage
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
      leaveApplicationList,
      leaveApplicationStore,
      leaveApplicationFetch,
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveApplicationPage)));
