import { React, Component } from 'react';
import { connect } from 'react-redux';
import SupplierForm from 'forms/SuperAdmin/SupplierForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class SupplierCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }

  render() {   
     
    return (
      <MainCard title="Supplier Create">
        <div>
            <SupplierForm countries={this.state.countries}/>
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierCreatePage));
