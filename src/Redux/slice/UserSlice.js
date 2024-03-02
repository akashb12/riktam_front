import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const login = createAsyncThunk('login',async(data)=> {
    const res = await axiosRequest.post('/user/login',data,{ withCredentials: true }).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const logout = createAsyncThunk('logout',async() => {
    const res = await axiosRequest.post('/user/logout',{data:''},{ withCredentials: true }).then((res)=> res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const userSliceData = createSlice({
    name:'users',
    initialState:{
        loginUser:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(login.fulfilled,(state,{payload}) => {
            state.loginUser = payload;
        })
        builder.addCase(logout.fulfilled,(state,{payload}) => {
            state.loginUser = {};
        })
    }
})
export const user = ({ users }) => users;
export default userSliceData.reducer;