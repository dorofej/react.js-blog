/* eslint-disable import/first */
const l = require('../../utils/log')(module);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Modal from 'react-modal';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import Spinner from '../../components/Spinner';

import storage from '../../libs/storage';

import { fetchComments, addComment } from '../../store/comments/actions';
import { fetchUser } from '../../store/user/actions';

import './styles.less';

class Post extends Component {
  constructor(props) {
    l();

    super(props);

    this.handleCommentInputChange = this.handleCommentInputChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.openMapModal = this.openMapModal.bind(this);
    this.closeMapModal = this.closeMapModal.bind(this);

    this.state = {
      comment: storage('comment'),
      isMapVisible: false,
    };
  }

  componentDidMount() {
    l();

    const { fetchComments, match } = this.props;
    fetchComments(match.params.id);
    this.loadUser();
  }

  handleCommentInputChange({ target }) {
    l();

    const { value } = target;
    this.setState({ comment: value });
    storage('comment', value);
  }

  addComment() {
    l();

    this.props.addComment({
      postId: 501,
      title: 'Title',
      body: this.state.comment,
      userId: 1,
    });

    this.setState({ comment: '' });
    storage('comment', '');
  }

  loadUser() {
    l();

    const { fetchUser } = this.props;
    const intervalId = setInterval(() => {
      l('SET_INTERVAL');
      const post = this.getPostObj();
      if (post) {
        fetchUser(post.userId);
        clearInterval(intervalId);
      };
    }, 500);
  }

  getPostObj() {
    l();

    const { posts, match } = this.props;
    const postId = Number(match.params.id);

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postId) return posts[i];
    };
  }

  openMapModal() {
    l();

    this.setState({ isMapVisible: true });
  }

  closeMapModal() {
    l();

    this.setState({ isMapVisible: false });
  }

  renderMapModal() {
    l();

    const { user } = this.props;
    const { isMapVisible } = this.state;
    const { geo, city, street, suite } = user ? user.address : {};

    return (
      <Modal
        isOpen={user && isMapVisible}
        style={styles.mapModal}
        contentLabel="Modal"
        ariaHideApp={false}
        onRequestClose={this.closeMapModal}
      >
        <Map
          center={geo}
          zoom={2}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          />
          <Marker position={geo}>
            <Popup>
              {city}, {street}, {suite}
            </Popup>
          </Marker>
        </Map>
      </Modal>
    );
  }

  renderUserInfo() {
    l();

    const { user, isUserLoaded } = this.props;

    if (isUserLoaded) return (
      <div className="post__user-table-wrapper">
        <Spinner/>
      </div>
    );

    if (!user) return null;

    const { address } = user;
    return (
      <div className="post__user-table-wrapper">
        <table className="post__user-table">
          <thead>
            <tr className="post__user-table-row--header">
              <th colSpan="2">About Author</th>
            </tr>
          </thead>
          <tbody>
            <tr className="post__user-table-row">
              <td>Full Name</td>
              <td>{user.name}</td>
            </tr>
            <tr className="post__user-table-row">
              <td>Email</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            </tr>
            <tr className="post__user-table-row">
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr className="post__user-table-row">
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr className="post__user-table-row">
              <td>Website</td>
              <td><a href={`https://${user.website}`}>{user.website}</a></td>
            </tr>
            <tr className="post__user-table-row">
              <td>Company</td>
              <td>{user.company.name}</td>
            </tr>
            <tr className="post__user-table-row">
              <td>Location</td>
              <td
                className="post__user-table-location-cell"
                onClick={this.openMapModal}
              >
                {address.city}, {address.street}, {address.suite}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderComments() {
    l();

    const { comments, areCommentsLoaded } = this.props;
    const { comment } = this.state;

    return (
      <div className="post__comments">
        <span className="post__comments-title">Comments</span>
        {
          areCommentsLoaded
            ?
          <Spinner/>
            :
          comments.map(({ id, name, email, body }) => (
            <div
              key={id}
              className="post__comment-container"
            >
              <div
                className="post__comment-body"
              >
                {body}
              </div>
              <a
                href={`mailto:${email}`}
                className="post__comment-email"
              >
                {email}
              </a>
            </div>
          ))
        }
        <div className="post__add-comment-container">
          <textarea
            value={comment}
            className="post__add-comment-input"
            type="text"
            placeholder="Write Comment Here"
            rows="7"
            name="post"
            onChange={this.handleCommentInputChange}
          />
          <span
            className="post__add-comment-button"
            onClick={this.addComment}
          >
            ADD COMMENT
          </span>
        </div>
      </div>
    );
  }

  render() {
    l();

    const { arePostsLoaded } = this.props;

    if (arePostsLoaded) return (
      <div style={{ marginTop: 40 }}>
        <Spinner/>
      </div>
    );

    const post = this.getPostObj();
    if (!post) return (
      <div
        className="post__not-found"
      >
        Post with this id doesn't exist!
      </div>
    );

    const { title, body }= post;

    return (
      <div className="app__posts">
        {this.renderMapModal()}
        {this.renderUserInfo()}
        <div className="app__post-container">
          <span className="app__post-title">
            {title}
          </span>
          <div className="app__post-body">
            {body}
          </div>
        </div>
        {this.renderComments()}
      </div>
    );
  }
};

const styles = {
  mapModal: {
    overlay: {
      backgroundColor: 'rgba(196, 196, 196, 0.5)',
      zIndex: 9999999,
    },
    content: {
      borderRadius: 30,
      position: 'absolute',
      top: 80,
      left: 80,
      right: 80,
      bottom: 80,
      border: 'none',
      overflow: 'hidden',
      zIndex: 9999999,
    },
  },
};

const mapStateToProps = ({ Posts, Comments, User }) => ({
  posts: Posts.posts,
  arePostsLoaded: Posts.loading,
  postsError: Posts.error,
  comments: Comments.comments,
  areCommentsLoaded: Comments.loading,
  commentsError: Comments.error,
  user: User.user,
  isUserLoaded: User.loading,
  userError: User.error,
});

export default connect(
  mapStateToProps,
  { fetchComments, addComment, fetchUser }
)(withRouter(Post));
