import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import WorkerForm from 'forms/Manager/WorkerForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { workerFetch, workerUpdate } from 'actions/manager/worker.actions';
import {UPDATE_WORKER} from '../../../actionTypes/manager/worker.types';
import StockHistoryForm from 'forms/Manager/StockHistoryForm';
import { stockHistoryFetch } from 'actions/manager/stockHistory.actions';

class StockHistoryEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      stockHistory: this.props.stockHistory,
      id: this.props.params.id,
    }
  }

  componentDidMount(){
    this.props.actions.stockHistoryFetch(this.props.params.id);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.stockHistory !== state.stockHistory){
      update.stockHistory = props.stockHistory;
    }

    return update;
  }


  render() {
    return (
      <MainCard title="Stock History Edit">
        <div>
          {
            this.state.stockHistory ? 
            <StockHistoryForm formData={this.state.stockHistory} />
            : 
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          }
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  stockHistory: state.manager.stockHistory.stockHistory
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({stockHistoryFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockHistoryEditPage));
