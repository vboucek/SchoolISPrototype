import React, { useEffect, useState } from 'react';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInUserAtom, userSubjectsAtom } from '../../state/atoms';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import { subjectsInSemesterSelector } from '../../state/selectors';

const MainPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(loggedInUserAtom);
  const setSubjects = useSetRecoilState(userSubjectsAtom);
  const currentSubjects = useRecoilValue(subjectsInSemesterSelector);
  const [hasSubjects, setHasSubjects] = useState<boolean>(false);

  useEffect(() => {
    setHasSubjects(currentSubjects.length > 0);
  }, [currentSubjects]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`users/${user?.id}/subjects`)
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setSubjects(subjects);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  }, [user]);

  return (
    <main className="main-content">
      <div className="main-content-container">
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && hasSubjects && (
          <SubjectPreviewList
            title={'My subjects overview:'}
            subjects={currentSubjects}
          />
        )}
        {!hasSubjects && (
          <div className="subject">
            <span className="subject__header">{'My subjects overview:'}</span>
            <div className="info">
              You have no courses enrolled in this semester.
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default MainPage;
