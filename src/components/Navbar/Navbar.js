import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import Canvas from '../canvas/Canvas'
import Menu from '../menu/Menu'
import Hamburger from '../hamburger/Hamburger';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '25px',
    position: 'fixed',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottom: '1px solid rgb(246, 246, 246)',
    height: 'inherit',
    zIndex: '1',
    '@media (min-width: 720px)': {
      paddingLeft: '40px'
    }
  },
  name: {
    color: 'rgb(144, 144, 144)',
    fontWeight: '400',
    fontSize: '16px',
    letterSpacing: '0.1px',
    '@media (min-width: 720px)': {
      fontSize: '20px',
      letterSpacing: '0.2px',
    }
  },
  links: {
    textDecoration:'none'
  },
  height: {
    height: '60px',
    '@media (min-width: 720px)': {
      height: '80px',
    }
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

    this.state = {
      navStyle : styles.fixedBar,
      burgerClick : false
    }
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll)
  }

  handleClick = () => {
    this.props.toggleNav(this.state.burgerClick);
    if (this.state.burgerClick) {
      this.setState({
        burgerClick : false
      });
      return false;
    } else {
      this.setState({
        burgerClick : true
      });
      return true;
    }
  }

  handleScroll= () => {
    // if (document.body.scrollTop > 60) {
    //   this.setState({
    //     navStyle: styles.scrollBar
    //   });
    // } else {
    //   this.setState({
    //     navStyle: styles.nonScrollBar
    //   });
    // }
  }

  render() {
    const user = this.props.user;

    return (
      <div>
        <div style={styles.height}>
          <div style={[styles.base, this.state.navStyle]}>
            <Link style={styles.links} to="/">
              <div style={styles.name}>christopher lee</div>
            </Link>
            <Canvas onClick={this.handleClick} showCanvas={this.state.burgerClick} />
            <Menu onClick={this.handleClick} showMenu={this.state.burgerClick} user={user} />
            <Hamburger onClick={this.handleClick} showBurger={this.state.burgerClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Navbar);
