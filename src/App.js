import { Route} from 'react-router-dom';
import { PostList } from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path='/posts'>
        <h1>Posts</h1>
        <header className="App-header">
          <PostList />
        </header>
      </Route>
    </div>
  );
}

export default App;
