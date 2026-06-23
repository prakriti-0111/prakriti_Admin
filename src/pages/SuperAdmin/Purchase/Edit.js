import { React, Component } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Avatar,
  CssBaseline,
  Link,
  Box,
  Typography,
  Container,
  Alert,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import PurchaseForm from "forms/SuperAdmin/PurchaseForm";
import { bindActionCreators } from "redux";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import withRouter from "src/helpers/withRouter";
import { withSnackbar } from "notistack";
import { RESET_PURCHASE } from "../../../actionTypes/superadmin/purchase.types";
import { purchaseEdit } from "actions/superadmin/purchase.actions";

class PurchaseEditPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      purchase: null,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: RESET_PURCHASE });
    this.props.actions.purchaseEdit(this.state.id);
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.purchase !== state.purchase) {
      update.purchase = props.purchase;
    }

    return update;
  }

  render() {
    const purchaseType =
      (this.state.purchase &&
        (this.state.purchase.type ||
          this.state.purchase.purchase_type ||
          this.state.purchase.purchaseType)) ||
      "product";

    return (
      <MainCard title="Edit Purchase">
        <div>
          {this.state.purchase ? (
            <>
              {this.state.purchase.created_myself &&
              this.state.purchase.is_approved == 0 ? (
                <PurchaseForm
                  key={`${this.state.id}-${purchaseType}`}
                  formData={this.state.purchase}
                />
              ) : (
                <div>
                  <Alert variant="filled" severity="error">
                    You can't edit this purchase.
                  </Alert>
                </div>
              )}
            </>
          ) : (
            <Grid container justifyContent="center">
              <CircularProgress size="30px" />
            </Grid>
          )}
        </div>
      </MainCard>
    );
  }
}

const mapStateToProps = (state) => ({
  purchase: state.superadmin.purchase.purchase,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      purchaseEdit,
    },
    dispatch,
  ),
});

export default withSnackbar(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseEditPage)),
);
