import React, { useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, getFormValues, change } from "redux-form/immutable";
import {
  Box,
  TextField,
  OutlinedInput,
  Button,
  Grid,
  Link,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  ToggleButtonGroup,
  ToggleButton,
  FormLabel,
  ImageList,
  ImageListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
  Tab,
  CircularProgress,
} from "@mui/material";
import { ContactPageSharp } from "@mui/icons-material";
import {
  convertToFormData,
  toBase64,
  getValuesFromKey,
  validateInteger,
} from "src/helpers/helper";
import { bindActionCreators } from "redux";
import {
  productList,
  productCreate,
  productStore,
  productView,
  productUpdate,
  productDelete,
} from "actions/superadmin/product.actions";
import { subCategoryList } from "actions/superadmin/subCategory.actions";
import { materialList } from "actions/superadmin/material.actions";
import { taxList } from "actions/superadmin/tax.actions";
import DeleteIcon from "@mui/icons-material/Delete";
import { withSnackbar } from "notistack";
const { updateSyncErrors } = require("redux-form/lib/actions").default;
import LoadingButton from "@mui/lab/LoadingButton";
import withRouter from "src/helpers/withRouter";
import { RESET_MATERIAL_LIST } from "../../actionTypes/superadmin/material.types";
import { getRoleName, getUserDashboardRoute } from "src/helpers/helper";
import _, { round } from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Table, TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { unitList } from "actions/superadmin/unit.actions";
import { Cancel, Tag } from "@mui/icons-material";
import { RESET_SIZE_LIST } from "../../actionTypes/superadmin/size.types";
import { sizeList } from "actions/superadmin/size.actions";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import noVideo from "src/assets/images/no_video.png";
import noImage from "src/assets/images/no_image.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { style } from "@mui/system";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { RESET_PRODUCT_LIST } from "../../actionTypes/superadmin/product.types";

const filter = createFilterOptions();

