import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const fetchChats = createAsyncThunk('chats',async(searchName)=> {
    let url = '/api/chat/fetchChats';
    if(searchName) {
        url += `?searchName=${searchName}`
    }
    const res = await axiosRequest.get(url).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const getUsers = createAsyncThunk('getUsers',async()=> {
    const res = await axiosRequest.get(`/api/user/getUsers`).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const createGroup = createAsyncThunk('createGroup',async(data) => {
    const res = await axiosRequest.post('/api/chat/createGroup',data).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})
export const updateGroup = createAsyncThunk('updateGroup',async(data) => {
    const{_id,...fields} = data
    const res = await axiosRequest.put(`/api/chat/updateGroup/${_id}`,data).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const deleteGroup = createAsyncThunk('deleteGroup',async(_id) => {
    const res = await axiosRequest.delete(`/api/chat/deleteGroup/${_id}`).then((res)=>res).catch((err)=>err.response);
    return {status:res.status,data:res.data};
})

export const chatSliceData = createSlice({
    name:'chats',
    initialState:{
        chats:{},
        getUsers:{},
        createGroup:{},
        updateGroup:{},
        deleteGroup:{}
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
        builder.addCase(deleteGroup.fulfilled,(state,{payload}) => {
            state.deleteGroup = payload;
        })
    }
})
export const chat = ({ chat }) => chat;
export default chatSliceData.reducer;