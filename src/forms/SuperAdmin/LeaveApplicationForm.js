import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, getFormValues } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, Stack, InputLabel} from '@mui/material';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import { getRoleName, getUserDashboardRoute } from 'src/helpers/helper';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { leaveApplicationStore, leaveApplicationUpdate } from 'actions/superadmin/leaveApplication.action';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'title',
    'from_date',
    'to_date'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors
}

class LeaveApplicationForm extends React.Component {

  constructor(props) {
    super(props);

    let formData = 'formData' in this.props ? this.props.formData : null;
    this.state = {
      auth: this.props.auth,
      formData: formData,
      isCreateFrom: !formData,
      message: EditorState.createEmpty()
    }

  }

  onEditorStateChange = (message) => {
    this.setState({
        message,
    });
  };

  componentDidMount() {
    if (this.state.formData) {
      this.initializeFormData();
    } else {
      this.setState({
        message: EditorState.createEmpty()
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.formData != prevProps.formData) {
      this.initializeFormData();
    }
  }

  initializeFormData = () => {
    let formValues = { ...this.state.formData }
    formValues.from_date = formValues.from_date ? moment(formValues.from_date).format('DD/MM/YYYY') : '';
    formValues.to_date = formValues.to_date ? moment(formValues.to_date).format('DD/MM/YYYY') : '';
    this.props.initialize(formValues);
    this.setState({
        message: this.state.formData.message ? EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(this.state.formData.message)
        )
      ) : EditorState.createEmpty(),
    });
  }

  getDefaultValues = () => {
    return {
      title: '',
      message: '',
      from_date: '',
      to_date: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.formData !== state.formData) {
      update.formData = props.formData;
    }

    return update;
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      fullWidth
      error={touched && error ? true : false}
      helperText={touched && error ? error : ''}
      {...input}
      {...custom}
    />
  )

    isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

  handleFormSubmit = async (data, dispatch) => {
    let values = { ...this.getDefaultValues(), ...data };
    let _msg = this.state.message ? draftToHtml(convertToRaw(this.state.message.getCurrentContent())) : "";
    try {
      let x = _msg.replace(/<\/?[^>]+>/gi, '');
      x = x.trim();
      if(this.isEmptyOrSpaces(x)){
        this.props.enqueueSnackbar("Please write message.", {variant: 'error'});
        return;
      }
    } catch (error) {}
    values.message = _msg;
    data.from_date = moment(values.from_date.toString()).format('YYYY-MM-DD')
    data.to_date = moment(data.to_date.toString()).format('YYYY-MM-DD')
    if (this.state.isCreateFrom) {
        return this.props.leaveApplicationStore(values);
    } else {
        return this.props.leaveApplicationUpdate(this.state.formData.id, values);
    }
  }

  handleFieldChange = (e, vl) => {

  }

  renderDateField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
          label={label}
          inputFormat="DD/MM/YYYY"
          value={input.value}
          onChange={(newValue) => this.updateDate(input.name, newValue)}
          renderInput={(params) => <TextField fullWidth {...params}
          error={touched && error ? true : false}
          helperText={touched && error ? error : ''}
          {...input}
          {...custom}
          />
        }
      />
     </LocalizationProvider>
  )

  updateDate = (name, val) => {
    console.log(name, val)
    this.props.change(name, val);
  }

  
  render() {
    const { handleSubmit, submitting } = this.props;
    const { message } = this.state;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} className="ratn-dialog-wrapper" ref={this.formRef}>
        <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
          <Grid container spacing={2} className="loans_view p_view">
            <Grid item xs={12} className='create-input'>
                <Field
                    className='input-inner'
                    name="title"
                    component={this.renderTextField}
                    label="Title"
                />
            </Grid>
            <Grid item xs={12} className='create-input'>
              <InputLabel>Message</InputLabel>
              <Editor
                editorState={message}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  options: ['inline', 'textAlign', 'history', 'blockType'],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  },
                  blockType: {
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
                  }
                }}
                editorStyle={{
                  height: "200px",
                  paddingLeft: '10px',
                  paddingRight: '10px',
                }}
                wrapperStyle={{
                  border: "1px solid rgb(196 196 196)",
                }}
                toolbarStyle={{
                  borderBottom: "1px solid rgb(196 196 196)",
                }}
              />

            </Grid>
            <Grid item xs={12} md={3} className='create-input'>
              <Field
                name="from_date"
                component={this.renderDateField}
                label="From Date"
              />
            </Grid>
            <Grid item xs={12} md={3} className='create-input'>
              <Field
                name="to_date"
                component={this.renderDateField}
                label="To Date"
              />
            </Grid>
          </Grid>
          <Grid container spacing={0} className="loans_view p_view">
            <Grid item xs={12} className='create-input' style = {{ paddingTop: "10px" }}>
              <Stack spacing={1} direction="row" justifyContent="flex-end" className='p-submit-button' sx={{ marginTop: "0px" }}>
                <LoadingButton
                  variant="contained"
                  type="button"
                  loading={submitting}
                  disabled={submitting}
                  onClick={handleSubmit(this.handleFormSubmit)}
                >
                  Submit
                </LoadingButton>
                {
                  !submitting ?
                    <Button variant="outlined" onClick={() => this.props.navigate(getUserDashboardRoute(getRoleName(this.state.auth)) + '/leave-applications')}>Cancel</Button>
                    : null
                }
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    )
  }

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  formValues: getFormValues('LeaveApplicationForm')(state, 'title'),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    leaveApplicationStore,
    leaveApplicationUpdate,
    change
  }, dispatch)
});

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'LeaveApplicationForm',
  validate
})(LeaveApplicationForm))));



