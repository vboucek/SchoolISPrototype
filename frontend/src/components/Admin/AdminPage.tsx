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
  const [foundUsers, setFoundUsers] = useState<boolean>(false);
  const [hasFaculty, setHasFaculty] = useState<boolean>(false);
  const [hasSemesters, setHasSemesters] = useState<boolean>(false);

  useEffect(() => {
    setHasFaculty(faculties.length > 0);
  }, [faculties]);

  useEffect(() => {
    setHasSemesters(semesters.length > 0);
  }, [semesters]);

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
          setUsers(users);
          setFoundUsers(users.length > 0);
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
        <FacultyPreviewList
          title={'Faculties:'}
          faculties={faculties}
          hasFaculty={hasFaculty}
        />
        <SemesterPreviewList
          title={'Semesters:'}
          semesters={semesters}
          hasSemesters={hasSemesters}
        />
        <UserPreviewList
          title={'Users:'}
          users={users}
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          foundUsers={foundUsers}
        />
        {loading && <Loading />}
      </div>
    </main>
  );
};
