import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  navbar: {
    width: '100%',
    height : '80px',
    position: 'fixed',
    transition: '0.5s'
  },
  greenBG: {
    backgroundColor: 'green'
  },
  redBG: {
    backgroundColor: 'red'
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    //ES6 classess no longer autobind this to nonReact methods (manually bind below)
    this.state = { navStyle : styles.greenBG}

    // This binding is necessary to make 'this' keyword work in the callback
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    console.log('here');
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    if (document.body.scrollTop > 70) {
      this.setState({
        navStyle: styles.redBG
      });
    } else {
      this.setState({
        navStyle: styles.greenBG
      });
    }
  }

  render() {
    return (
      <nav style={[styles.navbar, this.state.navStyle]} >Hello There</nav>
    );
  }
}

export default Radium(Navbar);
