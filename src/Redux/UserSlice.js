import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from './axios';

export const loginSlice = createAsyncThunk('login',async(data)=> {
    const res = await axiosRequest.post('/user/login',data,{ withCredentials: true }).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const userSliceData = createSlice({
    name:'users',
    initialState:{
        loginUser:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(loginSlice.fulfilled,(state,{payload}) => {
            state.loginUser = payload;
        })
    }
})
export const user = ({ users }) => users;
export default userSliceData.reducer;