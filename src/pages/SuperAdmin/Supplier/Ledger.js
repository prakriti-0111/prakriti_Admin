import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Collapse,
  Box,
  Typography,
  Pagination,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import DataTable from "src/utils/DataTable";
import { withSnackbar } from "notistack";
import { supplierFetch } from "actions/superadmin/supplier.actions";
import { purchaseList, purchaseTxnLedgerList, purchaseDownloadLedger } from "actions/superadmin/purchase.actions";
import { bindActionCreators } from "redux";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { isEmpty, displayAmount } from "src/helpers/helper";
import {
  paymentStore,
  paymentGetWalletBalance,
} from "actions/superadmin/payment.actions";
import { SUPERADMIN_RESET_PAYMENT } from "../../../actionTypes/superadmin/payment.types";
import EditIcon from "@mui/icons-material/Edit";
import ReplayIcon from "@mui/icons-material/Replay";
import { fontSize } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { getRoleName, getUserDashboardRoute } from "src/helpers/helper";
import { getNotifiactions } from "actions/superadmin/notification.actions";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

class SupplierInvoiceTransactionLedgerPage extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
          auth: this.props.auth,
          purchaseList: this.props.purchaseList,
          purchaseTotal: this.props.purchaseTotal,
          queryParams: {
            page: 1,
            limit: 50,
            search: "",
          },
          processing: false,
          downloadingInfo: false,
          note: ""
        };
        
        this.columns = [
            {
                name: "sl_no",
                display_name: "Sl No.",
            },
            {
                name: "invoice_number",
                display_name: "Invoice Number",
            },
            {
                name: "txn_date",
                display_name: "Date",
            },
            {
                name: "remarks",
                display_name: "Remarks",
            },
            {
                name: "bill_amount",
                display_name: "Bill Amount",
            },
            {
                name: "payment_amount",
                display_name: "Payment Amount",
            },
            {
                name: "payment_mode",
                display_name: "Payment Mode",
            },
            {
                name: "type",
                display_name: "Type",
            },
            {
                name: "balance",
                display_name: "Balance",
            },
        ];
    }

    componentDidMount() {
        this.loadAllData();
    }

    loadAllData = () => {
      this.loadPurchaseData();
    };

    loadPurchaseData = () => {
      let data = { ...this.state.queryParams };
      data.supplier_id = this.props.params.id;
      this.setState({processing : true});
      this.props.actions.purchaseTxnLedgerList(data);
    };

    static getDerivedStateFromProps(props, state) {
      let update = {};
      
      if (props.purchaseList !== state.purchaseList) {
        update.processing = false;
        update.purchaseList = props.purchaseList;
      }

      if (props.purchaseTotal !== state.purchaseTotal) {
        update.purchaseTotal = props.purchaseTotal;
      }
      
      if (props.auth !== state.auth) {
        update.auth = props.auth;
      }
  
      return update;
    }
  
    componentDidUpdate() {
      if (this.state.actionCalled) {
        
      }
    }
  
    handlePagination = (e, number) => {
      this.setState(
        {
          queryParams: {
            ...this.state.queryParams,
            page: number,
          },
        },
        () => {
          this.loadPurchaseData();
        }
      );
    };
  
    handleInvoiceView = (row) => {
      this.props.navigate(
        getUserDashboardRoute(getRoleName(this.state.auth)) +
          "/purchases/view/" +
          row.id
      );
    };
  
    handleInvoiceEdit = (row) => {
      this.props.navigate(
        getUserDashboardRoute(getRoleName(this.state.auth)) +
          "/purchases/edit/" +
          row.id
      );
    };
  
    handleInvoiceReturn = (row) => {
      this.props.navigate(
        getUserDashboardRoute(getRoleName(this.state.auth)) +
          "/purchases/return/" +
          row.id
      );
    };

    handleSearch = () => {
      this.setState(
        {
          queryParams: {
            ...this.state.queryParams,
            page: 1,
          },
        },
        () => {
          this.loadPurchaseData();
        }
      );
    };

    handleNote = (txt = "") => {
      this.setState({
        note: txt
      });
    }

    handleDownloadLedger = async () => {
      this.setState({
        downloadingInfo: true,
      });
  
      let data = { ...this.state.queryParams };
      data.supplier_id = this.props.params.id;
      let response = await purchaseDownloadLedger(data);
      if (response.data.success) {
        this.setState(
          {
            downloadingInfo: false,
          },
          () => {
            window.open(response.data.data.url, "_blank").focus();
          }
        );
      } else {
        this.setState({
          downloadingInfo: false,
        });
      }
    };

    render() {
      const { purchaseList, purchaseTotal, queryParams, processing, downloadingInfo } = this.state;
      const totalPage = Math.ceil(
        this.state.purchaseTotal / this.state.queryParams.limit
      );

      console.log("purchaseList", purchaseList);
      return (    
          <MainCard
            title='Transaction Ledger'
            secondary={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: "7px" }}>
                {downloadingInfo ? (
                  <CircularProgress size='30px' />
                ) : (
                  <Button
                    variant='contained'
                    onClick={() =>
                      this.handleDownloadLedger()
                    }>
                    <FileDownloadIcon />
                  </Button>
                )}
                <Button variant='contained' onClick={() => this.props.navigate(-1)}>
                  Back
                </Button>
              </div>
            }>
            {processing ? (
              <Grid container justifyContent='center'>
                <CircularProgress size='30px' />
              </Grid>
            ) : (
              <>
                {/* Transaction Ledger */}
                <Grid
                  container
                  spacing={gridSpacing}
                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                  className='details-header ratn-pur-wrapper loans_view'>
                  <Grid item xs={10} md={10} className='create-input'>
                    <FormControl fullWidth>
                      <OutlinedInput
                        value={this.state.queryParams.search}
                        onChange={(e) =>
                          this.setState({
                            queryParams: {
                              ...this.state.queryParams,
                              search: e.target.value,
                            },
                          })
                        }
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton onClick={this.handleSearch} edge='end'>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ borderRadius: "25px", marginLeft: "20px", marginTop: "25px" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} className='p-add-product create-input'>
                    <TableContainer component={Paper}>
                      <div className='ratn-table-wrapper'>
                        <Table aria-label='collapsible table'>
                          <TableHead className='ratn-table-header'>
                            <TableRow>
                              {/*<TableCell />*/}
                              
                              <TableCell sx={{ width: "50px" }}>&nbsp;&nbsp;#</TableCell>
                              <TableCell sx={{ width: "50px" }}>Date</TableCell>
                              <TableCell sx={{ width: "100px" }}>Invoice No</TableCell>
                              <TableCell sx={{ width: "50px" }}>Remarks</TableCell>
                              <TableCell sx={{ width: "150px" }}>Bill Amt</TableCell>
                              <TableCell sx={{ width: "150px" }}>Payment Amt</TableCell>
                              <TableCell sx={{ width: "50px" }}>Mode</TableCell>
                              <TableCell sx={{ width: "50px" }}>Type</TableCell>
                              <TableCell sx={{ width: "150px" }}>Balance(Due)</TableCell>
                              <TableCell sx={{ width: "50px" }}>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {purchaseList.map((row, i) => (
                              <Row
                                key={i}
                                row={row}
                                page={queryParams.page}
                                limit={queryParams.limit}
                                index={i}
                                viewAction={this.handleInvoiceView}
                                editAction={this.handleInvoiceEdit}
                                returnAction={this.handleInvoiceReturn}
                                handleNote={this.handleNote}
                                /* payAction={this.handleInvoicePay} */
                              />
                            ))}
                          </TableBody>
                        </Table>
                        {purchaseTotal > 0 ? (
                          <Grid
                            container
                            alignItems='right'
                            className='ratn-table-footer'>
                            <Grid item>
                              <Pagination
                                count={totalPage}
                                page={queryParams.page}
                                onChange={this.handlePagination}
                              />
                            </Grid>
                          </Grid>
                        ) : null}
                      </div>
                    </TableContainer>
                  </Grid>
                </Grid>
              </>
            )}
            <div

              class='modal fade'

              id='noteModal'

              tabindex='-1'

              aria-labelledby='exampleModalLabel'

              aria-hidden='true'>

              <div class='modal-dialog modal-dialog-centered'>

                <div class='modal-content'>

                  <div class='modal-header'>

                    <h1 class='modal-title fs-5' id='exampleModalLabel'>

                      sales Notes

                    </h1>

                    <button

                      type='button'

                      class='btn-close'

                      data-bs-dismiss='modal'

                      aria-label='Close'></button>

                  </div>

                  <div class='modal-body'>

                    {/* <Grid

                      item

                      xs={12}

                      md={6}

                      className="create-input"

                      style={{ paddingTop: "0px" }}

                    >

                      <TextareaAutosize

                        className="description"

                        minRows={1}

                        placeholder="Notes datra"

                        style={{ width: "80%" }}



                      />

                    </Grid> */}

                    <textarea
                      class='form-control'
                      placeholder='Leave a comment here'
                      id='floatingTextarea2'
                      style={{ height: "100px" }}
                      value={this.state.note}
                      disabled={true}
                      ></textarea>

                    {/* <label for="floatingTextarea2">Comments</label> */}

                  </div>

                </div>

              </div>

            </div>
          </MainCard>
      );
    }
}

