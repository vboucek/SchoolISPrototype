import React, { useEffect, useState } from 'react';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { useRecoilValue } from 'recoil';
import { loggedInUserAtom } from '../../state/atoms';
import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';

const MainPage = () => {
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(loggedInUserAtom);
  const [subjects, setSubjects] = useState<SubjectPreviewProps[]>([]);

  useEffect(() => {
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

  if (error) {
    return <NoConnection />;
  }

  return (
    <main className="main-content">
      <div className="main-content-container">
        {loading && <Loading />}
        {!loading && (
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
