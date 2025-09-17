import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { dateFormatter } from '../../utils/dateFormatterUtil.js';
import { setFestivalInfo } from '../../store/slices/festivalShowSlice.js';

// 상세 모달
// 타이틀:행사명 이미지 주소 기간

function FestivalShow() {
                // parmeter받아오는 hook
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 전체 리스트 정보 => festivalSlice.festivalList
  // 클릭한 카드의 정보를 특정할 수 있는 값 => 세그먼트 파라미터
  // 클릭한 카드의 정보 1개는 전체 리스트 정보에 있는 것 중 1개
  // info 스테이트에 저장할 값 => 클릭한 카드의 정보 1개
  // show에서 info 스테이트 저장
  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo);
  const festivalList = useSelector(state => state.festival.list);

  // useEffect 없을 경우, 컴포넌트가 추가 렌더링 되려고 하여 오류 발생
  useEffect(() => {
    const item = festivalList.find(item => params.id === item.contentid);
    dispatch(setFestivalInfo(item));
  })

  // useEffect(() => {
  //   for(let i = 0; i < festivalList.length; i ++) {
  //     if (festivalList[i].contentid === params.id) {
  //       dispatch(setFestivalInfo(festivalList[i]));
  //       break;
  //     }
  //   }
  // }, [])

  function redirectBack() {
    navigate(-1);
    // 히스토리가 쌓일 때, 현재 페이지 : 0, 직전 페이지 : -1, -2...
  }

  return (
    <>
      {/* 초기값이 빈객체이므로 빈객체가 아닐 때만 출력하도록 설정
          조건부 랜더링이 아닐 경우, 먼저 렌더링 되어 오류(slice) 발생 */}
      { festivalInfo.title &&
      <div className="show-container">
        <button className='show-btn' type='button' onClick={redirectBack}>돌아가기</button>
        <p className="show-title">{festivalInfo.title}</p>
        <p className="show-period">📢 {dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~ {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}</p>
        <p className="show-addr">📍 {festivalInfo.addr1}{festivalInfo.addr2}</p>
        <p className="show-tel">📞 tel : {festivalInfo.tel}</p>
        <img className="show-img" src={festivalInfo.firstimage} alt={`${festivalInfo.title} 사진`} />
      </div>
      }
    </>
  )
};

export default FestivalShow;