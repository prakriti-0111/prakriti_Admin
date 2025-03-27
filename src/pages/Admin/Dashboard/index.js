import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Avatar, CssBaseline, Link, Box, Typography, Container, Alert, Grid, Card, CardActions, CardContent, Button, CircularProgress } from '@mui/material';
import { getDashboardData } from 'actions/admin/profile.actions';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import withRouter from 'src/helpers/withRouter';
import GroupIcon from '@mui/icons-material/Group';
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalMallIcon from '@mui/icons-material/LocalMall';

class DashboardPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dashboard : this.props.dashboard
    }
  }

  componentDidMount(){
    this.props.actions.getDashboardData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.dashboard !== state.dashboard){
      update.dashboard = props.dashboard;
    }

    return update;
  }

  handleClick = (route) => {
    this.props.navigate('/admin/' + route);
  }

  render() {
    const dashboard = this.state.dashboard;
    return (
      <Card className='dashboard_card'>

        <CardContent onClick={() => this.handleClick('stocks')} className='dashboard_card_content bg-color-1' sx = {{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
            <h1>Total Stock </h1>
            <h2>{dashboard ? dashboard.total_stock : <CircularProgress />}</h2>
          </Typography>
          <div className="card-icon">
            <DiamondIcon />
          </div>
        </CardContent>

        <CardContent className='dashboard_card_content bg-color-2' sx = {{ display: "flex", justifyContent: "space-between" }} onClick={() => this.handleClick('distributors')}>
          <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
            <h1>Total Dustrubutor </h1>
            <h2>{dashboard ? dashboard.total_distributor : <CircularProgress />}</h2>
          </Typography>
          <div className="card-icon">
            <GroupIcon />
          </div>
        </CardContent>

        <CardContent onClick={() => this.handleClick('orders?status=pending')} className='dashboard_card_content bg-color-3' sx = {{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
            <h1>Pending Orders </h1>
            <h2>{dashboard ? dashboard.total_pending_orders : <CircularProgress />}</h2>
          </Typography>
          <div className="card-icon">
            <LocalMallIcon />
          </div>
        </CardContent>
      
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.admin.profile.dashboard
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({getDashboardData}, dispatch)
  }
};  


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
