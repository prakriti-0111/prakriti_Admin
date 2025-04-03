import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import noImage from 'src/assets/images/no_image.jpg';
import { Box, TextField, Button, Grid, Stack, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { bindActionCreators } from 'redux';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { withSnackbar } from 'notistack';
import { getAttendence, getAttendenceDetails, attendanceUpdate, attendanceList } from 'actions/superadmin/expense.actions';
import { isEmpty } from 'src/helpers/helper';
import moment from 'moment';
import _ from 'lodash';
import DataTable from 'src/utils/DataTable';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { gridSpacing } from 'store/constant';

let CalenderForm = props => {
    const { handleSubmit, pristine, submitting, enqueueSnackbar, userId } = props;
    const [value, onChange] = useState(new Date());
    const [attendance, setAttendance] = useState({ attendance: { present: 0, absent: 0, days: [] } });
    const [openDialog, handleDialog] = useState(false);
    const [existingAttendance, setExistingAttendance] = useState({ existingAttendance: {} });
    const [attendenceListData, setAttendenceListData] = useState({ items: [], total: 0, page: 1, limit: 15 });
    const [tabValue, setTabValue] = React.useState('1');

    // default list fetching
    useEffect(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        getAttendenceList(year, month, userId);
        setAttendenceListData({
            ...attendenceListData,
            page: 1
        })
    }, [userId])

    useEffect(() => {
        loadAttendenceList();
    }, [attendenceListData.page])


    // Function to handle selected Year change
    const handleMonthAndYearChange = (event) => {
        const year = event.activeStartDate.getFullYear();
        const month = event.activeStartDate.getMonth() + 1;
        getAttendenceList(year, month, userId);
    };

    // Function to handle Day
    const handleClickDay = (event) => {
        let formatted_date = moment(event).format('YYYY-MM-DD');
        getAttendance(formatted_date, userId);
    };

    // Function to close dialog
    const handleDialogClose = () => {
        handleDialog(false);
        setExistingAttendance({});
    }

    // Function to get attendence list 
    const getAttendenceList = async (year, month, userId) => {
        let params = {
            year: year,
            month: month,
            user_id: userId
        };
        let res = await getAttendence(params);

        if (res.data.success) {
            let attendance_data = res.data.data;
            setAttendance(attendance_data);
        }
    }

    // Function to get attendence details 
    const getAttendance = async (formatted_date, userId) => {
        let params = {
            date: formatted_date,
            user_id: userId
        };
        let res = await getAttendenceDetails(params);
        if (res.data.success) {
            let attendance_data = res.data.data;
            setExistingAttendance(attendance_data);
            handleDialog(true);
        } else {
            props.enqueueSnackbar('Does not login.', { variant: 'error' });
        }
    }

    // Function to update attendence details 

    const handleFormSubmit = async (id, data) => {
        let res = await attendanceUpdate(id, { status: data.status });

        if (res.data.success) {
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;
            getAttendenceList(year, month, userId);
            enqueueSnackbar(res.data.message, { variant: 'success' });
            handleDialogClose();
        }
    }

    const loadAttendenceList = () => {
        attendanceList({ page: attendenceListData.page, limit: attendenceListData.limit, user_id: userId })
            .then(res => {
                if (res.data.success) {
                    setAttendenceListData({
                        ...attendenceListData,
                        items: res.data.data.items,
                        total: res.data.data.total
                    })
                }
            })
    }
    const handlePagination = (page) => {
        setAttendenceListData({
            ...attendenceListData,
            page: page
        })
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }


    return (
        <div className='calender-wrapper'>

            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Calendar" value="1" />
                        <Tab label="List" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <MainCard title="Attendance of the Month">
                        <Calendar
                            onChange={onChange}
                            onActiveStartDateChange={handleMonthAndYearChange}
                            onClickDay={handleClickDay}
                            value={value}
                            tileClassName={({ date }) => {
                                let formatted_date = moment(date).format('YYYY-MM-DD');
                                let days = attendance.days;
                                let status_arr = _.map(_.filter(days, { date: formatted_date }), 'status');
                                let status = '';
                                if (status_arr.length > 0) {
                                    status = status_arr[0];

                                    if (!isEmpty(status)) {
                                        return (status == 'present') ? 'is_present' : 'is_absent';
                                    }
                                }
                                else {
                                    return 'not_calendar_date';
                                }
                            }
                            }
                        />
                        <Dialog
                            className="ratn-dialog-wrapper"
                            open={openDialog}
                            onClose={handleDialogClose}
                            fullWidth
                            maxWidth="md"
                        >
                            <DialogTitle>
                                {
                                    existingAttendance.status == 'absent' ?
                                    <span>Make Present</span>
                                    :
                                    <span>Make Absent</span>
                                }
                                {/*{
                                    <span>{existingAttendance.display_status}</span>
                                }*/}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText></DialogContentText>
                                <form>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} className='create-input'>
                                                <TextField
                                                    label="Explanation"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.explanation}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className='create-input'>
                                                <TextField
                                                    label="City"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.city}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className='create-input'>
                                                <TextField
                                                    label="State"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.state}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className='create-input'>
                                                <TextField
                                                    label="Country"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.country}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className='create-input'>
                                                <TextField
                                                    label="Date"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.display_date}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className='create-input'>
                                                <TextField
                                                    label="Time"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={existingAttendance.display_time}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                                {
                                                    existingAttendance.attendence_address && existingAttendance.attendence_address.login ?
                                                        <>
                                                            {
                                                                existingAttendance.attendence_address && existingAttendance.attendence_address.login ?
                                                                    <p><b>Login:</b> <a href={"http://maps.google.com/?ll=" + existingAttendance.attendence_address.login.lat + ',' + existingAttendance.attendence_address.login.lng} target="_blank">{existingAttendance.attendence_address.login.address}</a></p>
                                                                    : null
                                                            }
                                                            {
                                                                existingAttendance.attendence_address && existingAttendance.attendence_address.logout ?
                                                                    <p><b>Logout:</b> <a href={"http://maps.google.com/?ll=" + existingAttendance.attendence_address.logout.lat + ',' + existingAttendance.attendence_address.logout.lng} target="_blank">{existingAttendance.attendence_address.logout.address}</a></p>
                                                                    : null
                                                            }
                                                        </>
                                                        : null
                                                }
                                            </Grid>
                                            {
                                                (!isEmpty(existingAttendance.image)) ?
                                                    <Grid item xs={2} className='create-input'>
                                                        <img src={existingAttendance.image} id="logo-img" style={{ height: '100px', width: '100px' }} />
                                                    </Grid>
                                                    :
                                                    <Grid item xs={2} className='create-input'>
                                                        <img src={noImage} id="logo-img" style={{ height: '100px', width: '100px' }} />
                                                    </Grid>
                                            }
                                        </Grid>
                                        <Stack spacing={1} mt={2} direction="row" className='modal-button-area'>
                                            {
                                                (existingAttendance.status == 'absent') ?
                                                    <Button variant="contained" onClick={() => handleFormSubmit(existingAttendance.id, existingAttendance)}>Make Present</Button>
                                                    :
                                                    <Button variant="contained" onClick={() => handleFormSubmit(existingAttendance.id, existingAttendance)}>Make Absent</Button>
                                            }
                                            {<Button variant="outlined" onClick={() => handleDialogClose()}>Cancel</Button>}
                                        </Stack>
                                    </Box>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </MainCard>
                    <div className='presence-wrapper'>
                        <ul>
                            <li>
                                <p className='para-1'><span></span>{attendance.present} Present</p>
                            </li>
                            <li>
                                <p></p>
                                <p className='para-2'><span></span>{attendance.absent} Absent</p>
                            </li>
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <Grid container spacing={gridSpacing} className='orders-sale-button'>
                        <DataTable
                            columns={[
                                {
                                    name: 'date_time',
                                    display_name: 'Date'
                                },
                                {
                                    name: 'type',
                                    display_name: 'Login/Logout'
                                },
                                {
                                    name: 'address',
                                    display_name: 'Address',
                                    redirectToMap: true
                                }
                            ]}
                            rows={attendenceListData.items}
                            page={attendenceListData.page}
                            limit={attendenceListData.limit}
                            total={attendenceListData.total}
                            handlePagination={handlePagination}
                            actions={[]}
                        />
                    </Grid>
                </TabPanel>
            </TabContext>


        </div>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({
        attendanceUpdate
    }, dispatch)
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'CalenderForm'
})(CalenderForm))));
