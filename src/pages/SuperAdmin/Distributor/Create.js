import { React, Component } from 'react';
import { connect } from 'react-redux';
import DistributorForm from 'forms/SuperAdmin/DistributorForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class DistributorCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() { 

    return (
      <MainCard title="Distributor Create">
        <div>
            <DistributorForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistributorCreatePage));
