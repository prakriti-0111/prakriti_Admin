import { React, Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  Box,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import {
  categoryList,
  categoryDelete,
} from "actions/superadmin/category.actions";
import DataTable from "src/utils/DataTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  categoryCreate,
  categoryUpdate,
} from "actions/superadmin/category.actions";
import CategoryForm from "forms/SuperAdmin/CategoryForm";
import { withSnackbar } from "notistack";
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  RESET_CATEGORY,
} from "../../../actionTypes/superadmin/category.types";
import { isEmpty, toBase64, hasPermission } from "src/helpers/helper";
import ClearIcon from "@mui/icons-material/Clear";

class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: "",
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
    };
    this.columns = [
      {
        name: "banner",
        display_name: "Banner",
        isImage: true,
        className: "banner_img",
        isBanner: true,
      },
      {
        name: "Mobile",
        display_name: "Mobile",
        isImage: true,
      },
      {
        name: "icon",
        display_name: "Icon",
        isImage: true,
      },
      {
        name: "name",
        display_name: "Category",
      },
      {
        name: "is_certified_display",
        display_name: "Is Certified",
      },
      {
        name: "is_material_display",
        display_name: "Is Material",
      },
      {
        name: "status_display",
        display_name: "Status",
      },
      {
        name: "front_display",
        display_name: "Front",
      },
    ];
  }

  componentDidMount() {
    this.loadListData();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }

    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }

    if (
      "createSuccess" in props &&
      props.createSuccess !== state.createSuccess
    ) {
      update.createSuccess = props.createSuccess;
    }

    if ("editSuccess" in props && props.editSuccess !== state.editSuccess) {
      update.editSuccess = props.editSuccess;
    }

    if (
      "deleteSuccess" in props &&
      props.deleteSuccess !== state.deleteSuccess
    ) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }

    return update;
  }

  handlePagination = (page) => {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: page,
        },
      },
      () => {
        this.loadListData();
      }
    );
  };

  loadListData = () => {
    this.props.actions.categoryList(this.state.queryParams);
  };

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      openDialog: true,
      dialogTitle: "Edit Category",
    });
  };

  handleDelete = (row) => {
    this.props.actions.categoryDelete(row.id);
  };

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: "Create Category",
      editRow: null,
    });
  };

  handleDialogClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    this.setState({
      openDialog: false,
      editRow: null,
    });
  };

  submit = async (data) => {
    let fromdata = { ...data };
    if (!isEmpty(data.bannerFile)) {
      data.banner = await toBase64(data.bannerFile);
    } else {
      data.banner = "";
    }

    // -----------------------------Mobile File-----------------------------------

    if (!isEmpty(data.MobileFile)) {
      data.Mobile = await toBase64(data.MobileFile);
    } else {
      data.Mobile = "";
    }

    // -----------------------------Icon File-----------------------------------

    if (!isEmpty(data.iconFile)) {
      data.icon = await toBase64(data.iconFile);
    } else {
      data.icon = "";
    }

    if (this.state.editRow) {
      this.props.actions.categoryUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.categoryCreate(data);
    }
  };

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_CATEGORY });
        this.setState(
          {
            queryParams: {
              ...this.state.queryParams,
              page: 1,
            },
            openDialog: false,
            editRow: null,
          },
          () => {
            this.loadListData();
          }
        );
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_CATEGORY });
        this.setState(
          {
            queryParams: {
              ...this.state.queryParams,
              page: 1,
            },
            openDialog: false,
            editRow: null,
          },
          () => {
            this.loadListData();
          }
        );
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_CATEGORY });
        this.handlePagination(1);
      } else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, {
          variant: "error",
        });
        this.props.dispatch({ type: RESET_CATEGORY });
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
  };

  handleSearchChange = (value, key) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        [key]: value,
      },
    });
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
        this.loadListData();
      }
    );
  };

  render() {
    return (
      <MainCard
        title="Category"
        secondary={
          hasPermission(this.state.permissions, "category", "add") ? (
            <Button variant="contained" onClick={this.handleCreate}>
              Add
            </Button>
          ) : null
        }
      >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
          <Grid container spacing={2} className="tax-input loans_view p_view">
            <Grid item xs={12} md={3} className="create-input">
              <FormControl fullWidth>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={this.state.queryParams.search}
                  onChange={(e) =>
                    this.handleSearchChange(e.target.value, "search")
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          visibility: this.state.queryParams.search
                            ? "visible"
                            : "hidden",
                        }}
                        onClick={(e) => this.handleSearchChange("", "search")}
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
          <DataTable
            columns={this.columns}
            rows={this.state.items}
            page={this.state.queryParams.page}
            limit={this.state.queryParams.limit}
            total={this.state.total}
            handlePagination={this.handlePagination}
            actions={[
              {
                label: "Edit",
                onClick: this.handleEdit,
                color: "primary",
                show: hasPermission(this.state.permissions, "category", "edit"),
              },
              {
                label: "Delete",
                onClick: this.handleDelete,
                isDelete: true,
                color: "error",
                show: hasPermission(
                  this.state.permissions,
                  "category",
                  "delete"
                ),
              },
            ]}
          />
        </Grid>

        <Dialog
          className="ratn-dialog-wrapper"
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <CategoryForm
              onSubmit={this.submit}
              formData={this.state.editRow}
              handleCancel={this.handleCancel}
            />
          </DialogContent>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.category.items,
  total: state.superadmin.category.total,
  actionCalled: state.superadmin.category.actionCalled,
  createSuccess: state.superadmin.category.createSuccess,
  editSuccess: state.superadmin.category.editSuccess,
  deleteSuccess: state.superadmin.category.deleteSuccess,
  successMessage: state.superadmin.category.successMessage,
  errorMessage: state.superadmin.category.errorMessage,
  permissions: state.employee.permissions.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      categoryList,
      categoryCreate,
      categoryUpdate,
      categoryDelete,
      categoryList,
    },
    dispatch
  ),
});

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPage))
);
