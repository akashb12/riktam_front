import { configureStore } from "@reduxjs/toolkit";
import users from './slice/UserSlice';
import admin from './slice/AdminSlice';
import chat from './slice/ChatSlice';

const store = configureStore({
    reducer:{
        users:users,
        admin:admin,
        chat:chat
    }
})
export default store;