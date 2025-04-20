import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form/immutable";
import {
  Box,
  TextField,
  Button,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ContactPageSharp } from "@mui/icons-material";
import withRouter from "src/helpers/withRouter";
import _ from "lodash";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

class SizeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: "formData" in this.props ? this.props.formData : null,
      subcategories: this.props.subcategories,
      submitSuccess: this.props.submitSuccess,
    };
  }

  componentDidMount() {
    if (this.state.formData) {
      this.props.initialize(this.state.formData);
    } else {
      this.props.initialize(this.getDefaultValues());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitSuccess) {
      this.resetForm();
    }
    if (this.props.formData != prevProps.formData && this.state.formData) {
      let formValues = { ...this.state.formData };
      this.props.initialize(formValues);
    }
  }

  resetForm = () => {
    let data = { ...this.getDefaultValues() };
    data.sub_category_id = this.props.formValues.sub_category_id;
    this.props.initialize(data);
  };

  getDefaultValues = () => {
    return {
      name: "",
      sub_category_id: "",
    };
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.subcategories !== state.subcategories) {
      update.subcategories = props.subcategories;
    }
    if (props.submitSuccess !== state.submitSuccess) {
      update.submitSuccess = props.submitSuccess;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    return update;
  }

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

  renderSubCategoryField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      <InputLabel htmlFor="grouped-native-select">{}</InputLabel>
      <Select
        native
        id="grouped-native-select"
        label={label}
        fullWidth
        {...input}
        {...custom}
        value={input.value}
      >
        <option value=""></option>
        {this.getSubCategoryByGroup().map((item, index) => {
          return (
            <optgroup label={item.category_name} key={index}>
              {item.subcategories.map((s, key) => {
                return (
                  <option value={s.id} key={key}>
                    {s.name}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  getSubCategoryByGroup = () => {
    let arr = [];
    for (let i = 0; i < this.state.subcategories.length; i++) {
      let item = this.state.subcategories[i];
      let index = _.findIndex(arr, (p) => p.category_id == item.category_id);
      if (index !== -1) {
        arr[index].subcategories.push(item);
      } else {
        arr.push({
          category_id: item.category_id,
          category_name: item.category,
          subcategories: [item],
        });
      }
    }
    return arr;
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    // item?.subcategories?.map((data)=>{
    //   if (data.name==this.props?.sub_category_name) {
    //     console.log("-----------------------loged data data",data);
        
    //   }
    // })

    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} className="create-input">
              <Field
                name="sub_category_id"
                component={this.renderSubCategoryField}
                label="Sub Category"
                type="select"
                onChange={(event, val) => {
                  this.props.subCategoryChange(val);
                }}
              />
            </Grid>
            <Grid item xs={6} md={4} className="create-input">
              <Field
                name="name"
                component={this.renderTextField}
                label="Size Name"
                onChange={(event, val) => this.props.nameChange(val)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack
                spacing={4}
                mt={1}
                direction="row"
                className="modal-button-area ratn-footer-buttons"
              >
                {this.state.formData ? (
                  <Button
                    variant="outlined"
                    onClick={() => this.props.handleCancel()}
                    className="close-button"
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  type="submit"
                  className="conf-button"
                >
                  Add
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
  formValues: getFormValues("SizeForm")(state, "sub_category_id"),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "SizeForm",
    validate,
  })(SizeForm)
);
