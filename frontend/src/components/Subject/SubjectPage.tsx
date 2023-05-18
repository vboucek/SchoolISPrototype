import React, { useState } from 'react';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { useRecoilValue } from 'recoil';
import { facultiesAtom, semestersAtom } from '../../state/atoms';
import '../../styles/filter.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';

export interface SubjectFilterFormInput {
  facultyId: string;
  semesterId: string;
  code: string;
  title: string;
  creditsMin: string;
  creditsMax: string;
}

const SubjectPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const faculties = useRecoilValue(facultiesAtom);
  const semesters = useRecoilValue(semestersAtom);
  const [subjects, setSubjects] = useState<SubjectPreviewProps[]>([]);
  const { register, handleSubmit } = useForm<SubjectFilterFormInput>();
  const [hasSubject, setHasSubject] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SubjectFilterFormInput> = (
    data: SubjectFilterFormInput,
  ) => {
    setLoading(true);
    axios
      .get(`subjects/previews`, {
        params: {
          title: data.title === '' ? undefined : data.title,
          facultyId: data.facultyId === '' ? undefined : data.facultyId,
          semesterId: data.semesterId === '' ? undefined : data.semesterId,
          code: data.code === '' ? undefined : data.code,
          creditsMin: data.creditsMin === '' ? undefined : data.creditsMin,
          creditsMax: data.creditsMax === '' ? undefined : data.creditsMax,
        },
      })
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setSubjects(subjects);
        setHasSubject(subjects.length > 0);
        setLoading(false);
      })
      .catch((error_) => {
        setLoading(false);
        setError(error_);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <form onSubmit={handleSubmit(onSubmit)} className="filter-container">
          <div className="filter">
            <div className="filter__input-container">
              <select
                className="filter__select"
                placeholder="Faculty"
                id="facultyId"
                {...register('facultyId', {
                  required: false,
                })}
              >
                <option value="">Faculty</option>
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter__input-container">
              <select
                className="filter__select"
                placeholder="Semester"
                id="semesterId"
                {...register('semesterId', {
                  required: false,
                })}
              >
                <option value="">Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.semesterType} {s.year}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Subject Code"
                type="text"
                {...register('code', {
                  required: false,
                })}
              />
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Subject Name"
                type="text"
                {...register('title', {
                  required: false,
                })}
              />
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Min Credits"
                type="number"
                {...register('creditsMin', {
                  required: false,
                })}
              />
            </div>
            <div className="filter__input-container">
              <input
                className="filter__field"
                placeholder="Max Credits"
                type="number"
                {...register('creditsMax', {
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
        {!loading && !error && hasSubject && (
          <SubjectPreviewList title={'Subjects:'} subjects={subjects} />
        )}
        {!hasSubject && (
          <div className="info"> No courses match specified filter. </div>
        )}
      </div>
    </main>
  );
};
export default SubjectPage;
