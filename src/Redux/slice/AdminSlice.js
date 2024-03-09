import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const registerUser = createAsyncThunk('register', async(data) => {
    const res = await axiosRequest.post('/api/admin/register',data).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const updateUserData = createAsyncThunk('update', async(data) => {
    const{_id,...fields} = data
    const res = await axiosRequest.put(`/api/admin/updateUser/${_id}`,fields).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const getAllUsers = createAsyncThunk('getAllUsers',async() => {
    const res = await axiosRequest.get('/api/admin/getAllUsers').then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
})

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        registerUser:{},
        updateUser:{},
        allUsers:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(registerUser.fulfilled,(state,{payload}) => {
            state.registerUser = payload;
        })
        builder.addCase(updateUserData.fulfilled,(state,{payload}) => {
            state.updateUser = payload;
        })
        builder.addCase(getAllUsers.fulfilled,(state,{payload}) => {
            state.allUsers = payload;
        })
    }
})
export const admin = ({ admin }) => admin;
export default adminSlice.reducer;