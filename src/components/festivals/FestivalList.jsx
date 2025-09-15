import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFomatter } from '../../utils/dateFormatterUtil.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';


function FestivalList() {
  const dispatch = useDispatch();

  const festivalList = useSelector(state => state.festival.list);

  const page = useSelector(state => state.festival.page);

  // 디바운싱 제어를 위해 플래그 가져옴
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  // window.addEventListener('scroll', () => {
  //   console.log(window.scrollY, window.innerHeight, document.documentElement.scrollHeight);
  //   // window.scrollY : scroll y축
  //   // window.innerHeight : 현재 표시중인 브라우저 높이
  //   // document.documentElement.scrollHeight : 문서 전체 세로 길이
  //   // document.documentElement.scrollHeight = window.scrollY + window.innerHeight

  //   // 스크롤 이벤트 시 주의 사항
  //   // 1. 굉장히 잦은 빈도로 실행 됨
  //   //   > 디바운싱(Debounce : 실행중일때 추가 실행 막음) & 쓰로틀링(Throttle : 시간 제약 설정) & IntersectionObserver
  //   //   > 이용하여 실행 빈도 조절 필수
  //   // 2. 같은 요청을 반복적으로 할 가능성이 높아 반복적으로 실행되지 않도록 제어 필수
  // })
  
  useEffect(() => {
    dispatch(festivalIndex(1));
  }, []);

  useEffect(() => {
    // window에서 실행되는 event이므로, 컴포넌트가 unmount되어도 event는 존재
    // -> 다른 컴포넌트에서도 event 작동
    // -> 컴포넌트 unmount 시, event가 사라지도록 설정 필요
    window.addEventListener('scroll', addNextPage);

    // unmout 시, event가 사라지도록 cleanup function
    return () => {
      console.log('page 지운다!');
      window.removeEventListener('scroll', addNextPage);
    }

  }, [page, scrollEventFlg]);
  
  // // case 1. 다음 페이지 가져오기 (버튼 이벤트에 이용)
  // function addNextPage() {
  //   dispatch(festivalIndex(page + 1));
  // }
  
  // case 2. 다음 페이지 가져오기 + 스크롤 이벤트를 위한 함수 (다음 페이지를 가져오는 조건 : 스크롤 위치)
  function addNextPage() {
    // 스크롤 관련 처리
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = window.scrollY; // 현재 스크롤의 Y축 위치
    const viewheight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치

    // 스크롤이 100%에 도달했을 때 작동하도록 설정
    // + 디바운싱 설정 추가
    if(viewheight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(festivalIndex(page + 1));
      console.log('추가 페이지 가져옴!');
    }
  }

  return (
    <>
      <div className="container">
        {
          // case1. state.list 초기값을 null로 한 경우 : list 값이 존재할 때 map()
          // festivalList && festivalList.map(item => {
          
          // case2. state.list 초기값을 []로 한 경우 : list 배열이 1개 이상일 때 map()
          festivalList.length > 0 && festivalList.map(item => {
            return (
              <div className="card" key={item.contentid}>
                <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
                <p className="card-title">{item.title}</p>
                <p className="card-period">{dateFomatter.withHyphenYMD(item.eventstartdate)} ~ {dateFomatter.withHyphenYMD(item.eventenddate)}</p>
              </div>
            )
          })
        }
      </div>
      <button className='btn-addpage' type='button' onClick={addNextPage}>더 보기</button>
      {/* 페이징 처리
          1. 현재 page 저장하기 
       -> 2. request 시 page 설정 
       -> 3. 기존 state에 2번에서 받아온 데이터 추가 */}
    </>
  )
}

export default FestivalList;