import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    backgroundColor: 'red'
  }
}

class PostNew extends Component {
  render() {
    return (
      <div style={styles.base}>
        Hello
      </div>
    );
  }
}

export default Radium(PostNew);
