import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, CircularProgress, Select, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Button, MenuItem  } from '@mui/material';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { salesExecutiveFetch } from 'actions/superadmin/salesExecutive.actions';
import { gridSpacing } from 'store/constant';
import { stocksList, getPriceByCategory } from 'actions/superadmin/stocks.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { cartList } from 'actions/superadmin/cart.actions';
import DataTable from 'src/utils/DataTable';
import { categoryList } from 'actions/superadmin/category.actions';
import { displayAmount } from 'src/helpers/helper';
import { salaryHistory } from 'actions/superadmin/salary.actions';

class SalaryHistoryPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      data: null
    }

    this.columns = [
      {
        name: 'display_date',
        display_name: 'Date'
      },
      {
        name: 'type',
        display_name: 'Type'
      },
      {
        name: 'credit',
        display_name: 'Credit'
      },
      {
        name: 'debit',
        display_name: 'Debit'
      },
      /*{
        name: 'balance',
        display_name: 'Balance'
      },*/
      {
        name: 'status',
        display_name: 'Status',
        show_tag: true,
        color_conditions: [
          {
            key: "status",
            value: "Pending",
            color: "primary"
          },
          {
            key: "status",
            value: "Paid",
            color: "success"
          },
          {
            key: "status",
            value: "Declined",
            color: "error"
          }
        ]
      },
    ];

    this.tableActions = [];
  }

  componentDidMount(){
    this.loadAllData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    return update;
  }

  componentDidUpdate(previousProps){
    if(previousProps.params.id != this.props.params.id){
      this.loadAllData();
    }
  }

  

  loadAllData = () => {
    salaryHistory(this.props.params.id)
    .then(res => {
      if(res.data.success){
        this.setState({
          data: res.data.data
        })
      }
    })
  }



  render() {
    let data = this.state.data;
    return (
      <MainCard title="Sales Executive Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        <div>
          {
            data ?
            <>
              <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <div autoComplete="off" className='ratn-dialog-inner'>
                  <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='loans_view p_view'>
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField  
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={data.name}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField  
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        value={data.mobile}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} className='create-input'>
                      <TextField  
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={data.email}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} className='create-input'>
                      <TextField  
                        label="Advance Amount"
                        variant="outlined"
                        fullWidth
                        value={data.advance_amount}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} className='create-input'>
                      <TextField  
                        label="Due Amount"
                        variant="outlined"
                        fullWidth
                        value={data.due_amount}
                        disabled
                        InputProps={{
                          className: "non_disable_text"
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Box>
              <div>
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                  <Grid item xs={6} md={3} className='create-input'>
                    <h3 className='p_heading_list'>History</h3>
                  </Grid>
                </Box>
                <Grid container spacing={gridSpacing} className='orders-sale-button'>
                  <DataTable
                    columns={this.columns}
                    rows={data.history}
                    page={1}
                    limit={data.history.length}
                    total={data.history.lengt}
                    actions={this.tableActions}
                  />
                </Grid>
              </div>
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

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalaryHistoryPage));
