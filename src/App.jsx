import Header from './components/common/Header.jsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      {/* 스크롤 초기화, 최상위 컴포넌트에 한번만 추가 */}
      <ScrollRestoration />
    </>
  )
}

export default App;
