import React, { Component } from 'react';
import Radium from 'radium';
import LayerTop from './Layer/LayerTop';
import LayerMiddle from './Layer/LayerMiddle';
import LayerBottom from './Layer/LayerBottom';

const styles = {
  base: {
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
    if (this.props.onClick()) {
      this.setState({
        clicked: true
      });
    } else {
      this.setState({
        clicked: false
      });
    }
  }

  onMouseOver = () => {
    this.setState({
      hover: true
    });
  }

  onMouseOut = () => {
    this.setState({
      hover: false
    });
  }

  render() {
    return (
      <button onClick={this.handleClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} style={styles.base}>
        <div style={styles.burgerContainer}>
          <LayerTop clickBurger={this.props.showBurger} hoverBurger={this.state.hover}/>
          <LayerMiddle clickBurger={this.props.showBurger} />
          <LayerBottom clickBurger={this.props.showBurger} hoverBurger={this.state.hover}/>
        </div>
      </button>
    );
  }
}

export default Radium(Hamburger);
