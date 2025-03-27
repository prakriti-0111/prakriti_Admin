import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, Pagination, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { bindActionCreators } from 'redux';
import { workerStock } from 'actions/manager/worker.actions';
import { employeeFetch } from 'actions/superadmin/employee.actions';
import { stocksList } from 'actions/superadmin/stocks.actions';

class WorkerViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      stocks: this.props.stocks,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        search: '',
        type: 'material',
        all: 0
      },
    }

    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Material Name'
      },
      {
        name: 'purity_name',
        display_name: 'Purity Name'
      },
      {
        name: 'total_weight_display',
        display_name: 'Total Wt.',
        width: '90px'
      },
      /*{
        name: 'quantity',
        display_name: 'Qty'
      },*/
      {
        name: 'weight_display',
        display_name: 'Qty'
      },
      {
        name: 'unit_display',
        display_name: 'Unit'
      },
      /*{
        name: 'size_name',
        display_name: 'Size'
      },*/
      {
        name: 'mrp_display',
        display_name: 'Price'
      }
    ];
    
  }

  componentDidMount() {
    this.loadAllData();
  }

  loadAllData = () => {
    this.loadViewData();
    this.loadStockData();
  }

  loadViewData = () => {
    this.props.actions.employeeFetch(this.props.params.id, 10);
  }

  loadStockData = async() => {
    let data = {...this.state.queryParams, user_id: this.props.params.id}
    this.props.actions.stocksList(data);
  }

  static getDerivedStateFromProps(props, state){
    let update = {};
    if(props.item !== state.item){
      update.item = props.item;
    }
    if (props.stocks !== state.stocks) {
      update.stocks = props.stocks;
    }
    if (props.total !== state.total) {
      update.total = props.total;
    }
    return update;
  }

  componentDidUpdate(previousProps){
    if(previousProps.params.id != this.props.params.id){
      this.loadAllData();
    }

  }

  handlePagination = (page, all) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page,
        all: all ? 1 : 0
      }
    }, () => {
      this.loadStockData();
    })

  }


  render() {
    const worker = this.state.item;

    return (
      <MainCard title="Worker Details"  secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        {
          !worker ?
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
          :
          <>
            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
              <div autoComplete="off" className='ratn-dialog-inner'>
                <Grid container spacing={2} className='loans_view p_view'>
                  <Grid item xs={12} md={3} className='create-input'>
                    <TextField  
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={worker.name}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className='create-input'>
                    <TextField  
                      label="Contact Number"
                      variant="outlined"
                      fullWidth
                      value={worker.mobile}
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
                      value={worker.email}
                      disabled
                      InputProps={{
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} className='create-input'>
                    <TextField  
                      label="Address"
                      variant="outlined"
                      fullWidth
                      value={worker.address}
                      disabled
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        className: "non_disable_text"
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Box>
            <Grid item xs={12} className='create-input'>
              <h3 className='p_heading_list'>Materials</h3>
              <DataTable
                columns={this.columns}
                rows={this.state.stocks}
                page={this.state.queryParams.page}
                limit={this.state.queryParams.limit}
                total={this.state.total}
                handlePagination={this.handlePagination}
                actions={this.tableActions}
                haveAllOption={true}
              />
            </Grid>
          </>
        }
        
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.superadmin.employee.item || null,
  stocks: state.superadmin.stocks.items,
  total: state.superadmin.stocks.total,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({employeeFetch, stocksList}, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerViewPage)));

