import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import InvestorForm from 'forms/SuperAdmin/InvestorForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { investorFetch } from 'actions/superadmin/investor.actions';

class InvestorEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  componentDidMount(){
    this.props.actions.investorFetch(this.props.params.id);
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
      <MainCard title="Investor Edit">
        <div>
          {
            this.state.item ? 
            <InvestorForm formData={this.state.item} />
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
  item: state.superadmin.investor.item || null
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({investorFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorEditPage));
