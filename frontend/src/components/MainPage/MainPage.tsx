import React, { useEffect, useState } from 'react';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { useRecoilValue } from 'recoil';
import { facultiesAtom, loggedInUserAtom } from '../../state/atoms';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import { currentSemesterSelector } from '../../state/selectors';

const MainPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(loggedInUserAtom);
  const currentSemester = useRecoilValue(currentSemesterSelector);

  const [subjects, setSubjects] = useState<SubjectPreviewProps[]>([]);

  useEffect(() => {
    if (currentSemester == null) {
      return;
    }
    setLoading(true);

    axios
      .post(`users/${user?.id}/subjects`, {
        semesterId: currentSemester.id,
      })
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setSubjects(subjects);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
      });
  }, [user, currentSemester]);

  return (
    <main className="main-content">
      <div className="main-content-container">
        {error && <NoConnection />}
        {loading && <Loading />}
        {!loading && !error && (
          <SubjectPreviewList
            title={'My subjects overview:'}
            subjects={subjects}
          />
        )}
      </div>
    </main>
  );
};
export default MainPage;
