import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import {
  facultiesAtom,
  loggedInUserAtom,
  semestersAtom,
} from '../../state/atoms';
import '../../styles/form.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EndType } from '../../types/EndType';
import { Day } from '../../types/Day';
import { getMinFromString } from '../../utils/TimeUtils';
import { useNavigate } from 'react-router-dom';

export interface SubjectFormInput {
  title: string;
  description: string;
  code: string;
  endType: EndType;
  room: string;
  capacity: number;
  credits: number;
  startSign: Date;
  endSign: Date;
  lectureDay: Day;
  lectureStartTimeMin: number;
  lectureEndTimeMin: number;
  lectureDurationMin: number;
  semesterId: number;
  creatorId: number;
  facultyId: number;
}

const SubjectFormPage = () => {
  const faculties = useRecoilValue(facultiesAtom);
  const semesters = useRecoilValue(semestersAtom);
  const user = useRecoilValue(loggedInUserAtom);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<AxiosError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormInput>();

  const onSubmit: SubmitHandler<SubjectFormInput> = (
    data: SubjectFormInput,
  ) => {
    if (user != null) {
      data.lectureDurationMin =
        data.lectureEndTimeMin - data.lectureStartTimeMin;
      data.creatorId = user.id;
      axios
        .post(`subjects`, {
          ...data,
        })
        .then((response: AxiosResponse<number>) => {
          if (response.status === 201) {
            navigate(`/subject/${response.data}`);
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
        <h1 className="form-header">New subject:</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form__row-container">
            <div className="form__small-container">
              <label htmlFor="code">Code:</label>
              <input
                className={`form__input ${errors.code && ' form__input-error'}`}
                type="text"
                {...register('code', {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
            <div className="form__large-container">
              <label htmlFor="title">Title:</label>
              <input
                className={`form__input ${
                  errors.title && ' form__input-error'
                }`}
                type="text"
                {...register('title', {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
          </div>
          {errors.code && <div className="form__error">Code is required</div>}
          {errors.title && <div className="form__error">Title is required</div>}
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="semesterId">Semester:</label>
              <select
                className={`form__select ${
                  errors.semesterId && ' form__input-error'
                }`}
                id="facultyId"
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
            <div className="form__row-half-container">
              <div className="form__half-container">
                <label htmlFor="credits">Credits:</label>
                <input
                  className={`form__input ${
                    errors.credits && ' form__input-error'
                  }`}
                  type="number"
                  min="0"
                  {...register('credits', {
                    required: true,
                    min: 0,
                  })}
                />
              </div>
              <div className="form__half-container">
                <label htmlFor="endType">End type:</label>
                <select
                  className={`form__select ${
                    errors.endType && ' form__input-error'
                  }`}
                  id="endType"
                  {...register('endType', {
                    required: true,
                    validate: (value) => value.toString() != '...',
                  })}
                >
                  <option value={undefined}>...</option>
                  <option value={EndType.z}>{EndType.z}</option>
                  <option value={EndType.k}>{EndType.k}</option>
                  <option value={EndType.zk}>{EndType.zk}</option>
                </select>
              </div>
            </div>
          </div>
          {errors.semesterId && (
            <div className="form__error">Semester is required</div>
          )}
          {errors.credits && (
            <div className="form__error">Credits are required</div>
          )}
          {errors.endType && (
            <div className="form__error">End type is required</div>
          )}
          <div className="form__row-container">
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
            <div className="form__row-half-container">
              <div className="form__half-container">
                <label htmlFor="room">Room:</label>
                <input
                  className={`form__input ${
                    errors.room && ' form__input-error'
                  }`}
                  type="text"
                  {...register('room', {
                    required: true,
                  })}
                />
              </div>
              <div className="form__half-container">
                <label htmlFor="capacity">Capacity:</label>
                <input
                  className={`form__input ${
                    errors.capacity && ' form__input-error'
                  }`}
                  type="number"
                  min="0"
                  {...register('capacity', {
                    required: true,
                    min: 0,
                  })}
                />
              </div>
            </div>
          </div>
          {errors.facultyId && (
            <div className="form__error">Faculty is required</div>
          )}
          {errors.room && <div className="form__error">Room is required</div>}
          {errors.capacity && (
            <div className="form__error">Capacity is required</div>
          )}
          <div className="form__row-container">
            <div className="form__full-container">
              <label htmlFor="description">Description:</label>
              <textarea
                className={`form__textarea ${
                  errors.description && ' form__input-error'
                }`}
                {...register('description', {
                  required: true,
                })}
              />
            </div>
          </div>
          {errors.description && (
            <div className="form__error">Description is required</div>
          )}
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="startSign">Start sign:</label>
              <input
                type="datetime-local"
                className={`form__datetime ${
                  errors.startSign && ' form__input-error'
                }`}
                {...register('startSign', {
                  required: true,
                  valueAsDate: true,
                  validate: (value) => !isNaN(value.getTime()),
                })}
              />
            </div>
            <div className="form__half-container">
              <label htmlFor="endSign">End sign:</label>
              <input
                type="datetime-local"
                className={`form__datetime ${
                  errors.endSign && ' form__input-error'
                }`}
                {...register('endSign', {
                  validate: (value) => !isNaN(value.getTime()),
                  required: true,
                  valueAsDate: true,
                })}
              />
            </div>
          </div>
          {errors.startSign && (
            <div className="form__error">Sign start is required</div>
          )}
          {errors.endSign && (
            <div className="form__error">Sign end is required</div>
          )}
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="lectureDay">Lecture day: </label>
              <select
                className={`form__select ${
                  errors.lectureDay && ' form__input-error'
                }`}
                id="lectureDay"
                {...register('lectureDay', {
                  validate: (value) => value.toString() != '...',
                  required: true,
                })}
              >
                <option value={undefined}>...</option>
                <option value={Day.monday}>{Day.monday}</option>
                <option value={Day.tuesday}>{Day.tuesday}</option>
                <option value={Day.wednesday}>{Day.wednesday}</option>
                <option value={Day.thursday}>{Day.thursday}</option>
                <option value={Day.friday}>{Day.friday}</option>
                <option value={Day.saturday}>{Day.saturday}</option>
                <option value={Day.sunday}>{Day.sunday}</option>
              </select>
            </div>
            <div className="form__row-half-container">
              <div className="form__half-container">
                <label htmlFor="lectureStartTimeMin">Lecture start:</label>
                <input
                  className={`form__input ${
                    errors.lectureStartTimeMin && ' form__input-error'
                  }`}
                  type="time"
                  {...register('lectureStartTimeMin', {
                    required: true,
                    validate: (value) => value != -1,
                    setValueAs: (value) => getMinFromString(value),
                  })}
                />
              </div>
              <div className="form__half-container">
                <label htmlFor="lectureEndTimeMin">Lecture end:</label>
                <input
                  className={`form__input ${
                    errors.lectureEndTimeMin && ' form__input-error'
                  }`}
                  type="time"
                  {...register('lectureEndTimeMin', {
                    required: true,
                    validate: (value) => value != -1,
                    setValueAs: (value) => getMinFromString(value),
                  })}
                />
              </div>
            </div>
          </div>
          {errors.lectureDay && (
            <div className="form__error">Lecture day is required</div>
          )}
          {errors.lectureStartTimeMin && (
            <div className="form__error">Lecture start is required</div>
          )}
          {errors.lectureEndTimeMin && (
            <div className="form__error">Lecture end is required</div>
          )}
          <button className="form__submit-button" type="submit">
            Create subject
          </button>
        </form>
        {requestError && (
          <div className="form__error">Error while creating course</div>
        )}
      </div>
    </main>
  );
};
export default SubjectFormPage;
