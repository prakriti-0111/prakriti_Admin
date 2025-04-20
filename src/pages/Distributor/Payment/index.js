import { React, Component } from 'react';
import { connect } from 'react-redux';
import {Box, TextField, Button, Grid, Link, TextareaAutosize, Stack,  Select, MenuItem, InputLabel, FormControl, FormHelperText, InputAdornment  } from '@mui/material';
import { bindActionCreators } from 'redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { paymentList, paymentStore } from 'actions/distributor/payment.actions';
import DataTable from 'src/utils/DataTable';
import {DISTRIBUTOR_RESET_PAYMENT} from '../../actionTypes/distributor/payment.types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {isEmpty} from 'src/helpers/helper';
import { withSnackbar } from 'notistack';

class PaymentPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            total: this.props.total,
            queryParams: {
                page: 1,
                limit: 50,
                date_from: null,
                date_to: null,
            },
            openDialog: false,
            due_amount: this.props.due_amount,
            ...this.defaultFormValues(),
            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,
            processing: false
        }
        this.columns = [
        {
            name: 'payment_to',
            display_name: 'Superadmin Name'
        },
        {
            name: 'amount',
            display_name: 'Amount'
        },
        {
            name: 'payment_mode',
            display_name: 'Payment Mode'
        },
        {
            name: 'payment_date',
            display_name: 'Payment Date'
        },
        {
            name: 'cheque_no',
            display_name: 'Cheque #'
        },
        {
            name: 'txn_id',
            display_name: 'Transaction #'
        }
        ];
        
    }

    componentDidMount(){
        this.loadListData();
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        if(props.items !== state.items){
            update.items = props.items;
        }

        if(props.total !== state.total){
            update.total = props.total;
        }
        if(props.due_amount !== state.due_amount){
            update.due_amount = props.due_amount;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.createSuccess !== state.createSuccess){
            update.createSuccess = props.createSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }

        return update;
    }

    componentDidUpdate(){
        if(this.state.actionCalled){
            if(this.state.createSuccess){
                this.props.enqueueSnackbar(this.state.successMessage, {variant: 'success'});
                this.setState({
                    processing: false,
                    openDialog: false,
                    ...this.defaultFormValues()
                });
                this.loadListData();
            }else{
                this.props.enqueueSnackbar(this.state.errorMessage, {variant: 'error'});
                this.setState({
                    processing: false
                });
            }
            this.props.dispatch({
                type: DISTRIBUTOR_RESET_PAYMENT
            });
        }
        
    }

    loadListData = () => {
        let data = {...this.state.queryParams};
        if(data.date_from){
            data.date_from = moment(data.date_from.toString()).format('YYYY-MM-DD')
        }
        if(data.date_to){
            data.date_to = moment(data.date_to.toString()).format('YYYY-MM-DD')
        }
        this.props.actions.paymentList(data);
    }

    handlePagination = (page) => {
        this.state.queryParams.page = page;
        this.loadListData();
    }

    updateQueryParams = (value, key) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                [key] : value
            }
        })
    }

    handleSearch = () => {
        this.loadListData();
    }

    handlePayNow = () => {
        this.setState({
            openDialog: true
        })
    }

    handleDialogClose = (event, reason) => {
        if(reason && reason == "backdropClick")return;
        this.setState({
            openDialog: false
        })
    }

    updateFormValue = (value, key) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                [key] : value
            }
        })
    }

    defaultFormValues = () => {
        return {
            formValues: {
                payment_mode: '',
                payment_date: moment().format('MM/DD/YYYY'),
                amount: '',
                notes: '',
                cheque_no: '',
                txn_id: ''
            },
            formErros: {
                payment_mode: false,
                payment_date: false,
                amount: false,
                notes: false,
                cheque_no: false,
                txn_id: false
            }
        }
    }

    handleSubmit = () => {
        if(!this.formValidate()){
            this.setState({
                processing: true
            });
            this.props.actions.paymentStore(this.state.formValues);
        }
    }

    formValidate = () => {
        let formValues = this.state.formValues;
        let formErros = this.state.formErros;
        let hasErr = false;
        if(isEmpty(formValues.amount)){
            formErros.amount = true;
            hasErr = true;
        }else{
            formErros.amount = false;
        }
        if(isEmpty(formValues.payment_mode)){
            formErros.payment_mode = true;
            hasErr = true;
        }else{
            formErros.payment_mode = false;
        }
        if(isEmpty(formValues.payment_date)){
            formErros.payment_date = true;
            hasErr = true;
        }else{
            formErros.payment_date = false;
        }
        this.setState({
            formErros: formErros
        })
        return hasErr;
    }

    render() {    
        const {formValues, formErros} = this.state;
        return (
        <MainCard title="Payments"  secondary={<Button variant="contained" onClick={this.handlePayNow}>Pay Now</Button>}>
            <Grid container spacing={gridSpacing} sx={{mb: 2}}>
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date From"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.queryParams.date_from}
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_from')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date To"
                            inputFormat="DD/MM/YYYY"
                            value={this.state.queryParams.date_to}
                            onChange={(newValue) => this.updateQueryParams(newValue, 'date_to')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} md={1} className='create-input button-right'>
                    <Button variant="contained" className='search-btn' onClick={this.handleSearch}>Search</Button>
                </Grid>
            </Grid>

            <Grid container spacing={gridSpacing}>
            <DataTable 
                columns={this.columns}
                rows={this.state.items}
                page={this.state.queryParams.page}
                limit={this.state.queryParams.limit}
                total={this.state.total}
                handlePagination={this.handlePagination}
            />
            </Grid>

            <Dialog
                className="ratn-dialog-wrapper"
                open={this.state.openDialog}
                onClose={this.handleDialogClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Pay Now
                </DialogTitle>
                <DialogContent>
                <DialogContentText></DialogContentText>
                    <Box sx={{ flexGrow: 1, m: 0.5 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Due Amount: {this.state.due_amount}
                            </Grid>
                            <Grid item xs={6} className='create-input'>
                                <TextField  
                                    label="Amount" 
                                    variant="outlined"
                                    fullWidth
                                    value={formValues.amount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                    error={formErros.amount}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'amount')}
                                />
                            </Grid>
                            <Grid item xs={6} className='p-invoice-date create-input'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Payment Date"
                                        value={formValues.payment_date}
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newValue) => this.updateFormValue(newValue, 'payment_date')}
                                        renderInput={(params) => <TextField {...params} fullWidth error={formErros.payment_date} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} className='create-input'>
                                <FormControl fullWidth error={formErros.payment_mode}>
                                    <InputLabel>Payment Mode</InputLabel>
                                    <Select
                                    className='input-inner'
                                        value={formValues.payment_mode}
                                        fullWidth
                                        label="Payment Mode"
                                        onChange={(event) => this.updateFormValue(event.target.value, 'payment_mode')}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="cheque">Cheque</MenuItem>
                                        <MenuItem value="imps_neft">NEFT/IMPS/UPI</MenuItem>
                                        <MenuItem value="online">Online</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                formValues.payment_mode == "cheque"?
                                <Grid item xs={6} className='create-input'>
                                    <TextField  
                                        label="Cheque No" 
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.cheque_no}
                                        onChange={(event) => this.updateFormValue(event.target.value, 'cheque_no')}
                                    />
                                </Grid>
                                : null
                            }
                            {
                                (formValues.payment_mode == "imps_neft" || formValues.payment_mode == "upi") ?
                                <Grid item xs={6} className='create-input'>
                                    <TextField  
                                        label="Transaction #" 
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.txn_id}
                                        onChange={(event) => this.updateFormValue(event.target.value, 'txn_id')}
                                    />
                                </Grid>
                                : null
                            }
                            <Grid item xs={6} className='create-input'>
                                <TextareaAutosize
                                    className='description'
                                    minRows={1}
                                    placeholder="Notes"
                                    style={{ width: '100%' }}
                                    value={formValues.notes}
                                    onChange={(event) => this.updateFormValue(event.target.value, 'notes')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" justifyContent="flex-end">
                                    <Button variant="contained" type="button" disabled={this.state.processing} onClick={this.handleSubmit}>
                                        {
                                            this.state.processing ? "Processing" : "Submit"
                                        }
                                    </Button>
                                    <Button variant="outlined" onClick={this.handleDialogClose}>Cancel</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </MainCard>
        );
    }
}

const mapStateToProps = (state) => ({
  items: state.distributor.payment.items,
  total: state.distributor.payment.total,
  due_amount: state.distributor.payment.due_amount,
  actionCalled: state.distributor.payment.actionCalled,
  createSuccess: state.distributor.payment.createSuccess,
  successMessage: state.distributor.payment.successMessage,
  errorMessage: state.distributor.payment.errorMessage
});

const mapDispatchToProps = dispatch => { 
  return {
    dispatch,
    actions: bindActionCreators({paymentList, paymentStore}, dispatch)
  }
};  


export default withSnackbar(withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentPage)));
