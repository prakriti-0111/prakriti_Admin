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
  ImageListItem,
  ImageList,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import { withSnackbar } from "notistack";
import { stocksView } from "actions/superadmin/stocks.actions";
import { stocksHistoryList } from "actions/superadmin/stockHistory.actions";
import { bindActionCreators } from "redux";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class MaterialStockViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: this.props.stock,
      history: [],
      historyLoading: false,
      historyMaterialId: null,
    };

    this.existingVideoRef = React.createRef();
  }

  componentDidMount() {
    this.loadViewData();

    setTimeout(() => {
      if (this.existingVideoRef) {
        this.existingVideoRef.current?.load();
      }
    }, 2000);
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.stock !== state.stock) {
      update.stock = props.stock;
    }

    return update;
  }

  componentDidUpdate() {
    // stock arrives async - pull its material's ledger once we know the material
    const materialId = this.state.stock?.stock_materials?.[0]?.material_id;
    if (materialId && materialId !== this.state.historyMaterialId) {
      this.loadHistory(materialId);
    }
  }

  loadViewData = () => {
    this.props.actions.stocksView(this.props.params.id);
  };

  loadHistory = async (material_id) => {
    this.setState({ historyLoading: true, historyMaterialId: material_id });
    try {
      const res = await stocksHistoryList({ page: 1, limit: 50, material_id });
      this.setState({
        history: res.data.success ? res.data.data.items : [],
        historyLoading: false,
      });
    } catch (e) {
      this.setState({ history: [], historyLoading: false });
    }
  };

  render() {
    const { stock } = this.state;
    // Material stocks hang off a material, not a product, so none of the
    // product fields (type/category/certification/images) exist on them.
    const isMaterial = stock && !stock.product_id;
    return (
      <MainCard title='Stock Details'>
        <div className='ratn-dialog-wrapper'>
          {!stock ? (
            <Grid container justifyContent='center'>
              <CircularProgress size='30px' />
            </Grid>
          ) : (
            <>
              <div className='single-item-wrapper details-header'>
                <div className='single-item'>
                  <p>
                    <span>{isMaterial ? "Material Name: " : "Product Name: "}</span> <br />
                    {stock.name}
                  </p>
                </div>
                {isMaterial ? (
                  <>
                    <div className='single-item'>
                      <p>
                        <span>Purity: </span> <br /> {stock.purity_name || "—"}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Total Weight: </span> <br />
                        {stock.total_weight_display}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Quantity: </span> <br /> {stock.quantity}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Price: </span> <br /> {stock.mrp_display}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='single-item'>
                      <p>
                        <span>Product Type: </span> <br /> {stock.type_diplay}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Category: </span> <br /> {stock.category}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Sub Category: </span> <br />
                        {stock.sub_category}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Licence Number: </span> <br /> {stock.licence_no}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Certified: </span> <br /> {stock.certified_display}
                      </p>
                    </div>
                    <div className='single-item'>
                      <p>
                        <span>Status: </span> <br /> {stock.status_display}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className='item-wrapper-images'>
                {stock.images?.length ? (
                  <ImageList
                    sx={{ width: "100%", height: 110 }}
                    cols={12}
                    rowHeight={110}>
                    {stock.images.map((item, index) => (
                      <ImageListItem
                        key={index}
                        style={{ height: "100px", width: "100px" }}>
                        <div style={{ position: "relative", width: "100px" }}>
                          <img
                            src={item.path}
                            loading='lazy'
                            style={{ height: "100px", width: "100px" }}
                          />
                        </div>
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : null}
                {stock.video ? (
                  <ImageList
                    sx={{ width: "100%", height: 150 }}
                    cols={3}
                    rowHeight={150}>
                    <ImageListItem>
                      <div style={{ position: "relative", width: "220px" }}>
                        <video
                          width='200'
                          height='150'
                          style={{ height: "143px", objectFit: "contain" }}
                          loop
                          controls
                          ref={this.existingVideoRef}>
                          <source src={stock.video} />
                        </video>
                      </div>
                    </ImageListItem>
                  </ImageList>
                ) : null}
              </div>
              <Grid container spacing={gridSpacing} className='details-header'>
                <Grid item xs={12}>
                  <TableContainer
                    component={Paper}
                    className='ratn-table-wrapper table-wrapper-heading'>
                    <Table aria-label='collapsible table'>
                      <TableHead className='ratn-table-header'>
                        <TableRow className=''>
                          <TableCell>Material Name</TableCell>
                          <TableCell>Purity</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stock.stock_materials.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.material_name}</TableCell>
                            <TableCell>{item.purity_name}</TableCell>
                            <TableCell>{item.weight}</TableCell>
                            <TableCell>{item.unit_name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h4' gutterBottom>
                    Stock History
                  </Typography>
                  <TableContainer
                    component={Paper}
                    className='ratn-table-wrapper table-wrapper-heading'>
                    <Table>
                      <TableHead className='ratn-table-header'>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Credit / Debit</TableCell>
                          <TableCell>User Name</TableCell>
                          <TableCell>Invoice #</TableCell>
                          <TableCell>Mode</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Rate</TableCell>
                          <TableCell>Purity</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Pakka Weight</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.historyLoading ? (
                          <TableRow>
                            <TableCell colSpan={12} align='center'>
                              <CircularProgress size='24px' />
                            </TableCell>
                          </TableRow>
                        ) : this.state.history.length ? (
                          this.state.history.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.date}</TableCell>
                              <TableCell
                                style={{
                                  color:
                                    item.type === "credit" ? "green" : "red",
                                }}>
                                {item.type_display}
                              </TableCell>
                              <TableCell>{item.display_user_name}</TableCell>
                              <TableCell>{item.ref_no || "—"}</TableCell>
                              <TableCell>{item.payment_mode_display || "—"}</TableCell>
                              <TableCell>{item.amount_display || "—"}</TableCell>
                              <TableCell>{item.metal_rate_display || "—"}</TableCell>
                              <TableCell>{item.purity_name}</TableCell>
                              <TableCell>{item.weight}</TableCell>
                              <TableCell>{item.pakka_weight}</TableCell>
                              <TableCell>{item.unit_name}</TableCell>
                              <TableCell>{item.status_display}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={12} align='center'>
                              No stock history yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  stock: state.superadmin.stocks.stock,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      {
        stocksView,
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialStockViewPage)
  )
);
