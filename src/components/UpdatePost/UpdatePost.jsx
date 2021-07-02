import { useEffect, useState } from "react";
import PropTypes from 'prop-types'; 

import { getData } from '../../api/api';

import './UpdatePost.css';

export function UpdatePost({ updatePost, selectedPostId }) {

  const [post, setPost] = useState([])
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const loadInfo = async() => {
    const postFromServer = await getData(`posts/${selectedPostId}`);

    setPost(postFromServer);
  };

  const updatedPost = () => {
    updatePost(title, body);
  };

  useEffect(() => {
    loadInfo();
  }, [selectedPostId])

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post])

  const changeInputValue = (value, callback) => {
    callback(value);
  };

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        updatedPost();
      }}
    >
     <div className="Form__field">
        <input
          className="Form__input"
          type="text"
          name="title"
          defaultValue={title}
          placeholder="Input title"
          required
          onChange={(event) => {
            changeInputValue(event.target.value, setTitle);
          }}
        />
      </div>

      <div className="Form__field">
        <textarea
          className="Form__input"
          name="body"
          placeholder="Input text for your post"
          required
          defaultValue={body}
          onChange={(event) => {
            changeInputValue(event.target.value, setBody);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn"
      >
        Update Post
      </button>
    </form>
  );
}

UpdatePost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired
}