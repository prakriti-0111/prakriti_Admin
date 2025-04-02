import React from 'react';
import { connect } from 'react-redux';
import {Grid, Button, CircularProgress, Box, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { customerFetch } from 'actions/superadmin/customer.actions';
import { withSnackbar } from 'notistack';

class CustomerViewPage extends React.Component {

  constructor(props) { 
    super(props);

    this.state = {
      customer: null,
      auth: this.props.auth
    }
  }

  componentDidMount(){
    this.loadData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.auth !== state.auth){
      update.auth = props.auth;
    }
    return update;
  }

  loadData = () => {
    customerFetch(this.props.params.id)
    .then(res => {
      if(res.data.success){
        this.setState({
          customer: res.data.data
        })
      }
    })
  }

  componentDidUpdate(previousProps){
    if(previousProps.params.id != this.props.params.id){
      this.loadData();
    }
  }

  render() {
    const customer = this.state.customer;

    return (
      <MainCard title="Cusromer Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        <div>
          {
            customer ? 
            <>
              <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <div autoComplete="off" className='ratn-dialog-inner'>
                    <Grid container spacing={2} className='loans_view p_view'>
                      <Grid item xs={12} md={6} className='create-input'>
                        <TextField  
                          label="Name"
                          variant="outlined"
                          fullWidth
                          value={customer.name}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                          label="Mobile"
                          variant="outlined"
                          fullWidth
                          value={customer.mobile}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} className='create-input'>
                        <TextField  
                          label="Email"
                          variant="outlined"
                          fullWidth
                          value={customer.email}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="City"
                          variant="outlined"
                          fullWidth
                          value={customer.city}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="District Name"
                          variant="outlined"
                          fullWidth
                          value={customer.district}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="State"
                          variant="outlined"
                          fullWidth
                          value={customer.state}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} className='create-input'>
                        <TextField  
                          label="Pincode"
                          variant="outlined"
                          fullWidth
                          value={customer.pincode}
                          disabled
                          InputProps={{
                            className: "non_disable_text"
                          }}
                        />
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
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerViewPage)));


