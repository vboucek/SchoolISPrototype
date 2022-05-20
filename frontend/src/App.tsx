import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Pages from './components/Pages';
import { BrowserRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from './state/atoms';
import LoginPage from './components/Login/LoginPage';
import axios from 'axios';

const App = () => {
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const [logged, setLogged] = useState(false);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setLogged(loggedInUser != null);
  }, [loggedInUser]);

  if (!logged) {
    return (
      <BrowserRouter>
        <LoginPage />;
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="content">
        <Header />
        <Navigation />
        <Pages />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