const mapStateToProps = (state) => ({
  purchaseList: state.superadmin.purchase.items,
  purchaseTotal: state.superadmin.purchase.total,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      {
        purchaseTxnLedgerList
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierInvoiceTransactionLedgerPage))
);

function Row(props) {
  const {
    row,
    page,
    limit,
    index,
    viewAction,
    editAction,
    payAction,
    returnAction,
    handleNote
  } = props;
  const [open, setOpen] = React.useState(false);

  const getSerialNo = () => {
    return page == 1 ? index + 1 : index + 1 + limit;
  };

  const getStatusColor = (status) => {
    if (status == "Pending") {
      return "#ff9100";
    } else if (status == "Accepted") {
      return "#4caf50";
    } else if (status == "Declined") {
      return "#ff3d00";
    }
  };

  let odd_even_class = row.sl_no % 2 == 0 ? "even" : "odd";

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} >
        
        <TableCell>&nbsp;&nbsp;{row.sl_no}</TableCell>
        <TableCell >{row.txn_date}</TableCell>
        <TableCell >{row.invoice_number}</TableCell>
        <TableCell ><div onClick={() => handleNote(row.remarks)} className="sticky-note"><i

                    class='bi bi-pencil-square fs-4 '

                    data-bs-toggle='modal'

                    data-bs-target='#noteModal'></i></div></TableCell>
        <TableCell >{row.bill_amount}</TableCell>
        <TableCell >{row.payment_amount}</TableCell>
        <TableCell >{row.payment_mode}</TableCell>
        <TableCell >{row.type}</TableCell>
        <TableCell >{row.balance}</TableCell>
        <TableCell className={'action_btn'}>
          <Stack
            spacing={1}
            direction='row'
            justifyContent={"left"}
            alignItems={"left"}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => viewAction(row)}>
              <RemoveRedEyeIcon />
            </Button>
            {/* {row.created_myself && row.is_approved == 0 ? (
              <Button
                variant='contained'
                color='primary'
                onClick={() => editAction(row)}>
                <EditIcon />
              </Button>
            ) : null}
            {row.approve_status == "Accepted" ? (
              <Button
                variant='contained'
                color='primary'
                onClick={() => returnAction(row)}>
                <ReplayIcon />
              </Button>
            ) : null}
            {row.is_approved == 1 && !row.is_assigned && row.status == "due" ? (
              <Button
                variant='contained'
                color='primary'
                onClick={() => payAction(row)}
                ref={(node) => {
                  if (node) {
                    node.style.setProperty(
                      "backgroundColor",
                      "#357a38",
                      "important"
                    );
                    node.style.setProperty("width", "40px", "important");
                    node.style.setProperty("fontSize", "12px", "important");
                  }
                }}>
                Pay
              </Button>
            ) : null} */}
          </Stack>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}