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
    top: '10px'
  },
  burgerClick: {
    transform: 'rotate(45deg)'
  }
}

class LayerMiddle extends Component {
  render() {
    var clickEffect = this.props.clickBurger ? styles.burgerClick : '';

    return (
      <div style={[styles.burger, clickEffect]}></div>
    );
  }
}

export default Radium(LayerMiddle);
