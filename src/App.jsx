import Header from './components/common/Header.jsx';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { localStorageUtil } from './utils/localStorageUtil.js';
import { dateFormatter } from './utils/dateFormatterUtil.js';
import BeforeInstallPrompt from './components/BeforeInstallPrompt.jsx';

function App() {

  useEffect(() => {
    // 로컬 스토리지에서 저장된 날짜를 획득
    const clearDate = localStorageUtil.getClearDate();
    const nowDate = dateFormatter.formatDateToYMD(new Date());
    
    // 오늘 날짜 비교
    // 저장된 날짜와 오늘 날짜가 같지 않으면, clear & 현재 날짜를 로컬스토리지에 저장
    if(clearDate !== nowDate) {
      localStorageUtil.clearLocalStorage();
      localStorageUtil.setClearDate(nowDate);
      
      // 화면 새로고침
      // state가 초기화되지 않는 현상을 해결하기 위해, 강제로 화면 새로고침
      window.location.reload();
    }
    //     - 저장된 날짜가 과거면 로컬 스토리지 및 스테이트 초기화
    //     - 저장된 날짜가 과거가 아니면 처리속행

  }, []);

  return (
    <>
      <BeforeInstallPrompt />
      <Header />
      <div className='navlink-container'>
        <NavLink className='navlink-btn' to={'/festivals'}>🎈 축제 정보</NavLink>
        <div className="navlink-center"></div>
        <NavLink className='navlink-btn' to={'/stay'}>🎪 숙박 정보</NavLink>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
      {/* 스크롤 초기화, 최상위 컴포넌트에 한번만 추가 */}
      <ScrollRestoration />
    </>
  )
}

export default App;
