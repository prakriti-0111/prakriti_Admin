import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import EmployeeForm from 'forms/SuperAdmin/EmployeeForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { employeeFetch } from 'actions/superadmin/employee.actions';

class EmployeeEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  componentDidMount(){
    this.props.actions.employeeFetch(this.props.params.id);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.item !== state.item){
      update.item = props.item;
    }

    return update;
  }


  render() {
    return (
      <MainCard title="Employee Edit">
        <div>
          {
            this.state.item ? 
            <EmployeeForm formData={this.state.item} />
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
  item: state.superadmin.employee.item || null
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({employeeFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeEditPage));
