import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Select, Stack, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Grid, Button, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { saleProducts } from 'actions/superadmin/sales.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { categoryList } from 'actions/superadmin/category.actions';
import { displayAmount } from 'src/helpers/helper';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';

class SaleProductsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      price_by_categories: [],
      categories: this.props.categories,
      queryParams: {
        category_id: ''
      },
      auth: this.props.auth,
    }

    this.columns = [
      {
        name: 'image',
        display_name: 'Image',
        isImage: true
      },
      {
        name: 'name',
        display_name: 'Product Name'
      },
      {
        name: 'certificate_no',
        display_name: 'Certificate No',
        width: '120px'
      },
      {
        name: 'total_weight_display',
        display_name: 'Total Wt.',
        width: '90px'
      },
      {
        name: 'stock_material_display',
        display_name: 'Materials Name',
        width: '165px'
      },
      {
        name: 'purity_display',
        display_name: 'Purity Name',
        width: '165px'
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
      {
        name: 'product_code',
        display_name: 'P Code'
      },
      {
        name: 'size_name',
        display_name: 'Size'
      },
      {
        name: 'mrp_display',
        display_name: 'Price'
      }
    ];

    this.tableActions = [
      {
        label: 'View',
        onClick: this.handleView,
        color: 'primary'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    return update;
  }

  loadListData = () => {
    saleProducts(this.state.queryParams)
      .then(res => {
        if (res.data.success) {
          this.setState({
            items: res.data.data.items,
            price_by_categories: res.data.data.categories
          })
        }
      })
  }

  handleView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/sales/view/' + row.sale_id);
  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: val
      }
    })
  }

  handleSearch = () => {
    this.loadListData();
  }

  handleCardClick = (category_id) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: category_id
      }
    }, () => {
      this.handleSearch()
    })
  }

  render() {

    return (
      <>
        <div className='sale-heading'>
          <h1>Sale Products List</h1>

        </div>
        {
          this.state.price_by_categories.length ?
            <Card className='dashboard_card' style={{ marginBottom: '4px' }}>
              {
                this.state.price_by_categories.map((item, key) => (
                  <CardContent className={`dashboard_card_content bg-color-1`} sx={{ display: "flex", justifyContent: "space-between" }} key={key} onClick={() => this.handleCardClick(item.category_id)}>
                    <Typography sx={{ fontSize: 14, margin: 0 }} color="text.secondary" gutterBottom component="span">
                      <h1>{item.category_name}</h1>
                      <h2>{displayAmount(item.total_amount)}</h2>
                      <h3>{item.quantity} Piece(s)</h3>
                    </Typography>
                    <div className="card-icon">
                      {/* <DiamondIcon /> */}
                    </div>
                  </CardContent>
                ))
              }
            </Card>
            : null
        }
        <MainCard>
          <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
            <Grid container spacing={2} className='tax-input loans_view p_view' columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={6} md={3} className='create-input'>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={this.state.queryParams.category_id}
                    label="Category"
                    onChange={this.handleCategoryChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.categories.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
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
              total={this.state.items.length}
              havePagination={false}
              actions={this.tableActions}
            />
          </Grid>
        </MainCard>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.superadmin.category.items,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      categoryList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleProductsPage)));
