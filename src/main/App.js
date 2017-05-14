import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { firebaseAuth } from '../config/config';
import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Work from '../components/work/Work';
import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';

const storageKey = 'KEY_FOR_LOCAL_STORAGE';

const isAuthenticated = () => {
  if (!firebaseAuth().currentUser) {
    let hasLocalStorageUser = false;
    for (let key in localStorage) {
      if (key.startsWith("firebase:authUser:")) {
        hasLocalStorageUser = true;
      }
    }
    return hasLocalStorageUser;
  }
  return true;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({user: user});
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({user: null});
      }
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
            <Navbar user={user}/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/work" component={Work} />
                <Route path="/contact" />
                <Route path="/login" render={() => (
                  isAuthenticated() ? (<Redirect to="/dashboard"/>) : (<Login />)
                )}/>
                <Route path="/dashboard" render={() => (
                  isAuthenticated() ? (<Dashboard />) : (<Redirect to="/login"/>)
                )}/>
              </Switch>
          </div>
        </BrowserRouter>
      </StyleRoot>
    )
  }
}

export default App;
