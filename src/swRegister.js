const swRegister = () => {
      // 'string' in [array] → true|false
  if('serviceWorker' in navigator) {
        // navigator 안에 serviceWorker가 있을 경우,
    navigator.serviceWorker
        // navigator의 serviceWorker를
      .register(
        // 등록
        '/sw.js',
        {
          scope: '/',
        }
      )
      .then(registration => {
        // 등록 성공
        console.log('서비스 워커 등록 성공', registration);
      })
      .catch(err => {
        // 등록 실패
        console.error('서비스 워커 등록 실패', err);
      });
  }
}

export default swRegister;