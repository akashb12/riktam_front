import { configureStore } from "@reduxjs/toolkit";
import users from './slice/UserSlice';
import admin from './slice/AdminSlice';
import chat from './slice/ChatSlice';
import message from './slice/MessageSlice';

const store = configureStore({
    reducer:{
        users:users,
        admin:admin,
        chat:chat,
        message:message
    }
})
export default store;