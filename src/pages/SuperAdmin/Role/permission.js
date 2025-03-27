import { React, Component } from 'react';
import { connect } from 'react-redux';
import RolePermissionForm from 'forms/SuperAdmin/RolePermissionForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';

class RolePermissionPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    
  }


  render() {   
     
    return (
      <MainCard title="Role Permissions">
        <div>
            <RolePermissionForm role_id={this.props.params.id} />
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RolePermissionPage));
