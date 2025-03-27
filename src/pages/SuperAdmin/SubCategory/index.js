import { React, Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@mui/material";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import {
  subCategoryList,
  subCategoryDelete,
  subCategoryCreate,
  subCategoryUpdate,
} from "actions/superadmin/subCategory.actions";
import {
  sizeCreate,
  sizeUpdate,
  sizeList,
  sizeDelete,
} from "actions/superadmin/size.actions";
import DataTable from "src/utils/DataTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SubCategoryForm from "forms/SuperAdmin/SubCategoryForm";
import { categoryList } from "actions/superadmin/category.actions";
import { withSnackbar } from "notistack";
import ClearIcon from "@mui/icons-material/Clear";
import { hasPermission } from "src/helpers/helper";
import {
  RESET_SUB_CATEGORY_RESET,
  UPDATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
} from "../../../actionTypes/superadmin/subCategory.types";
import { RESET_SIZE } from "../../../actionTypes/superadmin/size.types";
import Size from "../Size/index";

class SubCategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        category_id: "",
        search: "",
      },
      openDialog: false,
      isCreate: true,
      editRow: null,
      categories: this.props.categories,
      createSuccess: false,
      editSuccess: false,
      deleteSuccess: false,
      actionCalled: this.props.actionCalled,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      submitSuccess: false,
    };
    this.columns = [
      {
        name: "name",
        display_name: "Sub Category",
      },
      {
        name: "category",
        display_name: "Category",
      },
      {
        name: "hsn_code",
        display_name: "HSN Code",
      },
      {
        name: "making_charge_display",
        display_name: "Making Charge",
      },
      /*{
        name: 'making_charge_type_display',
        display_name: 'Charge Type'
      },*/
      {
        name: "status_display",
        display_name: "Status",
      },
    ];

    this.columns1 = [
      {
        name: "name",
        display_name: "Size",
      },
      {
        name: "category_name",
        display_name: "Category",
      },
      {
        name: "sub_category_name",
        display_name: "Sub Category",
      },
    ];
  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
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

    if (props.categories !== state.categories) {
      update.categories = props.categories;
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
    this.props.actions.subCategoryList(this.state.queryParams);
  };

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      //openDialog: true,
      //dialogTitle: 'Edit Sub Category'
    });
  };

  handleDelete = (row) => {
    this.props.actions.subCategoryDelete(row.id);
  };

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: "Create Sub Category",
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

  submit = (data) => {
    if (this.state.editRow) {
      this.props.actions.subCategoryUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.subCategoryCreate(data);
    }
  };

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_SUB_CATEGORY_RESET });
        this.setState(
          {
            queryParams: {
              ...this.state.queryParams,
              page: 1,
            },
            openDialog: false,
            editRow: null,
            submitSuccess: true,
          },
          () => {
            this.loadListData();
            this.setState({
              submitSuccess: false,
            });
          }
        );
      } else if (this.state.editSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_SUB_CATEGORY_RESET });
        this.setState(
          {
            queryParams: {
              ...this.state.queryParams,
              page: 1,
            },
            openDialog: false,
            editRow: null,
            submitSuccess: true,
          },
          () => {
            this.loadListData();
            this.setState({
              submitSuccess: false,
            });
          }
        );
      } else if (this.state.deleteSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({ type: RESET_SUB_CATEGORY_RESET });
        this.handlePagination(1);
      } else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, {
          variant: "error",
        });
        this.props.dispatch({ type: RESET_SUB_CATEGORY_RESET });
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
  };

  categoryChange = (vl) => {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: 1,
          category_id: vl,
        },
      },
      () => {
        this.loadListData();
      }
    );
  };

  nameChange = (vl) => {
    console.log(vl);
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: 1,
          search: vl,
        },
      },
      () => {
        this.loadListData();
      }
    );
  };

  render() {
    console.log(
      "this is sub-categories props form ",
      this.state?.queryParams,
    );

    return (
      <MainCard title="Sub Category">
        {hasPermission(this.state.permissions, "sub_category", "add") ? (
          <div className="tax-input loans_view p_view">
            <SubCategoryForm
              onSubmit={this.submit}
              formData={this.state.editRow}
              categories={this.state.categories}
              handleCancel={this.handleCancel}
              categoryChange={this.categoryChange}
              submitSuccess={this.state.submitSuccess}
              nameChange={this.nameChange}
            />
            <Size
              Sub_Cat={true}
              sub_category_name={this.state?.queryParams?.search}
            />
          </div>
        ) : null}
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
                show: hasPermission(
                  this.state.permissions,
                  "sub_category",
                  "edit"
                ),
              },
              {
                label: "Delete",
                onClick: this.handleDelete,
                isDelete: true,
                color: "error",
                show: hasPermission(
                  this.state.permissions,
                  "sub_category",
                  "edit"
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
            <SubCategoryForm
              onSubmit={this.submit}
              formData={this.state.editRow}
              categories={this.state.categories}
              handleCancel={this.handleCancel}
              submitSuccess={this.state.submitSuccess}
            />
          </DialogContent>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.subCategory.items,
  total: state.superadmin.subCategory.total,
  categories: state.superadmin.category.items || [],
  actionCalled: state.superadmin.subCategory.actionCalled,
  createSuccess: state.superadmin.subCategory.createSuccess,
  editSuccess: state.superadmin.subCategory.editSuccess,
  deleteSuccess: state.superadmin.subCategory.deleteSuccess,
  successMessage: state.superadmin.subCategory.successMessage,
  errorMessage: state.superadmin.subCategory.errorMessage,
  permissions: state.employee.permissions.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      sizeCreate,
      sizeUpdate,
      subCategoryList,
      subCategoryCreate,
      subCategoryUpdate,
      subCategoryDelete,
      categoryList,
    },
    dispatch
  ),
});

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SubCategoryPage))
);
