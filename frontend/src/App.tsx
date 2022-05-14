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
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  console.log("data");

  useEffect(() => {
    const dataGod : IAuthDto = {
      email : "god@gmail.com",
      password : "password123"
    };

    const dataUser : IAuthDto = {
      email : "speed.demon@gmail.com",
      password : "C#isSuperiorToJS"
    };

    axios.defaults.withCredentials = true;
    console.log("Useeffect");
    axios.post<IUserDto>(`http://localhost:4000/auth/login`, dataUser)
      .then(response => {
        console.log("Odpoved");
        console.log(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.log("error");
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
