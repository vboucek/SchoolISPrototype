import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInUserAtom, semestersAtom } from '../../state/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/form.css';
import { SemesterType } from '../../types/SemesterType';
import { ISemesterDto } from '../../types/Semester.dto';

export interface SemesterFormPageInput {
  year: number;
  semesterType: SemesterType;
}

export interface SemesterFormPageProps {
  edit: boolean;
}

export const SemesterFormPage = ({ edit }: SemesterFormPageProps) => {
  const user = useRecoilValue(loggedInUserAtom);
  const navigate = useNavigate();
  const [semesters, setSemesters] = useRecoilState(semestersAtom);
  const [error, setError] = useState(false);
  const [alreadyExistError, setAlreadyExistError] = useState<AxiosError>();
  const [defaultValues, setDefaultValues] = useState<SemesterFormPageInput>();
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SemesterFormPageInput>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      const semester = semesters.find((s) => s.id === Number(id));

      if (semester != null) {
        setDefaultValues(semester);
        reset(semester);
      } else {
        setError(true);
      }
    }
  }, []);

  const onCreate: SubmitHandler<SemesterFormPageInput> = (
    data: SemesterFormPageInput,
  ) => {
    if (user != null) {
      axios
        .post(`semesters`, {
          ...data,
        })
        .then((response: AxiosResponse<ISemesterDto>) => {
          if (response.status === 201) {
            const newSemesters = [...semesters, response.data];
            setSemesters(newSemesters);
            navigate(`/admin`);
          }
        })
        .catch((error_: AxiosError) => {
          if (error_.response?.data.message.includes('exists')) {
            setAlreadyExistError(error_);
          } else {
            setError(true);
          }
        });
    }
  };

  const onEdit: SubmitHandler<SemesterFormPageInput> = (
    data: SemesterFormPageInput,
  ) => {
    if (user != null) {
      axios
        .patch(`semesters/${id}`, {
          ...data,
        })
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            const newSemesters = [
              ...semesters.filter((f) => f.id != Number(id)),
              response.data,
            ].sort((f) => f.id);
            setSemesters(newSemesters);
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
        <h1 className="form-header">{edit ? 'Edit' : 'New'} semester:</h1>
        <form
          onSubmit={handleSubmit(edit ? onEdit : onCreate)}
          className="form"
        >
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="firstName">Year:</label>
              <input
                className={`form__input ${errors.year && ' form__input-error'}`}
                id="year"
                min="2000"
                max="10000"
                type="number"
                {...register('year', {
                  required: true,
                  valueAsNumber: true,
                  minLength: 4,
                  maxLength: 4,
                })}
              />
            </div>
            <div className="form__half-container">
              <label htmlFor="firstName">Semester type:</label>
              <select
                className={`form__select ${
                  errors.semesterType && ' form__input-error'
                }`}
                id="semesterType"
                {...register('semesterType', {
                  required: true,
                  validate: (value) => value.toString() != '...',
                })}
              >
                <option value={undefined}>...</option>
                <option key={SemesterType.summer} value={SemesterType.summer}>
                  {SemesterType.summer}
                </option>
                <option key={SemesterType.winter} value={SemesterType.winter}>
                  {SemesterType.winter}
                </option>
              </select>
            </div>
          </div>
          {errors.year && <div className="form__error">Year is required</div>}
          {errors.semesterType && (
            <div className="form__error">Semester type is required</div>
          )}
          {alreadyExistError && (
            <div className="form__error">This semester already exists!</div>
          )}
          <button className="form__submit-button" type="submit">
            {edit ? 'Edit' : 'Create'} semester
          </button>
        </form>
        {error && !alreadyExistError && <NoConnection />}
      </div>
    </main>
  );
};
