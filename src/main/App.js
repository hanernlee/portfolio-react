import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { firebaseAuth } from '../config/config';
import PrivateRoute from '../config/PrivateRoute';
import PublicRoute from '../config/PublicRoute';
import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Work from '../components/work/Work';
import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      this.setState({user});
    });
  }

  componentWillUnmount() {
    firebaseAuth().onAuthStateChanged((user) => {
      this.setState({user});
    });
  }

  render() {
    const user = this.state.user;

    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Navbar user={user} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/work" component={Work} />
                <PublicRoute path="/login" component={Login} user={user} />
                <PrivateRoute path="/dashboard" component={Dashboard} user={user} />
              </Switch>
          </div>
        </BrowserRouter>
      </StyleRoot>
    )
  }
}

export default App;
