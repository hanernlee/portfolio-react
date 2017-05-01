import React, { Component } from 'react';
import Radium from 'radium';
import LayerTop from './Layer/LayerTop';
import LayerMiddle from './Layer/LayerMiddle';
import LayerBottom from './Layer/LayerBottom';

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
  }
}

class Hamburger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      hover: false
    }
  }

  handleClick = () => {
    this.props.onClick();
    if (this.state.clicked) {
      this.setState({
        clicked: false
      });
    } else {
      this.setState({
        clicked: true
      });
    }
  }

  onMouseOver = () => {
    if (!this.state.clicked) {
      this.setState({
        hover: true
      });
    }
  }

  onMouseOut = () => {
    if (!this.state.clicked) {
      this.setState({
        hover: false
      });
    }
  }

  render() {
    return (
        <button onClick={this.handleClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={styles.button}>
        <div style={styles.burgerContainer}>
          <LayerTop clickBurger={this.state.clicked} hoverBurger={this.state.hover}/>
          <LayerMiddle clickBurger={this.state.clicked} />
          <LayerBottom clickBurger={this.state.clicked} hoverBurger={this.state.hover}/>
        </div>
      </button>
    );
  }
}

export default Radium(Hamburger);
