import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const fetchChats = createAsyncThunk('chats',async()=> {
    const res = await axiosRequest.get('/chat/fetchChats').then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const chatSliceData = createSlice({
    name:'chats',
    initialState:{
        chats:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchChats.fulfilled,(state,{payload}) => {
            state.chats = payload;
        })
    }
})
export const chat = ({ chat }) => chat;
export default chatSliceData.reducer;