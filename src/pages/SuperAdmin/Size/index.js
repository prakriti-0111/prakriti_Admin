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
import { sizeList, sizeDelete } from "actions/superadmin/size.actions";
import DataTable from "src/utils/DataTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sizeCreate, sizeUpdate } from "actions/superadmin/size.actions";
import SizeForm from "forms/SuperAdmin/SizeForm";
import { withSnackbar } from "notistack";
import { RESET_SIZE } from "../../../actionTypes/superadmin/size.types";
import { subCategoryList } from "actions/superadmin/subCategory.actions";
import ClearIcon from "@mui/icons-material/Clear";
import { hasPermission } from "src/helpers/helper";

class SizePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      queryParams: {
        page: 1,
        limit: 50,
        search: "",
        sub_category_id: "",
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
      subCategoryList: this.props.subCategoryList,
      submitSuccess: false,
    };
    this.columns = [
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
    this.props.actions.subCategoryList({ all: 1 });
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
    if (props.subCategoryList !== state.subCategoryList) {
      update.subCategoryList = props.subCategoryList;
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
    this.props.actions.sizeList(this.state.queryParams);
  };

  handleEdit = (row) => {
    this.setState({
      editRow: row,
      //openDialog: true,
      //dialogTitle: 'Edit Size'
    });
  };

  handleDelete = (row) => {
    this.props.actions.sizeDelete(row.id);
  };

  handleCreate = () => {
    this.setState({
      openDialog: true,
      dialogTitle: "Create Size",
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
      this.props.actions.sizeUpdate(this.state.editRow.id, data);
    } else {
      this.props.actions.sizeCreate(data);
    }
  };

  componentDidUpdate() {
    if (this.state.actionCalled) {
      if (this.state.createSuccess) {
        this.props.enqueueSnackbar(this.state.successMessage, {
          variant: "success",
        });
        this.props.dispatch({
          type: RESET_SIZE,
        });
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
        this.props.dispatch({
          type: RESET_SIZE,
        });
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
        this.props.dispatch({
          type: RESET_SIZE,
        });
        this.handlePagination(1);
      } else if (this.state.errorMessage != null) {
        this.props.enqueueSnackbar(this.state.errorMessage, {
          variant: "error",
        });
        this.props.dispatch({
          type: RESET_SIZE,
        });
      }
    }
  }

  handleCancel = () => {
    this.handleDialogClose();
    this.setState(
      {
        submitSuccess: true,
      },
      () => {
        this.setState({
          submitSuccess: false,
        });
      }
    );
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

  subCategoryChange = (vl) => {
    // console.log("vl------",vl,);

    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          page: 1,
          sub_category_id: vl,
          search: "",
        },
      },
      () => {
        this.loadListData();
      }
    );
  };

  nameChange = (vl) => {
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
    console.log("size--------------", this.state);
    let size_type = "";
    return (
      <MainCard
        title={`Size | ${
          this.state.queryParams.sub_category_id
            ? this.state.items.reverse().map((item) => {
                let data = item.name.split(" ");
                size_type = data[1];
                return `${data[0]}`;
              })
            : "No Size"
        } ${size_type ? size_type : ""}`}
      >
        {hasPermission(this.state.permissions, "size", "edit") ? (
          <div className="tax-input p_view loans_view">
            <SizeForm
              onSubmit={this.submit}
              formData={this.state.editRow}
              handleCancel={this.handleCancel}
              subcategories={this.state.subCategoryList}
              nameChange={this.nameChange}
              subCategoryChange={this.subCategoryChange}
              // {console.log(this.props.sub_category_name)}
              sub_category_name={this.props.sub_category_name}
              submitSuccess={this.state.submitSuccess}
            />
          </div>
        ) : null}
        {/*<Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
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
            <Grid item xs={2} className='create-input order-input'>
              <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
            </Grid>
          </Grid>
        </Box>*/}
        {/* {console.log("----------------itens",this.props.subCategoryList.length==1?this.props.subCategoryList[0].name:this.props)} */}
        {/* {!this.props?.Sub_Cat ? ( */}
        {this.state.queryParams.sub_category_id ? (
          <div class="accordion " id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Category Size
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <Grid container spacing={gridSpacing} className="abc">
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
                            "size",
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
                            "size",
                            "delete"
                          ),
                        },
                      ]}
                    />
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
            <SizeForm
              onSubmit={this.submit}
              formData={this.state.editRow}
              handleCancel={this.handleCancel}
              subcategories={this.state.subCategoryList}
            />
          </DialogContent>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.superadmin.size.items,
  total: state.superadmin.size.total,
  actionCalled: state.superadmin.size.actionCalled,
  createSuccess: state.superadmin.size.createSuccess,
  editSuccess: state.superadmin.size.editSuccess,
  deleteSuccess: state.superadmin.size.deleteSuccess,
  successMessage: state.superadmin.size.successMessage,
  errorMessage: state.superadmin.size.errorMessage,
  subCategoryList: state.superadmin.subCategory.items,
  permissions: state.employee.permissions.permissions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    { sizeList, sizeCreate, sizeUpdate, sizeDelete, subCategoryList },
    dispatch
  ),
});

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SizePage))
);
