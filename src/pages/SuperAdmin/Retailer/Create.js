import { React, Component } from 'react';
import { connect } from 'react-redux';
import RetailerForm from 'forms/SuperAdmin/RetailerForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { retailerCreate } from 'actions/superadmin/retailer.actions';
import { countryList } from 'actions/superadmin/country.actions';
import { stateList } from 'actions/superadmin/state.actions';
import { districtList } from 'actions/superadmin/district.actions';
import { ConstructionOutlined } from '@mui/icons-material';

class RetailerCreatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }


  render() {   
     
    return (
      <MainCard title="Retailer Create">
        <div>
            <RetailerForm />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetailerCreatePage));
