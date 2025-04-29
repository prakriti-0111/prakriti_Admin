import { React, Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from 'forms/SuperAdmin/EmployeeForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class WorkerCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }

  render() {   
     
    return (
      <MainCard title="Worker Create">
        <div>
            <EmployeeForm role_id={10} />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerCreatePage));
