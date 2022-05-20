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
        {!loading && !error && (
          <SubjectPreviewList
            title={'My subjects overview:'}
            subjects={currentSubjects}
          />
        )}
      </div>
    </main>
  );
};
export default MainPage;
