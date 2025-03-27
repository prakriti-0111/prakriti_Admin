import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Box, TextField, Button, Grid, InputAdornment, Stack, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { isEmpty, toBase64 } from 'src/helpers/helper';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import withRouter from 'src/helpers/withRouter';
import CalenderForm from 'forms/SuperAdmin/CalenderForm';
import { SUPERADMIN_RESET_EMPLOYEE_SALARY } from '../../actionTypes/superadmin/employeeSalary.types';
import { getNextUserName } from 'actions/superadmin/profile.actions';
import { roleList } from 'actions/superadmin/role.actions';
import { employeeSalaryList, employeeSalaryCreate, employeeSalaryFetch, employeeSalaryUpdate } from 'actions/superadmin/employeeSalary.actions';
import { gridSpacing } from 'store/constant';
import DataTable from 'src/utils/DataTable';
import _ from 'lodash';
import { getRoleName, getUserDashboardRoute, displayAmount } from 'src/helpers/helper';
import moment from 'moment';
import { getMyPerformance } from 'actions/superadmin/my_performance.actions';
import MainCard from 'ui-component/cards/MainCard';


class EmployeeEditForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
            auth: this.props.auth,
            formData: formData,
            isCreateFrom: true,
            isCreate: true,
            editRow: null,
            roleList: this.props.roleList,
            submitting: false,
            formValues: {
                gross_salary: '',
                basic_salary: '',
                eff_date: moment().format('MM/DD/YYYY'),
                is_epf: '',
                is_medical: '',
                target: '',
                visit_target: '',
                incentive: '',
                hra_percent: 60,
                conv_percent: 30,
                epf_employee_percent: 12,
                epf_employer_percent: 12,
                medical_employee_percent: 0.75,
                medical_employer_percent: 3.25,
            },
            formErros: {
                gross_salary: false,
                basic_salary: false,
                eff_date: false,
                is_epf: false,
                is_medical: false,
                target: false,
                visit_target: false,
                incentive: false,
                hra_percent: false,
                conv_percent: false,
                epf_employee_percent: false,
                epf_employer_percent: false,
                medical_employee_percent: false,
                medical_employer_percent: false,
            },
            queryParams: {
                page: 1,
                limit: 50,
                user_id: formData.id,
                role_id: formData.role_id,
            },
            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            editSuccess: this.props.editSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
            performance: null,
        }

        this.columns = [
            {
                name: 'gross_salary',
                display_name: 'Gross'
            },
            {
                name: 'basic_salary',
                display_name: 'Basic Salary'
            },
            {
                name: 'hra_percent_display',
                display_name: 'HRA'
            },
            {
                name: 'conv_percent_display',
                display_name: 'CONV'
            },
            {
                name: 'epf_employee_percent_display',
                display_name: 'EPF Employee'
            },
            {
                name: 'medical_employee_percentt_display',
                display_name: 'Medical Employee'
            },
            {
                name: 'eff_date_display',
                display_name: 'Effective Date '
            },
            {
                name: 'target',
                display_name: 'Target'
            },
            {
                name: 'visit_target',
                display_name: 'Visit Target'
            },
            {
                name: 'display_is_epf',
                display_name: 'EPF'
            },
            {
                name: 'display_is_medical',
                display_name: 'Medical'
            },
            {
                name: 'incentive_display',
                display_name: 'Incentive'
            }
        ];

        this.tableActions = [
            {
                label: 'Edit',
                onClick: this.handleEdit,
                color: 'primary'
            },
            /*{
              label: 'Delete',
              onClick: this.handleDelete,
              isDelete: true,
              color: 'error'
            }*/
        ];
    }

    componentDidMount() {
        this.props.actions.roleList({ all: 1, se: 1 });
        if (this.state.formData) {
            this.initializeFormData();
        } else {
            this.loadUserName('')
        }
        this.thisMonthPerformance();
        this.loadListData();
    }

    loadUserName = async (id) => {
        let res = await getNextUserName('employee', id);
        if (res.data.success) {
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    user_name: res.data.data
                }
            })
        }
    }

    thisMonthPerformance = async () => {
        let formData = this.state.formData;
        let res = await getMyPerformance({ current: 1, user_id: formData ? formData.id : 0 });
        if (res.data.success) {
            this.setState({
                performance: res.data.data
            })
        }
    }

    initializeFormData() {
        if (this.state.formData) {
            let formValues = this.state.formValues;
            _.each(this.state.formData, function (value, index) {
                if (index in formValues) {
                    formValues[index] = value;
                }
            });

            this.setState({
                formValues: formValues,
            }, () => {
                if (!formValues.user_name) {
                    this.loadUserName(formValues.id);
                }
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        if (props.formData !== state.formData) {
            update.formData = props.formData;
        }
        if (props.actionCalled !== state.actionCalled) {
            update.actionCalled = props.actionCalled;
        }
        if (props.createSuccess !== state.createSuccess) {
            update.createSuccess = props.createSuccess;
        }
        if (props.editSuccess !== state.editSuccess) {
            update.editSuccess = props.editSuccess;
        }
        if (props.successMessage !== state.successMessage) {
            update.successMessage = props.successMessage;
        }
        if (props.errorMessage !== state.errorMessage) {
            update.errorMessage = props.errorMessage;
        }
        if (props.roleList !== state.roleList) {
            update.roleList = props.roleList;
        }
        if (props.salaries !== state.salaries) {
            update.salaries = props.salaries;
        }
        return update;
    }

    componentDidUpdate(prevProps) {
        if (this.props.formData != prevProps.formData) {
            this.initializeFormData();
            this.thisMonthPerformance();
            this.loadListData();
        }

        if (this.state.actionCalled) {
            if (this.state.createSuccess) {
                this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                this.props.dispatch({ type: SUPERADMIN_RESET_EMPLOYEE_SALARY });
                this.setState({
                    queryParams: {
                        ...this.state.queryParams,
                        page: 1,
                        user_id: this.state.formData.id,
                        role_id: this.state.formData.role_id,
                    },
                    openDialog: false,
                    editRow: null,
                    submitSuccess: true
                }, () => {
                    this.loadListData();
                    this.resetFormData();
                    this.setState({
                        submitSuccess: false
                    })
                })
            } else if (this.state.editSuccess) {
                this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
                this.props.dispatch({ type: SUPERADMIN_RESET_EMPLOYEE_SALARY });
                this.setState({
                    queryParams: {
                        ...this.state.queryParams,
                        page: 1,
                        user_id: this.state.formData.id,
                        role_id: this.state.formData.role_id,
                    },
                    openDialog: false,
                    editRow: null,
                    submitSuccess: true
                }, () => {
                    this.loadListData();
                    this.resetFormData();
                    this.setState({
                        submitSuccess: false
                    })
                })
            } /*else if (this.state.deleteSuccess) {
            this.props.enqueueSnackbar(this.state.successMessage, { variant: 'success' });
            this.props.dispatch({type: SUPERADMIN_RESET_EMPLOYEE_SALARY});
            this.handlePagination(1);
          }*/
            else if (this.state.errorMessage != null) {
                this.props.enqueueSnackbar(this.state.errorMessage, { variant: 'error' });
                this.props.dispatch({ type: SUPERADMIN_RESET_EMPLOYEE_SALARY });
            }
        }
    }

    handleDefaultChange = (event, key) => {
        this.updateFormValues(event.target.value, key);
    }

    updateFormValues = (val, key) => {
        let formValues = this.state.formValues;
        formValues[key] = val;
        this.setState({
            formValues: formValues
        })
    }

    handleSubmit = async () => {
        let hasErr = this.formValidate();
        if (!hasErr) {
            this.setState({
                submitting: true,
            });

            let postData = { ...this.state.formValues };
            postData.user_id = this.state.formData.id;
            postData.role_id = this.state.formData.role_id;
            if(!postData.target){
                postData.incentive = '';
            }

            if (this.state.editRow) {
                this.props.actions.employeeSalaryUpdate(this.state.editRow.id, postData);
            } else {
                this.props.actions.employeeSalaryCreate(postData);
            }
        }
    }

    handlePagination = (page) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                page: page,
                user_id: this.state.formData.id,
                role_id: this.state.formData.role_id,
            }
        }, () => {
            this.loadListData();
        })
    }

    handleCreate = () => {
        this.setState({
            editRow: null
        })
    }

    handleEdit = (row) => {
        let formValues = this.state.formValues;
        _.each(row, function (value, index) {
            if (index in formValues) {
                formValues[index] = value;
            }
        });

        this.setState({
            editRow: row,
            formValues: formValues
            //openDialog: true,
            //dialogTitle: 'Edit Sub Category'
        })
    }

    /*handleDelete = (row) => {
      this.props.actions.employeeSalaryDelete(row.id);
    }*/

    loadListData = () => {
        let queryParams = {...this.state.queryParams}
        queryParams.user_id = this.state.formData ? this.state.formData.id : queryParams.user_id;
        queryParams.role_id = this.state.formData ? this.state.formData.role_id : queryParams.role_id;
        this.props.actions.employeeSalaryList(queryParams);
    }
    resetFormData() {
        let defaultFormValues = {
            gross_salary: '',
            basic_salary: '',
            eff_date: moment().format('MM/DD/YYYY'),
            is_epf: '',
            is_medical: '',
            target: '',
            visit_target: '',
        }

        this.setState({
            formValues: defaultFormValues
        });
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        if (isEmpty(formValues.gross_salary)) {
            formErros.gross_salary = true;
            hasErr = true;
        } else {
            formErros.gross_salary = false;
        }
        if (isEmpty(formValues.basic_salary)) {
            formErros.basic_salary = true;
            hasErr = true;
        } else {
            formErros.basic_salary = false;
        }
        if (isEmpty(formValues.eff_date)) {
            formErros.eff_date = true;
            hasErr = true;
        } else {
            formErros.eff_date = false;
        }
        if (isEmpty(formValues.is_epf)) {
            formErros.is_epf = true;
            hasErr = true;
        } else {
            formErros.is_epf = false;
        }
        if (isEmpty(formValues.is_medical)) {
            formErros.is_medical = true;
            hasErr = true;
        } else {
            formErros.is_medical = false;
        }
        if (isEmpty(formValues.hra_percent)) {
            formErros.hra_percent = true;
            hasErr = true;
        } else {
            formErros.hra_percent = false;
        }
        if (isEmpty(formValues.conv_percent)) {
            formErros.conv_percent = true;
            hasErr = true;
        } else {
            formErros.conv_percent = false;
        }
        if (isEmpty(formValues.epf_employee_percent)) {
            formErros.epf_employee_percent = true;
            hasErr = true;
        } else {
            formErros.epf_employee_percent = false;
        }
        if (isEmpty(formValues.epf_employer_percent)) {
            formErros.epf_employer_percent = true;
            hasErr = true;
        } else {
            formErros.epf_employer_percent = false;
        }
        if (isEmpty(formValues.medical_employee_percent)) {
            formErros.medical_employee_percent = true;
            hasErr = true;
        } else {
            formErros.medical_employee_percent = false;
        }
        if (isEmpty(formValues.medical_employer_percent)) {
            formErros.medical_employer_percent = true;
            hasErr = true;
        } else {
            formErros.medical_employer_percent = false;
        }
        /*if (isEmpty(formValues.target)) {
            formErros.target = true;
            hasErr = true;
        } else {
            formErros.target = false;
        }
        if (isEmpty(formValues.visit_target)) {
            formErros.visit_target = true;
            hasErr = true;
        } else {
            formErros.visit_target = false;
        }*/
        this.setState({
            formErros: formErros
        });
        return hasErr;
    }

    render() {
        const { formValues, formErros, submitting, performance } = this.state;
        
        return (
            <div>

                <h2 className='employee-header-view'>Employee View</h2>
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                    <form autoComplete="off" className='ratn-dialog-inner'>
                        <Grid container spacing={2} className='loans_view' style={{ marginBottom: '8px' }}>
                            {/*<Grid item xs={12}>
                            <Stack spacing={1} direction="row" className='modal-button-area ratn-footer-buttons'>
                                <Button variant="contained" className='conf-button' onClick={this.handleSubmit}>Add new</Button>
                            </Stack>
        </Grid>*/}

                            <Grid item xs={3} className='create-input'>
                                <TextField
                                    label="Employee Name"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.formData.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} className='create-input'>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.formData.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className='create-input'>
                                <TextField
                                    label="Contact No"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.formData.mobile}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className='create-input'>
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        className='input-inner'
                                        value={this.state.formData.role_id}
                                        fullWidth
                                        label="Role"
                                        inputProps={{ readOnly: true }}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {
                                            this.state.roleList.map((item, index) => {
                                                return <MenuItem value={item.id} key={index}>{item.display_name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} className='create-input'>
                                <TextField
                                    label="Weekly Holidays"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.formData.display_weekly_holidays}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                    </form>

                </Box>

                {
                    performance ?
                        <div className='calender-wrapper'>
                            <h2 className='employee-header-view'>Performance of the Month</h2>
                            <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                                <Grid container spacing={2} className='tax-input loans_view p_view'>
                                    <Grid item xs={12} md={4} className='create-input'>
                                        <Grid container spacing={1} className=''>
                                            <Grid item xs={12} className='create-input'>
                                                <b>Achieved</b>
                                            </Grid>
                                            <Grid item xs={6} md={12} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Sale Achieved"
                                                        variant="outlined"
                                                        value={performance.sale_achived_display}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end" className='i-icon-right'>{performance.sale_achived_percent_display}</InputAdornment>,
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Visit Achieved"
                                                        variant="outlined"
                                                        value={performance.visit_achived}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end" className='i-icon-right'>{performance.visit_achived_percent_display}</InputAdornment>,
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4} className='create-input'>
                                        <Grid container spacing={1} className=''>
                                            <Grid item xs={12} className='create-input'>
                                                <b>Remaining</b>
                                            </Grid>
                                            <Grid item xs={6} md={12} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Sale Remaining"
                                                        variant="outlined"
                                                        value={performance.sale_due_display}
                                                        InputProps={{
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={12} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Visit Remaining"
                                                        variant="outlined"
                                                        value={performance.visit_due}
                                                        InputProps={{
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4} className='create-input'>
                                        <Grid container spacing={1} className=''>
                                            <Grid item xs={12} className='create-input'>
                                                <b>Target</b>
                                            </Grid>
                                            <Grid item xs={6} md={12} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Sale Target"
                                                        variant="outlined"
                                                        value={performance.sale_target_display}
                                                        InputProps={{
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={6} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Visit Target"
                                                        variant="outlined"
                                                        value={performance.visit_target}
                                                        InputProps={{
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} md={6} className='create-input'>
                                                <FormControl fullWidth sx={{ m: 1 }} className='left-radius'>
                                                    <TextField
                                                        label="Incentive"
                                                        variant="outlined"
                                                        value={performance.incentive + "%"}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end" className='i-icon-right'>{performance.incentive ? (` > ${performance.sale_target_display}`) : ''}</InputAdornment>,
                                                            className: "non_disable_text"
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                        : null
                }


                <div className='employee-view-wrapper'>
                    <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-wrapper'>
                        <form autoComplete="off" className='ratn-dialog-inner'>
                            <Grid container spacing={2} className='loans_view p_view'>
                                <Grid item xs={6}>
                                    <h1>Salary Structure</h1>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1} direction="row" className='modal-button-area ratn-footer-buttons'>
                                        <Button variant="contained" className='conf-button' onClick={this.handleSubmit}>Add new</Button>
                                    </Stack>
                                </Grid>
                                <Grid item xs={2.4} className='create-input'>
                                    <TextField
                                        label="Gross"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.gross_salary}
                                        error={formErros.gross_salary}
                                        onChange={(event) => this.handleDefaultChange(event, 'gross_salary')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.4} className='create-input'>
                                    <TextField
                                        label="Basic Salary"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.basic_salary}
                                        error={formErros.basic_salary}
                                        onChange={(event) => this.handleDefaultChange(event, 'basic_salary')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Effective Date"
                                            inputFormat="DD/MM/YYYY"
                                            value={formValues.eff_date}
                                            error={formErros.eff_date}
                                            onChange={(newValue) => this.updateFormValues(newValue, 'eff_date')}
                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={2} className='create-input'>
                                    <FormControl fullWidth error={formErros.is_epf}>
                                        <InputLabel>EPF</InputLabel>
                                        <Select
                                            className='input-inner'
                                            value={formValues.is_epf}
                                            fullWidth
                                            label="EPF"
                                            onChange={(event) => this.handleDefaultChange(event, 'is_epf')}
                                        >
                                            <MenuItem value="0">Yes</MenuItem>
                                            <MenuItem value="1">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2.6} className='create-input'>
                                    <FormControl fullWidth error={formErros.is_medical}>
                                        <InputLabel>Medical</InputLabel>
                                        <Select
                                            className='input-inner'
                                            value={formValues.is_medical}
                                            fullWidth
                                            label="Medical"
                                            onChange={(event) => this.handleDefaultChange(event, 'is_medical')}
                                        >
                                            <MenuItem value="0">Yes</MenuItem>
                                            <MenuItem value="1">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="HRA Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.hra_percent}
                                        error={formErros.hra_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'hra_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="Convince Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.conv_percent}
                                        error={formErros.conv_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'conv_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="EPF Employee Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.epf_employee_percent}
                                        error={formErros.epf_employee_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'epf_employee_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="EPF Employeer Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.epf_employer_percent}
                                        error={formErros.epf_employer_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'epf_employer_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="Medical Employee Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.medical_employee_percent}
                                        error={formErros.medical_employee_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'medical_employee_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>
                                <Grid item xs={2} className='create-input'>
                                    <TextField
                                        label="Medical Employeer Percent"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.medical_employer_percent}
                                        error={formErros.medical_employer_percent}
                                        onChange={(event) => this.handleDefaultChange(event, 'medical_employer_percent')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                        InputLabelProps={{ shrink: true }}  
                                    />
                                </Grid>

                                <Grid item xs={2.4} className='create-input'>
                                    <TextField
                                        label="Target"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.target}
                                        error={formErros.target}
                                        onChange={(event) => this.handleDefaultChange(event, 'target')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            endAdornment: <InputAdornment position="end">/Month</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.4} className='create-input'>
                                    <TextField
                                        label="Visit Target"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.visit_target}
                                        error={formErros.visit_target}
                                        onChange={(event) => this.handleDefaultChange(event, 'visit_target')}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">/Month</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                {
                                    formValues.target ?
                                    <>
                                    <Grid item xs={2.6} className='create-input'>
                                        <TextField
                                            label="Incentive"
                                            variant="outlined"
                                            fullWidth
                                            value={formValues.incentive}
                                            error={formErros.incentive}
                                            onChange={(event) => this.handleDefaultChange(event, 'incentive')}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2} className='create-input'>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            value={` > ${displayAmount(formValues.target)}`}
                                            disabled
                                            className="non_disable_text"
                                        />
                                    </Grid>
                                    </>
                                    : null
                                }

                                <Grid item xs={2}>
                                    <Stack spacing={1} direction="row" className='modal-button-area ratn-footer-buttons'>
                                        <Button variant="contained" className='conf-button' onClick={this.handleSubmit}>Save</Button>
                                    </Stack>
                                </Grid>
                            </Grid>

                        </form>

                    </Box>
                </div>
                <Box sx={{ flexGrow: 1, m: 0.5 }} className='ratn-dialog-inner'>
                    <Grid container spacing={2} className='tax-input'>
                        <DataTable
                            columns={this.columns}
                            rows={this.state.salaries}
                            page={this.state.queryParams.page}
                            limit={this.state.queryParams.limit}
                            total={this.state.salaries.length}
                            handlePagination={this.handlePagination}
                            actions={this.tableActions}
                        />
                    </Grid>
                </Box>
                <br />
                {/*{
                    this.state.formData.role_id == 4 ?
                        <CalenderForm userId={this.state.formData.id} />
                        : null
                }*/}
                <CalenderForm userId={this.state.formData.id} />
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    salaries: state.superadmin.employeeSalary.items,
    actionCalled: state.superadmin.employeeSalary.actionCalled,
    createSuccess: state.superadmin.employeeSalary.createSuccess,
    editSuccess: state.superadmin.employeeSalary.editSuccess,
    successMessage: state.superadmin.employeeSalary.successMessage,
    errorMessage: state.superadmin.employeeSalary.errorMessage,
    roleList: state.superadmin.role.items,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({
        employeeSalaryList,
        employeeSalaryUpdate,
        employeeSalaryCreate,
        employeeSalaryFetch,
        roleList
    }, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeeEditForm)));
