import React, { Component } from 'react';
import Radium from 'radium';
import { Switch, Route, Link } from 'react-router-dom';
import PostNew from '../content/postNew';

const styles = {
  base: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    position: 'absolute',
    transition: 'all 0.3s ease',
    left: '0',
    width:'70%',
    minHeight: 'calc(100vh - 60px)',
    overflowY: 'scroll',

    '@media (min-width: 720px)': {
      minHeight: 'calc(100vh - 80px)'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '50px',
    width: '100%',
    marginTop: '50px'
  },
  button: {
    padding: '16px 50px',
    margin: '0 10px',
    border: '1px solid rgb(184, 184, 184)',
    color: 'rgb(184, 184, 184)',
    transition: 'all 0.4s ease',

    ":hover": {
      backgroundColor: 'rgb(184,184,184)',
      color: 'white'
    }
  },
  selected: {
    backgroundColor: 'rgb(184,184,184)',
    color: 'white'
  },
  links: {
    textDecoration: 'none'
  },
  content: {
    marginTop: '50px',
    paddingLeft: '25px',
    paddingRight: '25px',

    '@media (min-width: 720px)': {
      paddingLeft: '40px',
      paddingRight: '40px'
    }
  }
}

class DisplayDashboard extends Component {
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.buttonContainer}>
          <Link style={styles.links} to="/dashboard/post/new">
            <div key="post" style={styles.button}>Post</div>
          </Link>
          <div key="work" style={styles.button}>Work</div>
        </div>
        <div style={styles.content}>
          <Switch>
            <Route path="/dashboard/post/new" component={PostNew} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Radium(DisplayDashboard);
