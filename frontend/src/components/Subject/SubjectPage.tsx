import React, { useState } from 'react';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { useRecoilValue } from 'recoil';
import { facultiesAtom, semestersAtom } from '../../state/atoms';
import '../../styles/subjectsFilter.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';

export interface SubjectFilterFormInput {
  facultyId: number;
  semesterId: number;
  code: string;
  title: string;
  creditsMin: number;
  creditsMax: number;
}

const SubjectPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const faculties = useRecoilValue(facultiesAtom);
  const semesters = useRecoilValue(semestersAtom);
  const [subjects, setSubjects] = useState<SubjectPreviewProps[]>([]);
  const { register, handleSubmit } = useForm<SubjectFilterFormInput>();

  const onSubmit: SubmitHandler<SubjectFilterFormInput> = (
    data: SubjectFilterFormInput,
  ) => {
    setLoading(true);
    console.log(data);
    axios
      .post(`subjects/previews`, {
        ...data,
      })
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setSubjects(subjects);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="subject-filter-container"
        >
          <div className="subject-filter">
            <div className="subject-filter__input-container">
              <select
                className="subject-filter__select"
                placeholder="Faculty"
                id="facultyId"
                {...register('facultyId', {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value={undefined}>Faculty</option>
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="subject-filter__input-container">
              <select
                className="subject-filter__select"
                placeholder="Semester"
                id="facultyId"
                {...register('semesterId', {
                  required: false,
                  valueAsNumber: true,
                })}
              >
                <option value={undefined}>Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.semesterType} {s.year}
                  </option>
                ))}
              </select>
            </div>
            <div className="subject-filter__input-container">
              <input
                className="subject-filter__field"
                placeholder="Subject Code"
                type="text"
                {...register('code', {
                  required: false,
                })}
              />
            </div>
            <div className="subject-filter__input-container">
              <input
                className="subject-filter__field"
                placeholder="Subject Name"
                type="text"
                {...register('title', {
                  required: false,
                })}
              />
            </div>
            <div className="subject-filter__input-container">
              <input
                className="subject-filter__field"
                placeholder="Min Credits"
                type="number"
                {...register('creditsMin', {
                  required: false,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="subject-filter__input-container">
              <input
                className="subject-filter__field"
                placeholder="Max Credits"
                type="number"
                {...register('creditsMax', {
                  required: false,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <button className="subject-filter__submit" type="submit">
            Filter
          </button>
        </form>
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <SubjectPreviewList title={'Subjects:'} subjects={subjects} />
        )}
      </div>
    </main>
  );
};
export default SubjectPage;
