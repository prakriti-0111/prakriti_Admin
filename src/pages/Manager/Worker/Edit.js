import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import WorkerForm from 'forms/Manager/WorkerForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { workerFetch, workerUpdate } from 'actions/manager/worker.actions';
import {UPDATE_WORKER} from '../../../actionTypes/manager/worker.types';

class WorkerEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      success: this.props.success,
      item: this.props.item,
      id: this.props.params.id,
    }
  }

  componentDidMount(){
    this.props.actions.workerFetch(this.state.id);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.editSuccess !== state.editSuccess){
      update.editSuccess = props.editSuccess;
    }

    if(props.item !== state.item){
      update.item = props.item;
    }


    return update;
  }

  submit = (data) => {
    this.props.actions.workerUpdate(this.state.id, data);
  }

  componentDidUpdate(){
    if(this.state.editSuccess){
      this.props.dispatch({
        type: UPDATE_WORKER,
        payload: false
      });
      this.props.navigate('/manager/workers')
    }
  }

  render() {
    return (
      <MainCard title="Worker Edit1">
        <div>
          {
            this.state.item ? 
            <WorkerForm onSubmit={this.submit} formData={this.state.item} />
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
  item: state.manager.worker.item || null,
  editSuccess: state.manager.worker.editSuccess || false,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({workerFetch, workerUpdate}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerEditPage));
