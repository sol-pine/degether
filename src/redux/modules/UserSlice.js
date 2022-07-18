import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL, REACT_APP_KAKAO_REDIRECT_URL } from "../../shared/api";

// 카카오 로그인
const code = new URL(window.location.href).searchParams.get("code");
const token = localStorage.getItem("token");

export const kakaoLogin = createAsyncThunk("POST/kakaoLogin", async () => {
  return await axios
    .post(
      `${SERVER_URL}/user/kakao?code=${code}&redirectUrl=${REACT_APP_KAKAO_REDIRECT_URL}`
    )
    .then((res) => {
      localStorage.setItem("token", res.headers.authorization);
      localStorage.setItem("nickname", res.data.result.nickname);
      localStorage.setItem("profileUrl", res.data.result.profileUrl);
      return res.data.result;
    })

    .catch((e) => console.log(e.message));
});
// 마이페이지 정보 받아오기
export const getUserInfo = createAsyncThunk("GET/getUserInfo", async () => {
  return await axios
    .get(`${SERVER_URL}/user/userInfo`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data.result;
    })
    .catch((e) => console.error(e));
});
// 마이페이지 유저 정보 편집
export const editUser = createAsyncThunk("PUT/editUser", async (formData) => {
  const res = await axios
    .put(`${SERVER_URL}/user/userEdit`, formData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("editUser", res.data);
      alert("프로필 정보가 변경되었습니다.");
    })
    .catch((e) => console.error(e));
});

const UserSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    loginModal: true,
    userInfo: {},
    token: "",
  },
  reducers: {
    loginModal: (state, action) => {
      state.loginModal = action.payload;
    },
  },
  extraReducers: {
    [kakaoLogin.fulfilled]: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    [getUserInfo.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.userInfo = { ...action.payload };
    },
    [editUser.fulfilled]: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});
export const { loginModal, isLogin } = UserSlice.actions;
export default UserSlice.reducer;
