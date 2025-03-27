import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import DistributorForm from 'forms/SuperAdmin/DistributorForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { distributorFetch } from 'actions/superadmin/distributor.actions';

class DistributorEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  componentDidMount(){
    this.props.actions.distributorFetch(this.props.params.id);
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
      <MainCard title="Distributor Edit">
        <div>
          {
            this.state.item ? 
            <DistributorForm formData={this.state.item} />
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
  item: state.superadmin.distributor.item || null,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({distributorFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistributorEditPage));
