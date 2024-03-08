import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const fetchMessages = createAsyncThunk('fetchMessages',async(chatId)=> {
    const res = await axiosRequest.get(`/message/fetchMessages/${chatId}`).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const createMessage = createAsyncThunk('createMessage',async(data) => {
    const {chatId, ...others} = data;
    const res = await axiosRequest.post(`/message/sendMessage/${chatId}`,others).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const messageSlice = createSlice({
    name:'messages',
    initialState:{
        createMessage:{},
        fetchMessages:{},
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchMessages.fulfilled,(state,{payload}) => {
            state.fetchMessages = payload;
        })
        builder.addCase(createMessage.fulfilled,(state,{payload}) => {
            state.createMessage = payload;
        })
    }
})
export const message = ({ message }) => message;
export default messageSlice.reducer;