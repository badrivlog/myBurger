import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';


class App extends Component {
  render() {
    return (
      <div>
      <Layout>
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
