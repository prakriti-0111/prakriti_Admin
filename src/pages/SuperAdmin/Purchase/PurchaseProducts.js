import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Select, Stack, InputLabel, Box, Typography, FormControl, Card, CardContent, TextField, Grid, Button, MenuItem } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { purchaseProducts } from 'actions/superadmin/purchase.actions';
import { supplierList } from 'actions/superadmin/supplier.actions';
import { adminList } from 'actions/superadmin/admin.actions';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { categoryList } from 'actions/superadmin/category.actions';
import { displayAmount } from 'src/helpers/helper';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';

class PurchaseProductsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      price_by_categories: [],
      supplierList: this.props.supplierList,
      adminList: this.props.adminList,
      categories: this.props.categories,
      queryParams: {
        page: 1,
        limit: 50,
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
      },
      {
        name: 'purchase_party_name',
        display_name: 'Purchase From'
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
    this.props.actions.supplierList({ all: 1 });
    this.props.actions.adminList({ all: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.supplierList !== state.supplierList) {
      update.supplierList = props.supplierList;
    }
    if (props.adminList !== state.adminList) {
      update.adminList = props.adminList;
    }
    return update;
  }

  isOwnValue = (value) => {
    return value === true || value === 1 || value === '1' || value === 'yes' || value === 'Yes' || value === 'true';
  }

  normalizeValue = (value) => {
    return value === null || value === undefined ? '' : String(value).trim().toLowerCase();
  }

  getAdminDisplayName = (item) => {
    if (!item) {
      return '';
    }
    const baseName = item.name || item.company_name || '';
    if (!baseName) {
      return this.isOwnValue(item.own) ? 'Own Admin' : 'Other Admin';
    }
    return `${baseName} (${this.isOwnValue(item.own) ? 'Own Admin' : 'Other Admin'})`;
  }

  getPurchasePartyMeta = (item) => {
    const rowId = this.normalizeValue(item.supplier_id);
    const rowName = this.normalizeValue(item.supplier_name || item.purchase_from_name || item.user_name);

    const adminMatch = (this.state.adminList || []).find((admin) => {
      const adminId = this.normalizeValue(admin.id);
      const adminName = this.normalizeValue(admin.name);
      const adminCompany = this.normalizeValue(admin.company_name);
      return (rowId && adminId && rowId === adminId) || (rowName && (rowName === adminName || rowName === adminCompany));
    });
    if (adminMatch) {
      return {
        party_name: this.getAdminDisplayName(adminMatch)
      };
    }

    const supplierMatch = (this.state.supplierList || []).find((supplier) => {
      const supplierId = this.normalizeValue(supplier.id);
      const supplierName = this.normalizeValue(supplier.name);
      const supplierCompany = this.normalizeValue(supplier.company_name);
      return (rowId && supplierId && rowId === supplierId) || (rowName && (rowName === supplierName || rowName === supplierCompany));
    });

    return {
      party_name: item.supplier_name || item.purchase_from_name || (supplierMatch ? supplierMatch.name : '')
    };
  }

  enhancePurchaseRow = (item) => {
    const purchasePartyMeta = this.getPurchasePartyMeta(item);
    return {
      ...item,
      purchase_party_name: purchasePartyMeta.party_name
    };
  }

  loadListData = () => {
    purchaseProducts(this.state.queryParams)
      .then(res => {
        if (res.data.success) {
          const items = res.data.data.items.map((item) => this.enhancePurchaseRow(item));
          this.setState({
            items: items,
            price_by_categories: res.data.data.categories
          })
        }
      })
  }

  handlePagination = (page) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: page
      }
    }, () => {
      this.loadListData();
    })
    
  }

  handleView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/purchases/view/' + row.purchase_id);
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
          <h1>Purchase Products List</h1>

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
              // havePagination={false}
              handlePagination={this.handlePagination}
              actions={this.tableActions}
            />
          </Grid>
        </MainCard>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  supplierList: state.superadmin.supplier.items,
  adminList: state.superadmin.admin.items,
  categories: state.superadmin.category.items,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      supplierList,
      adminList,
      categoryList
    }, dispatch)
  }
};


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseProductsPage)));
