import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const fetchMessages = createAsyncThunk('fetchMessages',async(chatId)=> {
    const res = await axiosRequest.get(`/api/message/fetchMessages/${chatId}`).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const createMessage = createAsyncThunk('createMessage',async(data) => {
    const {chatId, ...others} = data;
    const res = await axiosRequest.post(`/api/message/sendMessage/${chatId}`,others).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const readMessage = createAsyncThunk('readMessage',async(id) => {
    const res = await axiosRequest.post(`/api/message/readMessage/${id}`).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const likeMessage = createAsyncThunk('likeMessage',async(data) => {
    const res = await axiosRequest.post(`/api/message/likeMessage/${data.id}?type=${data.type}`).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const messageSlice = createSlice({
    name:'messages',
    initialState:{
        createMessage:{},
        fetchMessages:{},
        readMessage:{},
        likeMessage:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchMessages.fulfilled,(state,{payload}) => {
            state.fetchMessages = payload;
        })
        builder.addCase(createMessage.fulfilled,(state,{payload}) => {
            state.createMessage = payload;
        })
        builder.addCase(readMessage.fulfilled,(state,{payload}) => {
            state.readMessage = payload;
        })
        builder.addCase(likeMessage.fulfilled,(state,{payload}) => {
            state.likeMessage = payload;
        })
    }
})
export const message = ({ message }) => message;
export default messageSlice.reducer;