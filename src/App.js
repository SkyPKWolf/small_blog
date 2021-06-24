import { Route, Redirect, Switch} from 'react-router-dom';

import { PostList } from './components/PostList';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
