import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  facultiesAtom,
  loggedInUserAtom,
  semestersAtom,
} from '../../state/atoms';
import '../../styles/form.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import { UserRole } from '../../types/UserRole';
import FormData from 'form-data';
import { IUserDto } from '../../types/User.dto';

export interface UserFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string | undefined;
  roles: UserRole[];
  teacher: boolean;
  admin: boolean;
  facultyId: number;
  semesterId: number;
  profilePicture: FileList;
}

export interface UserFormProps {
  edit: boolean;
}

const UserFormPage = ({ edit }: UserFormProps) => {
  const faculties = useRecoilValue(facultiesAtom);
  const semesters = useRecoilValue(semestersAtom);
  const [user, setUser] = useRecoilState(loggedInUserAtom);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<AxiosError>();
  const [defaultValues, setDefaultValues] = useState<UserFormInput>();
  const { id } = useParams();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInput>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      axios
        .get(`users/${id}`)
        .then((response: AxiosResponse) => {
          const user: UserFormInput = response.data;
          user.teacher = user.roles.includes(UserRole.teacher);
          user.admin = user.roles.includes(UserRole.admin);
          setDefaultValues(user);
          reset(user);
        })
        .catch((error_) => {
          setRequestError(error_);
        });
    }
  }, []);

  const sendPicture = (picture: File, id: number): boolean => {
    const data = new FormData();
    data.append('picture', picture, picture.name);
    axios.post(`users/${id}/picture`, data).catch((error_) => {
      setRequestError(error_);
      return false;
    });
    return true;
  };

  const setRoles = (input: UserFormInput) => {
    const newRoles: UserRole[] = [];

    if (input.teacher) {
      newRoles.push(UserRole.teacher);
    }
    if (input.admin) {
      newRoles.push(UserRole.admin);
    }

    input.roles = newRoles;
  };

  const onCreate: SubmitHandler<UserFormInput> = (data: UserFormInput) => {
    if (user != null) {
      setRoles(data);

      axios
        .post(`users`, {
          ...data,
        })
        .then((response: AxiosResponse<IUserDto>) => {
          if (response.status === 201) {
            const file = data.profilePicture.item(0);
            if (file != null) {
              if (!sendPicture(file, response.data.id)) {
                return;
              }
            }
            navigate(`/user/${response.data.id}`);
          }
        })
        .catch((error_) => {
          setRequestError(error_);
        });
    }
  };

  const onEdit: SubmitHandler<UserFormInput> = (data: UserFormInput) => {
    if (user?.roles.includes(UserRole.admin)) {
      setRoles(data);
    }

    if (data.password === '') {
      data.password = undefined;
    }

    const file = data.profilePicture.item(0);
    if (file != null) {
      if (!sendPicture(file, Number(id))) {
        return;
      }
    }

    if (user != null) {
      axios
        .patch(`users/${id}`, {
          ...data,
        })
        .then((response: AxiosResponse<number>) => {
          if (response.status === 200) {
            if (Number(id) === user.id) {
              setSuccess(true);

              setTimeout(function () {
                axios.post(`http://localhost:4000/auth/logout`).then(() => {
                  setUser(null);
                });
              }, 3000);
            } else {
              navigate(`/user/${id}`);
            }
          }
        })
        .catch((error_) => {
          setRequestError(error_);
        });
    }
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <h1 className="form-header">{edit ? 'Edit' : 'New'} user:</h1>
        <form
          onSubmit={handleSubmit(edit ? onEdit : onCreate)}
          className="form"
        >
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="firstName">First name:</label>
              <input
                className={`form__input ${
                  errors.firstName && ' form__input-error'
                }`}
                id="firstName"
                type="text"
                {...register('firstName', {
                  required: true,
                  minLength: 2,
                  maxLength: 35,
                })}
              />
            </div>
            <div className="form__half-container">
              <label htmlFor="lastName">Last name:</label>
              <input
                className={`form__input ${
                  errors.lastName && ' form__input-error'
                }`}
                id="lastName"
                type="text"
                {...register('lastName', {
                  required: true,
                  minLength: 2,
                  maxLength: 35,
                })}
              />
            </div>
          </div>
          {errors.firstName && (
            <div className="form__error">First name is required</div>
          )}
          {errors.lastName && (
            <div className="form__error">Last name is required</div>
          )}
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="email">Email:</label>
              <input
                className={`form__input ${
                  errors.email && ' form__input-error'
                }`}
                id="email"
                type="email"
                {...register('email', {
                  required: true,
                  minLength: 2,
                  maxLength: 35,
                })}
              />
            </div>
            <div className="form__half-container">
              <label htmlFor="password">Password:</label>
              <input
                className={`form__input ${
                  errors.password && ' form__input-error'
                }`}
                id="password"
                type="password"
                {...register('password', {
                  required: !edit || !user?.roles.includes(UserRole.admin),
                  minLength: 5,
                  maxLength: 35,
                })}
              />
            </div>
          </div>
          {errors.email && <div className="form__error">Email is required</div>}
          {errors.password && (
            <div className="form__error">Password is required</div>
          )}
          {user?.roles.includes(UserRole.admin) && (
            <>
              <div className="form__row-container">
                <div className="form__half-container">
                  <label htmlFor="semesterId">Semester:</label>
                  <select
                    className={`form__select ${
                      errors.semesterId && ' form__input-error'
                    }`}
                    id="semesterId"
                    {...register('semesterId', {
                      required: true,
                      validate: (value) => !isNaN(value),
                      valueAsNumber: true,
                    })}
                  >
                    <option value={undefined}>...</option>
                    {semesters.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.semesterType} {s.year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form__half-container">
                  <label htmlFor="facultyId">Faculty:</label>
                  <select
                    className={`form__select ${
                      errors.facultyId && ' form__input-error'
                    }`}
                    id="facultyId"
                    {...register('facultyId', {
                      required: true,
                      valueAsNumber: true,
                      validate: (value) => !isNaN(value),
                    })}
                  >
                    <option value={undefined}>...</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.semesterId && (
                <div className="form__error">Semester is required</div>
              )}
              {errors.facultyId && (
                <div className="form__error">Faculty is required</div>
              )}
            </>
          )}
          <div className="form__row-container">
            {user?.roles.includes(UserRole.admin) && (
              <div className="form__half-container">
                <label htmlFor="roles">Roles:</label>
                <div className="form__checkbox-container">
                  <div className="form__checkbox-container">
                    <input
                      className="form__checkbox"
                      id="teacher"
                      type="checkbox"
                      {...register('teacher', {})}
                    />
                    <span className="form__checkbox-title">Teacher</span>
                  </div>
                  <div className="form__checkbox-container">
                    <input
                      className="form__checkbox"
                      id="admin"
                      type="checkbox"
                      {...register('admin', {})}
                    />
                    <span className="form__checkbox-title">Admin</span>
                  </div>
                </div>
              </div>
            )}
            <div
              className={
                user?.roles.includes(UserRole.admin)
                  ? 'form__half-container'
                  : 'form__full-container'
              }
            >
              <label htmlFor="profilePicture">Profile picture:</label>
              <input
                className="form__file-input"
                id="profilePicture"
                type="file"
                accept="image/*"
                {...register('profilePicture', {})}
              />
            </div>
          </div>
          {!success && (
            <button className="form__submit-button" type="submit">
              {edit ? 'Edit' : 'Create'} user
            </button>
          )}
        </form>
        {requestError && <NoConnection />}
        {edit && success && (
          <div className="form__success-container">
            <div className="form__redirect">test</div>
            <div className="form__success-message">
              Edit successful, please log in again...
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default UserFormPage;
