import React, { Component } from 'react';
import Radium from 'radium';
import { database, storage } from '../../../config/config';

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
      github: '',
      file: '',
      value: 0
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    database.ref('/work/' + id).on('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        image: snapshot.val().image,
        demo: snapshot.val().demo,
        github: snapshot.val().github
      });
    });
    this.props.toggleType('work');
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    database.ref('/work/' + id).off();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    database.ref('/work/' + id).once('value', snapshot => {
      this.setState({
        id: snapshot.val().id,
        title: snapshot.val().title,
        image: snapshot.val().image,
        demo: snapshot.val().demo,
        github: snapshot.val().github
      });
    });
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = e.target.value
    const name = target.name;
    this.setState({
      [name]: value
     });
  }

  handleFileUpload = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  uploadImage = (e) => {
    e.preventDefault();

    const file = this.state.file;
    console.log(file);
    var storageRef = storage.ref('work/' + file.name);
    var task = storageRef.put(file);

    task.on('state_changed', (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          value: percentage,
          image: task.snapshot.downloadURL
        });
      }
    )
  }

  updateForm = (e) => {
    e.preventDefault();

    database.ref('/work/' + this.state.id)
      .update({
        title: this.state.title,
        image: this.state.image,
        demo: this.state.demo,
        github: this.state.github
      });
    database.ref('/work/' + this.state.id).off();
  }

  render() {
    const project = this.state;
    const value = this.state.value;
    const bgImage =  {
      backgroundImage: `url(${project.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0px 0px',
      height: '250px',
      width: '100%'
    }

    if (!project.title) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <form>
          <div style={styles.base}>
            <label>Project</label>
            <input type="text" name="title" value={project.title} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>Replace Image</label>
            <div style={bgImage}></div>
            <input type="file" name="image" onChange={this.handleFileUpload} style={styles.input} />
            <progress value={value} max="100"></progress>
            <button onClick={this.uploadImage}>Upload</button>
          </div>
          <div style={styles.base}>
            <label>Demo</label>
            <input type="text" name="demo" value={project.demo} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <div style={styles.base}>
            <label>GitHub</label>
            <input type="text" name="github" value={project.github} onChange={this.handleInputChange} style={styles.input}/>
          </div>
          <button type="submit" onClick={this.updateForm}>Update</button>
        </form>
      </div>
    );
  }
}

export default Radium(ShowWork);
