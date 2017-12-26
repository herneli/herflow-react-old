import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import T from 'i18n-react';
import PropTypes from 'prop-types';
import { setSession, setLanguage, logoutGoogle } from '../../common/session/actions';
import Layout from '../Layout/Layout';
import Workflow from '../Worfklow/Workflow';

class App extends Component {

    componentWillMount() {
        this.props.onChangeLanguage(this.props.session.language);
    }

    render() {

        return (
            // <Layout
            //     onChangeLanguage={this.props.onChangeLanguage}
            //     onRefresh={this.props.onRefresh}>
                <Switch>
                    <Route exact path="/" component={Workflow} />
                </Switch>
            //</Layout>
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
        onLoginSuccess: (token) => {
            dispatch(setSession(token));
        },
        onLoginFailure: (data) => {
            if (data.errorCode === 'EmailNotValid') {
                alert('Cuenta de google selecionada no válida');
            }
        },
        onLogout: () => {
            dispatch(logoutGoogle())
        },
        onChangeLanguage: (language) => {
            let texts = require('../../i18n/texts-' + language + '.json'); 
            T.setTexts(texts);
            dispatch(setLanguage(language));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
