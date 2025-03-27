import { React, Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from 'forms/SuperAdmin/EmployeeForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class EmployeeCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }

  render() {   
     
    return (
      <MainCard title="Employee Create">
        <div>
            <EmployeeForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeCreatePage));
