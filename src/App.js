import PostBoard from "./components/post-board";
import UserContextProvider from './contexts/UserContext';
import './App.scss';

function App() {
  return (
    <UserContextProvider>
      <PostBoard/>
    </UserContextProvider>
  );
}

export default App;
