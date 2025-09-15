import { createSlice } from "@reduxjs/toolkit";
import { festivalIndex } from "../thunks/festivalThunk.js";

const festivalSlice = createSlice({
  name: 'festivalSlice',
  initialState: {
    // list: null,  // 페스티벌 리스트 : case1. null
    list : [],      // 페스티벌 리스트 : case2. 빈 배열
    page: 1,        // 현재 페이지 번호
    scrollEventFlg: true // 스크롤 이벤트 디바운싱 제어 플래그
  }, 
  
  reducers: {
    // setList(state, action) {
    //   state.list = action.payload;
    // }

    setScrollEventFlg(state, action) {
      state.scrollEventFlg = action.payload;
    }
  },

  extraReducers: builder => {
    builder
      .addCase(festivalIndex.fulfilled, (state, action) => {
        // console.log(action.payload, action.type);

        // case2 + items안에 item이 있는 경우에만 처리하도록 조건문 추가
        if(action.payload.items?.item) {
          
          // case2. state.list의 초기값을 [] 빈 배열로 한 경우
          state.list = [...state.list, ...action.payload.items.item];
          state.page = action.payload.pageNo;

          // 페이지를 업데이트 한 뒤, 디바운싱 플래그 true로 변경
          state.scrollEventFlg = true;
        } else {
          state.scrollEventFlg = false;
        }
        // // ------ case1. stata.list의 초기값을 null로 한 경우 -------
        // if(state.list !== null) {
        //   // 페이지 추가 처리 (새로 불러온 데이터를 배열에 추가, page 값 설정)
        //   state.list = [...state.list, ...action.payload.items.item];
        //     // 이전 값의 page에 +1
        //     // state.page += 1; 
        //   // 백엔드에서 보내는 page 값을 사용하는 것이 더 안전
        //   state.page = action.payload.pageNo;
        // } else {
        //   // 페이지 처음 불러오기 
        //   state.list = action.payload.items.item;
        // }
        // -----------------------------------------------------------
      })
      .addMatcher(
        action => action.type.endsWith('/pendding'),
        state => {
          console.log('처리중입니다.');
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          console.log('에러 발생', action.error);
        }
      );
  }

});

export const {
  // setList,
  setScrollEventFlg,
} = festivalSlice.actions;

export default  festivalSlice.reducer;