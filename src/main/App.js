import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { firebaseAuth, isAuthenticated } from '../config/config';
import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Work from '../components/work/Work';
import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';

const storageKey = 'KEY_FOR_LOCAL_STORAGE';

const styles = {
  hide: {
    minHeight: '100vh',
    left: '0px',
    paddingBottom: '60px',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',

    '@media (min-width: 720px)': {
      paddingBottom: '80px'
    }
  },

  show: {
    minHeight: '100vh',
    left: '-200px',
    paddingBottom: '60px',
    position: 'relative',
    transition: 'left 1.2s cubic-bezier(0.43, 0.17, 0.28, 0.99)',

    '@media (min-width: 720px)': {
      left: '-300px',
      paddingBottom: '80px'
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      projects: [],
      style: styles.hide
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

  toggleNav = (event) => {
    if (!event) {
      this.setState({
        style: styles.show
      })
    } else {
      this.setState({
        style: styles.hide
      })
    }
  }

  render() {
    const user = this.state.user;

    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Navbar toggleNav={this.toggleNav} user={user}/>
              <div style={this.state.style}>
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
          </div>
        </BrowserRouter>
      </StyleRoot>
    )
  }
}

export default App;
