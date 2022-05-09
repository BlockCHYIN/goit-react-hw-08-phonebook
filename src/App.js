import React, { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import authOperations from 'redux/auth/auth-operations';
import authSelectors from 'redux/auth/auth-selectors';

import RegisterView from 'views/RegisterView';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import PhoneBookView from 'views/PhnebookView';
import MenuAppBar from 'components/MenuAppBar';
import Container from '@mui/material/Container';
import PrivateRoute from 'components/PrivatRoute';
import PublicRoute from 'components/PublicRoute';

import './App.css';

function App() {
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <Container fixed>
        <MenuAppBar />
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<HomeView />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterView />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginView />
                </PublicRoute>
              }
            />
            <Route
              path="/phoneBook"
              element={
                <PrivateRoute>
                  <PhoneBookView />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<HomeView />} />
          </Route>
        </Routes>
      </Container>
    )
  );
}

export default App;
