import { React, Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  Box,
  FormControl,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import { withSnackbar } from "notistack";
import { getSearchResult } from "actions/superadmin/search.actions";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "src/utils/DataTable";

class SizePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      auth: this.props.auth,
      searchData: [],
      total: 0,
      search: "",
      loading: true,
    };

    this.columns = [
      {
        name: "type_display",
        display_name: "Type",
      },
      {
        name: "invoice_number",
        display_name: "Invoice Number",
      },
      {
        name: "invoice_date",
        display_name: "Invoice Date",
      },
      {
        name: "sender_name",
        display_name: "Sender",
      },
      {
        name: "receiver_name",
        display_name: "Receiver",
      },
    ];
  }

  componentDidMount() {
    if (this.props.query.get("search")) {
      this.setState(
        {
          search: this.props.query.get("search"),
        },
        () => {
          this.loadSearchData();
        },
      );
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    return update;
  }

  loadSearchData = async () => {
    this.setState({ isLoading: true });
    if (!this.state.search) {
      this.setState({
        searchData: [],
        total: 0,
      });
      return;
    }

    let res = await getSearchResult({ search: this.state.search });
    if (res.data.success) {
      this.setState({
        searchData: res.data.data.items,
        total: res.data.data.total,
        loading: false,
        isLoading: false,
      });
    } else {
      this.setState({
        loading: false,
        isLoading: false,
      });
    }
  };

  handleSearch = () => {
    this.loadSearchData();
  };

  componentDidUpdate(prevProps) {
    if (this.props.query.get("search") != prevProps.query.get("search")) {
      if (this.props.query.get("search")) {
        this.setState(
          {
            search: this.props.query.get("search"),
          },
          () => {
            this.loadSearchData();
          },
        );
      }
    }
  }

  render() {
    return (
      <MainCard title="Search">
        <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
          <Grid container spacing={2} className="tax-input loans_view p_view">
            <Grid item md={3} xs={12} className="create-input">
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          visibility: this.state.search ? "visible" : "hidden",
                        }}
                        onClick={(e) => this.setState({ search: "" })}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              className="create-input order-input button-right"
            >
              <Button
                variant="contained"
                className="search-btn"
                onClick={this.handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={gridSpacing}>
          {this.state.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataTable
              columns={this.columns}
              rows={this.state.searchData}
              page={1}
              limit={this.state.searchData.length}
              total={this.state.searchData.length}
              havePagination={false}
            />
          )}
        </Grid>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({}, dispatch),
});

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SizePage)),
);
