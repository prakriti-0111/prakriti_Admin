import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salesExecutiveList } from 'actions/distributor/salesExecutive.actions';
import DataTable from 'src/utils/DataTable';

class SalesExecutivePage extends Component {

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
      },
      {
        name: 'adhar',
        display_name: 'Adhar'
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

    return update;
  }

  loadListData = () => {
    this.props.actions.salesExecutiveList(this.state.queryParams);
  }

  handlePagination = (page) => {
    this.state.queryParams.page = page;
    this.loadListData();
  }

  render() {    
    
    return (
      <MainCard title="Sales Executives" >
        <Grid container spacing={gridSpacing} className="abc">
          <DataTable 
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.distributor.salesExecutive.items,
  total: state.distributor.salesExecutive.total
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({salesExecutiveList}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesExecutivePage));
