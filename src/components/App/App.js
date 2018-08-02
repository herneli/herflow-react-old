import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import T from "i18n-react";
import PropTypes from "prop-types";
import { setSession, setLanguage, logoutGoogle } from "common/session/actions";
import { MuiThemeProvider } from "@material-ui/core/styles";
import WorkflowDev from "../Workflow";
import Layout from "./Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";

class App extends Component {
  componentWillMount() {
    this.props.onChangeLanguage(this.props.session.language);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route exact path="/" component={WorkflowDev} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  session: PropTypes.object.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    userSettings: state.app.userSettings,
    activeWorklfow: state.workflow.activeWorklfow
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginSuccess: token => {
      dispatch(setSession(token));
    },
    onLoginFailure: data => {
      if (data.errorCode === "EmailNotValid") {
        alert("Cuenta de google selecionada no válida");
      }
    },
    onLogout: () => {
      dispatch(logoutGoogle());
    },
    onChangeLanguage: language => {
      let texts = require("i18n/texts-" + language + ".json");
      T.setTexts(texts);
      dispatch(setLanguage(language));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
