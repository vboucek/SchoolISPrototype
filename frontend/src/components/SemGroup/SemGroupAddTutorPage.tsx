import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import '../../styles/filter.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import { SemGroupUserPreviewProps } from './SemGroupUserPreview';
import SemGroupTutorPreviewList from './SemGroupTutorPreviewList';

export interface TutorFilterFormInput {
  firstName: string;
  lastName: string;
}

export const SemGroupAddTutorPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<SemGroupUserPreviewProps[]>([]);
  const { register, handleSubmit } = useForm<TutorFilterFormInput>();
  const { id } = useParams();

  const onSubmit: SubmitHandler<TutorFilterFormInput> = (
    data: TutorFilterFormInput,
  ) => {
    setLoading(true);
    axios
      .get(`seminar-group/${id}/tutor`, { params: data })
      .then((response: AxiosResponse<SemGroupUserPreviewProps[]>) => {
        const tutors: SemGroupUserPreviewProps[] = response.data;
        setTutors(tutors);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <h1 className="filter-header">Add tutor:</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="filter-container">
          <div className="filter">
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="First Name"
                type="text"
                {...register('firstName', {
                  required: false,
                })}
              />
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Last Name"
                type="text"
                {...register('lastName', {
                  required: false,
                })}
              />
            </div>
          </div>
          <button className="filter__submit" type="submit">
            Filter
          </button>
        </form>
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <SemGroupTutorPreviewList
            title={'Available tutors:'}
            tutors={tutors}
          />
        )}
      </div>
    </main>
  );
};
