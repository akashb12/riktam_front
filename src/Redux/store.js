import { configureStore } from "@reduxjs/toolkit";
import users from './slice/UserSlice';
import admin from './slice/AdminSlice';

const store = configureStore({
    reducer:{
        users:users,
        admin:admin
    }
})
export default store;