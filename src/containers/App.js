import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import localforage from 'localforage';

import { Signin, Signup } from './auth';
import { autoLogin } from '../actions';

import { Header } from '../components';
import { AddShop, AddProducts, Result, FranchiseList, Main } from './main';

class App extends Component {
  componentDidMount = () => {
    localforage.getItem('userInfo').then(userInfo => {
      if (userInfo) {
        this.props.autoLogin(userInfo);
      }
    });
  };

  componentWillReceiveProps = () => {
    this.props.changeRoute(this.props.history.location);
  };

  _renderHeader = () => {
    switch (window.location.pathname) {
      case '/auth/signin':
      case '/auth/signup':
      case '/franchise/list':
      case '/result':
      case '/':
        return null;
      default:
        return <Header />;
    }
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this._renderHeader()}
        <Route exact path="/" component={Main} />
        <Route exact path="/auth/signin" component={Signin} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/franchise/list" component={FranchiseList} />
        <Route exact path="/franchise/addShop" component={AddShop} />
        <Route
          exact
          path="/franchise/setShop/:shopSequence"
          render={props => <AddShop editMode {...props} />}
        />
        <Route exact path="/franchise/addProducts" component={AddProducts} />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeRoute: location => dispatch({ type: 'LOCATION_CHANGE', location }),
  autoLogin: userInfo => dispatch(autoLogin(userInfo)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(App));
