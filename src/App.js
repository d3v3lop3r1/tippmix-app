import './App.css';
import 'semantic-ui-css/semantic.min.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import LoginForm from './components/login/LoginForm';
import Alert from './components/pages/layouts/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Route exact path='/' component={MainPage} />
          <Alert/>
          <Switch>
            <Route exact path='/login' component={LoginForm} />

          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
