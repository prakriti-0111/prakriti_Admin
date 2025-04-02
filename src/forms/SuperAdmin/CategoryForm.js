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
  FormHelperText,
} from "@mui/material";
import { ContactPageSharp } from "@mui/icons-material";
import withRouter from "src/helpers/withRouter";
// import noImage from "src/assets/images/no_image.jpg";

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

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: "formData" in this.props ? this.props.formData : null,
    };
  }


  

  componentDidMount() {
    if (this.state.formData) {
      this.props.initialize(this.state.formData);
    } else {
      this.props.initialize(this.getDefaultValues());
    }
  }

  getDefaultValues = () => {
    return {
      name: "",
      status: 1,
      front: 1,
    };
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};

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

  renderIsMaterialCertifiedField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderIsMaterialField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="0">Yes</MenuItem>
        <MenuItem value="1">No</MenuItem>
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

  renderFrontField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  adaptFileEventToValue = (delegate) => (e) => delegate(e.target.files[0]);

  renderImageField = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    label,
    ...props
  }) => (
    <Button variant="contained" component="label">
      {label}
      <input
        hidden
        accept="image/*"
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    </Button>
  );

  renderImageFieldlogo = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    label,
    ...props
  }) => (
    // <Button variant="contained" component="label">
    //   {label}
    <label class={`custum-file-upload ${label} mx-3`}>
      <div class="icon">
        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
              fill=""
            ></path>{" "}
          </g>
        </svg>
      </div>
      <div class="text">
        <span>{label}</span>
      </div>
      <input
        hidden
        accept="image/*"
        onChange={this.adaptFileEventToValue(onChange)}
        onBlur={this.adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    </label>
    // </Button>
  );

  getImageSrc = (item, fileKey, formKey) => {
    if (item && item[fileKey]) {
      console.log("---item,",item,"--filekey",fileKey,"--formkey",formKey);
      console.log(URL.createObjectURL(item[fileKey]));
      
      
      return URL.createObjectURL(item[fileKey]);
    } else {
      return this.state.formData && this.state.formData[formKey]
        ? this.state.formData[formKey]
        : "";
    }
  };


  
  render() {
    const { handleSubmit, pristine, submitting, formValues } = this.props;
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <form onSubmit={handleSubmit} className="category_form">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className="create-input">
              <Field
                name="name"
                component={this.renderTextField}
                label="Category Name"
              />
            </Grid>
            <Grid item xs={12} md={3} className="create-input">
              <Field
                name="is_ceritified"
                component={this.renderIsMaterialCertifiedField}
                label="Is Certified?"
                type="select"
              />
            </Grid>
            <Grid item xs={12} md={3} className="create-input">
              <Field
                name="is_material"
                component={this.renderIsMaterialCertifiedField}
                label="Is Material?"
                type="select"
              />
            </Grid>
            {/*<Grid item xs={3} className='create-input'>
                  <Field
                    name="is_material"
                    component={this.renderIsMaterialField}
                    label="Is Certified?"
                    type="select"
                  />
            </Grid>*/}

            {/* --------------------------------------Desktop Categorie Banner----------------------------------- */}

            {this.getImageSrc(formValues, "bannerFile", "banner") ? (
              <Grid className="create-input m-3 Banner border rounded">
                <img
                  src={this.getImageSrc(formValues, "bannerFile", "banner")}
                  id="logo-img"
                  style={{
                    height: "120px",
                    width: "312px",
                    objectFit: "contain",
                  }}
                />
                <Grid className="create-input  text-center mt-1">
                  <Field
                    name="bannerFile"
                    component={this.renderImageField}
                    label=" Top_header"
                    type="file"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid className="create-input banner_sec mt-3 mr-2  ">
                <Field
                  name="bannerFile"
                  component={this.renderImageFieldlogo}
                  label="Top_header"
                  type="file"
                />
              </Grid>
            )}

            {/* ---------------------------------Mobile Categorie Image ----------------------------------- */}

            {this.getImageSrc(formValues, "MobileFile", "Mobile") ? (
              <Grid className="create-input m-3 Banner border rounded">
                <img
                  src={this.getImageSrc(formValues, "MobileFile", "Mobile")}
                  id="logo-img"
                  style={{
                    height: "120px",
                    width: "312px",
                    objectFit: "contain",
                  }}
                />
                <Grid className="create-input  text-center mt-1">
                  <Field
                    name="MobileFile"
                    component={this.renderImageField}
                    label=" Mobile_Banner"
                    type="file"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid className="create-input banner_sec mt-3 mr-2 ">
                <Field
                  name="MobileFile"
                  component={this.renderImageFieldlogo}
                  label="Mobile_Banner"
                  type="file"
                />
              </Grid>
            )}

            {/* ------------------------------- Mobile Icon------------------------------------- */}

            {this.getImageSrc(formValues, "iconFile", "icon") ? (
              <Grid className="create-input mt-3 mr-2 Icon border rounded">
                <img
                  src={this.getImageSrc(formValues, "iconFile", "icon")}
                  id="logo-img"
                  style={{ height: "100px", width: "150px" }}
                />
                <Grid className="create-input mt-1 text-center">
                  <Field
                    name="iconFile"
                    component={this.renderImageField}
                    label="category_Banner"
                    type="file"
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid className="create-input mt-3 mr-2">
                <Field
                  name="iconFile"
                  component={this.renderImageFieldlogo}
                  label="category_Banner"
                  type="file"
                />
              </Grid>
            )}

            <Grid item xs={12} md={2} className="create-input ">
              <Field
                name="status"
                component={this.renderStatusField}
                label="Status"
                type="select"
              />
            </Grid>
            <Grid item xs={12} md={2} className="create-input ">
              <Field
                name="front"
                component={this.renderFrontField}
                label="Front"
                type="select"
              />
            </Grid>
          </Grid>
          <Stack
            spacing={1}
            mt={2}
            direction="row"
            className="modal-button-area"
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => this.props.handleCancel()}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  formValues: getFormValues("CategoryForm")(state, "bannerFile"),
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: "CategoryForm",
    })(CategoryForm)
  )
);
