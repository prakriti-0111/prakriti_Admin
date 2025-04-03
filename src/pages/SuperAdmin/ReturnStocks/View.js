import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button, CircularProgress, IconButton, Collapse, Box, Typography, ImageListItem, ImageList } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { stocksView } from 'actions/superadmin/stocks.actions';
import { bindActionCreators } from 'redux';
import { Table, TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class ReturnStocksViewPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stock: this.props.stock
    }

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

  loadViewData = () => {
    this.props.actions.stocksView(this.props.params.id);
  }

  render() {
    const { stock } = this.state;
    return (
      <MainCard title="Stock Details">
        <div className='ratn-dialog-wrapper'>
 
            {
              !stock ?
                <Grid container justifyContent="center">
                  <CircularProgress />
                </Grid>
                :
                <>
                  <div className='single-item-wrapper details-header'>
                    <div className='single-item'>
                      <p><span>Product Name: </span> <br />{stock.name}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Product Type: </span> <br /> {stock.type_diplay}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Category: </span> <br /> {stock.category}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Sub Category: </span>  <br />{stock.sub_category}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Licence Number: </span> <br /> {stock.licence_no}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Certified: </span> <br /> {stock.certified_display}</p>
                    </div>
                    <div className='single-item'>
                      <p><span>Status: </span> <br /> {stock.status_display}</p>
                    </div>
                  </div>
                  <div className='item-wrapper-images'>
                    {
                      stock.images.length ?
                        <ImageList sx={{ width: '100%', height: 110 }} cols={12} rowHeight={110}>
                          {stock.images.map((item, index) => (
                            <ImageListItem key={index} style={{ height: '100px', width: '100px' }}>
                              <div style={{ position: 'relative', width: '100px' }}>
                                <img
                                  src={item.path}
                                  loading="lazy"
                                  style={{ height: '100px', width: '100px' }}
                                />
                              </div>
                            </ImageListItem>
                          ))}
                        </ImageList>
                        : null
                    }
                    {
                      stock.video ?
                        <ImageList sx={{ width: '100%', height: 150 }} cols={3} rowHeight={150}>
                          <ImageListItem>
                            <div style={{ position: 'relative', width: '220px' }}>
                              <video
                                width="200"
                                height="150"
                                style={{ height: "143px", objectFit: "contain" }}
                                loop
                                controls
                                ref={this.existingVideoRef}
                              >
                                <source src={stock.video} />
                              </video>
                            </div>
                          </ImageListItem>
                        </ImageList>
                        : null
                    }
                  </div>
                  <Grid container spacing={gridSpacing} className='details-header'>
                  <Grid item xs={12}>
                    <TableContainer component={Paper} className='ratn-table-wrapper table-wrapper-heading'>
                      <Table aria-label="collapsible table">
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
                          {
                            stock.stock_materials.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.material_name}</TableCell>
                                <TableCell>{item.purity_name}</TableCell>
                                <TableCell>{item.weight}</TableCell>
                                <TableCell>{item.unit_name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  </Grid>
                </>
            }

      
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  stock: state.superadmin.stocks.stock
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      stocksView,
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReturnStocksViewPage)));
