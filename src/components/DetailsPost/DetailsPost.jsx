import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 

import { getData } from '../../api/api'
import { addComment } from '../../api/comments'

import './DetailsPost.css'
 
export function DetailsPost({ selectedPostId }) {
  const [post, setPost] = useState([]);
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  const loadInfo = async() => {
    const postFromServer = await getData(`posts/${selectedPostId}?_embed=comments`);

    setPost(postFromServer);
    setComments(postFromServer.comments);
  };

  const changeInputValue = (value, callback) => {
    setError(false);
    callback(value);
  };

  const addNewComment = () => {
    const newComment = {
      postId: selectedPostId,
      body,
    };
    if(body.length > 3) {
      addComment(newComment)
        .then((result) => {
          setComments(currentList => [...currentList, result]);
        });

      setBody('');
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    loadInfo();
  }, [selectedPostId]);

  return (
    <div className="DetailsPost">
      <h2>
        {post.title}
      </h2>
      <div>
        {post.body}
      </div>
      <div className="comments">
        <h2>Comments:</h2>
        <ul className="DetailsPost__list">
          {comments && comments.map(comment => (
            <li 
              key={comment.id}
              className="DetailsPost__item"
            >
              <div>
                {comment.body}
              </div>
            </li>
          ))}
        </ul>
        <form
          className="Form comment"
          onSubmit={(event) => {
            event.preventDefault();
            addNewComment();
          }}
        >
          <div className="Form__field">
            <textarea
              className="Form__input"
              name="body"
              placeholder="Input your comment"
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
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}


DetailsPost.propTypes = {
  selectedPostId: PropTypes.number.isRequired
}