import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../configs/axiosConfig.js";

const festivalIndex = createAsyncThunk(
  'festivalSlice/festivalIndex',
  async () => {
    const url = `${axiosConfig.baseUrl}/searchFestival2`;
    const config = {
      params : {
        serviceKey: axiosConfig.serviceKey,
        MobileOS: axiosConfig.MobileOS,
        MobileApp: axiosConfig.MobileApp,
        _type: axiosConfig.type,
        arrange: axiosConfig.arrange,
        eventStartDate: '20251001',
      }
    }

    // destructuring 문법으로 쓸 경우, 아래와 같이 객체를 정의 하고
    // axios.get(url, {param}}) 로 인자를 보냄.
    // const params = {
    //   servicekey: axiosConfig.serviceKey,
    //   MobileOS: axiosConfig.MobileOS,
    //   MobileApp: axiosConfig.MobileApp,
    //   type: axiosConfig.type,
    //   arrange: axiosConfig.arrange,
    // }

    const response = await axios.get(url, config);

    return response.data.response.body;
  }
);

export {
  festivalIndex 
};