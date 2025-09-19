import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { festivalAxiosConfig } from "../../configs/axiosConfig.js";
import { dateCalculator } from "../../utils/dateCalculator.js";
import { dateFormatter } from "../../utils/dateFormatterUtil.js";


const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
    // 외부 주입, redux에 관련된 모든 정보
                // redux toolkit이 제공하는 유틸리티 객체
                // dispatch, getState, rejectWithValue
  async (arg, thunkAPI) => {
    // state 접근 방법
    const state = thunkAPI.getState();
    const pastDateYMD = dateFormatter.formatDateToYMD(dateCalculator.getPastDate((1000 * 60 * 60 * 24 * 30)));
    const url = `${festivalAxiosConfig.BASE_URL}/searchFestival2`;
    const festivalConfig = {
      params : {
        serviceKey: festivalAxiosConfig.SERVICE_KEY,
        MobileOS: festivalAxiosConfig.MOBILE_OS,
        MobileApp: festivalAxiosConfig.MOBILE_APP,
        _type: festivalAxiosConfig.TYPE,
        arrange: festivalAxiosConfig.ARRANGE,
        numOfRows: festivalAxiosConfig.NUM_OF_ROWS,
        pageNo: state.festival.page + 1, 
        eventStartDate: pastDateYMD,
      }
    }

    // destructuring 문법으로 쓸 경우, 아래와 같이 객체를 정의 하고
    // axios.get(url, {param}) 로 인자를 보냄.
    // const params = {
    //   servicekey: axiosConfig.serviceKey,
    //   MobileOS: axiosConfig.MobileOS,
    //   MobileApp: axiosConfig.MobileApp,
    //   type: axiosConfig.type,
    //   arrange: axiosConfig.arrange,
    // }

    const response = await axios.get(url, festivalConfig);

    return response.data.response.body;
  }
);

export {
  festivalIndex 
};