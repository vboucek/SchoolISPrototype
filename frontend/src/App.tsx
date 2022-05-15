import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Pages from './components/Pages';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import { IUserDto } from './types/User.dto';
import { IAuthDto } from './types/Auth.dto';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUserAtom } from './state/atoms';

const App = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL=`${import.meta.env.VITE_BASE_URL}`;

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
