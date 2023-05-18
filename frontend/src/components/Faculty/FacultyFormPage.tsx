import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import { useRecoilState, useRecoilValue } from 'recoil';
import { facultiesAtom, loggedInUserAtom } from '../../state/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/form.css';
import { IFacultyDto } from '../../types/Faculty.dto';

export interface FacultyFormPageInput {
  name: string;
}

export interface FacultyFormPageProps {
  edit: boolean;
}

export const FacultyFormPage = ({ edit }: FacultyFormPageProps) => {
  const user = useRecoilValue(loggedInUserAtom);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useRecoilState(facultiesAtom);
  const [error, setError] = useState(false);
  const [alreadyExistError, setAlreadyExistError] = useState<AxiosError>();
  const [defaultValues, setDefaultValues] = useState<FacultyFormPageInput>();
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FacultyFormPageInput>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      const faculty = faculties.find((f) => f.id === Number(id));

      if (faculty != null) {
        setDefaultValues(faculty);
        reset(faculty);
      } else {
        setError(true);
      }
    }
  }, []);

  const onCreate: SubmitHandler<FacultyFormPageInput> = (
    data: FacultyFormPageInput,
  ) => {
    if (user != null) {
      axios
        .post(`faculties`, {
          ...data,
        })
        .then((response: AxiosResponse<IFacultyDto>) => {
          if (response.status === 201) {
            const newFaculties = [...faculties, response.data];
            setFaculties(newFaculties);
            navigate(`/admin`);
          }
        })
        .catch((error_) => {
          if (error_.response?.data.message.includes('exists')) {
            setAlreadyExistError(error_);
          } else {
            setError(true);
          }
        });
    }
  };

  const onEdit: SubmitHandler<FacultyFormPageInput> = (
    data: FacultyFormPageInput,
  ) => {
    if (user != null) {
      axios
        .patch(`faculties/${id}`, {
          ...data,
        })
        .then((response: AxiosResponse<IFacultyDto>) => {
          if (response.status === 200) {
            const newFaculties = [
              ...faculties.filter((f) => f.id != Number(id)),
              response.data,
            ].sort((f) => f.id);
            setFaculties(newFaculties);
            navigate(`/admin`);
          }
        })
        .catch((error_) => {
          if (error_.response?.data.message.includes('exists')) {
            setAlreadyExistError(error_);
          } else {
            setError(true);
          }
        });
    }
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <h1 className="form-header">{edit ? 'Edit' : 'New'} faculty:</h1>
        <form
          onSubmit={handleSubmit(edit ? onEdit : onCreate)}
          className="form"
        >
          <div className="form__row-container">
            <div className="form__full-container">
              <label htmlFor="firstName">Name:</label>
              <input
                className={`form__input ${errors.name && ' form__input-error'}`}
                id="name"
                type="text"
                {...register('name', {
                  required: true,
                  minLength: 2,
                  maxLength: 35,
                })}
              />
            </div>
          </div>
          {errors.name && (
            <div className="form__error">Faculty name is required</div>
          )}
          {alreadyExistError && (
            <div className="form__error">This faculty already exists!</div>
          )}
          <button className="form__submit-button" type="submit">
            {edit ? 'Edit' : 'Create'} faculty
          </button>
        </form>
        {error && !alreadyExistError && <NoConnection />}
      </div>
    </main>
  );
};