const hideNumberSpinner = {
  "& input[type=number]": { MozAppearance: "textfield" },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    "name",
    "category_id",
    "sub_category_id",
    //'certified'
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    let formData = "formData" in this.props ? this.props.formData : null;
    this.state = {
      auth: this.props.auth,
      formData: formData,
      isCreateFrom: !formData,
      onlyView: this.props.onlyView,
      categories: this.props.categories,
      certificates: this.props.certificates,
      materialList: this.props.materialList,
      materialGroup: formData ? formData.marerialGroups : [],
      sizeList: this.props.sizeList,
      sub_categories: this.props.sub_categories,
      product_type: formData ? formData.type : "in_house",
      images: [],
      main_image_file: null,
      video_file: null,
      video_preview: null,
      remove_images: [],
      existing_images: [],
      existing_main_image: null,
      remove_video: false,
      existing_video_file: null,
      taxList: this.props.taxList,
      size_materials: [],
      unitList: this.props.unitList,
      tags: [],
      description: EditorState.createEmpty(),
      productList: this.props.productList,
      is_ceritified: true,
      percentage: [],
      gap: [],
      gapStartSize: [],
      gapEndSize: [],
      // editing: the category/size/material lists this product's selects
      // depend on are fetched on mount, so hold the form back until they
      // land instead of letting it assemble itself field by field
      listsPending: !!formData,
    };

    this.imageFileRef = React.createRef();
    this.mainImageFileRef = React.createRef();
    this.videoFileRef = React.createRef();
    this.existingVideoRef = React.createRef();
    this.tagRef = React.createRef();
    this.formRef = React.createRef();
  }

  changePercentage = (percentageData, material, index) => {
    let condition = false;
    const obj = { percentageData, material, index };
    const valueData = this.state.percentage;

    console.log("------------- value data value", valueData);
    if (valueData.length > 0) {
      valueData.map((item, index) => {
        if (item.material === material) {
          valueData[index].percentageData = percentageData;
          condition = true;
        }
      });
    }
    const afterUpdate = () => this.applyGapCascade(index);
    if (condition) {
      this.setState(
        () => ({
          percentage: valueData,
        }),
        afterUpdate,
      );
    } else {
      this.setState(
        (prevState) => ({
          percentage: [...prevState.percentage, obj],
        }),
        afterUpdate,
      );
    }
  };

  changeGap = (gap, indexValue) => {
    let condition = false;
    const obj = { gap, indexValue };
    const valueData = this.state.gap;

    if (valueData.length > 0) {
      valueData.map((item, index) => {
        if (item.indexValue === indexValue) {
          valueData[index].gap = gap;
          condition = true;
        }
      });
    }
    const afterUpdate = () => this.applyGapCascade(indexValue);
    if (condition) {
      this.setState(() => ({ gap: valueData }), afterUpdate);
    } else {
      this.setState(
        (prevState) => ({ gap: [...prevState.gap, obj] }),
        afterUpdate,
      );
    }
  };

  changeGapStartSize = (sizeId, indexValue) => {
    let condition = false;
    const obj = { sizeId, indexValue };
    const valueData = this.state.gapStartSize;

    valueData.map((item, index) => {
      if (item.indexValue === indexValue) {
        valueData[index].sizeId = sizeId;
        condition = true;
      }
    });
    const afterUpdate = () => this.applyGapCascade(indexValue);
    if (condition) {
      this.setState(() => ({ gapStartSize: valueData }), afterUpdate);
    } else {
      this.setState(
        (prevState) => ({ gapStartSize: [...prevState.gapStartSize, obj] }),
        afterUpdate,
      );
    }
  };

  changeGapEndSize = (sizeId, indexValue) => {
    let condition = false;
    const obj = { sizeId, indexValue };
    const valueData = this.state.gapEndSize;

    valueData.map((item, index) => {
      if (item.indexValue === indexValue) {
        valueData[index].sizeId = sizeId;
        condition = true;
      }
    });
    const afterUpdate = () => this.applyGapCascade(indexValue);
    if (condition) {
      this.setState(() => ({ gapEndSize: valueData }), afterUpdate);
    } else {
      this.setState(
        (prevState) => ({ gapEndSize: [...prevState.gapEndSize, obj] }),
        afterUpdate,
      );
    }
  };

  applyGapCascade = (material_key, baseWeightOverride) => {
    const size_materials = this.state.size_materials;
    if (!size_materials.length) return;

    // The base weight lives on the first row of this material's own size
    // range — which is not row 0 for a material that starts later.
    const [startIndex, endIndex] = this.getSizeRange(material_key);
    const anchorMaterial =
      size_materials[startIndex]?.materials?.[material_key];
    if (!anchorMaterial) return;

    const baseWeight =
      baseWeightOverride !== undefined
        ? baseWeightOverride
        : anchorMaterial.weight;
    if (baseWeight === undefined || baseWeight === "") return;

    let percValue = 0;
    for (let i = 0; i < this.state.percentage.length; i++) {
      if (this.state.percentage[i].index == material_key) {
        percValue = Number(this.state.percentage[i].percentageData);
      }
    }

    let gapvalueData = 0;
    for (let i = 0; i < this.state.gap.length; i++) {
      if (this.state.gap[i].indexValue == material_key) {
        gapvalueData = Number(this.state.gap[i].gap);
      }
    }

    // only rows inside this material's range follow its base weight
    for (
      let i = startIndex + 1;
      i <= endIndex && i < size_materials.length;
      i++
    ) {
      if (!gapvalueData) {
        size_materials[i].materials[material_key].weight = baseWeight;
        continue;
      }
      const distance = i - startIndex;
      const steps = Math.floor(distance / gapvalueData);
      size_materials[i].materials[material_key].weight =
        this.normalizeDecimalValue(
          Number(baseWeight) + (percValue / 100) * Number(baseWeight) * steps,
        );
    }

    this.setState({ size_materials });
  };

  getGapStartSizeId = (indexValue) => {
    for (let i = 0; i < this.state.gapStartSize.length; i++) {
      if (this.state.gapStartSize[i].indexValue == indexValue) {
        return this.state.gapStartSize[i].sizeId;
      }
    }
    return this.state.size_materials[0]
      ? this.state.size_materials[0].size_id
      : "";
  };

  getGapStartIndex = (indexValue) => {
    const sizeId = this.getGapStartSizeId(indexValue);
    const idx = _.findIndex(this.state.size_materials, { size_id: sizeId });
    return idx === -1 ? 0 : idx;
  };

  getGapEndSizeId = (indexValue) => {
    for (let i = 0; i < this.state.gapEndSize.length; i++) {
      if (this.state.gapEndSize[i].indexValue == indexValue) {
        return this.state.gapEndSize[i].sizeId;
      }
    }
    const last =
      this.state.size_materials[this.state.size_materials.length - 1];
    return last ? last.size_id : "";
  };

  getGapEndIndex = (indexValue) => {
    const sizeId = this.getGapEndSizeId(indexValue);
    const idx = _.findIndex(this.state.size_materials, { size_id: sizeId });
    return idx === -1 ? this.state.size_materials.length - 1 : idx;
  };

  // A material only applies to sizes inside its chosen range (e.g. 5-10),
  // so it is hidden from — and not validated/submitted for — other sizes.
  // [firstRow, lastRow] of this material's size range, as row indexes.
  // Tolerates an inverted pick (10-5 reads the same as 5-10).
  getSizeRange = (material_key) => {
    const a = this.getGapStartIndex(material_key);
    const b = this.getGapEndIndex(material_key);
    return [Math.min(a, b), Math.max(a, b)];
  };

  isMaterialInSizeRange = (material_key, size_index) => {
    const [start, end] = this.getSizeRange(material_key);
    return size_index >= start && size_index <= end;
  };

  // percentage/gap are keyed by the material's position in size_materials
  // rows, not by material_id — so map id -> key before reading/writing.
  getMaterialKey = (material_id) =>
    _.findIndex(this.state.size_materials[0]?.materials || [], {
      material_id: material_id,
    });

  getPercentageValue = (material_key) => {
    const item = _.find(this.state.percentage, (p) => p.index == material_key);
    return item && item.percentageData !== undefined ? item.percentageData : "";
  };

  getGapValue = (material_key) => {
    const item = _.find(this.state.gap, (g) => g.indexValue == material_key);
    return item && item.gap !== undefined ? item.gap : "";
  };

  onEditorStateChange = (description) => {
    this.setState({
      description,
    });
  };

  componentDidMount() {
    this.loadFormExternalData();

    if (this.state.formData) {
      this.initializeFormData();
    } else {
      this.props.initialize({
        status: 1,
        is_featured: 0,
      });
      this.setState({
        description: EditorState.createEmpty(),
      });
    }

    this.props.actions.unitList({ all: 1 });
  }

  componentDidUpdate(prevProps) {
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }

    // the dependent lists arrive as new arrays; when all three have been
    // replaced, the selects can render with their options already in place
    if (this.state.listsPending && this.pendingLists) {
      const before = this.pendingLists;
      if (
        this.props.sub_categories !== before.sub_categories &&
        this.props.materialList !== before.materialList &&
        this.props.sizeList !== before.sizeList
      ) {
        this.clearListsPending();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.listsTimer);
  }

  clearListsPending = () => {
    clearTimeout(this.listsTimer);
    this.listsTimer = null;
    this.pendingLists = null;
    if (this.state.listsPending) {
      this.setState({ listsPending: false });
    }
  };

  normalizeDecimalValue = (value, maxDecimals = 3) => {
    if (value === null || typeof value === "undefined" || value === "") {
      return "";
    }

    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return value;
    }

    return numericValue
      .toFixed(maxDecimals)
      .replace(/\.0+$/, "")
      .replace(/(\.\d*?)0+$/, "$1");
  };

  normalizeSizeMaterials = (sizeMaterials = []) => {
    if (!Array.isArray(sizeMaterials)) {
      return [];
    }

    return sizeMaterials.map((sizeMaterial) => ({
      ...sizeMaterial,
      materials: Array.isArray(sizeMaterial.materials)
        ? sizeMaterial.materials.map((material) => ({
            ...material,
            weight: this.normalizeDecimalValue(material.weight),
          }))
        : [],
    }));
  };

  // A saved product can carry a different material list on each size row —
  // either an older record, or one saved with per-material size ranges.
  // Percentage/gap/range all key a material by its position in row 0, so
  // give every row the same ordered list (padding the rows a material is
  // missing from) and rebuild each material's range from the rows it was
  // actually saved on.
  alignSizeMaterials = (sizeMaterials) => {
    const order = [];
    const template = {};
    sizeMaterials.forEach((sizeMaterial) => {
      (sizeMaterial.materials || []).forEach((material) => {
        if (!(material.material_id in template)) {
          order.push(material.material_id);
          template[material.material_id] = material;
        }
      });
    });

    const has = (rowIndex, material_id) =>
      (sizeMaterials[rowIndex].materials || []).some(
        (m) => m.material_id === material_id,
      );

    const rows = sizeMaterials.map((sizeMaterial) => {
      const byId = {};
      (sizeMaterial.materials || []).forEach((m) => {
        byId[m.material_id] = m;
      });
      return {
        ...sizeMaterial,
        materials: order.map(
          (id) =>
            byId[id] || {
              ...template[id],
              purities: [],
              weight: "",
              quantity: "",
            },
        ),
      };
    });

    const gapStartSize = [];
    const gapEndSize = [];
    order.forEach((id, material_key) => {
      const present = rows
        .map((row, i) => (has(i, id) ? i : -1))
        .filter((i) => i > -1);
      // absent everywhere, or present everywhere, is the default full range
      if (!present.length || present.length === rows.length) return;
      gapStartSize.push({
        sizeId: rows[present[0]].size_id,
        indexValue: material_key,
      });
      gapEndSize.push({
        sizeId: rows[present[present.length - 1]].size_id,
        indexValue: material_key,
      });
    });

    return { rows, gapStartSize, gapEndSize };
  };

  initializeFormData = () => {
    let formValues = { ...this.state.formData };
    const aligned = this.alignSizeMaterials(
      this.normalizeSizeMaterials(this.state.formData.size_materials),
    );
    formValues.status = formValues.status ? 1 : 0;
    formValues.is_featured = formValues.is_featured ? 1 : 0;
    formValues.certified = formValues.certified ? 1 : 0;
    formValues.sizes = getValuesFromKey(formValues.sizes, "id");
    formValues.materials = getValuesFromKey(formValues.materials, "id");
    formValues.certificates = getValuesFromKey(formValues.certificates, "id");
    if (formValues.type == "material") {
      formValues.material_id = formValues.materials[0];
    }
    delete formValues.video;
    delete formValues.main_image;
    delete formValues.size_materials;
    delete formValues.tags;
    // remember what the lists looked like before the fetch, so
    // componentDidUpdate can tell this product's data from the previous
    // page's leftovers; the timer is a failsafe so a failed request shows
    // the form rather than spinning forever
    this.pendingLists = {
      sub_categories: this.props.sub_categories,
      materialList: this.props.materialList,
      sizeList: this.props.sizeList,
    };
    clearTimeout(this.listsTimer);
    this.listsTimer = setTimeout(this.clearListsPending, 8000);
    this.props.actions.subCategoryList({
      all: 1,
      category_id: formValues.category_id,
    });
    this.props.actions.materialList({
      all: 1,
      category_id: formValues.category_id,
    });
    this.props.actions.sizeList({
      all: 1,
      sub_category_id: formValues.sub_category_id,
    });
    this.props.actions.productList({
      all: 1,
      sub_category_id: formValues.sub_category_id,
    });
    this.props.initialize(formValues);
    this.setState({
      existing_images: formValues.images,
      existing_main_image: this.state.formData.main_image,
      existing_video_file: this.state.formData.video,
      size_materials: aligned.rows,
      gapStartSize: aligned.gapStartSize,
      gapEndSize: aligned.gapEndSize,
      tags: this.state.formData.tags,
      product_type: formValues.type,
      description: this.state.formData.description
        ? EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(this.state.formData.description),
            ),
          )
        : EditorState.createEmpty(),
    });
    setTimeout(() => {
      if (this.existingVideoRef) {
        this.existingVideoRef.current?.load();
      }
    }, 200);
  };

  loadFormExternalData = () => {
    this.props.actions.productCreate();
    this.props.actions.taxList();
  };

  getDefaultValues = () => {
    return {
      category_id: "",
      sub_category_id: "",
      name: "",
      product_code: "",
      certificate_id: "",
      description: "",
      short_desc: "",
      keywords: "",
      licence_no: "",
      status: "1",
      is_featured: "0",
      material_id: "",
      materials: [],
      materialGroup: [],
      sizes: [],
    };
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.certificates !== state.certificates) {
      update.certificates = props.certificates;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }
    if (props.sizeList !== state.sizeList) {
      update.sizeList = props.sizeList;
    }
    if (props.sub_categories !== state.sub_categories) {
      update.sub_categories = props.sub_categories;
    }
    if (props.taxList !== state.taxList) {
      update.taxList = props.taxList;
    }
    if (props.unitList !== state.unitList) {
      update.unitList = props.unitList;
    }
    if (props.productList !== state.productList) {
      update.productList = props.productList;
    }
    if (props.onlyView !== state.onlyView) {
      update.onlyView = props.onlyView;
    }

    return update;
  }

  renderProductNameField = ({
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
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
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
      options={this.state.productList}
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
          label="Name"
          error={touched && error ? true : false}
          helperText={touched && error ? error : ""}
          {...input}
          {...custom}
        />
      )}
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

  renderCategoriesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <div className="list-menu">
        <Select label={label} fullWidth {...input} {...custom}>
          <MenuItem value=""></MenuItem>
          {this.state.categories.map((item, index) => {
            return (
              <MenuItem value={item.id} key={index}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderSubCategoriesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value=""></MenuItem>
        {this.state.sub_categories.map((item, index) => {
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

  /*renderCertificatesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {
        label ?
          <InputLabel>{label}</InputLabel>
          : null
      }
      <Select
       label={label}
       fullWidth
       multiple
       {...input}
       {...custom}
       value={input.value === "" ? [] : input.value}
       multi="true"
      renderValue={(selected) => this.getSelectedCerti(selected).join(", ")}
      >
        <MenuItem value="">select certificate</MenuItem>
        {
          this.state.certificates.map((item, index) => {
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={(input.value && input.value.indexOf(item.id) > -1) ? true : false} />
              <ListItemText primary={item.name} />
            </MenuItem>
          })
        }
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )*/

  getSelectedCertiNames = (selected) => {
    let arr = [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(this.state.certificates, { id: selected[i] });
      if (item.length) arr.push(item[0].name);
    }
    return arr;
  };

  renderCertificatesField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select
        label={label}
        fullWidth
        multiple
        {...input}
        {...custom}
        value={input.value === "" ? [] : input.value}
        multi="true"
        renderValue={(selected) =>
          this.getSelectedCertiNames(selected).join(", ")
        }
      >
        {this.state.certificates.map((item) => (
          <MenuItem key={item.id} value={item.id} className="multi-select">
            <Checkbox
              checked={
                input.value && input.value.indexOf(item.id) > -1 ? true : false
              }
            />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  getSelectedMaterialNames = (selected) => {
    let arr = [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(this.state.materialList, { id: selected[i] });
      if (item.length) arr.push(item[0].name);
    }
    return arr;
  };

  renderMaterialsField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select
        label={label}
        fullWidth
        multiple
        {...input}
        {...custom}
        value={input.value === "" ? [] : input.value}
        multi="true"
        renderValue={(selected) =>
          this.getSelectedMaterialNames(selected).join(", ")
        }
        MenuProps={{
          // style, not sx: MUI writes the anchor width as an inline
          // minWidth on the paper, which would win over a class
          PaperProps: { style: { minWidth: 520, maxHeight: 420 } },
          // this menu mounts several inputs per option — skip the open
          // animation and the auto-focus scroll, which is what makes it
          // feel slow to open on edit
          transitionDuration: 0,
          disableAutoFocusItem: true,
        }}
      >
        {this.state.materialList.map((item, index) => {
          const materialKey = this.getMaterialKey(item.id);
          // keystrokes must not reach the Select's type-ahead
          const stopKeys = (e) => e.stopPropagation();
          const stopClick = (e) => {
            e.stopPropagation();
            return false;
          };
          return (
            <MenuItem
              key={item.id}
              value={item.id}
              className="multi-select"
              sx={{ gap: 1 }}
            >
              <Checkbox
                checked={
                  input.value && input.value.indexOf(item.id) > -1
                    ? true
                    : false
                }
              />
              <ListItemText primary={item.name} />
              <TextField
                key={item.id}
                id="outlined-basic"
                name="material_group"
                label="Grp"
                variant="outlined"
                type="number"
                size="small"
                sx={{ ...hideNumberSpinner, width: 64, flexShrink: 0 }}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                value={
                  this.state.materialGroup[item.id]
                    ? this.state.materialGroup[item.id]
                    : ""
                }
                onClick={stopClick}
                onKeyDown={stopKeys}
                onChange={(e) => {
                  let mg = this.state.materialGroup;
                  mg[item.id] = parseInt(e.target.value);
                  console.log("material group", mg);
                  this.setState({
                    materialGroup: mg,
                  });
                }}
              />
              {materialKey > -1 ? (
                <React.Fragment>
                  <TextField
                    label="%"
                    variant="outlined"
                    type="number"
                    size="small"
                    sx={{ ...hideNumberSpinner, width: 64, flexShrink: 0 }}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    value={this.getPercentageValue(materialKey)}
                    onClick={stopClick}
                    onKeyDown={stopKeys}
                    onChange={(e) =>
                      this.changePercentage(
                        e.target.value,
                        item.name,
                        materialKey,
                      )
                    }
                  />
                  <TextField
                    label="Gap"
                    variant="outlined"
                    type="number"
                    size="small"
                    sx={{ ...hideNumberSpinner, width: 64, flexShrink: 0 }}
                    value={this.getGapValue(materialKey)}
                    onClick={stopClick}
                    onKeyDown={stopKeys}
                    onChange={(e) =>
                      this.changeGap(e.target.value, materialKey)
                    }
                  />
                  {/* native selects: a nested MUI Select would mount a
                      Popover plus a MenuItem per size, twice per option */}
                  <TextField
                    label="Size"
                    select
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    sx={{ width: 62, flexShrink: 0 }}
                    value={this.getGapStartSizeId(materialKey)}
                    onClick={stopClick}
                    onKeyDown={stopKeys}
                    onChange={(e) =>
                      this.changeGapStartSize(e.target.value, materialKey)
                    }
                  >
                    {this.state.size_materials.map((sm, sIndex) => (
                      <option value={sm.size_id} key={sIndex}>
                        {sm.size_name}
                      </option>
                    ))}
                  </TextField>
                  <span style={{ flexShrink: 0 }}>-</span>
                  <TextField
                    label=" "
                    select
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    sx={{ width: 62, flexShrink: 0 }}
                    value={this.getGapEndSizeId(materialKey)}
                    onClick={stopClick}
                    onKeyDown={stopKeys}
                    onChange={(e) =>
                      this.changeGapEndSize(e.target.value, materialKey)
                    }
                  >
                    {this.state.size_materials.map((sm, sIndex) => (
                      <option value={sm.size_id} key={sIndex}>
                        {sm.size_name}
                      </option>
                    ))}
                  </TextField>
                </React.Fragment>
              ) : null}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderSingleMaterialsField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value=""></MenuItem>
        {this.state.materialList.map((item, index) => {
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

  renderTaxFieldField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value=""></MenuItem>
        {this.state.taxList.map((item, index) => {
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
  getSelectedNames = (selected) => {
    let arr = [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(this.state.sizeList, { id: selected[i] });
      if (item.length) arr.push(item[0].name);
    }
    return arr;
  };
  renderSizeField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select
        label={label}
        fullWidth
        defaultValue={[]}
        multiple
        {...input}
        {...custom}
        value={input.value === "" ? [] : input.value}
        multi="true"
        renderValue={(selected) => this.getSelectedNames(selected).join(", ")}
      >
        <MenuItem value=""></MenuItem>
        {this.state.sizeList.map((item, index) => {
          return (
            <MenuItem value={item.id} key={index} className="multi-select">
              <Checkbox
                checked={
                  input.value && input.value.indexOf(item.id) > -1
                    ? true
                    : false
                }
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          );
        })}
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

  renderFeaturedField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl
      fullWidth
      error={touched && error ? true : false}
      className="featured_field"
    >
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderCertifiedField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControl fullWidth error={touched && error ? true : false}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} fullWidth {...input} {...custom}>
        <MenuItem value=""></MenuItem>
        <MenuItem value="1">Yes</MenuItem>
        <MenuItem value="0">No</MenuItem>
      </Select>
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );

  renderTextArea = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextareaAutosize
      minRows={3}
      label={label}
      error={touched && error ? error : ""}
      style={{ width: "100%" }}
      {...input}
      {...custom}
    />
  );

  handleProductChange = (event) => {
    this.setState({
      product_type: event.target.value,
    });
  };

  handleCategoryChange = (event, val) => {
    this.props.actions.subCategoryList({ all: 1, category_id: val });
    if (val) {
      this.props.actions.materialList({ all: 1, category_id: val });
      let item = _.filter(this.state.categories, { id: val });
      if (item.length) {
        this.setState({
          product_type: item[0].is_material ? "material" : "in_house",
          is_ceritified: item[0].is_ceritified,
        });
      }
    } else {
      this.props.dispatch({ type: RESET_MATERIAL_LIST });
    }
    this.props.dispatch(change("ProductForm", "sub_category_id", ""));
    this.props.dispatch({ type: RESET_SIZE_LIST });

    this.props.dispatch({
      type: RESET_PRODUCT_LIST,
    });
  };

  handleSubCategoryChange = (event, val) => {
    if (val) {
      this.props.actions.sizeList({ all: 1, sub_category_id: val });
      this.props.actions.productList({ all: 1, sub_category_id: val });
    } else {
      this.props.dispatch({ type: RESET_SIZE_LIST });

      this.props.dispatch({
        type: RESET_PRODUCT_LIST,
      });
    }
  };

  onImageChange = (e) => {
    let images = this.state.images;
    let totalImages =
      this.state.existing_images.length + images.length + e.target.files.length;
    if (totalImages > 5) {
      this.props.enqueueSnackbar("Maximum 5 image are allowed.", {
        variant: "error",
      });
      return;
    }
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }

    this.setState({
      images: images,
    });

    if (this.imageFileRef) {
      this.imageFileRef.current.value = null;
    }
  };
  getImageSrc = (item) => {
    return URL.createObjectURL(item);
  };

  deleteImage = (i) => {
    let images = this.state.images;
    images.splice(i, 1);
    this.setState({
      images: images,
    });
    if (this.imageFileRef) {
      this.imageFileRef.current.value = null;
    }
  };

  onVideoChange = (e) => {
    let videoFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        this.setState({
          video_file: videoFile,
          existing_video_file: null,
        });
      }
    };
    fileReader.onloadstart = () => {
      this.setState({
        video_preview: null,
      });
    };
    fileReader.onloadend = () => {
      this.setState({
        video_preview: fileReader.result,
      });
      if (this.videoFileRef) {
        this.videoFileRef.current.value = null;
      }
    };
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  deleteVideo = () => {
    this.setState({
      video_file: null,
      video_preview: null,
    });
  };

  handleFormSubmit = async (data, dispatch) => {
    let errors = false;
    let totalImages =
      this.state.existing_images.length + this.state.images.length;
    if (totalImages == 0) {
      this.props.enqueueSnackbar("Please select at least one image", {
        variant: "error",
      });
      errors = true;
    }

    let values = { ...this.getDefaultValues(), ...data };

    if (values.materials && Array.isArray(values.materials)) {
      for (let index = 0; index < values.materials.length; index++) {
        values.materialGroup[index] = this.state.materialGroup[
          values.materials[index]
        ]
          ? this.state.materialGroup[values.materials[index]]
          : "";
      }
    }

    console.log("form values", values);
    values.description = this.state.description
      ? draftToHtml(convertToRaw(this.state.description.getCurrentContent()))
      : "";
    //values.images = this.state.images;
    values.video = this.state.video_file;
    values.type = this.state.product_type;
    if (this.state.product_type == "material") {
      values.certified = false;
    } else {
      values.certified = true;
    }
    if (this.state.product_type != "material") {
      if (values.sizes.length == 0) {
        this.props.dispatch(
          updateSyncErrors("ProductForm", {
            sizes: "Size is required.",
          }),
        );
        errors = true;
      }
      if (values.materials.length == 0) {
        this.props.dispatch(
          updateSyncErrors("ProductForm", {
            materials: "Materials is required.",
          }),
        );
        errors = true;
      }
    } else {
      if (values.material_id == "") {
        this.props.dispatch(
          updateSyncErrors("ProductForm", {
            material_id: "Materials is required.",
          }),
        );
        errors = true;
      }
    }

    for (let i = 0; i < this.state.size_materials.length; i++) {
      for (let x = 0; x < this.state.size_materials[i].materials.length; x++) {
        // out of its size range: not shown, so not required either
        if (!this.isMaterialInSizeRange(x, i)) {
          this.state.size_materials[i].materials[x]["purity_error"] = false;
          this.state.size_materials[i].materials[x]["weight_error"] = false;
          this.state.size_materials[i].materials[x]["unit_error"] = false;
          continue;
        }
        this.state.size_materials[i].materials[x]["material_group"] = this.state
          .materialGroup[this.state.size_materials[i].materials[x].material_id]
          ? this.state.materialGroup[
              this.state.size_materials[i].materials[x].material_id
            ]
          : "";
        if (!this.state.size_materials[i].materials[x].purities.length) {
          this.state.size_materials[i].materials[x]["purity_error"] = true;
          errors = true;
        } else {
          this.state.size_materials[i].materials[x]["purity_error"] = false;
        }
        if (!this.state.size_materials[i].materials[x].weight) {
          this.state.size_materials[i].materials[x]["weight_error"] = true;
          errors = true;
        } else {
          this.state.size_materials[i].materials[x]["weight_error"] = false;
        }
        if (!this.state.size_materials[i].materials[x].unit_id) {
          this.state.size_materials[i].materials[x]["unit_error"] = true;
          errors = true;
        } else {
          this.state.size_materials[i].materials[x]["unit_error"] = false;
        }
      }
    }

    for (let i = 0; i < this.state.size_materials.length; i++) {
      for (let x = 0; x < this.state.size_materials[i].materials.length; x++) {
        let plist = this.getMaterialPurities(
          this.state.size_materials[i].materials[x].material_id,
        );
        let pvalues = this.state.size_materials[i].materials[x].purities;
        this.state.size_materials[i].materials[x].purities =
          this.getFilteredPurities(plist, pvalues);
      }
    }

    if (!errors) {
      let thisImages = [...this.state.images];
      for (let i = 0; i < thisImages.length; i++) {
        thisImages[i] = await toBase64(thisImages[i]);
      }
      values.images = thisImages;
      // submit each size only with the materials whose range covers it
      values.size_materials = this.state.size_materials.map((sm, i) => ({
        ...sm,
        materials: sm.materials.filter((m, x) =>
          this.isMaterialInSizeRange(x, i),
        ),
      }));
      values.tags = this.state.tags;
      if (this.state.video_file) {
        values.video = await toBase64(this.state.video_file);
      }
      if (this.state.main_image_file) {
        values.main_image = await toBase64(this.state.main_image_file);
      }
      console.log("final values", values);
      if (this.state.isCreateFrom) {
        return this.props.actions.productStore(values);
      } else {
        values.remove_video = this.state.remove_video;
        values.remove_images = this.state.remove_images;
        return this.props.actions.productUpdate(this.state.formData.id, values);
      }
    }
  };

  getFilteredPurities = (list, values) => {
    let arr = [];
    for (let i = 0; i < values.length; i++) {
      let index = _.findIndex(list, { id: values[i] });
      if (index !== -1) {
        arr.push(values[i]);
      }
    }
    return arr;
  };

  handleFieldChange = (e, vl) => {
    // const {name, value} = e.target;
    // if(name == "materials"){
    //   console.log(value)
    // }
    // console.log(vl);
  };

  deleteExistingImage = (index) => {
    let remove_images = this.state.remove_images;
    let existing_images = this.state.existing_images;
    remove_images.push(existing_images[index]);
    existing_images.splice(index, 1);
    this.setState({
      remove_images: remove_images,
      existing_images: existing_images,
    });
  };

  deleteExistingVideo = () => {
    this.setState({
      existing_video_file: null,
      remove_video: true,
    });
  };

  handleMaterialsChange = (e, val) => {
    const { sizes } = this.props.formValues;

    this.intializeWeightsTable(sizes, val);
  };

  handleSizeChange = (e, val) => {
    const { materials } = this.props.formValues;

    this.intializeWeightsTable(val, materials);
  };

  handleSingleMatreialChange = (e, vl) => {
    let materials = [];
    if (vl) {
      materials = [vl];
    }
    this.intializeWeightsTable(null, materials);
    if (!("name" in this.props.formValues) || !this.props.formValues.name) {
      let item = _.filter(this.state.materialList, { id: vl });
      if (item.length) {
        this.props.change("name", item[0].name);
      }
    }
  };

  intializeWeightsTable = (sizes, materials) => {
    let arr = [];
    if (this.state.product_type == "material") {
      if (Array.isArray(materials) && materials.length) {
        let item = _.filter(this.state.materialList, { id: materials[0] });
        let thisMaterials = [
          {
            material_id: materials[0],
            material_name: item.length ? item[0].name : "",
            meterial_group: this.state.materialGroup[materials[0]]
              ? this.state.materialGroup[materials[0]]
              : "",
            purities: [],
            weight: "",
            unit_id: item.length ? item[0].unit_id : "",
            quantity: "",
          },
        ];

        arr.push({
          size_id: "",
          size_name: "",
          materials: thisMaterials,
        });
      }
    } else {
      if (
        Array.isArray(sizes) &&
        Array.isArray(materials) &&
        sizes.length &&
        materials.length
      ) {
        for (let i of sizes) {
          let thisMaterials = [];
          for (let m of materials) {
            let item = _.filter(this.state.materialList, { id: m });
            thisMaterials.push({
              material_id: m,
              material_name: item.length ? item[0].name : "",
              meterial_group: this.state.materialGroup[materials[0]]
                ? this.state.materialGroup[materials[0]]
                : "",
              purities: [],
              weight: "",
              unit_id: item.length ? item[0].unit_id : "",
              quantity: "",
            });
          }
          let item = _.filter(this.state.sizeList, { id: i });
          arr.push({
            size_id: i,
            size_name: item.length ? item[0].name : "",
            materials: thisMaterials,
          });
        }
      }
    }
    console.log("size materials array", arr);
    this.setState({
      size_materials: arr,
    });
  };

  getSelectedPurities = (selected, material_id) => {
    let arr = [];
    let item = _.filter(this.state.materialList, { id: material_id });
    let purities = item.length ? item[0].purities : [];
    for (let i = 0; i < selected.length; i++) {
      let item = _.filter(purities, { id: selected[i] });
      if (item.length) arr.push(item[0].name);
    }
    return arr;
  };

  getMaterialPurities = (material_id) => {
    let item = _.filter(this.state.materialList, { id: material_id });
    return item.length ? item[0].purities : [];
  };

  // Set a field on one row; when that row is the first of the material's own
  // size range, copy it down the rest of the range. Editing any other row
  // only touches that row, so every cell stays individually changeable.
  applyDownRange = (field, value, size_key, material_key) => {
    let size_materials = this.state.size_materials;
    size_materials[size_key].materials[material_key][field] = value;
    const [start, end] = this.getSizeRange(material_key);
    if (size_key == start && size_materials.length > 1) {
      for (let i = start + 1; i <= end && i < size_materials.length; i++) {
        size_materials[i].materials[material_key][field] = value;
      }
    }
    this.setState({
      size_materials: size_materials,
    });
  };

  handlePurityChange = (e, size_key, material_key) => {
    this.applyDownRange("purities", e.target.value, size_key, material_key);
  };

  handleUnitChange = (e, size_key, material_key) => {
    let size_materials = this.state.size_materials;
    size_materials[size_key].materials[material_key].unit_id = e.target.value;
    this.setState({
      size_materials: size_materials,
    });
  };

  handleQuantityChange = (e, size_key, material_key) => {
    this.applyDownRange("quantity", e.target.value, size_key, material_key);
  };

  handleWeightChange = (e, size_key, material_key) => {
    if (e.target.value === "" || e.target.value.match(/^\d{1,}(\.\d{0,3})?$/)) {
      let size_materials = this.state.size_materials;
      size_materials[size_key].materials[material_key].weight = e.target.value;

      // cascade from the first row of this material's range, not row 0
      if (
        size_key == this.getSizeRange(material_key)[0] &&
        size_materials.length > 1
      ) {
        this.applyGapCascade(material_key, e.target.value);
      } else {
        this.setState({
          size_materials: size_materials,
        });
      }
    }
  };

  handleTagDelete = (value) => {
    const newtags = this.state.tags.filter((val) => val !== value);
    this.setState({
      tags: newtags,
    });
  };

  handleTagEnter = (e) => {
    if (e.charCode == 13) {
      this.setState({
        tags: [...this.state.tags, this.tagRef.current.value],
      });
      this.tagRef.current.value = "";
    }
  };

  getAllImages = (isSingle) => {
    let arr = [];
    for (let item of this.state.existing_images) {
      arr.push({
        path: item.path,
        type: "existing",
      });
    }
    for (let item of this.state.images) {
      arr.push({
        path: item,
        type: "new",
      });
    }
    let x = arr.length;
    for (let i = x; i < 5; i++) {
      arr.push({
        path: noImage,
        type: "no_image",
      });
    }
    if (isSingle) {
      return arr[0];
    } else {
      arr.shift();
      return arr;
    }
  };

  onChangeMianImage = (e) => {
    this.setState({
      main_image_file: e.target.files[0],
      existing_main_image: null,
    });

    if (this.mainImageFileRef) {
      this.mainImageFileRef.current.value = null;
    }
  };

  deleteMainImage = () => {
    this.setState({
      main_image_file: null,
    });

    if (this.mainImageFileRef) {
      this.mainImageFileRef.current.value = null;
    }
  };

  deleteExistingMainImage = () => {
    this.setState({
      existing_main_image: null,
    });
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { description, onlyView } = this.state;

    // one loader, then the finished form — instead of empty selects that
    // fill in and a weights table that grows as each request lands
    if (this.state.listsPending) {
      return (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress size="30px" />
        </Grid>
      );
    }

    let firstAllImage = this.getAllImages(true);

    // console.log(this.state.percentage);

    // const PercentAndGap = (index) => {
    //   console.log("index is equal to :-" + index);
    //   let increment_price =
    //     Number(
    //       (index % this.state.gap == 1 ? this.state.percentage : 0) / 1000
    //     ) * index ||
    //     0 / this.state.gap ||
    //     0;
    //   console.log(increment_price);
    //   return increment_price.toFixed(2);
    // };

    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit)}
        className="ratn-dialog-wrapper product_form"
        ref={this.formRef}
      >
        <Box sx={{ flexGrow: 1, m: 0.5 }} className="ratn-dialog-inner">
          <Grid container spacing={2} className="loans_view p_view">
            {/*<Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <ToggleButtonGroup
                      className='product-button'
                      color="primary"
                      value={this.state.product_type}
                      exclusive
                      onChange={this.handleProductChange}
                      aria-label="Product Type"
                    >
                      <ToggleButton value="in_house">In House</ToggleButton>
                      <ToggleButton value="external">External</ToggleButton>
                      <ToggleButton value="material">Material</ToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>*/}
            <Grid item xs={6} md={3} className="create-input">
              <Field
                className="input-inner"
                name="category_id"
                component={this.renderCategoriesField}
                label="Category"
                type="select"
                onChange={(event, val) => this.handleCategoryChange(event, val)}
                disabled={onlyView}
              />
            </Grid>
            <Grid item xs={6} md={3} className="create-input">
              <Field
                className="input-inner"
                name="sub_category_id"
                component={this.renderSubCategoriesField}
                label="Sub Category"
                type="select"
                onChange={(event, val) =>
                  this.handleSubCategoryChange(event, val)
                }
                disabled={onlyView}
              />
            </Grid>
            {this.state.product_type == "material" ? (
              <Grid item xs={6} md={3} className="create-input">
                <Field
                  className="input-inner"
                  name="material_id"
                  component={this.renderSingleMaterialsField}
                  label="Material"
                  type="select"
                  onChange={(event, vl) =>
                    this.handleSingleMatreialChange(event, vl)
                  }
                  disabled={onlyView}
                />
              </Grid>
            ) : null}
            <Grid item xs={6} md={3} className="create-input">
              <Field
                className="input-inner"
                name="name"
                component={this.renderProductNameField}
                label="Name"
                disabled={onlyView}
              />
            </Grid>
            {this.props.formData && (
              <Grid item xs={6} md={2} className="create-input">
                <Field
                  className="input-inner"
                  name="added_by_name"
                  component={this.renderTextField}
                  label="Added by"
                  value={this.props.formData?.added_by_name}
                  disabled={true}
                />
              </Grid>
            )}
            {this.state.product_type != "material" ? (
              <Grid
                item
                xs={6}
                md={`${this.props.formData ? "1" : "3"}`}
                className="create-input"
              >
                <Field
                  className="input-inner"
                  name="tax_rate_id"
                  component={this.renderTaxFieldField}
                  label="Tax"
                  type="select"
                  onChange={(event) => this.handleFieldChange(event)}
                  disabled={onlyView}
                />
              </Grid>
            ) : null}

            {this.state.is_ceritified ? (
              <React.Fragment>
                {/*<Grid item xs={6} md={3} className='create-input'>
                    <Field
                      className='input-inner'
                      name="licence_no"
                      component={this.renderTextField}
                      label="Licence No"
                    />
                  </Grid>*/}
                <Grid item xs={6} md={3} className="create-input">
                  <Field
                    className="input-inner"
                    name="certificates"
                    component={this.renderCertificatesField}
                    label="Certificate"
                    multi
                    type="select"
                    defaultValue={[]}
                    onChange={(event) => this.handleFieldChange(event)}
                    disabled={onlyView}
                  />
                  {/* <Field
                      className='input-inner'
                      name="certificates"
                      component={this.renderCertificatesField}
                      label="Certificate"
                      multi
                      type="select"
                      defaultValue={[]}
                      onChange={(event) => this.handleFieldChange(event)}
                    /> */}
                </Grid>
              </React.Fragment>
            ) : null}
            {this.state.product_type != "material" ? (
              <React.Fragment>
                <Grid item xs={6} md={3} className="create-input">
                  <Field
                    className="input-inner"
                    name="materials"
                    component={this.renderMaterialsField}
                    label="Materials"
                    multi
                    type="select"
                    defaultValue={[]}
                    onChange={(event, val) =>
                      this.handleMaterialsChange(event, val)
                    }
                    disabled={onlyView}
                  />
                </Grid>
                <Grid item xs={6} md={3} className="create-input">
                  {/* <Field
                      className='input-inner'
                      name="sizes"
                      component={this.renderSizeField}
                      label="Size"
                      multi
                      type="select"
                      defaultValue={[]}
                      onChange={(event) => this.handleFieldChange(event)}
                    />*/}
                  <Field
                    className="input-inner"
                    name="sizes"
                    component={this.renderSizeField}
                    label="Size"
                    multi
                    type="select"
                    defaultValue={[]}
                    onChange={(event, val) => this.handleSizeChange(event, val)}
                    disabled={onlyView}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item xs={6} md={3} className="create-input">
                <Field
                  className="input-inner"
                  name="tax_rate_id"
                  component={this.renderTaxFieldField}
                  label="Tax"
                  type="select"
                  onChange={(event) => this.handleFieldChange(event)}
                  disabled={onlyView}
                />
              </Grid>
            )}
            <Grid item xs={6} md={1.5} className="create-input">
              <Field
                className="input-inner"
                name="product_code"
                component={this.renderTextField}
                label="Product Code"
                disabled={onlyView}
              />
            </Grid>
            {/*{
              this.state.product_type != 'material' ?
              <Grid item xs={6} md={3} className='create-input'>
                <Field
                  className='input-inner'
                  name="certified"
                  component={this.renderCertifiedField}
                  label="Is Certified?"
                  type="select"
                />
              </Grid>
              : null
            }*/}
            <Grid item xs={6} md={1.5} className="create-input">
              <Field
                className="input-inner"
                name="status"
                component={this.renderStatusField}
                label="Status"
                type="select"
                disabled={onlyView}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className="loans_view">
            <Grid item xs={12}>
              {/*<h4>Material Details</h4>*/}
              <TableContainer component={Paper}>
                <Table className="ratn-table-product-wrapper table-bordered sale_form_table">
                  <TableHead className="ratn-table-header p_view">
                    <TableRow>
                      {this.state.product_type != "material" ? (
                        <TableCell sx={{ width: 120 }}>Size No</TableCell>
                      ) : null}
                      <TableCell sx={{ width: 230 }}>Material</TableCell>
                      <TableCell>Purity</TableCell>
                      <TableCell sx={{ width: 120 }}>Weight</TableCell>
                      <TableCell sx={{ width: 120 }}>Unit</TableCell>
                      {this.state.product_type != "material" ? (
                        <TableCell sx={{ width: 120 }}>Quantity</TableCell>
                      ) : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.size_materials.map((item, index) => (
                      <TableRow key={index}>
                        {this.state.product_type != "material" ? (
                          <TableCell>{item.size_name}</TableCell>
                        ) : null}
                        <TableCell>
                          {item.materials.map((m, key) =>
                            !this.isMaterialInSizeRange(key, index) ? null : (
                              <TextField
                                key={key}
                                label=""
                                variant="outlined"
                                fullWidth
                                value={m.material_name}
                                sx={{ marginBottom: "5px" }}
                                inputProps={{ className: "non_disable_text" }}
                                size="small"
                                disabled={onlyView}
                              />
                            ),
                          )}
                        </TableCell>
                        <TableCell>
                          {item.materials.map((m, key) =>
                            !this.isMaterialInSizeRange(key, index) ? null : (
                              <FormControl
                                fullWidth
                                error={
                                  "purity_error" in m && m.purity_error
                                    ? true
                                    : false
                                }
                                key={key}
                                sx={{ marginBottom: "5px" }}
                                size="small"
                              >
                                <Select
                                  label=""
                                  fullWidth
                                  defaultValue={[]}
                                  multiple
                                  value={m.purities}
                                  renderValue={(selected) =>
                                    this.getSelectedPurities(
                                      selected,
                                      m.material_id,
                                    ).join(", ")
                                  }
                                  onChange={(e) =>
                                    this.handlePurityChange(e, index, key)
                                  }
                                  disabled={onlyView}
                                >
                                  <MenuItem value=""></MenuItem>
                                  {this.getMaterialPurities(m.material_id).map(
                                    (p, index2) => {
                                      return (
                                        <MenuItem
                                          value={p.id}
                                          key={index2}
                                          className="multi-select"
                                        >
                                          <Checkbox
                                            checked={
                                              m.purities &&
                                              m.purities.indexOf(p.id) > -1
                                                ? true
                                                : false
                                            }
                                          />
                                          <ListItemText primary={p.name} />
                                        </MenuItem>
                                      );
                                    },
                                  )}
                                </Select>
                              </FormControl>
                            ),
                          )}
                        </TableCell>
                        <TableCell>
                          {item.materials.map((m, key) =>
                            !this.isMaterialInSizeRange(key, index) ? null : (
                              <TextField
                                key={key}
                                label=""
                                variant="outlined"
                                fullWidth
                                //  value={m.weight}
                                value={m.weight}
                                onChange={(e) =>
                                  this.handleWeightChange(
                                    e,
                                    index,
                                    key,
                                    m.material_name,
                                  )
                                }
                                sx={{ marginBottom: "5px" }}
                                error={
                                  "weight_error" in m && m.weight_error
                                    ? true
                                    : false
                                }
                                size="small"
                                disabled={onlyView}
                              />
                            ),
                          )}
                        </TableCell>
                        <TableCell>
                          {item.materials.map((m, key) =>
                            !this.isMaterialInSizeRange(key, index) ? null : (
                              <FormControl
                                fullWidth
                                error={
                                  "unit_error" in m && m.unit_error
                                    ? true
                                    : false
                                }
                                key={key}
                                sx={{ marginBottom: "5px" }}
                                size="small"
                              >
                                <Select
                                  label=""
                                  fullWidth
                                  defaultValue=""
                                  value={m.unit_id}
                                  onChange={(e) =>
                                    this.handleUnitChange(e, index, key)
                                  }
                                  disabled={onlyView}
                                >
                                  <MenuItem value=""></MenuItem>
                                  {this.state.unitList.map((p, index2) => {
                                    return (
                                      <MenuItem value={p.id} key={index2}>
                                        {p.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            ),
                          )}
                        </TableCell>
                        {this.state.product_type != "material" ? (
                          <TableCell>
                            {item.materials.map((m, key) =>
                              !this.isMaterialInSizeRange(key, index) ? null : (
                                <TextField
                                  key={key}
                                  label=""
                                  variant="outlined"
                                  fullWidth
                                  value={m.quantity}
                                  onInput={(e) => validateInteger(e)}
                                  onChange={(e) =>
                                    this.handleQuantityChange(e, index, key)
                                  }
                                  sx={{ marginBottom: "5px" }}
                                  error={
                                    "qty_error" in m && m.qty_error
                                      ? true
                                      : false
                                  }
                                  size="small"
                                  disabled={onlyView}
                                />
                              ),
                            )}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="loans_view p_view">
            <Grid item xs={12} className="create-input">
              <InputLabel>Description</InputLabel>
              {/*<Field
                className='description'
                name="description"
                component={this.renderTextArea}
                placeholder="Description"
              />*/}
              <Editor
                editorState={description}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  options: ["inline", "textAlign", "history", "blockType"],
                  inline: {
                    options: ["bold", "italic", "underline"],
                  },
                  blockType: {
                    options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
                  },
                }}
                editorStyle={{
                  height: "100px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                wrapperStyle={{
                  border: "1px solid rgb(196 196 196)",
                }}
                toolbarStyle={{
                  borderBottom: "1px solid rgb(196 196 196)",
                }}
                disabled={onlyView}
              />
            </Grid>
            <Grid item xs={6} md={10} className="create-input">
              <InputLabel>Tags (Searchable Keys)</InputLabel>
              <TextField
                inputRef={this.tagRef}
                fullWidth
                sx={{ margin: "1rem 0" }}
                placeholder={this.state.tags.length < 5 ? "Enter tags" : ""}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                      {this.state.tags.map((data, index) => {
                        return (
                          <Tags
                            data={data}
                            handleDelete={this.handleTagDelete}
                            key={index}
                          />
                        );
                      })}
                    </Box>
                  ),
                }}
                onKeyPress={this.handleTagEnter}
                disabled={onlyView}
              />
            </Grid>

            <Grid item xs={6} md={2} className="create-input">
              <Field
                className="input-inner"
                name="is_featured"
                component={this.renderFeaturedField}
                label="Is Featured"
                type="select"
                disabled={onlyView}
              />
            </Grid>

            <Grid item xs={12} className="create-input">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ padding: 0 }}
                >
                  <Typography
                    style={{
                      color: "#1e2746",
                      width: "100%",
                      textAlign: "right",
                    }}
                  >
                    SEO Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item xs={12} className="create-input pt-0">
                    <Field
                      className="input-inner"
                      name="meta_title"
                      component={this.renderTextField}
                      label="Meta Title"
                      disabled={onlyView}
                    />
                  </Grid>
                  <Grid item xs={12} className="create-input">
                    <InputLabel>Meta Description</InputLabel>
                    <Field
                      className="description"
                      name="short_desc"
                      component={this.renderTextArea}
                      placeholder="Meta Description"
                      disabled={onlyView}
                    />
                  </Grid>

                  <Grid item xs={12} className="create-input">
                    <InputLabel>Meta Keywords</InputLabel>
                    <Field
                      className="description"
                      name="keywords"
                      component={this.renderTextArea}
                      placeholder="Meta Keywords"
                      disabled={onlyView}
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <div className="custom-container ml-10">
            <div className="custom-row pl-0">
              <div className="custom-col-2">
                <div className="admin-buttons">
                  <div className="p-single-image-wrapper">
                    {/*{
                  this.state.main_image || this.state.existing_main_image ?
                    <ImageList>
                      {
                        this.state.existing_main_image ?
                          <ImageListItem>
                            <div>
                              <img
                                src={this.state.existing_main_image}
                                loading="lazy"
                              />
                              <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                <DeleteIcon color="error" onClick={() => this.deleteExistingImage('main_image')} />
                              </span>
                            </div>
                          </ImageListItem>
                          : null
                      }
                      {
                        this.state.main_image ?
                          <ImageListItem>
                            <div>
                              <img
                                src={this.getImageSrc(this.state.main_image)}
                                loading="lazy"
                              />
                              <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                <DeleteIcon color="error" onClick={() => this.deleteImage('main_image')} />
                              </span>
                            </div>
                          </ImageListItem>
                          : null
                      }
                    </ImageList>
                    : <div className='p-single-image'>

                      <img src={noImage} id="logo-img" />
                    </div>
                }*/}
                    <div className="p-single-image">
                      {this.state.existing_main_image ? (
                        <img src={this.state.existing_main_image} />
                      ) : (
                        <>
                          {this.state.main_image_file ? (
                            <img
                              src={this.getImageSrc(this.state.main_image_file)}
                            />
                          ) : (
                            <img src={noImage} />
                          )}
                        </>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      className="image-button"
                      component="label"
                      endIcon={<CloudUploadIcon />}
                      disabled={onlyView}
                    >
                      Main
                      <input
                        name="main_image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => this.onChangeMianImage(e)}
                        ref={this.mainImageFileRef}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="custom-col-8">
                <div className="all-image-wrapper">
                  <div className="all-single-image">
                    {/*{
                    this.state.images.length || this.state.existing_images.length ?
                      <ImageList>
                        {this.state.existing_images.map((item, index) => (
                          <ImageListItem key={index}>
                            <div>
                              <img
                                src={item.path}
                                loading="lazy"
                              />
                              <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                <DeleteIcon color="error" onClick={() => this.deleteExistingImage(index)} />
                              </span>
                            </div>
                          </ImageListItem>
                        ))}
                        {this.state.images.map((item, index) => (
                          <ImageListItem key={index}>
                            <div style={{ position: 'relative', }}>
                              <img
                                src={this.getImageSrc(item)}
                                loading="lazy"
                              />
                              <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                                <DeleteIcon color="error" onClick={() => this.deleteImage(index)} />
                              </span>
                            </div>
                          </ImageListItem>
                        ))}
                      </ImageList>
                      : <div>
                        <img src={noImage} id="logo-img" />
                      </div>
                  }*/}
                    <div>
                      {firstAllImage.type != "no_image" ? (
                        <>
                          {firstAllImage.type == "existing" ? (
                            <button
                              className="close_img"
                              onClick={() => this.deleteExistingImage(0)}
                              type="button"
                              disabled={onlyView}
                            >
                              x
                            </button>
                          ) : (
                            <button
                              className="close_img"
                              onClick={() => this.deleteImage(0)}
                              type="button"
                              disabled={onlyView}
                            >
                              x
                            </button>
                          )}
                        </>
                      ) : null}
                      <img
                        src={
                          firstAllImage.type == "new"
                            ? this.getImageSrc(firstAllImage.path)
                            : firstAllImage.path
                        }
                      />
                    </div>
                    <Button
                      variant="contained"
                      disabled={onlyView}
                      className="image-button"
                      component="label"
                      endIcon={<CloudUploadIcon />}
                    >
                      All Image
                      <input
                        name="images"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={this.onImageChange}
                        ref={this.imageFileRef}
                        multiple
                      />
                    </Button>
                  </div>
                  {this.getAllImages().map((item, index) => (
                    <div className="all-single-image" key={index}>
                      <div>
                        {item.type != "no_image" ? (
                          <>
                            {item.type == "existing" ? (
                              <button
                                className="close_img"
                                disabled={onlyView}
                                onClick={() =>
                                  this.deleteExistingImage(index + 1)
                                }
                                type="button"
                              >
                                x
                              </button>
                            ) : (
                              <button
                                className="close_img"
                                disabled={onlyView}
                                onClick={() => this.deleteImage(index + 1)}
                                type="button"
                              >
                                x
                              </button>
                            )}
                          </>
                        ) : null}
                        <img
                          src={
                            item.type == "new"
                              ? this.getImageSrc(item.path)
                              : item.path
                          }
                          id="logo-img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="custom-col-2">
                <div className="p-single-image-wrapper">
                  {/*{
                  this.state.existing_video_file ?
                    <ImageList sx={{ width: '100%', height: 150 }} cols={3} rowHeight={150}>
                      <ImageListItem>
                        <div style={{ position: 'relative', width: '220px' }}>
                          <video
                            width="200"
                            height="150"
                            style={{ height: "143px", objectFit: "contain" }}
                            loop
                            controls
                            key={this.state.existing_video_file}
                            ref={this.existingVideoRef}
                          >
                            <source src={this.state.existing_video_file} />
                          </video>
                          <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                            <DeleteIcon color="error" onClick={this.deleteExistingVideo} />
                          </span>
                        </div>
                      </ImageListItem>
                    </ImageList>
                    : null
                }

                {
                  this.state.video_preview ?
                    <ImageList sx={{ width: '100%', height: 150 }} cols={3} rowHeight={150}>
                      <ImageListItem>
                        <div style={{ position: 'relative', width: '220px' }}>
                          <video
                            width="200"
                            height="150"
                            style={{ height: "143px", objectFit: "contain" }}
                            loop
                            controls
                            key={this.state.video_preview}
                          >
                            <source src={this.state.video_preview} />
                          </video>
                          <span style={{ position: 'absolute', top: '0px', right: '0px', cursor: 'pointer' }}>
                            <DeleteIcon color="error" onClick={this.deleteVideo} />
                          </span>
                        </div>
                      </ImageListItem>
                    </ImageList>
                    : null
                }*/}

                  <div className="p-single-image">
                    {this.state.existing_video_file ? (
                      <>
                        <button
                          className="close_img"
                          onClick={this.deleteExistingVideo}
                          type="button"
                          disabled={onlyView}
                        >
                          x
                        </button>
                        <video
                          width="200"
                          height="150"
                          style={{ height: "143px", objectFit: "contain" }}
                          loop
                          controls
                          key={this.state.existing_video_file}
                          ref={this.existingVideoRef}
                        >
                          <source src={this.state.existing_video_file} />
                        </video>
                      </>
                    ) : (
                      <>
                        {this.state.video_preview ? (
                          <>
                            <button
                              className="close_img"
                              onClick={this.deleteVideo}
                              type="button"
                              disabled={onlyView}
                            >
                              x
                            </button>
                            <video
                              width="100%"
                              height="140"
                              style={{ height: "143px", objectFit: "contain" }}
                              loop
                              controls
                              key={this.state.video_preview}
                            >
                              <source src={this.state.video_preview} />
                            </video>
                          </>
                        ) : (
                          <img src={noVideo} id="logo-img" />
                        )}
                      </>
                    )}
                  </div>
                  <Button
                    variant="contained"
                    className="video-button"
                    component="label"
                    disabled={onlyView}
                    endIcon={<CloudUploadIcon />}
                  >
                    Video
                    <input
                      name="video"
                      hidden
                      accept="video/mp4"
                      type="file"
                      onChange={this.onVideoChange}
                      ref={this.videoFileRef}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Grid container spacing={0} className="loans_view p_view">
            <Grid
              item
              xs={12}
              className="create-input"
              style={{ paddingTop: "10px" }}
            >
              <Stack
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                className="p-submit-button"
                sx={{ marginTop: "0px" }}
              >
                {!onlyView ? (
                  <LoadingButton
                    variant="contained"
                    type="button"
                    loading={submitting}
                    disabled={submitting}
                    onClick={handleSubmit(this.handleFormSubmit)}
                  >
                    Submit
                  </LoadingButton>
                ) : null}
                {!submitting ? (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      this.props.navigate(
                        getUserDashboardRoute(getRoleName(this.state.auth)) +
                          "/products",
                      )
                    }
                  >
                    Cancel
                  </Button>
                ) : null}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.superadmin.product.categories,
  certificates: state.superadmin.product.certificates,
  materialList: state.superadmin.material.items,
  sizeList: state.superadmin.size.items,
  sub_categories: state.superadmin.subCategory.items,
  taxList: state.superadmin.tax.items,
  auth: state.auth,
  unitList: state.superadmin.unit.items,
  productList: state.superadmin.product.items,
  formValues: getFormValues("ProductForm")(state, "status"),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      productCreate,
      productUpdate,
      productStore,
      subCategoryList,
      taxList,
      materialList,
      unitList,
      sizeList,
      productList,
      change,
    },
    dispatch,
  ),
});

ProductForm.defaultProps = {
  onlyView: false,
};

export default withRouter(
  withSnackbar(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(
      reduxForm({
        form: "ProductForm",
        validate,
      })(ProductForm),
    ),
  ),
);

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#283240",
        height: "100%",
        display: "flex",
        padding: "5px !important",
        margin: "0 0.5rem 0 0 !important",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
      className="input_tags_item"
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};
