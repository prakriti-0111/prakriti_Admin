import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress  } from '@mui/material';
import SupplierForm from 'forms/Admin/SupplierForm';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { supplierFetch, supplierUpdate } from 'actions/admin/supplier.actions';

class SupplierEditPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
  }

  componentDidMount(){
    this.props.actions.supplierFetch(this.props.params.id);
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
      <MainCard title="Supplier Edit">
        <div>
          {
            this.state.item ? 
            <SupplierForm formData={this.state.item} />
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
  item: state.admin.supplier.item || null
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({supplierFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierEditPage));
