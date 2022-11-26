import PostBoard from "./components/post-board";
import UserContextProvider from './contexts/UserContext';
import './App.scss';

function App() {
  const fetchedPosts = localStorage.getItem('posts');

  return (
    <UserContextProvider>
      <PostBoard fetchedPosts={JSON.parse(fetchedPosts)}/>
    </UserContextProvider>
  );
}

export default App;
