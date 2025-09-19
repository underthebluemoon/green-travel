import { createSlice } from "@reduxjs/toolkit";
import { stayIndex } from "../thunks/stayThunk.js";

const staySlice = createSlice({
  name: 'staySlice',
  initialState: {
    // 카드 출력을 위한 배열
    staylist: [],
    // 다음 페이지를 부르기 위한 페이지 저장
    page: 0,
  },
  // reducers: {
  // },
  extraReducers: builder => {
    builder
      // stayIndex(api데이터 받아오기)가 완료되면, staylist 업데이트하기
      .addCase(stayIndex.fulfilled, (state, action) => {
        console.log(action.payload.items)
        if(action.payload.items?.item) {
          state.staylist = [...state.staylist, ...action.payload.items.item];
        }
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          console.log('숙박 장소 불러오기 에러', action.error);
        }
      )
  },
});

// export const {

// } = staySlice.actions;

export default staySlice.reducer;