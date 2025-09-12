import Header from './components/common/Header.jsx';
import Main from './components/main.jsx';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default App;
