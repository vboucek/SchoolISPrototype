import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Pages from './components/Pages';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import { IUserDto } from './types/User.dto';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUserAtom } from './state/atoms';

const App = () => {
  const setUser = useSetRecoilState(loggedInUserAtom);
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL=`${import.meta.env.VITE_BASE_URL}`;

  useEffect(() => {
    axios.get<IUserDto>(`users/me`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setUser(null);

      });
  }, []);

  return (
    <BrowserRouter>
      <div className="content">
        <Header />
        <Navigation />
        <Pages />
      </div>
      <Footer />
    </BrowserRouter>);
}

export default App;
