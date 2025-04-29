import { React, Component } from 'react';
import { connect } from 'react-redux';
import InvestorForm from 'forms/SuperAdmin/InvestorForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class InvestorCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }


  render() {
    
    return (
      <MainCard title="Investor Create">
        <div>
            <InvestorForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorCreatePage));
