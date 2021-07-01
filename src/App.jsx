import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
import * as Containers from './containers';
import * as Components from './components';
import '../src/assets/styles/App.less'

const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Components.MainLayout>
            <Route exact path="/" component={Containers.Dashboard} />
          </Components.MainLayout>
        </Switch>
      </BrowserRouter>
    )
};

export default App;