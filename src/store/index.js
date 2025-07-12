import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './reducers/authSlice';
import  adminSlice  from './reducers/adminSlice';
import  blogSlice  from './reducers/blogSlice';
import  materialSlice  from './reducers/materialSlice';
import  eventSlice  from './reducers/eventSlice';
import  awardSlice  from './reducers/awardSlice';
import  committeeSlice  from './reducers/committeeSlice';
import  bannerSlice  from './reducers/bannerSlice';
import  taskSlice  from './reducers/taskSlice';
import  sessionSlice  from './reducers/sessionSlice';
const store = configureStore(
    {
        reducer:{
            auth:authSlice,
            admin: adminSlice,
            blog:blogSlice,
            material:materialSlice,
            event: eventSlice,
            award: awardSlice,
            committee:committeeSlice,
            banner: bannerSlice,
            task:taskSlice,
            session:sessionSlice
        }

    }
)

export default store;