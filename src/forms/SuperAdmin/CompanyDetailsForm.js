import React from 'react';
import { connect } from 'react-redux';
import {
    Box, Grid, TextField, Button, Stack, CircularProgress, Typography,
} from '@mui/material';
import { bindActionCreators } from 'redux';
import { companyDetailsUpdate, companyDetailsList } from 'actions/superadmin/companyDetails.actions';
import { RESET_COMPANY_DETAILS } from '../../actionTypes/superadmin/companyDetails.types';
import LoadingButton from '@mui/lab/LoadingButton';
import noImage from 'src/assets/images/no_image.jpg';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { withSnackbar } from 'notistack';

class CompanyDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            newLogoBase64: '',
            logo_preview: '',
            company_name: '',
            corporate_office_address: '',
            head_office_name: '',
            gst_no: '',
            address: '',
            email: '',
            phone: '',
            errors: {},
        };
        this.logoRef = React.createRef();
    }

    componentDidMount() {
        this.loadFromProps(this.props.formData);
    }

    componentDidUpdate(prevProps) {
        // populate form when data arrives or refreshes
        if (prevProps.formData !== this.props.formData) {
            this.loadFromProps(this.props.formData);
        }

        // handle save response — only when actionCalled flips to true
        if (!prevProps.actionCalled && this.props.actionCalled) {
            this.setState({ inProgress: false });

            if (this.props.editSuccess) {
                this.props.enqueueSnackbar(
                    this.props.successMessage || 'Saved successfully!',
                    { variant: 'success' }
                );
                // reload fresh data (new logo URL etc.)
                this.props.actions.companyDetailsList();
            } else {
                this.props.enqueueSnackbar(
                    this.props.errorMessage || 'Something went wrong.',
                    { variant: 'error' }
                );
            }

            // defer reset so this render cycle fully completes first
            setTimeout(() => {
                this.props.dispatch({ type: RESET_COMPANY_DETAILS });
            }, 0);
        }
    }

    loadFromProps = (d) => {
        if (!d) return;
        this.setState({
            newLogoBase64: '',
            logo_preview: d.logo || '',
            company_name: d.company_name || '',
            corporate_office_address: d.corporate_office_address || '',
            head_office_name: d.head_office_name || '',
            gst_no: d.gst_no || '',
            address: d.address || '',
            email: d.email || '',
            phone: d.phone || '',
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.setState({
                newLogoBase64: ev.target.result,
                logo_preview: ev.target.result,
            });
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    validate = () => {
        const errors = {};
        if (!this.state.company_name.trim()) errors.company_name = 'Required';
        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = () => {
        if (!this.validate()) return;
        this.setState({ inProgress: true });
        const {
            newLogoBase64,
            company_name,
            corporate_office_address,
            head_office_name,
            gst_no,
            address,
            email,
            phone,
        } = this.state;

        this.props.actions.companyDetailsUpdate({
            logo: newLogoBase64,   // empty = keep existing on server
            company_name,
            corporate_office_address,
            head_office_name,
            gst_no,
            address,
            email,
            phone,
        });
    };

    render() {
        const {
            inProgress,
            logo_preview,
            company_name,
            corporate_office_address,
            head_office_name,
            gst_no,
            address,
            email,
            phone,
            errors,
        } = this.state;

        return (
            <Box sx={{ flexGrow: 1, m: 0.5 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Company Logo</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img
                                src={logo_preview || noImage}
                                alt="Company Logo"
                                style={{
                                    height: 80,
                                    width: 'auto',
                                    objectFit: 'contain',
                                    border: '1px solid #ddd',
                                    borderRadius: 4,
                                    padding: 4,
                                }}
                            />
                            <Button
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                onClick={() => this.logoRef.current.click()}
                            >
                                Upload Logo
                            </Button>
                            <input
                                ref={this.logoRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={this.handleLogoChange}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="company_name"
                            value={company_name}
                            onChange={this.handleChange}
                            error={!!errors.company_name}
                            helperText={errors.company_name || ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Corporate Office Address"
                            name="corporate_office_address"
                            value={corporate_office_address}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Head Office Name"
                            name="head_office_name"
                            value={head_office_name}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="GST No"
                            name="gst_no"
                            value={gst_no}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            {inProgress ? (
                                <CircularProgress size={30} />
                            ) : (
                                <LoadingButton variant="contained" onClick={this.handleSubmit}>
                                    Save
                                </LoadingButton>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    actionCalled: state.superadmin.companyDetails.actionCalled,
    editSuccess: state.superadmin.companyDetails.editSuccess,
    successMessage: state.superadmin.companyDetails.successMessage,
    errorMessage: state.superadmin.companyDetails.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ companyDetailsUpdate, companyDetailsList }, dispatch),
});

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsForm));
