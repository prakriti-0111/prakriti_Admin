import { React, Component } from 'react';
import { connect } from 'react-redux';
import WorkerForm from 'forms/Manager/WorkerForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { workerCreate } from 'actions/manager/worker.actions';

class WorkerCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
        success: 'success' in this.props ? this.props.success : false
    }
    
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if('success' in props && props.success !== state.success){
      update.success = props.success;
    }

    return update;
  }

  submit = (data) => {
    this.props.actions.workerCreate(data);
  }


  componentDidUpdate(){
    if(this.state.success){
      this.props.navigate('/manager/workers')
    }
  }

  render() {  
     
    return (
      <MainCard title="Worker Create">
        <div>
            <WorkerForm onSubmit={this.submit} />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.manager.worker
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({workerCreate}, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerCreatePage));
