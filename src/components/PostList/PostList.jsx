import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';

import { DetailsPost } from '../DetailsPost'
import { AddPost } from '../AddPost';
import { UpdatePost } from '../UpdatePost'

import { getData } from '../../api/api';
import { deletePost, addPost, updatePost} from '../../api/posts';

import './PostList.css';
 
export function PostList({ match }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const selectedPostId = +match.params.postId;

  const loadPosts = async() => {
    const postsFromServer = await getData('posts');

    setPosts(postsFromServer);
  };

  const loadComments = async() => {
    const commentsFromServer = await getData('comments');

    setComments(commentsFromServer);
  };

  const addNewPost = (title, body) => {
    const newPost = {
      title,
      body,
    };

    addPost(newPost)
      .then((result) => {
        setPosts(currentList => [...currentList, result]);
      });
  };

  const updatedPost = (title, body) => {
    const newPost = {
      title,
      body,
    };

    updatePost(newPost, selectedPostId)
      .then((result) => {
        const postID = selectedPostId;
        setPosts(posts.map((post) => {      
          if(post.id === postID) {
            return result;
          }

          return post;
        }));
      });
  };

  useEffect(() => {
    loadPosts();
    loadComments();
  }, []);

  return (
    <div className="PostList">
      <ul className="PostList__list">
        {posts.map(post => (
          <li
            className="PostList__item" 
            key={post.id}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              name={post.id}
              type="button"
              className="PostList__btn btn"
              onClick={({target}) => {
                deletePost(target.name)
                setPosts(posts.filter(post => post.id !== +target.name));
              }}
            >
              Delete post
            </button>
            <Link
              className="PostList__btn btn"
              to={`/posts/${post.id}`}
            >
              Post details
            </Link>
            <Link
              className="PostList__btn btn"
              to={`/posts/addPost`}
            >
              Creat post
            </Link>
            <Link
              className="PostList__btn btn"
              to={`/posts/${post.id}/updatePost`}
            >
              Update Post
            </Link>
          </li>
        ))}
      </ul>

      <Route
        path="/posts/addPost"
        exact
      >
        <AddPost
          addPost={addNewPost}
        />
      </Route>
      <Route
        path={`/posts/${selectedPostId}/updatePost`}
        exact
        render={() => {
          return <UpdatePost 
            selectedPostId={selectedPostId}
            updatePost={updatedPost} 
          />
        }}
      >
      </Route>
      <Route
        path={`/posts/${selectedPostId}`}
        exact
        render={() => {
          return <DetailsPost 
            selectedPostId={selectedPostId} 
          />
        }}
      >
      </Route>
    </div>
  );
}
