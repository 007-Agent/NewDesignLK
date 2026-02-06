import React, { useState, useEffect } from 'react';
import { useAppSelector } from './redux/hooks';
import { Header } from './components/Header/Header';
import { ProfilePage } from './components/ProfilePage';
import { PatientsPage } from './components/PatientsPage';
import { SchedulePage } from './components/SchedulePage';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { PatientDetailPageWrapper } from './components/patientDetailsFull/PatientWrapperDetail/PatientDetailWrapper';

import Layout from '../src/components/Layout';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
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
          <Route path="/doctors" element={<Main />} />
          <Route path="/profile" element={<ProfilePage user={user}/>} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/patientsfullinfo/:fullName" element={<PatientDetailPageWrapper />} />
        </Route>
      </Routes>
    </>
    
      
  );
}