import { React, Component } from 'react';
import { matchRoutes, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import { Select, Stack, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Grid, Button, TextareaAutosize } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { stocksList, getPriceByCategory, getCartItemById } from 'actions/superadmin/stocks.actions';
import { subCategoryList } from 'actions/superadmin/subCategory.actions';
import { stocksHistoryList, stocksHistoryStatusUpdate } from 'actions/superadmin/stockHistory.actions';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupIcon from '@mui/icons-material/Group';
import { SUPERADMIN_CART_RESET } from '../../../actionTypes/superadmin/cart.types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { categoryList } from 'actions/superadmin/category.actions';
import { materialList } from 'actions/superadmin/material.actions';
import { displayAmount } from 'src/helpers/helper';
import { FreeBreakfastOutlined } from '@mui/icons-material';
import { unitList } from 'actions/superadmin/unit.actions';
import { convertUnitToGram, weightFormat, isManager } from 'src/helpers/helper';
import { employeeList } from 'actions/superadmin/employee.actions';
import _ from 'lodash';

class MaterialStockHistoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 50,
        search: ''
      },
      processing: false,
      openDialog: false,
      actionRow: null,
      formvalues: {
        status: '',
        reasons: ''
      },
    }

    this.columns = [
      {
        name: 'material_name',
        display_name: 'Material Name'
      },
      {
        name: 'purity_name',
        display_name: 'Purity Name'
      },
      {
        name: 'quantity',
        display_name: 'Qty'
      },
      {
        name: 'weight',
        display_name: 'Weight'
      },
      {
        name: 'unit_name',
        display_name: 'Unit'
      },
      {
        name: 'display_user_name',
        display_name: 'User Name'
      },
      {
        name: 'type_display',
        display_name: 'Credit / Debit',
        show_tag: true,
        color_conditions: [
          {
            key: "type",
            value: "credit",
            color: "success"
          },
          {
            key: "type",
            value: "debit",
            color: "error"
          }
        ],
        class_conditions: [
          {
            key: "action_value",
            value: "Declined",
            class_name: "strike_through"
          }
        ]
      },
    ];

    this.tableActions = [
      {
        label: 'green_tick',
        onClick: this.handleAccept,
        color: 'primary',
        conditions: [
          {
            key: "status",
            value: "pending"
          },
          {
            key: "can_accept",
            value: true
          }
        ]
      },
      {
        label: 'Close',
        onClick: this.handleDeclined,
        color: 'error',
        conditions: [
          {
            key: "status",
            value: "pending"
          },
          {
            key: "can_accept",
            value: true
          }
        ]
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
  }

  handleAccept = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      formvalues: {
        ...this.state.formvalues,
        status: 'accepted'
      }
    })
  }

  handleDeclined = (row) => {
    this.setState({
      openDialog: true,
      actionRow: row,
      formvalues: {
        ...this.state.formvalues,
        status: 'declined'
      }
    })
  }


  static getDerivedStateFromProps(props, state) {
    let update = {};
    return update;
  }

  componentDidUpdate() {

  }

  loadListData = async () => {
    let res = await stocksHistoryList(this.state.queryParams);
    if (res.data.success) {
      this.setState({
        items: res.data.data.items,
        total: res.data.data.total
      })
    }
  }


  handleSearchChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        search: event.target.value
      }
    })
  }

  handleSearch = () => {
    this.loadListData();
  }

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false
    })
  }

  handleSubmit = async () => {
    this.setState({
      processing: true
    })
    let res = await stocksHistoryStatusUpdate(this.state.actionRow.id, this.state.formvalues);
    if (res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      this.setState({
        openDialog: false
      })
      this.loadListData();
    } else {
      this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
    }
    this.setState({
      processing: false
    })
  }


  render() {

    return (
      <>
        <div className='sale-heading'>
          <h1>Material Stock History</h1>
        </div>
        <MainCard>
          <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view' columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={1} className='create-input order-input button-right'>
                <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={gridSpacing} className='orders-sale-button'>
            <DataTable
              columns={this.columns}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
              actionValue={'action_value'}
              actionValueColorConditions={[
                {
                  value: "Accepted",
                  color: "green"
                },
                {
                  value: "Declined",
                  color: "red"
                }
              ]}
            />
          </Grid>
        </MainCard>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            {
              this.state.formvalues.status == "accepted" ?
                "Accept"
                :
                "Decline"
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {
                    this.state.formvalues.status == "accepted" ?
                      "Are you sure want accept this?"
                      :
                      "Are you sure want to decline this?"
                  }
                </Grid>
                {
                  this.state.formvalues.status == 'declined' ?
                    <Grid item xs={12} className='create-input'>
                      <InputLabel>Reason</InputLabel>
                      <TextareaAutosize
                        minRows={3}
                        label={"Reason"}
                        style={{ width: '100%' }}
                        value={this.state.formvalues.reasons}
                        onChange={(event) => this.setState({
                          formvalues: {
                            ...this.state.formvalues,
                            reasons: event.target.value
                          }
                        })}
                      />
                    </Grid>
                  : null
                }
                <Grid item xs={12}>
                  <Stack spacing={1} direction="row" justifyContent="flex-end">
                    <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                      {
                        this.state.processing ? "Processing" : "Submit"
                      }
                    </Button>
                    <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>

      </>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({

    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialStockHistoryPage)));
