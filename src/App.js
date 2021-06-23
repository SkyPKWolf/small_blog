import { Route, Redirect} from 'react-router-dom';
import { PostList } from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Redirect
        path="/"
        to="/posts"
      />
      <Route 
        path="/posts/:postId?"
        component={PostList}
      >
      </Route>
    </div>
  );
}

export default App;
