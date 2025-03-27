import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm, getFormValues, change } from "redux-form/immutable";
import {
  Box,
  TextField,
  Button,
  Grid,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { ContactPageSharp } from "@mui/icons-material";
import withRouter from "src/helpers/withRouter";
import { priceFormat, displayAmount } from "src/helpers/helper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { subCategoryRawList } from "actions/superadmin/subCategory.actions";

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "name",
    "category_id",
    "hsn_code",
    //'making_charge_type',
    //'making_charge'
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const filter = createFilterOptions({
  stringify: (option) => option.name,
});

class SubCategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: "formData" in this.props ? this.props.formData : null,
      categories: this.props.categories,
      admin_discounted_price: "",
      distributor_discounted_price: "",
      retailer_discounted_price: "",
      customer_discounted_price: "",
      submitSuccess: this.props.submitSuccess,
      sub_category_list: [],
    };
  }

  componentDidMount() {
    if (this.state.formData) {
      this.props.initialize(this.state.formData);
      setTimeout(() => {
        this.calculatePrice();
      }, 500);
    } else {
      this.props.initialize(this.getDefaultValues());
      setTimeout(() => {
        this.calculatePrice();
      }, 500);
    }

    this.loadSubCategoryList("");
  }

  getDefaultValues = () => {
    return {
      category_id: "",
      name: "",
      hsn_code: "",
      making_charge_type: "",
      making_charge: null,
      status: 1,
    };
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.submitSuccess !== state.submitSuccess) {
      update.submitSuccess = props.submitSuccess;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitSuccess) {
      this.resetForm();
    }
    if (this.props.formData != prevProps.formData && this.state.formData) {
      this.props.initialize(this.state.formData);
      setTimeout(() => {
        this.calculatePrice();
      }, 500);
    }
  }

  resetForm = () => {
    let data = { ...this.getDefaultValues() };
    data.category_id = this.props.formValues.category_id;
    this.props.initialize(data);
    this.loadSubCategoryList(data.category_id);
    setTimeout(() => {
      this.calculatePrice();
    }, 500);
  };

  renderSubcategoryTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <Autocomplete
      className="autocomplete-selectbox"
      fullWidth
      value={input.value}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={this.state.sub_category_list}
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
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sub Category Name"
          error={touched && error ? true : false}
          helperText={touched && error ? error : ""}
          {...input}
          {...custom}
        />
      )}
      onInputChange={(event, val) => {
        if ("nameChange" in this.props) {
          this.props.nameChange(val);
        }
      }}
    />
  );

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ""}
      {...input}
      {...custom}
    />
  );

  renderIncreaseField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {custom.making_charge}
          </InputAdornment>
        ),
      }}
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ""}
      {...input}
      {...custom}
    />
  );

  renderCategoryField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="">select category</MenuItem>
        {this.state.categories.map((item, index) => {
          return (
            <MenuItem value={item.id} key={index}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderMakingChargeTypeField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="per_gram">Per gram</MenuItem>
        <MenuItem value="per_piece">Per piece</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderStatusField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="1">Active</MenuItem>
        <MenuItem value="0">Inactive</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  /*renderCheckBoxCase = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControlLabel control={<Checkbox {...input} {...custom} checked={!!input.value} />} label={label} />
  )*/

  renderDiscountField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth sx={{ m: 1 }}>
      <TextField
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {custom.discounted_price}
            </InputAdornment>
          ),
        }}
        label={label}
        fullWidth
        error={touched && error ? true : false}
        helperText={touched && error ? error : ""}
        {...input}
        {...custom}
      />
    </FormControl>
  );

  getDiscountedPrice = (name) => {
    if (name == "admin_discount") {
      return this.state.admin_discounted_price;
    } else if (name == "distributor_discount") {
      return this.state.distributor_discounted_price;
    } else if (name == "retailer_discount") {
      return this.state.retailer_discounted_price;
    } else {
      return this.state.customer_discounted_price;
    }
  };

  handlePriceChange = (e) => {
    setTimeout(() => {
      this.calculatePrice();
    }, 500);
  };

  calculatePrice = () => {
    let {
      base_price,
      increase,
      admin_discount,
      distributor_discount,
      retailer_discount,
      customer_discount,
    } = this.props.formValues;
    let making_charge = "",
      admin_discounted_price = "",
      distributor_discounted_price = "",
      retailer_discounted_price = "",
      customer_discounted_price = "";
    base_price = base_price ? parseFloat(base_price) : 0;
    increase = increase ? parseFloat(increase) : 0;
    if (base_price > 0) {
      let increase_amt =
        increase > 0 ? priceFormat((base_price * 100) / increase) : base_price;
      making_charge = increase_amt; //priceFormat(base_price + increase_amt);
      admin_discounted_price = admin_discount
        ? priceFormat(
            making_charge - (making_charge * parseFloat(admin_discount)) / 100
          )
        : making_charge;
      distributor_discounted_price = distributor_discount
        ? priceFormat(
            making_charge -
              (making_charge * parseFloat(distributor_discount)) / 100
          )
        : making_charge;
      retailer_discounted_price = retailer_discount
        ? priceFormat(
            making_charge -
              (making_charge * parseFloat(retailer_discount)) / 100
          )
        : making_charge;
      customer_discounted_price = customer_discount
        ? priceFormat(
            making_charge -
              (making_charge * parseFloat(customer_discount)) / 100
          )
        : making_charge;
    } else {
      making_charge = 0;
      admin_discounted_price = "";
      distributor_discounted_price = "";
      retailer_discounted_price = "";
      customer_discounted_price = "";
    }

    this.setState(
      {
        admin_discounted_price: admin_discounted_price,
        distributor_discounted_price: distributor_discounted_price,
        retailer_discounted_price: retailer_discounted_price,
        customer_discounted_price: customer_discounted_price,
      },
      () => {
        this.props.change("making_charge", making_charge);
      }
    );
  };

  loadSubCategoryList = async (category_id) => {
    if (category_id) {
      let res = await subCategoryRawList({
        category_id: category_id ? category_id : "",
      });
      if (res.data.success) {
        this.setState({
          sub_category_list: res.data.data.items,
        });
      }
    } else {
      this.setState({
        sub_category_list: [],
      });
    }
  };

  handleCategoryChange = (val) => {
    this.props.categoryChange(val);
    this.loadSubCategoryList(val);
  };

  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    let making_charge_type =
      formValues && "making_charge_type" in formValues
        ? formValues.making_charge_type
        : "";
    let making_charge =
      formValues && "making_charge" in formValues
        ? formValues.making_charge
        : "";

    // console.log(
    //   "this is sub category props",
    //   this.props.subCategoryList?.queryParams?.search
    // );

    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} className="create-input">
              <Field
                name="category_id"
                component={this.renderCategoryField}
                label="Category"
                type="select"
                onChange={(event, val) => this.handleCategoryChange(val)}
              />
            </Grid>
            <Grid item xs={12} md={3} className="create-input">
              <Field
                name="name"
                component={this.renderSubcategoryTextField}
                label="Sub Category Name"
              />
            </Grid>
            <Grid item xs={12} md={3} className="create-input">
              <Field
                name="hsn_code"
                component={this.renderTextField}
                label="HSN Code"
              />
            </Grid>
            <Grid item xs={6} md={2} className="create-input">
              <Field
                name="making_charge_type"
                component={this.renderMakingChargeTypeField}
                label="Making Charge Type"
                type="select"
              />
            </Grid>
            <Grid item xs={6} md={2} className="create-input">
              <Field
                name="base_price"
                component={this.renderTextField}
                label="Making Charge"
                disabled={!making_charge_type ? true : false}
                onChange={this.handlePriceChange}
              />
            </Grid>
            <Grid item xs={6} md={2} className="create-input">
              <Field
                name="increase"
                component={this.renderIncreaseField}
                label="Increase"
                disabled={!making_charge_type ? true : false}
                onChange={this.handlePriceChange}
                making_charge={making_charge}
              />
              <div style={{ display: "none" }}>
                <Field
                  name="making_charge"
                  component={this.renderTextField}
                  label="Making Charge"
                />
              </div>
            </Grid>
            {/*<Grid item xs={3} className='create-input'>
                  <Field
                    name="status"
                    component={this.renderStatusField}
                    label="Status"
                    type="select"
    /> 
              </Grid>*/}
            <Grid item xs={6} md={2} className="create-input">
              <Field
                name="admin_discount"
                component={this.renderDiscountField}
                label="Admin Disc"
                onChange={this.handlePriceChange}
                discounted_price={displayAmount(
                  this.state.admin_discounted_price
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} className="create-input">
              <Field
                name="distributor_discount"
                component={this.renderDiscountField}
                label="Distributor Dc"
                onChange={this.handlePriceChange}
                discounted_price={displayAmount(
                  this.state.distributor_discounted_price
                )}
              />
            </Grid>
            <Grid item xs={6} md={2} className="create-input">
              <Field
                name="retailer_discount"
                component={this.renderDiscountField}
                label="Retailer Dc"
                onChange={this.handlePriceChange}
                discounted_price={displayAmount(
                  this.state.retailer_discounted_price
                )}
              />
            </Grid>
            <Grid item xs={6} md={3} className="create-input">
              <Field
                name="customer_discount"
                component={this.renderDiscountField}
                label="Customer Dc"
                onChange={this.handlePriceChange}
                discounted_price={displayAmount(
                  this.state.customer_discounted_price
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Stack
                spacing={1}
                direction="row"
                className="modal-button-area ratn-footer-buttons"
              >
                <Button
                  variant="contained"
                  className="conf-button"
                  type="submit"
                >
                  Submit
                </Button>
                {/*<Button variant="outlined" onClick={() => this.props.handleCancel() }>Cancel</Button>*/}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  formValues: getFormValues("SubCategoryForm")(state, "status"),
  testData:"stfuefegf"
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators(
    {
      change,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "SubCategoryForm",
    validate,
  })(SubCategoryForm)
);
