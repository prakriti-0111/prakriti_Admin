import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Link, TextareaAutosize, Stack, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox, FormHelperText, ListItemText } from '@mui/material';
import { ContactPageSharp } from '@mui/icons-material';
import withRouter from 'src/helpers/withRouter';
import { getValuesFromKey } from 'src/helpers/helper';
import _ from 'lodash';
import { materialList } from 'actions/superadmin/material.actions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { RESET_PRODUCT_LIST } from '../../actionTypes/superadmin/product.types';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'category_id',
    'unit_id',
    'purities',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  if(!('purities' in values) || !values['purities'].length){
    errors['purities'] = 'Required'
  }

  return errors
}

const filter = createFilterOptions();

class MaterialForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: 'formData' in this.props ? this.props.formData : null,
      categories: this.props.categories,
      units: this.props.units,
      purities: this.props.purities,
      submitSuccess: this.props.submitSuccess,
      materialList: this.props.materialList,
    }

  }

  componentDidMount() {
    if (this.state.formData) {
      let formValues = { ...this.state.formData }
      formValues.purities = getValuesFromKey(formValues.purities, 'id');
      this.props.initialize(formValues)
    } else {
      this.props.initialize(this.getDefaultValues());
    }
  }

  loadMaterials = (category_id) => {
    this.props.actions.materialList({all: 1, category_id: category_id || ''});
  }

  getDefaultValues = () => {
    return {
      category_id: '',
      name: '',
      unit_id: '',
      status: 1,
      purities: '',
    }
  }

  handleFieldChange = (e) => {

  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }

    if (props.units !== state.units) {
      update.units = props.units;
    }

    if (props.purities !== state.purities) {
      update.purities = props.purities;
    }
    if (props.submitSuccess !== state.submitSuccess) {
      update.submitSuccess = props.submitSuccess;
    }
    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }
    if (props.materialList !== state.materialList) {
      update.materialList = props.materialList;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.submitSuccess) {
      this.resetForm();
    }
    if (this.props.formData != prevProps.formData && this.state.formData) {
      let formValues = { ...this.state.formData }
      formValues.purities = getValuesFromKey(formValues.purities, 'id');
      this.props.initialize(formValues)
    }
  }

  resetForm = () => {
    let data = {...this.getDefaultValues()};
    data.category_id = this.props.formValues.category_id;
    this.props.initialize(data);
  }

  /*<TextField
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
      inputProps={{ maxLength: 20 }}
    />*/

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <Autocomplete
      className='autocomplete-selectbox'
      fullWidth
      value={input.value}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={this.state.materialList}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
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
          label="Material"
          error={touched && error ? true : false}
          helperText={touched && error ? error : ''}
          {...input}
          {...custom}
         />
      )}
      onInputChange={(event, val) => {
        if('handleMaterialChange' in this.props){
          this.props.handleMaterialChange(val)
        }
      }}
    />
  )

  renderCategoryField = ({
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
        {...input}
        {...custom}
      >
        <MenuItem value=""></MenuItem>
        {
          this.state.categories.map((item, index) => {
            return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
          })
        }
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )


  renderUnitField = ({
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
        {...input}
        {...custom}
      >
        <MenuItem value="">select unit</MenuItem>
        {
          this.state.units.map((item, index) => {
            return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
          })
        }

      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  renderStatusField = ({
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
        {...input}
        {...custom}
      >
        <MenuItem value="1">Active</MenuItem>
        <MenuItem value="0">Inactive</MenuItem>
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  getSelectedNames = (selected) => {
    let arr = [];
    for(let i = 0; i < selected.length; i++){
      let item = _.filter(this.state.purities, { id: selected[i] });
      arr.push(item[0].name)
    }
    return arr;
  }

  renderMaterialPurityField = ({
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
        renderValue={(selected) => this.getSelectedNames(selected).join(", ")}
      >
        {this.state.purities.map((item) => (
            <MenuItem key={item.id} value={item.id} className='multi-select'>
              <Checkbox checked={(input.value && input.value.indexOf(item.id) > -1) ? true : false} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}


        {/*<MenuItem disabled value="">select purity</MenuItem>
        {
          this.state.purities.map((item, index) => {
            return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
          })
        }*/}
      </Select>
      {
        touched && error ?
          <FormHelperText>{error}</FormHelperText>
          : null
      }

    </FormControl>
  )

  /*renderCheckBoxCase = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <FormControlLabel control={<Checkbox {...input} {...custom} checked={!!input.value} />} label={label} />
  )*/

  handleCategoryChange = (val) => {
    this.props.categoryChange(val);
    this.loadMaterials(val);

    /*this.props.dispatch({
      type: RESET_PRODUCT_LIST
    })*/
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} className='create-input'>
              <Field
                name="category_id"
                component={this.renderCategoryField}
                label="Category"
                type="select"
                onChange={(event, val) => this.handleCategoryChange(val)}
              />
            </Grid>
            <Grid item xs={6} md={3} className='create-input'>
              <Field
                name="name"
                component={this.renderTextField}
                label="Material Name"
              />
            </Grid>
            <Grid item xs={6} md={2} className='create-input'>
              <Field
                name="unit_id"
                component={this.renderUnitField}
                label="Unit"
                type="select"
              />
            </Grid>
            
            <Grid item xs={6} md={4} className='create-input'>
              <Field
                name="purities"
                component={this.renderMaterialPurityField}
                label="Purities"
                multi
                type="select"
                defaultValue={[]}
                onChange={(event) => this.handleFieldChange(event)}
              />
            </Grid>
            {/*<Grid item xs={1} className='create-input'>
              <Field
                name="status"
                component={this.renderStatusField}
                label="Status"
                type="select"
              />
    </Grid>*/}
            <Grid item xs={12}>
              <Stack spacing={1} direction="row" className='modal-button-area ratn-footer-buttons' sx={{mb: 2}}>
                {
                  this.state.formData ?
                  <Button variant="outlined" onClick={() => this.props.handleCancel()} className="close-button">Cancel</Button>
                  : null
                }
                <Button variant="contained" className='conf-button' type="submit">Submit</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  materialList: state.superadmin.material.items || [],
  formValues: getFormValues('MaterialForm')(state, 'category_id')
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators({
      materialList
    }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'MaterialForm',
  validate
})(MaterialForm));



