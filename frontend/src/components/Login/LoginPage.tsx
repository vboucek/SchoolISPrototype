import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/login.css';
import logo from '/assets/logo.svg';
import axios, { AxiosError } from 'axios';
import { IUserDto } from '../../types/User.dto';
import { useSetRecoilState } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import { useNavigate } from 'react-router-dom';

export interface LoginFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);
  const [loginError, setLoginError] = useState<AxiosError>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = (data: LoginFormInput) => {
    axios.defaults.withCredentials = true;
    axios
      .post<IUserDto>('auth/login', data)
      .then((response) => {
        setLoggedInUser(response.data);
        navigate('/');
      })
      .catch((_error) => {
        setLoginError(_error);
      });
  };

  return (
    <div className="login-container">
      <img className="logo-login" src={logo} alt="logo" />

      <h1 className="login-header">Login:</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field-container">
          <label htmlFor="email">Email:</label>
          <input
            className={`text-field ${errors.email && 'text-field--error'}`}
            type="email"
            {...register('email', {
              required: true,
            })}
          />
        </div>
        {errors.email && <p className="error-message">Email is required</p>}

        <div className="field-container">
          <label htmlFor="password">Password:</label>
          <input
            className={`text-field ${errors.password && 'text-field--error'}`}
            type="password"
            {...register('password', {
              required: true,
            })}
          />
        </div>
        {errors.password && (
          <p className="error-message">Password is required</p>
        )}

        <div className="submit-button-container">
          <button className="submit-button" type="submit">
            Login
          </button>
        </div>
        {loginError && <p className="error-message">Invalid login details!</p>}
      </form>
    </div>
  );
};

export default LoginPage;
