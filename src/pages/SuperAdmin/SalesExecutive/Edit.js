import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import SalesExecutiveForm from 'forms/SuperAdmin/SalesExecutiveForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salesExecutiveFetch } from 'actions/superadmin/salesExecutive.actions';

class SalesExecutiveEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  componentDidMount(){
    this.props.actions.salesExecutiveFetch(this.props.params.id);
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
      <MainCard title="Sales Executive Edit">
        <div>
          {
            this.state.item ? 
            <SalesExecutiveForm formData={this.state.item} />
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
  item: state.superadmin.salesExecutive.item || null
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({salesExecutiveFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesExecutiveEditPage));
