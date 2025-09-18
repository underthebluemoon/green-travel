import { useEffect, useState } from "react";
import './BeforeInstallPrompt.css'

function BeforeInstallPrompt() {

  const [defferdPrompt, setDefferdPrompt] = useState(null);

  function handlebeforeInstallPrompt(e) {
    e.preventDefault();  // 브라우저가 자동을 설치 팝업을 띄우는 걸 막아준다.

    setDefferdPrompt(e);  // 이벤트 객체를 state에 저장 (나중에 설치 과정을 진행하기 위해서)
  }

  async function handleInstall() {
    if(defferdPrompt) {
      //설치 다이얼로그 띄우기
      defferdPrompt.prompt();

      // 유저 응답 (accepted | dismissed)을 기다리기
      const result = await defferdPrompt.userChoice;

      if(result === 'accepted') {
        console.log('동의');
      } else {
        console.log('거부');
      }

      // 한 번 사용한 prompt이벤트는 재사용이 불가하므로 state 초기화
      setDefferdPrompt(null);
    }
  }

  useEffect(() => {
    // 'beforeinstallprompt' 이벤트
    // - 앱 설치가 가능할 때, 브라우저 이벤트 발생
    // - 이벤트 객체를 state에 저장해두고 나중에 사용자가 설치 버튼을 눌렀을 때,
    //    설치 과정을 진행하도록 유도
    window.addEventListener('beforeinstallprompt', handlebeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handlebeforeInstallPrompt)
    }
  }, []);

  return (
    <>
      {
        // 설치 가능한 상태일 때만 버튼 출력
        defferdPrompt && 
        // <button className="down-btn" type="button" onClick={handleInstall}> APP 다운로드 </button>    
        (
          <div className="prompt-container">
            <p className="prompt-info"> ✈ APP으로 사용하기 </p>
            <button className="prompt-btn" onClick={handleInstall} type="button">DOWNLOAD</button>
          </div>
        )
      }
    </>
  )
};

export default BeforeInstallPrompt;