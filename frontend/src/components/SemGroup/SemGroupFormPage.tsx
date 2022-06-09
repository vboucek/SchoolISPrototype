import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import '../../styles/form.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Day } from '../../types/Day';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NoConnection from '../NoConnection/NoConnection';
import {
  convertDtoToInput,
  convertInputToDto,
} from '../../utils/SemGroupFormHelpMappers';

export interface SemGroupFormInput {
  name: string;
  seminarGroupDay: Day;
  seminarGroupStartTimeMin: string;
  seminarGroupEndTimeMin: string;
  room: string;
  capacity: number;
}

export interface SemGroupFormProps {
  edit: boolean;
}

export const SemGroupFormPage = ({ edit }: SemGroupFormProps) => {
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<AxiosError>();
  const [defaultValues, setDefaultValues] = useState<SemGroupFormInput>();

  const { id } = useParams();
  const {
    state: { courseId },
  } = useLocation() as any;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SemGroupFormInput>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (edit) {
      axios
        .get(`seminar-group/${id}`)
        .then((response: AxiosResponse) => {
          const group = response.data;
          const inputValues = convertDtoToInput(group);
          setDefaultValues(inputValues);
          reset(inputValues);
        })
        .catch((error) => {
          setRequestError(error);
        });
    }
  }, []);

  const onCreate: SubmitHandler<SemGroupFormInput> = (
    data: SemGroupFormInput,
  ) => {
    const group = convertInputToDto(data, courseId);
    axios
      .post(`seminar-group`, {
        ...group,
      })
      .then((response: AxiosResponse<number>) => {
        navigate(`/seminar/${response.data}`);
      })
      .catch((error) => {
        setRequestError(error);
      });
  };

  const onEdit: SubmitHandler<SemGroupFormInput> = (
    data: SemGroupFormInput,
  ) => {
    const group = convertInputToDto(data, courseId);
    axios
      .put(`seminar-group/${id}`, {
        ...group,
      })
      .then(() => {
        navigate(`/seminar/${id}`);
      })
      .catch((error) => {
        setRequestError(error);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <h1 className="form-header">{edit ? 'Edit' : 'New'} seminar group:</h1>
        <form
          onSubmit={handleSubmit(edit ? onEdit : onCreate)}
          className="form"
        >
          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="name">Name:</label>
              <input
                className={`form__input ${errors.name && ' form__input-error'}`}
                type="text"
                {...register('name', { required: true, minLength: 3 })}
              />
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
                    valueAsNumber: true,
                    required: true,
                    min: 0,
                  })}
                />
              </div>
            </div>
          </div>

          {errors.name && <div className="form__error">Name is required</div>}
          {errors.room && <div className="form__error">Room is required</div>}
          {errors.capacity && (
            <div className="form__error">Capacity is required</div>
          )}

          <div className="form__row-container">
            <div className="form__half-container">
              <label htmlFor="seminarDay">Seminar day: </label>
              <select
                className={`form__select ${
                  errors.seminarGroupDay && ' form__input-error'
                }`}
                id="seminarDay"
                {...register('seminarGroupDay', {
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
                <label htmlFor="seminarGroupStartTimeMin">Seminar start:</label>
                <input
                  className={`form__input ${
                    errors.seminarGroupStartTimeMin && ' form__input-error'
                  }`}
                  id="seminarGroupStartTimeMin"
                  type="time"
                  {...register('seminarGroupStartTimeMin', {
                    required: true,
                  })}
                />
              </div>
              <div className="form__half-container">
                <label htmlFor="seminarGroupEndTimeMin">Seminar end:</label>
                <input
                  className={`form__input ${
                    errors.seminarGroupEndTimeMin && ' form__input-error'
                  }`}
                  id="seminarGroupEndTimeMin"
                  type="time"
                  {...register('seminarGroupEndTimeMin', {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>

          {errors.seminarGroupDay && (
            <div className="form__error">Seminar day is required</div>
          )}
          {errors.seminarGroupStartTimeMin && (
            <div className="form__error">Seminar start is required</div>
          )}
          {errors.seminarGroupEndTimeMin && (
            <div className="form__error">Seminar end is required</div>
          )}
          <button className="form__submit-button" type="submit">
            {edit ? 'Edit' : 'Create'} subject
          </button>
        </form>
        {requestError && <NoConnection />}
      </div>
    </main>
  );
};
