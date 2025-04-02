import { React, Component } from 'react';
import { connect } from 'react-redux';
import SalesExecutiveForm from 'forms/SuperAdmin/SalesExecutiveForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class SalesExecutiveCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }

  render() {   
     
    return (
      <MainCard title="Sales Executive Create">
        <div>
            <SalesExecutiveForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesExecutiveCreatePage));
