import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    transition: 'opacity 0.4s',
    position: 'relative',
    zIndex: '1'
  },
  canvasScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: '0px',
    left: '0px',
    position: 'fixed',
    right: '0px',
    top: '0px',
    zIndex: '1'
  },
  hide: {
    opacity: '0'
  },
  show: {
    opacitiy: '1'
  }
}

class Canvas extends Component {
  render() {
    var canvasStyle = this.props.showCanvas ? styles.show : styles.hide;

    return (
      <div style={[canvasStyle, styles.base]}>
        <div style={styles.canvasScreen}></div>
      </div>
    );
  }
}

export default Radium(Canvas);
