import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const fetchChats = createAsyncThunk('chats',async()=> {
    const res = await axiosRequest.get('/chat/fetchChats').then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const getUsers = createAsyncThunk('getUsers',async()=> {
    const res = await axiosRequest.get(`/user/getUsers`).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const createGroup = createAsyncThunk('createGroup',async(data) => {
    const res = await axiosRequest.post('/chat/createGroup',data).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})
export const updateGroup = createAsyncThunk('updateGroup',async(data) => {
    const{_id,...fields} = data
    const res = await axiosRequest.put(`/chat/updateGroup/${_id}`,data).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const chatSliceData = createSlice({
    name:'chats',
    initialState:{
        chats:{},
        getUsers:{},
        createGroup:{},
        updateGroup:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchChats.fulfilled,(state,{payload}) => {
            state.chats = payload;
        })
        builder.addCase(getUsers.fulfilled,(state,{payload}) => {
            state.getUsers = payload;
        })
        builder.addCase(createGroup.fulfilled,(state,{payload}) => {
            state.createGroup = payload;
        })
        builder.addCase(updateGroup.fulfilled,(state,{payload}) => {
            state.updateGroup = payload;
        })
    }
})
export const chat = ({ chat }) => chat;
export default chatSliceData.reducer;