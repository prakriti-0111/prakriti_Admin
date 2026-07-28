import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import withRouter from 'src/helpers/withRouter';
import { bindActionCreators } from 'redux';
import { companyDetailsList } from 'actions/superadmin/companyDetails.actions';
import CompanyDetailsForm from 'forms/SuperAdmin/CompanyDetailsForm';

class CompanyDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyData: this.props.companyData,
        };
    }

    componentDidMount() {
        this.props.actions.companyDetailsList();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.companyData !== state.companyData) {
            return { companyData: props.companyData };
        }
        return null;
    }

    render() {
        const { companyData } = this.state;
        return (
            <MainCard title="Company Details">
                {companyData === null ? (
                    <Grid container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <CompanyDetailsForm formData={companyData} />
                )}
            </MainCard>
        );
    }
}

const mapStateToProps = (state) => ({
    companyData: state.superadmin.companyDetails.data,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ companyDetailsList }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsPage));
