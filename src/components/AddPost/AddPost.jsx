import { useState } from "react";
import PropTypes from "prop-types"

import './AddPost.css'

export function AddPost({ addPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const addNewPost = () => {
    if(title.trim().length > 3 && body.trim().length > 3) {
      addPost(title, body);

      setTitle('');
      setBody('');
    } else {
      setError(true);
    }
  };

  const changeInputValue = (value, callback) => {
    setError(false);
    callback(value);
  };

  return (
    <form
      className="Form"
      onSubmit={(event) => {
        event.preventDefault();
        addNewPost();
      }}
    >
      <div className="Form__field">
        <input
          className="Form__input"
          type="text"
          name="title"
          value={title}
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
          value={body}
          onChange={(event) => {
            changeInputValue(event.target.value, setBody);
          }}
        />
      </div>
      {error && <p
        className="Form__errorMassage" 
      >
        Input more 3 characters
      </p>}
      <button
        type="submit"
        className="btn"
      >
        Add a comment
      </button>
    </form>
  );
}


AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
}