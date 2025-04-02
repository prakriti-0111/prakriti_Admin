import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import EmployeeEditForm from 'forms/SuperAdmin/EmployeeEditForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { employeeFetch } from 'actions/superadmin/employee.actions';

class EmployeeViewPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item,
      salaries: this.props.salaries,
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
    if (props.salaries !== state.salaries) {
      update.salaries = props.salaries;
    }
    return update;
  }


  render() {
    const employee = this.state.item;
    return (
      
        <div>
          {
            employee ? 
            <EmployeeEditForm formData={employee} salaries={this.state.salaries}/>
            : 
            <Grid container justifyContent="center">
              <CircularProgress />
             
            </Grid>
          }
        </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.superadmin.employee.item || null,
  salaries: state.superadmin.employee.salaries || [],
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({employeeFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeViewPage));
