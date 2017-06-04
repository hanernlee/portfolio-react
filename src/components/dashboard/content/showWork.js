import React, { Component } from 'react';
import Radium from 'radium';
import { database } from '../../../config/config';

const styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  input: {
    flex: '1',
    padding: '11px'
  }
}

class ShowWork extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      image: '',
      demo: '',
      github: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    var workRef = database.ref('work/' + id);
    workRef.on('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        image: snapshot.val().image,
        demo: snapshot.val().demo,
        github: snapshot.val().github
      });
    });
  }

  componentWillUnmount() {
    database.ref('work/').off();
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
      [name]: value
     });
  }

  updateForm = (e) => {
    e.preventDefault();
    console.log(this.state);
    database.ref().child('/work/' + this.state.id)
      .update({
        title: this.state.title,
        image: this.state.image,
        demo: this.state.demo,
        github: this.state.github
      });
  }

  render() {
    const project = this.state;

    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Project</label>
            <input type="text" name="title" value={project.title} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Image</label>
            <input type="text" name="image" value={project.image} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Demo</label>
            <input type="text" name="demo" value={project.demo} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>GitHub</label>
            <input type="text" name="github" value={project.github} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button type="submit" onClick={this.updateForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Radium(ShowWork);
