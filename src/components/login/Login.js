import React, { Component } from 'react'
import Radium from 'radium';
import { Redirect } from 'react-router';
import { firebaseAuth } from '../../config/config';

const styles = {
  base: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  input: {
    padding: '11px',
    margin: '5px',
    width: '200px',
    height: '13px',

    ":focus": {
      outline: 'none'
    }
  },
  button: {
    margin: '5px',
    padding: '0',
    width: '226px',
    height: '37px',
    backgroundColor: 'white',
    outline: 'none',
    border: '1px solid white',
    transition: 'all 0.3s ease',

    ":hover": {
      border: '1px solid rgb(184,184,184)'
    }
  }
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    firebaseAuth().signInWithEmailAndPassword(this.email.value, this.pw.value).then(() => {
      this.setState({
        loggedIn: true
      })
    });
  }

  render () {
    const user = this.state.user;
    return (
      <div style={styles.base}>
        {user && (<Redirect to="/dashboard" />)}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input key="email" style={styles.input} ref={(email) => this.email = email} />
          </div>
          <div>
            <input key="password" style={styles.input} type="password" ref={(pw) => this.pw = pw} />
          </div>
          <div>
            <button style={styles.button} type="submit"></button>
          </div>
        </form>
      </div>
    )
  }
}

export default Radium(Login);
