import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  burger: {
    backgroundColor: 'rgb(184, 184, 184)',
    height: '2px',
    left: '0px',
    position: 'absolute',
    transition: 'all 0.3s ease',
    width: '24px',
  },
  burgerNonHover: {
    top: '0px'
  },
  burgerHover: {
    top: '3px'
  },
  burgerClick: {
    top: '3px',
    transform: 'translateY(7px) rotate(-45deg)'
  }
}

class LayerTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var clickEffect = this.props.clickBurger ? styles.burgerClick : '';

    if (this.props.hoverBurger) {
      return (
        <div style={[styles.burger, clickEffect, styles.burgerHover]}></div>
      );
    } else {
      return (
        <div style={[styles.burger, clickEffect, styles.burgerNonHover]}></div>
      );
    }
  }
}

export default Radium(LayerTop);
