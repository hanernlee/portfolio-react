import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '4px',
    position: 'fixed',
    right: '15px',
    top: '15px',
    zIndex: '1',

    '@media (min-width: 720px)': {
      right: '40px',
      top: '25px'
    }
  },
  burgerContainer: {
    height: '22px',
    position: 'relative',
    width: '24px'
  },
  burger: {
    backgroundColor: 'rgb(184, 184, 184)',
    height: '2px',
    left: '0px',
    position: 'absolute',
    transition: 'all 0.3s ease',
    width: '24px'
  },
  burgerTop: {
    top: '0px'
  },
  burgerMiddle: {
    top: '10px'
  },
  burgerBottom: {
    top: '20px',
    opacity: '1'
  }
}

class Hamburger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      burgerClick: true,
      hoverTopBurger: styles.burgerTop,
      hoverBottomBurger: styles.burgerBottom
    }

    this.handleClick = this.handleClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  handleClick() {
    if (this.state.burgerClick) {
      this.setState({
        burgerClick: false,
        hoverTopBurger:{
          top: '3px',
          transform: 'translateY(7px) rotate(-45deg)'
        },
        hoverMiddleBurger: {
          transform: 'rotate(45deg)'
        },
        hoverBottomBurger: {
          top: '17px',
          opacity: '0'
        }
      });
    } else {
      this.setState({
        burgerClick: true,
        hoverTopBurger:{
          top: '0px',
        },
        hoverMiddleBurger: {
          transform: 'rotate(0deg)'
        },
        hoverBottomBurger: {
          top: '20px',
          opacity: '1'
        }
      });
    }
  }

  onMouseOver() {
    if (this.state.burgerClick) {
      this.setState({
        hoverTopBurger: {
          top:'3px'
        },
        hoverBottomBurger: {
          top: '17px'
        }
      });
    }
  }

  onMouseOut() {
    if (this.state.burgerClick) {
      this.setState({
        hoverTopBurger: styles.burgerTop,
        hoverBottomBurger: styles.burgerBottom
      });
    }
  }

  render() {
    return (
        <button onClick={this.handleClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={styles.button}>
        <div style={styles.burgerContainer}>
          <div style={[styles.burger, this.state.hoverTopBurger]}></div>
          <div style={[styles.burger, this.state.hoverMiddleBurger, styles.burgerMiddle]}></div>
          <div style={[styles.burger, this.state.hoverBottomBurger]}></div>
        </div>
      </button>
    );
  }
}

export default Radium(Hamburger);
