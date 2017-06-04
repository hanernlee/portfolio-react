import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { database } from '../../../config/config';

const styles = {
  base: {
    display: 'flex',
    flex: '1 1 auto',
    width:'30%',
    minHeight: 'calc(100vh - 60px)',
    borderLeft: '1px solid rgb(246, 246, 246)',
    transition: 'all 0.3s ease',
    position: 'absolute',
    right: '0',
    overflowY: 'scroll',

    '@media (min-width: 720px)': {
      minHeight: 'calc(100vh - 80px)'
    }
  },
  list: {
    margin: '0 auto',
    width: '90%',
    textAlign: 'center',
    position: 'relative'
  },
  postTitle: {
    position: 'absolute',
    top:'30%',
    left:'50%',
    transform: 'translateX(-50%)'
  }
}

class DisplayMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      work: null,
      post: null

    }
  }

  componentDidMount() {
    database.ref('/work/').on('value', snapshot => {
      this.setState({
        work: snapshot.val()
      });
    });
    database.ref('/post/').on('value', snapshot => {
      this.setState({
        post: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    database.ref('work').off();
    database.ref('post').off();
  }

  render() {
    const work = this.state.work;
    const post = this.state.post;

    return (
      <div style={styles.base}>
        <div style={styles.list}>
          <div style={styles.postTitle}>
            <div>
              <h4>Work</h4>
              {work && Object.keys(work).map((key, index) =>
                <Link key={work[key].id} to={`/dashboard/work/${work[key].id}`}>
                  <div>
                    <span>{work[key].title}</span>
                  </div>
                </Link>
              )}
            </div>
            <div>
              <h4>Post</h4>
              {post && Object.keys(post).map((key, index) =>
                <Link key={post[key].id} to={`/dashboard/post/${post[key].id}`}>
                  <div>
                    <span>{post[key].title}</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(DisplayMenu);
