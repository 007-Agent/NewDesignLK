import React, { useState, useEffect } from 'react';
import { useAppSelector } from './redux/hooks';
import { Header } from './components/Header/Header';
import { ProfilePage } from './RouterSlide/Profile/ProfilePage.tsx';
import { PatientsPage } from './components/PatientsPage';
import { SchedulePage } from './RouterSlide/Shedule/SchedulePage.tsx';
import { AppointmentsPage } from '../src/RouterSlide/Appointments/AppointmentsPage.tsx'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { PatientDetailPageWrapper } from './components/patientDetailsFull/PatientWrapperDetail/PatientDetailWrapper';
import Policy from './RouterSlide/Policy/Policy.tsx';
import Layout from '../src/components/Layout';
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const { user, checkStatus } = useAppSelector((state) => state.auth);
  console.log(user, "USSR")
  

  return (
    <>
    <Header />
      <Routes>
        {/* Все маршруты обернуты в Layout */}
        <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/doctors" replace />} />
          <Route path="/doctors" element={<AppointmentsPage user={user}/>} />
          <Route path="/profile" element={<ProfilePage user={user}/>} />
          <Route path="/patients" element={<PatientsPage user={user}/>} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/policy" element={<Policy user={user}/>} />
          <Route path="/patientsfullinfo/:fullName" element={<PatientDetailPageWrapper user={user}/>}  />
        </Route>
      </Routes>
    </>
    
      
  );
}