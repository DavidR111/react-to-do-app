import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard'
import NewTodo from './Components/Todos/NewTodo'
import UpdateTodo from './Components/Todos/UpdateTodo'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div className='app' >
            <h1> React Todo App </h1>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/:id/update/' component={UpdateTodo} />
              <Route path='/create' component={NewTodo} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;