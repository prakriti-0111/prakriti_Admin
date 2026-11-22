import React from 'react';
import { Box, Grid, CircularProgress, Tabs, Tab } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import DataTable from 'src/utils/DataTable';
import { withSnackbar } from 'notistack';
import { stockRequestList, stockRequestAddToCart } from 'actions/superadmin/order.actions';
import { getRoleName, getUserDashboardRoute, isSalesExecutive } from 'src/helpers/helper';
import { connect } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

/* Received: stock transfer requests sent to this user - an admin (from its SEs, or from
   other admins), an SE (from an admin, for pieces it holds) or the super admin.
   Add to Cart puts the requested pieces it holds in its cart, to transfer them
   from Sale (the success message names who to).
   Sent: the requests this user made, and whether they were acted on. */
class StockRequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      items: [],
      total: 0,
      // received: asked of you; sent: what you asked others for
      queryParams: { page: 1, limit: 50, status: '', type: isSalesExecutive() ? 'sent' : '' },
    };

    const tail = [
      { name: 'items', display_name: 'Items' },
      { name: 'certificates', display_name: 'Certificate No.' },
      { name: 'order_status_display', display_name: 'Order Status' },
      { name: 'requested_at', display_name: 'Requested On' },
      {
        name: 'status_display',
        display_name: 'Request',
        show_tag: true,
        color_conditions: [
          { key: 'status', value: 'pending', color: 'warning' },
          { key: 'status', value: 'added_to_cart', color: 'success' },
        ],
      },
    ];
    /* DataTable keeps the columns it mounts with, so each tab has its own set */
    this.columns = {
      received: [
        { name: 'order_no', display_name: 'Order #' },
        { name: 'requested_by_name', display_name: 'Requested By' },
        { name: 'requested_by_role', display_name: 'Role' },
        { name: 'requested_by_mobile', display_name: 'Mobile' },
        ...tail,
      ],
      sent: [
        { name: 'order_no', display_name: 'Order #' },
        { name: 'requested_to_name', display_name: 'Requested To' },
        { name: 'requested_to_role', display_name: 'Role' },
        { name: 'requested_to_mobile', display_name: 'Mobile' },
        ...tail,
      ],
    };

    const view = { label: 'View', onClick: this.handleView, color: 'primary' };
    this.tableActions = {
      received: [
        // an SE can't open someone else's order - the row shows what is wanted
        ...(isSalesExecutive() ? [] : [view]),
        {
          label: 'Add to Cart',
          onClick: this.handleAddToCart,
          color: 'primary',
          icon: <AddShoppingCartIcon />,
          conditions: [{ key: 'status', value: 'pending' }],
        },
      ],
      // the order screen shows how far each sent request has got
      sent: [view],
    };
  }

  direction = () => (this.state.queryParams.type === 'sent' ? 'sent' : 'received');

  handleDirection = (e, type) => {
    this.setState({ queryParams: { ...this.state.queryParams, type, status: '', page: 1 } }, this.loadListData);
  };

  componentDidMount() {
    this.loadListData();
  }

  loadListData = () => {
    this.setState({ isLoading: true });
    stockRequestList(this.state.queryParams)
      .then((res) => {
        const data = res.data.success ? res.data.data : { items: [], total: 0 };
        this.setState({ items: data.items || [], total: data.total || 0, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
        this.props.enqueueSnackbar('Could not load stock requests.', { variant: 'error' });
      });
  };

  handleTab = (e, status) => {
    this.setState({ queryParams: { ...this.state.queryParams, status, page: 1 } }, this.loadListData);
  };

  handlePagination = (page) => {
    this.setState({ queryParams: { ...this.state.queryParams, page } }, this.loadListData);
  };

  /* the requested pieces this user holds go to its cart; sell them to the asker */
  handleAddToCart = async (row) => {
    const res = await stockRequestAddToCart(row.id).catch((e) => e.response);
    if (res && res.data && res.data.success) {
      this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
      // the sale form picks who the pieces go to
      const to = res.data.data && res.data.data.requested_by_id;
      this.props.navigate(getUserDashboardRoute(getRoleName(this.props.auth)) + '/sales/Create' + (to ? '?transfer_to=' + to : ''));
    } else {
      this.props.enqueueSnackbar((res && res.data && res.data.message) || 'Could not add to cart.', { variant: 'error' });
      this.loadListData();
    }
  };

  /* the order screen shows the request and the Add to Cart for Transfer button */
  handleView = (row) => {
    this.props.navigate(getUserDashboardRoute(getRoleName(this.props.auth)) + '/orders/View/' + row.order_id);
  };

  render() {
    return (
      <MainCard title="Stock Requests">
        <Tabs value={this.state.queryParams.type} onChange={this.handleDirection} sx={{ mb: 1 }}>
          <Tab label="Received" value="" />
          <Tab label="Sent" value="sent" />
        </Tabs>
        <Tabs
          value={this.state.queryParams.status}
          onChange={this.handleTab}
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All" value="" />
          <Tab label="Pending" value="pending" />
          <Tab label="Added To Cart" value="added_to_cart" />
        </Tabs>
        {this.state.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={gridSpacing}>
            <DataTable
              key={this.direction()}
              columns={this.columns[this.direction()]}
              rows={this.state.items}
              page={this.state.queryParams.page}
              limit={this.state.queryParams.limit}
              total={this.state.total}
              handlePagination={this.handlePagination}
              actions={this.tableActions[this.direction()]}
            />
          </Grid>
        )}
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(withSnackbar(StockRequestsPage)));
