import { createAsyncThunk } from "@reduxjs/toolkit";
import { stayAxiosConfig } from '../../configs/axiosConfig.js';
import axios from "axios";

const stayIndex = createAsyncThunk(
  'staySlice/stayIndex',
  async () => {
    // console.log(arg);
    // console.log(thunkAPI);
    // const state = thunkAPI.getState();

    // url 설정
    const url = `${stayAxiosConfig.BASE_URL}/searchStay2`;
    // parameter 설정
    const params = {
      serviceKey: stayAxiosConfig.SERVICE_KEY,
      MobileOS: stayAxiosConfig.MOBILE_OS,
      MobileApp: stayAxiosConfig.MOBILE_APP,
      _type: stayAxiosConfig.TYPE,
      arrange: stayAxiosConfig.ARRANGE,
      numOfRows: stayAxiosConfig.NUM_OF_ROWS,
    }
                    // 설정한 url+parameter로 axios GET해서 response에 담음
    const response = await axios.get(url, {params});
    
    // 불러온 값을 쓰기 좋게 접근해서 반환
    return response.data.response.body;
  }

);

export {
  stayIndex,
};