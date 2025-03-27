import React from 'react';
import { connect } from 'react-redux';
import {Box, TextField, Button, Grid, Stack} from '@mui/material';
import { bindActionCreators } from 'redux';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { getAttendence, updateAttendence } from 'actions/se/profile.actions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { withSnackbar } from 'notistack';
import {isEmpty, toBase64} from 'src/helpers/helper';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import noImage from 'src/assets/images/no_image.jpg';

class AttendencePage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            calendar_value: new Date(),
            year: (new Date()).getFullYear(),
            month: ((new Date()).getMonth() + 1),
            attendance: {
                present: 0,
                absent: 0,
                days: []
            },
            dateDetails: null,
            openDialog: false,
            explanation_err: false,
            explanation: '',
            processing: false,
            image_file: null,
            existing_image: ''
        }
        this.imageFileRef = React.createRef();
    }

    componentDidMount(){
        this.loadAttendence();
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        
        return update;
    }

    handleMonthAndYearChange = ({ action, activeStartDate, value, view }) => {
        const year = activeStartDate.getFullYear();
        const month = activeStartDate.getMonth() + 1;
        this.setState({
            year: year,
            month: month
        }, () => {
            this.loadAttendence();
        })
    };

    onChange = (p) => {
        this.setState({
            calendar_value: p
        })
    }

    loadAttendence = async() => {
        let res = await getAttendence({month: this.state.month, year: this.state.year});
        if(res.data.success){
            this.setState({
                attendance: res.data.data
            })
        }
    }

    onClickDay = (value, event) => {
        let date = moment(value).format("YYYY-MM-DD");
        let data = this.state.attendance.days.find(x=> x.date == moment(date).format("YYYY-MM-DD"));
        if(data && data.status == "absent"){
            this.setState({
                dateDetails: data,
                openDialog: true,
                existing_image: data.image,
                explanation: data.late_reason
            })
        }
    }

    handleDialogClose = () => {
        this.setState({
            openDialog: false
        })
    }

    handleSubmit = async() => {
        if(!this.state.explanation){
            this.setState({
                explanation_err: true
            })
        }else{
            this.setState({
                explanation_err: false,
                processing: true
            })
            let data = {explanation: this.state.explanation, date: this.state.dateDetails.date};
            data.image = this.state.image_file ? await toBase64(this.state.image_file) : '';
            let res = await updateAttendence(data);
            if(res.data.success){
                this.props.enqueueSnackbar(res.data.message, { variant: 'success' });
                this.setState({
                    processing: false,
                    openDialog: false,
                    explanation: '',
                    image_file: null
                }, () => {
                    this.loadAttendence();
                })
            }else{
                this.props.enqueueSnackbar(res.data.message, { variant: 'error' });
                this.setState({
                    processing: false
                })
            }
        }
        
    }

    onChangeImage = (e) => {
        this.setState({
            image_file: e.target.files[0]
        })
    
        if (this.imageFileRef) {
          this.imageFileRef.current.value = null;
        }
    }

    getImageSrc = (item) => {
        return URL.createObjectURL(item);
    }

    handleImageBrowse = () => {
        if(this.state.dateDetails && this.state.dateDetails.can_edit){
            this.imageFileRef.current.click();
        }
    }

    render() {
        const {attendance, dateDetails} = this.state;
        return (
            <div>
                <div className='calender-wrapper'>
                    <MainCard title="Attendance of the Month">
                        <Calendar 
                            onChange={this.onChange} 
                            onActiveStartDateChange={this.handleMonthAndYearChange}
                            value={this.state.calendar_value}
                            tileClassName={({ date, view }) => {
                                let data = attendance.days.find(x=> x.date == moment(date).format("YYYY-MM-DD"));
                                if(data){
                                    return data.status;
                                }
                            }}
                            onClickDay={this.onClickDay}
                            goToRangeStartOnSelect={false}
                        />
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
                </div>
                
                <Dialog
                    className="ratn-dialog-wrapper"
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogContent>
                    <DialogContentText></DialogContentText>
                        {
                            dateDetails ? 
                            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} className='create-input pt-0'>
                                        <h4 className='m-0 text-center'>Absent</h4>
                                    </Grid>
                                    <Grid item xs={12} className='create-input text-center pt-5'>
                                        Employee was Absent
                                    </Grid>
                                    <Grid item xs={12} className='create-input pt-5'>
                                        <TextField  
                                            label="Explanation" 
                                            variant="outlined"
                                            fullWidth
                                            value={this.state.explanation}
                                            onChange={(event) => this.setState({
                                                explanation: event.target.value
                                            })}
                                            disabled={!dateDetails.can_edit}
                                            error={this.state.explanation_err}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className='create-input text-center pt-5'>
                                        {
                                            dateDetails.image ?
                                            <img src={dateDetails.image} style={{height: '100px', width: '100px', cursor: 'pointer'}} onClick={this.handleImageBrowse} />
                                            :
                                            <>
                                                {
                                                    this.state.image_file || this.state.existing_image ?
                                                    <img src={this.state.image_file ? this.getImageSrc(this.state.image_file) : this.state.existing_image} style={{height: '100px', width: '100px', cursor: 'pointer'}} onClick={this.handleImageBrowse}  />
                                                    :
                                                    <img src={noImage} style={{height: '100px', width: '100px', cursor: 'pointer'}} onClick={this.handleImageBrowse} />
                                                }
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={(e) => this.onChangeImage(e)}
                                                    ref={this.imageFileRef}
                                                />
                                            </>
                                        }
                                    </Grid>
                                    {
                                        dateDetails.can_edit ?
                                        <Grid item xs={12} className="text-center pt-5">
                                            <Stack spacing={1} direction="row" justifyContent="center">
                                                <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                                                    {
                                                        this.state.processing ? "Processing" : "Submit"
                                                    }
                                                </Button>
                                            </Stack>
                                        </Grid>
                                        : null
                                    }
                                </Grid>
                            </Box>
                            : null
                        }
                    </DialogContent>
                </Dialog>

            </div>
        );
    }

}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(AttendencePage)));