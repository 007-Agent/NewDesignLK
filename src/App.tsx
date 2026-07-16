import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { Header } from "./components/Header/Header";
import { ProfilePage } from "./RouterSlide/Profile/ProfilePage";
import { PatientsPage } from "./components/PatientsPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { SchedulePage } from "./RouterSlide/Shedule/SchedulePage";
import { AppointmentsPage } from "../src/RouterSlide/Appointments/AppointmentsPage";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientDetailPageWrapper } from "./components/patientDetailsFull/PatientWrapperDetail/PatientDetailWrapper";
import Policy from "./RouterSlide/Policy/Policy";
import Layout from "../src/components/Layout";
import { HomePage } from "./components/Main/Main";
import { Sanatorium } from "./RouterSlide/Sanatoriums/Sanatorium";
import "./App.css";
import { fetchSpecialties } from "./redux/Departament/Specialities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { checkAuth } from "./redux/slice/authSlice";
import { fetchSchedule } from "./redux/Departament/SheduleRequest";
import { fetchDepartments } from "./redux/Departament/Departments";
import { fetchBranches } from "./redux/Departament/Branches";
import { fetchPersonal } from "./redux/Departament/Personal";
import { CustomToaster } from "./components/Toaster/CustomToaster";

export default function App() {
  const { user, checkStatus } = useAppSelector((state) => state.auth);

  const [specialtiesRequested, setSpecialtiesRequested] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    // Определяем, была ли страница перезагружена (F5)
    const navEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (navEntry?.type === "reload") {
      hasRedirected.current = true;
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  // useEffect(() => {
  //   dispatch(checkAuth());
  //   dispatch(fetchSchedule());
  //   dispatch(fetchDepartments())
  // }, [dispatch]);
  useEffect(() => {
    const init = async () => {
      // 1. Сначала проверяем авторизацию
      await dispatch(checkAuth());

      // 2. После успешной проверки загружаем все данные
      dispatch(fetchSchedule());
      dispatch(fetchDepartments());
      dispatch(fetchBranches());
      dispatch(fetchPersonal());
      dispatch(fetchSpecialties()); // если без таймера
    };

    init();
  }, [dispatch]);

  return (
    <div className="app">
      <CustomToaster />
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <PrivateRoute user={user}>
                <HomePage user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <PrivateRoute user={user}>
                <AppointmentsPage user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute user={user}>
                <ProfilePage user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <PrivateRoute user={user}>
                <PatientsPage user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute user={user}>
                <SchedulePage />
              </PrivateRoute>
            }
          />

   

          <Route
            path="/sanatories"
            element={
              <PrivateRoute user={user}>
                <Sanatorium user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/patientsfullinfo/:fullName"
            element={
              <PrivateRoute user={user}>
                <PatientDetailPageWrapper user={user} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
