import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    backgroundColor: 'rgb(184, 184, 184)',
    height: '2px',
    left: '0px',
    position: 'absolute',
    transition: 'all 0.3s ease',
    width: '24px',
    opacity: '1',
    top: '20px'
  },
  burgerHover: {
    top: '17px'
  },
  burgerClick: {
    opacity: '0'
  }
}

class LayerBottom extends Component {
  render() {
    var clickEffect = this.props.clickBurger ? styles.burgerClick : '';

    if (this.props.hoverBurger) {
      return (
        <div style={[styles.base, clickEffect, styles.burgerHover]}></div>
      );
    } else {
      return (
        <div style={[styles.base, clickEffect]}></div>
      );
    }
  }
}

export default Radium(LayerBottom);
