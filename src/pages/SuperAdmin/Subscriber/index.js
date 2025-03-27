import { React, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Box, FormControl, TextField, IconButton } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { subscriberList } from 'actions/superadmin/subscriber.actions';
import DataTable from 'src/utils/DataTable';
import ClearIcon from '@mui/icons-material/Clear';

class SubscriberPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 1,
      queryParams: {
        page: 1,
        limit: 20,
        search: ''
      }
    }
    this.columns = [
      {
        name: 'name',
        display_name: 'Name'
      },
      {
        name: 'email',
        display_name: 'Email'
      },
      {
        name: 'mobile',
        display_name: 'Mobile'
      },
      {
        name: 'created_at',
        display_name: 'Created At'
      }
    ];

  }

  componentDidMount() {
    this.loadListData();
  }

  loadListData = () => {
    subscriberList(this.state.queryParams)
      .then(res => {
        if (res.data.success) {
          this.setState({
            items: res.data.data.items,
            total: res.data.data.total
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

  handleSearchChange = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value
      }
    })
  }

  handleSearch = () => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        page: 1
      }
    }, () => {
      this.loadListData();
    })
  }

  render() {

    return (
      <MainCard title="Subscriber" >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className='tax-input loans_view p_view'>
            <Grid item xs={3} className='create-input'>
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) => this.handleSearchChange(e.target.value, 'search')}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{ visibility: this.state.queryParams.search ? "visible" : "hidden" }}
                        onClick={(e) => this.handleSearchChange('', 'search')}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1} className='create-input order-input button-right'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={gridSpacing}>
          <DataTable
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
          />
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriberPage));
