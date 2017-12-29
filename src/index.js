import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/App';
import sessionReducer from './common/session/reducer';
import workflowReducer from './components/workflow/redux/reducer';
import appReducer from './components/app/redux/reducer';
// Reducers
let rootReducer = combineReducers({
  app: appReducer,
  session: sessionReducer,
  workflow: workflowReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, 
    composeEnhancers(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
</Provider>, document.getElementById('root'));