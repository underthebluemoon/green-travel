import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { stayIndex } from '../../store/thunks/stayThunk.js';
import { scrollUtils } from '../../utils/scrollUtil.js'
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';

function StayList() {
  const dispatch = useDispatch();
    // state에서 staylist 가져오기
  const staylist = useSelector(state => state.stay.staylist);
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg)

  // dispatch(stayIndex('test'));
  // const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg)


  // 마운트 될 때, stayIndex 실행시켜, 데이터 받아오기
  useEffect(() => {
    if(staylist.length === 0) {
      dispatch(stayIndex());
    }
  }, [])

  // function addNextPageForStay() {
    if(scrollUtils.getScroll() === 0 && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      console.log('스크롤 이벤트 작동!');
    }
  // }

  return(
    <>
      <div className="staycard-container">
        {
          // staylist에 담긴 배열을 카드로 출력하기
          staylist.length > 0 && staylist.map(item => {
            return (
              <div className="staycard" key={item.contentid}>
                <div className="staycard-img" style={{background: `url('${item.firstimage}')`}}/>
                <p className="staycard-title">{item.title}</p>
                <p className="staycard-addr">{item.addr1}{item.addr2}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
};

export default StayList;

