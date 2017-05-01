import React, { Component } from 'react';
import Radium from 'radium';
import Canvas from '../Canvas/Canvas'
import Menu from '../Menu/Menu'
import Hamburger from '../Hamburger/Hamburger';

const styles = {
  fixedBar: {
    width: '100%',
    height : '80px',
    position: 'fixed',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottom: '1px solid rgb(255, 255, 255)'
  },
  nonScrollBar: {
    borderColor: 'rgb(255, 255, 255)'
  },
  scrollBar: {
    borderColor: 'rgb(246, 246, 246)'
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    //ES6 classess no longer autobind this to nonReact methods (manually bind below)
    this.state = {
      navStyle : styles.fixedBar,
      burgerClick : false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleClick = () => {
    if (this.state.burgerClick) {
      this.setState({
        burgerClick : false
      });
    } else {
      this.setState({
        burgerClick : true
      });
    }
  }

  handleScroll= () => {
    if (document.body.scrollTop > 150) {
      this.setState({
        navStyle: styles.scrollBar
      });
    } else {
      this.setState({
        navStyle: styles.nonScrollBar
      });
    }
  }

  render() {
    return (
      <nav style={[styles.fixedBar, this.state.navStyle]}>
        <Canvas showCanvas={this.state.burgerClick} />
        <Menu showMenu={this.state.burgerClick} />
        <Hamburger onClick={this.handleClick} />
      </nav>
    );
  }
}

export default Radium(Navbar);
