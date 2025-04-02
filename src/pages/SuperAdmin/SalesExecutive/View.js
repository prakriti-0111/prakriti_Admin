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
import { getMyPerformance } from 'actions/superadmin/my_performance.actions';

class SalesExecutiveViewPage extends Component {

  constructor(props) { 
    super(props);

    this.state = {
      se: this.props.se,
      items: this.props.items,
      total: this.props.total,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: '',
        sub_category_id: '',
        search: ''
      },
      categories: this.props.categories,
      sub_categories: this.props.sub_categories,
      price_by_categories: []
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

    this.tableActions = [];
  }

  componentDidMount(){
    this.loadAllData();
  }

  static getDerivedStateFromProps(props, state){
    let update = {};

    if(props.se !== state.se){
      update.se = props.se;
    }

    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }

    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }

    return update;
  }

  componentDidUpdate(previousProps){
    if(previousProps.params.id != this.props.params.id){
      this.loadAllData();
    }
  }

  

  loadAllData = () => {
    this.props.actions.salesExecutiveFetch(this.props.params.id);
    this.loadStockListData();
    this.props.actions.categoryList({ all: 1 });
    this.loadPriceByCategory();
    this.thisMonthPerformance();
  }

  loadPriceByCategory = async () => {
    let res = await getPriceByCategory({user_id: this.props.params.id});
    if (res.data.success) {
      this.setState({
        price_by_categories: res.data.data
      })
    }
  }

  thisMonthPerformance = async () => {
    let formData = this.state.formData;
    let res = await getMyPerformance({ current: 1, user_id: formData ? formData.id : 0 });
    if (res.data.success) {
        this.setState({
            performance: res.data.data
        })
    }
}

  loadStockListData = () => {
    let data = {...this.state.queryParams, user_id: this.props.params.id}
    this.props.actions.stocksList(data);
  }
  
  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadStockListData();
    })
  }

  handleCategoryChange = (event) => {
    let val = event.target.value;
    this.props.actions.subCategoryList({ all: 1, category_id: val });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        category_id: val
      }
    })
  }

  handleSubCategoryChange = (event) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        sub_category_id: event.target.value
      }
    })
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
    this.loadStockListData();
  }

  handleCardClick = (category_id) => {
    this.props.actions.subCategoryList({ all: 1, category_id: category_id });
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
      <MainCard title="Sales Executive Details" secondary={<Button variant="contained" onClick={() => this.props.navigate(-1)}>Back</Button>}>
        <div>
          {
            this.state.se ?
            <>
              <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                <div autoComplete="off" className='ratn-dialog-inner'>
                  <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} className='loans_view p_view'>
                    <Grid item xs={12} md={4} className='create-input'>
                      <TextField  
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={this.state.se.name}
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
                        value={this.state.se.mobile}
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
                        value={this.state.se.email}
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
                    <h3 className='p_heading_list'>Stock List</h3>
                  </Grid>
                </Box>
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
                    <Grid item xs={6} md={3} className='create-input'>
                      <FormControl fullWidth>
                        <InputLabel>Sub Category</InputLabel>
                        <Select
                          value={this.state.queryParams.sub_category_id}
                          label="Sub Category"
                          onChange={this.handleSubCategoryChange}
                          className='input-inner'
                          defaultValue=""
                        >
                          <MenuItem value="">All</MenuItem>
                          {
                            this.state.sub_categories.map((item, index) => (
                              <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
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
                    <Grid item xs={6} md={3} className='create-input order-input button-right'>
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
  se: state.superadmin.salesExecutive.item || null,
  items: state.superadmin.stocks.items,
  total: state.superadmin.stocks.total,
  categories: state.superadmin.category.items,
  sub_categories: state.superadmin.subCategory.items
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    salesExecutiveFetch,
    stocksList,
    cartList,
    categoryList,
    subCategoryList
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SalesExecutiveViewPage));
