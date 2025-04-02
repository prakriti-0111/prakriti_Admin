import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Button, Paper   } from '@mui/material';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { leaveApplicationFetch } from 'actions/superadmin/leaveApplication.action';
import {isSuperAdmin} from 'src/helpers/helper';
import { gridSpacing } from 'store/constant';

class LeaveApplicationViewPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      item: this.props.item
    }
    this.isSuperAdmin = isSuperAdmin();
  }

  componentDidMount(){
    this.props.actions.leaveApplicationFetch(this.props.params.id);
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
      <MainCard title="Leave Application Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        <div>
          {
            this.state.item ? 
            <>
            <Grid container spacing={gridSpacing} className="details-header ratn-pur-wrapper loans_view">
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <div className='ratn-table-purchase-wrapper'>
                      <Table aria-label="collapsible table" className='invoice_product_list'>
                        <TableHead className='ratn-table-header'>
                          <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className='pur-details-table-body'>
                              <TableRow>
                                <TableCell component="th" scope="row">{this.state.item.user_name}</TableCell>
                                <TableCell>{this.state.item.role}</TableCell>
                                <TableCell>{this.state.item.created_at}</TableCell>
                                <TableCell className="sales-status">{this.state.item.status_display}</TableCell>
                              </TableRow>
                       </TableBody>
                      </Table>
                    </div>
                  </TableContainer> 
                </Grid>
                </Grid>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
              <div autoComplete="off" className='ratn-dialog-inner'>
                <Grid container spacing={2} className='loans_view p_view'>
                  <Grid item xs={12} className='create-input'>
                    <h4>{this.state.item.title}</h4>
                  </Grid>
                  <Grid item xs={12} className='create-input'>
                    <div dangerouslySetInnerHTML={{__html: this.state.item.message}}></div>
                  </Grid>
                </Grid>
              </div>
            </Box>
            </>
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
  item: state.superadmin.leaveApplication.item || null,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({leaveApplicationFetch}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaveApplicationViewPage));
