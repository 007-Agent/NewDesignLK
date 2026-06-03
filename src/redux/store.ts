import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Импортируем редюсер
import textReducer from './InfoTitle';
import specialtiesReducer from './/Departament/Specialities';
import sheduleLister from './Departament/SheduleRequest'
import departmentsList from "./Departament/Departments"
import BranchesList from './Departament/Branches'
import PersonalList from './Departament/Personal'
const store = configureStore({
  reducer: {
    auth: authReducer,
    text: textReducer,
    specialities: specialtiesReducer, 
    sheduleList: sheduleLister,
    departments: departmentsList,
    branches: BranchesList,
    personal: PersonalList,
  },
  
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;