import { Route, Link, Redirect, Switch} from 'react-router-dom';

import { PostList } from './components/PostList';

import './App.css';

function App() {
  return (
    <>
      <h1>Posts:</h1>
      <Link
        className="PostList__btn btn"
        to={`/posts/addPost`}
      >
        Create post
      </Link>
      <div className="App">
        <Switch>
          <Redirect
            path="/"
            exact
            to="/posts"
          />
          <Route 
            path="/posts/:postId?"
            component={PostList}
          >
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default App;
