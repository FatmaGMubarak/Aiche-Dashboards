import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './reducers/authSlice';
import  adminSlice  from './reducers/adminSlice';
import  userSlice  from './reducers/userSlice';
import  blogSlice  from './reducers/blogSlice';
import  materialSlice  from './reducers/materialSlice';
import  eventSlice  from './reducers/eventSlice';
import  awardSlice  from './reducers/awardSlice';
import  committeeSlice  from './reducers/committeeSlice';
import  bannerSlice  from './reducers/bannerSlice';
import  taskSlice  from './reducers/taskSlice';
import  sessionSlice  from './reducers/sessionSlice';
import  collectionSlice  from './reducers/collectionSlice';
import  productSlice from './reducers/productSlice';
import Cookies from "js-cookie";

const preloadedState = {
  auth: {
    token: Cookies.get("token") || localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
};

const store = configureStore(
    {
        reducer:{
            auth:authSlice,
            admin: adminSlice,
            user: userSlice,
            blog:blogSlice,
            material:materialSlice,
            event: eventSlice,
            award: awardSlice,
            committee:committeeSlice,
            banner: bannerSlice,
            task:taskSlice,
            session:sessionSlice,
            collection:collectionSlice,
            product:productSlice,
        },
        preloadedState,
    }
)

export default store;