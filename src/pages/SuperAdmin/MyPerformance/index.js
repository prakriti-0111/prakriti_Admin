import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, CircularProgress, InputAdornment  } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getMyPerformance } from 'actions/superadmin/my_performance.actions';
import BannerForm from 'forms/SuperAdmin/BannerForm';
import { withSnackbar } from 'notistack';
import {
  ADD_BANNER,
  UPDATE_BANNER,
  DELETE_BANNER,
  RESET_BANNER
} from '../../../actionTypes/superadmin/banner.types';
import {isEmpty, toBase64} from 'src/helpers/helper';
import ClearIcon from '@mui/icons-material/Clear';

class MyPerformance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      performance: null,
      prev_month_performance: []
    }

    this.columns = [
      {
        name: 'month',
        display_name: 'Month'
      },
      {
        name: 'sale_target_display',
        display_name: 'Target Amt'
      },
      {
        name: 'sale_achived_display',
        display_name: 'Achieve Amt'
      },
      {
        name: 'sale_achived_percent_display',
        display_name: 'Achieve %'
      },
      {
        name: 'visit_target',
        display_name: 'Target Visit'
      },
      {
        name: 'visit_achived',
        display_name: 'Achieve Visit'
      },
      {
        name: 'visit_achived_percent_display',
        display_name: 'Achieve %'
      },

    ]

  }

  componentDidMount() {
    this.thisMonthPerformance();
    this.preMonthsPerformance();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    return update;
  }

  thisMonthPerformance = async() => {
    let res = await getMyPerformance({current: 1});
    if(res.data.success){
      this.setState({
        performance: res.data.data
      })
    }
  }

  preMonthsPerformance = async() => {
    let res = await getMyPerformance({months: 6});
    if(res.data.success){
      this.setState({
        prev_month_performance: res.data.data
      })
    }
  }

  render() {
    const {performance, prev_month_performance} = this.state;
    return (
      <MainCard>
        {
          performance || prev_month_performance ?
          <>
            {
              performance ?
              <div className='calender-wrapper'>
                <MainCard title="Performance of the Month">
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                  <Grid container spacing={2} className='tax-input loans_view p_view'>
                    <Grid item xs={12} md={4} className='create-input'>
                      <Grid container spacing={1} className=''>
                        <Grid item xs={12} className='create-input'>
                          <b>Achieved</b>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Sale Achieved"
                              variant="outlined"
                              value={performance.sale_achived_display}
                              InputProps={{
                                endAdornment: <InputAdornment position="end" className='i-icon-right'>{performance.sale_achived_percent_display}</InputAdornment>,
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Visit Achieved"
                              variant="outlined"
                              value={performance.visit_achived}
                              InputProps={{
                                endAdornment: <InputAdornment position="end" className='i-icon-right'>{performance.visit_achived_percent_display}</InputAdornment>,
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                      <Grid container spacing={1} className=''>
                        <Grid item xs={12} className='create-input'>
                          <b>Remaining</b>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Sale Remaining"
                              variant="outlined"
                              value={performance.sale_due_display}
                              InputProps={{
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Visit Remaining"
                              variant="outlined"
                              value={performance.visit_due}
                              InputProps={{
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                      <Grid container spacing={1} className=''>
                        <Grid item xs={12} className='create-input'>
                          <b>Target</b>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Sale Target"
                              variant="outlined"
                              value={performance.sale_target_display}
                              InputProps={{
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={12} className='create-input'>
                          <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                            <TextField
                              label="Visit Target"
                              variant="outlined"
                              value={performance.visit_target}
                              InputProps={{
                                className: "non_disable_text"
                              }}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                </MainCard>
              </div>
              : null
            }

            <div className='perv_months_perfrmnc'>
              <MainCard title="Previous 6 Months Performance" >
                <Grid container spacing={gridSpacing}>
                  <DataTable 
                    columns={this.columns}
                    rows={prev_month_performance}
                    page={1}
                    limit={6}
                    total={6}
                    havePagination={false}
                    showSerialNo={false}
                  />
                </Grid>
              </MainCard>
            </div>
          </>
          :
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        }

      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({ }, dispatch)
});


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPerformance)));
