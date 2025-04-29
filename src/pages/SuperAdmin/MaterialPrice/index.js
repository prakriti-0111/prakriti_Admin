import React, { Component } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  ListItemText,
  Checkbox,
  Link,
  Box,
  TextField,
  Grid,
  Button,
  CircularProgress,
  Pagination,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoginForm from "forms/SuperAdmin/LoginForm";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import {
  materialPriceRawList,
  materialPriceDelete,
} from "actions/superadmin/materialPrice.actions";
import { RESET_MATERIAL_PRICE } from "../../../actionTypes/superadmin/materialPrice.types";
import { withSnackbar } from "notistack";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { categoryList } from "actions/superadmin/category.actions";
import {
  materialList,
  materialCreate,
} from "actions/superadmin/material.actions";
import { displayAmount, hasPermission } from "src/helpers/helper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { purityList } from "actions/superadmin/purity.actions";
import { unitList } from "actions/superadmin/unit.actions";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  RESET_MATERIAL,
  SET_MATERIAL,
} from "../../../actionTypes/superadmin/material.types";
import MaterialPriceForm from "forms/SuperAdmin/MaterialPriceForm";
import _ from "lodash";
import "./tableStyle.css";

const filter = createFilterOptions();

class MaterialPricePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [], //this.props.items,
      total: 0, //this.props.total,
      categoryList: this.props.categoryList,
      materialList: this.props.materialList,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      permissions: this.props.permissions,
      queryParams: {
        page: 1,
        limit: 50,
      },
      deleteDialogOpen: false,
      deletingId: null,
      category_id: "",
      material_id: "",
      material_name: "",
      view_open: {},
      purities: this.props.purities,
      units: this.props.units,
      is_new_material: false,
      material_form: {
        name: "",
        unit_id: "",
        purities: [],
      },
      material_form_errors: {
        unit_id: false,
        purities: false,
      },
      material_key: 0,
      m_actionCalled: this.props.m_actionCalled,
      m_createSuccess: this.props.m_createSuccess,
      m_successMessage: this.props.m_successMessage,
      m_errorMessage: this.props.m_errorMessage,
      create_material_price: false,
      material_data: this.props.material_data,

      mp_actionCalled: this.props.mp_actionCalled,
      mp_createSuccess: this.props.mp_createSuccess,
      mp_successMessage: this.props.mp_successMessage,
      mp_errorMessage: this.props.mp_errorMessage,
    };

    this.columns = [
      {
        name: "name",
        display_name: "Name",
      },
      {
        name: "category",
        display_name: "Category",
      },
      {
        name: "sub_category",
        display_name: "Sub Category",
      },
      {
        name: "type_diplay",
        display_name: "Product Type",
      },
      {
        name: "display_size",
        display_name: "Size",
      },
      {
        name: "display_material",
        display_name: "Material",
      },
    ];
  }

  componentDidMount() {
    this.loadListData();
    this.props.actions.categoryList({ all: 1 });
    this.props.actions.unitList({ all: 1 });
    this.props.actions.purityList({ all: 1 });
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    /*if (props.items !== state.items) {
      update.items = props.items;
    }

    if (props.total !== state.total) {
      update.total = props.total;
    }*/

    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }

    if (props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }
    if (props.categoryList !== state.categoryList) {
      update.categoryList = props.categoryList;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }
    if (props.units !== state.units) {
      update.units = props.units;
    }

    if (props.purities !== state.purities) {
      update.purities = props.purities;
    }

    if (props.m_actionCalled !== state.m_actionCalled) {
      update.m_actionCalled = props.m_actionCalled;
    }
    if (props.m_createSuccess !== state.m_createSuccess) {
      update.m_createSuccess = props.m_createSuccess;
    }
    if (props.m_successMessage !== state.m_successMessage) {
      update.m_successMessage = props.m_successMessage;
    }
    if (props.m_errorMessage !== state.m_errorMessage) {
      update.m_errorMessage = props.m_errorMessage;
    }
    if (props.material_data !== state.material_data) {
      update.material_data = props.material_data;
    }

    if (props.mp_actionCalled !== state.mp_actionCalled) {
      update.mp_actionCalled = props.mp_actionCalled;
    }
    if (props.mp_createSuccess !== state.mp_createSuccess) {
      update.mp_createSuccess = props.mp_createSuccess;
    }
    if (props.mp_successMessage !== state.mp_successMessage) {
      update.mp_successMessage = props.mp_successMessage;
    }
    if (props.mp_errorMessage !== state.mp_errorMessage) {
      update.mp_errorMessage = props.mp_errorMessage;
    }
    if (props.permissions !== state.permissions) {
      update.permissions = props.permissions;
    }

    return update;
  }

  loadListData = async () => {
    let queryParams = { ...this.state.queryParams };
    queryParams.category_id = this.state.category_id;
    queryParams.material_id = this.state.material_id;
    if (!this.state.category_id) {
      queryParams.category_id = 0;
    }
    let res = await materialPriceRawList(queryParams);
    if (res.data.success) {
      this.setState(
        {
          items: res.data.data.items,
          total: res.data.data.total,
        },
        () => {
          if (this.state.material_id && !res.data.data.items.length) {
            let material = _.filter(this.state.materialList, {
              id: this.state.material_id,
            });
            this.props.dispatch({
              type: SET_MATERIAL,
              payload: material[0],
            });
            this.setState({
              create_material_price: true,
              is_new_material: false,
              material_form: {
                name: "",
                unit_id: "",
                purities: [],
              },
            });
          } else {
            this.setState({
              create_material_price: false,
              is_new_material: false,
              material_form: {
                name: "",
                unit_id: "",
                purities: [],
              },
            });
          }
        }
      );
    }
  };

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

  handelEdit = (id) => {
    this.props.navigate("edit/" + id);
  };

  handleDelete = (id) => {
    this.setState({
      deletingId: id,
      deleteDialogOpen: true,
    });
  };

  handleDeleteConfirm = () => {
    this.props.actions.materialPriceDelete(this.state.deletingId);
    this.handleDialogClose();
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.state.deleteSuccess) {
      const { dispatch } = this.props;
      this.props.enqueueSnackbar(this.state.successMessage, {
        variant: "success",
      });
      dispatch({
        type: RESET_MATERIAL_PRICE,
      });
      this.handlePagination(1);
    }

    if (this.state.m_actionCalled) {
      if (this.state.m_createSuccess) {
        this.props.enqueueSnackbar(this.state.m_successMessage, {
          variant: "success",
        });
        this.setState({
          create_material_price: true,
          is_new_material: false,
          material_form: {
            name: "",
            unit_id: "",
            purities: [],
          },
          material_key: this.state.material_key + 1,
          material_id: this.state.material_data.id,
          material_name: this.state.material_data.name,
        });
        this.props.actions.materialList({
          all: 1,
          category_id: this.state.category_id,
        });
      } else {
        this.props.enqueueSnackbar(this.state.m_errorMessage, {
          variant: "error",
        });
      }
      this.props.dispatch({ type: RESET_MATERIAL });
    }

    if (this.state.mp_actionCalled) {
      if (this.state.mp_createSuccess) {
        this.props.enqueueSnackbar(this.state.mp_successMessage, {
          variant: "success",
        });
        this.props.dispatch({
          type: RESET_MATERIAL_PRICE,
        });
        this.setState(
          {
            create_material_price: false,
          },
          () => {
            this.loadListData();
          }
        );
      } else {
        this.props.enqueueSnackbar(this.state.mp_errorMessage, {
          variant: "error",
        });
      }
    }
  }

  handleChangePage = (e, number) => {
    this.handlePagination(number);
  };

  handleDialogClose = () => {
    this.setState({
      deleteDialogOpen: false,
      deletingId: null,
    });
  };

  handleCategoryChange = (event) => {
    this.setState(
      {
        category_id: event.target.value,
      },
      () => {
        this.props.actions.materialList({
          all: 1,
          category_id: event.target.value,
        });
        this.loadListData();
      }
    );
  };

  handleMaterialChange = (event) => {
    this.setState(
      {
        material_id: event.target.value,
      },
      () => {
        this.loadListData();
      }
    );
  };

  setOpen = (id) => {
    let view_open = this.state.view_open;
    view_open[id] = !this.checkOpen(id);
    this.setState({
      view_open: view_open,
    });
  };

  checkOpen = (id) => {
    let view_open = this.state.view_open;
    return id in view_open && view_open[id] ? true : false;
  };

  handleMaterialForm = (event) => {
    const { name, value } = event.target;
    this.setState({
      material_form: {
        ...this.state.material_form,
        [name]: value,
      },
    });
  };

  materialFormSubmit = () => {
    let err = false;
    let material_form = this.state.material_form;
    let material_form_errors = this.state.material_form_errors;
    if (!material_form.unit_id) {
      material_form_errors.unit_id = true;
      err = true;
    } else {
      material_form_errors.unit_id = false;
    }
    if (!material_form.purities.length) {
      material_form_errors.purities = true;
      err = true;
    } else {
      material_form_errors.purities = false;
    }
    this.setState({
      material_form_errors: material_form_errors,
    });
    if (!err) {
      let data = {
        ...material_form,
        category_id: this.state.category_id,
        status: 1,
      };
      this.props.actions.materialCreate(data);
    }
  };

  materialFormCancel = () => {
    this.setState(
      {
        material_id: "",
        is_new_material: false,
        material_form: {
          name: "",
          unit_id: "",
          purities: [],
        },
        material_key: this.state.material_key + 1,
      },
      () => {
        this.loadListData();
      }
    );
  };

  handleCancelPriceCreate = () => {
    this.setState(
      {
        material_id: "",
        material_name: "",
        is_new_material: false,
        create_material_price: false,
        material_form: {
          name: "",
          unit_id: "",
          purities: [],
        },
        material_key: this.state.material_key + 1,
      },
      () => {
        this.loadListData();
      }
    );
  };

  getSelectedNames = (selected) => {
    let arr = [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(this.state.purities, { id: selected[i] });
      arr.push(item[0].name);
    }
    return arr;
  };

  render() {
    const totalPage = Math.ceil(
      this.state.total / this.state.queryParams.limit
    );
    return (
      <MainCard title="Price List">
        <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
          <Grid container spacing={2} className="tax-input loans_view p_view">
            <Grid
              item
              xs={this.state.is_new_material ? 3 : 6}
              className="create-input"
            >
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={this.state.category_id}
                  label="Category"
                  onChange={this.handleCategoryChange}
                  className="input-inner"
                  defaultValue=""
                >
                  {this.state.categoryList.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={this.state.is_new_material ? 3 : 6}
              className="create-input"
            >
              <Autocomplete
                className="autocomplete-selectbox"
                key={this.state.material_key}
                fullWidth
                value={this.state.material_name}
                onChange={(event, newValue) => {
                  if (newValue && newValue.inputValue) {
                    this.setState({
                      is_new_material: true,
                      create_material_price: false,
                      material_name: newValue.inputValue,
                      material_form: {
                        ...this.state.material_form,
                        name: newValue.inputValue,
                      },
                    });
                  } else if (newValue) {
                    this.setState(
                      {
                        material_id: newValue.id,
                        material_name: newValue.name,
                        is_new_material: false,
                        material_form: {
                          ...this.state.material_form,
                          name: "",
                        },
                      },
                      () => {
                        this.loadListData();
                      }
                    );
                  } else {
                    this.setState(
                      {
                        material_id: "",
                        material_name: "",
                        is_new_material: false,
                        material_form: {
                          ...this.state.material_form,
                          name: "",
                        },
                      },
                      () => {
                        this.loadListData();
                      }
                    );
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (
                    inputValue !== "" &&
                    !isExisting &&
                    hasPermission(this.state.permissions, "material", "add")
                  ) {
                    filtered.push({
                      inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={this.state.materialList}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Material" />
                )}
              />
              {/*<Autocomplete
                    freeSolo
                    options={this.state.materialList}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Material" />}
                  />*/}

              {/*<Select
                    value={this.state.material_id}
                    label="Material"
                    onChange={this.handleMaterialChange}
                    className='input-inner'
                    defaultValue=""
                  >
                    <MenuItem value="">All</MenuItem>
                    {
                      this.state.materialList.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>*/}
            </Grid>
            {this.state.is_new_material ? (
              <>
                <Grid item xs={4} className="create-input">
                  <FormControl
                    fullWidth
                    error={this.state.material_form_errors.purities}
                  >
                    <InputLabel>Purities</InputLabel>
                    <Select
                      value={this.state.material_form.purities}
                      label="Purities"
                      onChange={this.handleMaterialForm}
                      className="input-inner"
                      multiple
                      name="purities"
                      renderValue={(selected) =>
                        this.getSelectedNames(selected).join(", ")
                      }
                    >
                      {this.state.purities.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          className="multi-select"
                        >
                          <Checkbox
                            checked={
                              this.state.material_form.purities &&
                              this.state.material_form.purities.indexOf(
                                item.id
                              ) > -1
                                ? true
                                : false
                            }
                          />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} className="create-input">
                  <FormControl
                    fullWidth
                    error={this.state.material_form_errors.unit_id}
                  >
                    <InputLabel>Unit</InputLabel>
                    <Select
                      value={this.state.material_form.unit_id}
                      label="Unit"
                      onChange={this.handleMaterialForm}
                      className="input-inner"
                      defaultValue=""
                      name="unit_id"
                    >
                      {this.state.units.map((item, index) => (
                        <MenuItem value={item.id} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ) : null}
          </Grid>
          {this.state.is_new_material ? (
            <Grid item xs={12}>
              <Stack
                spacing={1}
                direction="row"
                className="modal-button-area ratn-footer-buttons"
                sx={{ mb: 2 }}
              >
                <Button
                  variant="contained"
                  className="conf-button"
                  onClick={this.materialFormSubmit}
                >
                  Submit
                </Button>
                <Button variant="outlined" onClick={this.materialFormCancel}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          ) : null}
        </Box>

        {!this.state.is_new_material && !this.state.create_material_price ? (
          <Grid container spacing={gridSpacing}>
            {!this.state.items.length ? (
              <Grid container justifyContent="center">
                <span className="data-found">
                  {!this.state.category_id
                    ? "Please select category."
                    : "No data found."}
                </span>
              </Grid>
            ) : (
              <>
                {this.state.items.map((item, index) => (
                  <React.Fragment key={index}>
                    {/*<h3 className='price_list_heading'><b>{item.material_name} / {item.unit_name}</b></h3>*/}

                    <TableContainer
                      component={Paper}
                      className="table_container ratn-table-wrapper"
                    >
                      <Table
                        sx={{ minWidth: 500 }}
                        className="price_list_table"
                        border="1"
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell
                              padding="none"
                              className="th_header text-white bg-black"
                              style={{ fontWeight: "600" }}
                              sx={{ width: 230 }}
                            >
                              Material
                            </TableCell>
                            <TableCell
                              padding="none"
                              className="th_header text-white bg-black"
                              style={{ fontWeight: "600" }}
                              sx={{ width: 110 }}
                            >
                              Purity
                            </TableCell>
                            {item.purities.map((item, index) => (
                              <TableCell
                                key={index}
                                padding="none"
                                className="th_header text-white bg-black"
                                style={{ fontWeight: "600" }}
                              >
                                {item.purity_name}
                              </TableCell>
                            ))}
                            <TableCell
                              padding="none"
                              className="th_header th_header_action price-th text-white bg-black"
                              style={{ fontWeight: "600" }}
                            >
                              Action
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              padding="none"
                              className="icon-btn-height"
                              rowSpan={7}
                            >
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => this.setOpen(item.id)}
                              >
                                {this.checkOpen(item.id) ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                              {item.material_name}
                            </TableCell>
                            <TableCell
                              padding="none"
                              className="icon-btn-height"
                            >
                              {/*<IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => this.setOpen(item.id)}
                                  >
                                    {this.checkOpen(item.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                  </IconButton>*/}
                              Price / {item.unit_name}
                            </TableCell>
                            {item.purities.map((p_item, p_index) => (
                              <TableCell
                                key={p_index}
                                padding="none"
                                className="cell_padding"
                              >
                                {p_item.display_price}
                              </TableCell>
                            ))}
                            <TableCell
                              rowSpan={7}
                              padding="none"
                              className="cell_padding"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                {hasPermission(
                                  this.state.permissions,
                                  "price_list",
                                  "edit"
                                ) ? (
                                  <IconButton
                                    color="primary"
                                    component="label"
                                    onClick={() => this.handelEdit(item.id)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                ) : null}
                                {hasPermission(
                                  this.state.permissions,
                                  "price_list",
                                  "delete"
                                ) ? (
                                  <IconButton
                                    color="error"
                                    component="label"
                                    onClick={() => this.handleDelete(item.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                ) : null}
                              </Stack>
                            </TableCell>
                          </TableRow>
                          {this.checkOpen(item.id) ? (
                            <>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Increase
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.increase}% |{" "}
                                    {displayAmount(p_item.mrp)}
                                  </TableCell>
                                ))}
                              </TableRow>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Admin Discount
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.admin_discount}%
                                  </TableCell>
                                ))}
                              </TableRow>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Distributor Discount
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.distributor_discount}%
                                  </TableCell>
                                ))}
                              </TableRow>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Se Discount
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.se_discount}%
                                  </TableCell>
                                ))}
                              </TableRow>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Retailer Discount
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.retailer_max_discount}%
                                  </TableCell>
                                ))}
                              </TableRow>
                              <TableRow>
                                <TableCell padding="none" className="">
                                  Customer Discount
                                </TableCell>
                                {item.purities.map((p_item, p_index) => (
                                  <TableCell
                                    key={p_index}
                                    padding="none"
                                    className="cell_padding"
                                  >
                                    {p_item.customer_discount}%
                                  </TableCell>
                                ))}
                              </TableRow>
                            </>
                          ) : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </React.Fragment>
                ))}

                {/*{
                  this.state.total > 0 ? 
                  <Grid container alignItems="right">
                    <Grid item>
                      <Pagination 
                        count={totalPage}
                        page={this.state.queryParams.page}
                        onChange={this.handleChangePage}
                      />
                    </Grid>
                  </Grid>
                  : null
                }*/}
              </>
            )}
          </Grid>
        ) : null}

        {this.state.create_material_price ? (
          <MaterialPriceForm
            material={this.state.material_data}
            handleCancel={this.handleCancelPriceCreate}
          />
        ) : null}

        <Dialog
          open={this.state.deleteDialogOpen}
          onClose={this.handleDialogClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose}>Close</Button>
            <Button onClick={this.handleDeleteConfirm}>Yes, Confirm</Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  //items: state.superadmin.materialPrice.items,
  //total: state.superadmin.materialPrice.total,
  actionCalled: state.superadmin.materialPrice.actionCalled,
  deleteSuccess: state.superadmin.materialPrice.deleteSuccess,
  successMessage: state.superadmin.materialPrice.successMessage,
  categoryList: state.superadmin.category.items || [],
  materialList: state.superadmin.material.items || [],
  units: state.superadmin.unit.items || [],
  purities: state.superadmin.purity.items || [],
  m_actionCalled: state.superadmin.material.actionCalled,
  m_createSuccess: state.superadmin.material.createSuccess,
  m_successMessage: state.superadmin.material.successMessage,
  m_errorMessage: state.superadmin.material.errorMessage,
  material_data: state.superadmin.material.material,
  mp_actionCalled: state.superadmin.materialPrice.actionCalled,
  mp_createSuccess: state.superadmin.materialPrice.createSuccess,
  mp_successMessage: state.superadmin.materialPrice.successMessage,
  mp_errorMessage: state.superadmin.materialPrice.errorMessage,
  permissions: state.employee.permissions.permissions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(
      {
        materialPriceDelete,
        categoryList,
        materialList,
        unitList,
        purityList,
        materialCreate,
      },
      dispatch
    ),
  };
};

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MaterialPricePage))
);
