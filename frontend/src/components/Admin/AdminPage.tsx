import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { facultiesAtom, semestersAtom } from '../../state/atoms';
import SemesterPreviewList from '../SemesterPreview/SemesterPreviewList';
import UserPreviewList from '../UserPreview/UserPreviewList';
import { UserPreviewProps } from '../UserPreview/UserPreview';
import Loading from '../Loading/Loading';
import NoConnection from '../NoConnection/NoConnection';
import FacultyPreviewList from '../FacultyPreview/FacultyPreviewList';

export const AdminPage = () => {
  const faculties = useRecoilValue(facultiesAtom);
  const semesters = useRecoilValue(semestersAtom);
  const [users, setUsers] = useState<UserPreviewProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [selectedLetter, setSelectedLetter] = useState<string>();

  useEffect(() => {
    if (selectedLetter != undefined) {
      setLoading(true);
      axios
        .get(`users`, {
          params: {
            lastnameLetter: selectedLetter,
          },
        })
        .then((response: AxiosResponse<UserPreviewProps[]>) => {
          const users: UserPreviewProps[] = response.data;
          console.log(users);
          setUsers(users);
          setLoading(false);
        })
        .catch((error_) => {
          setLoading(false);
          setError(error_);
        });
    }
  }, [selectedLetter]);

  if (error) {
    return <NoConnection />;
  }

  return (
    <main className="main-content">
      <div className="main-content-container">
        <FacultyPreviewList title={'Faculties:'} faculties={faculties} />
        <SemesterPreviewList title={'Semesters:'} semesters={semesters} />
        <UserPreviewList
          title={'Users:'}
          users={users}
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
        />
        {loading && <Loading />}
      </div>
    </main>
  );
};
