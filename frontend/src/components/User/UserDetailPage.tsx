import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  facultiesAtom,
  loggedInUserAtom,
  semestersAtom,
} from '../../state/atoms';
import '../../styles/userDetail.css';
import { IUserDto } from '../../types/User.dto';
import { UserRole } from '../../types/UserRole';

import NoConnection from '../NoConnection/NoConnection';
import Loading from '../Loading/Loading';
import SubjectPreviewList from '../SubjectPreview/SubjectPreviewList';
import { SubjectPreviewProps } from '../SubjectPreview/SubjectPreview';
import { currentSemesterSelector } from '../../state/selectors';

export interface IUserPageProps {
  userId: number;
}

export const UserDetailPage = () => {
  const [user, setUser] = useState<IUserDto>();
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const [canEdit, setCanEdit] = useState(false);
  const { id } = useParams();
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const semester = useRecoilValue(semestersAtom).find(
    (s) => s.id === user?.semesterId,
  );
  const faculty = useRecoilValue(facultiesAtom).find(
    (s) => s.id === user?.facultyId,
  );
  const currentSemester = useRecoilValue(currentSemesterSelector);
  const [currentSubjects, setCurrentSubjects] = useState<SubjectPreviewProps[]>(
    [],
  );
  const [currentTaughtSubjects, setCurrentTaughtSubjects] = useState<
    SubjectPreviewProps[]
  >([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<IUserDto>(`users/${id}`)
      .then((response) => {
        setUser(response.data);
        setCanEdit(
          loggedInUser?.roles.includes(UserRole.admin) ||
            loggedInUser?.id == id,
        );
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
        setLoading(false);
      });

    axios
      .get(`users/${id}/picture`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setProfilePicture(base64);
        setLoading(false);
      })
      .catch((error_) => {
        setError(error_);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setSubjectsLoading(true);
    axios
      .get(`users/${id}/subjects`, {
        params: {
          semesterId: currentSemester?.id,
        },
      })
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setCurrentSubjects(subjects);
        setSubjectsLoading(false);
      })
      .catch((error_) => {
        setSubjectsLoading(false);
        setError(error_);
      });
    setSubjectsLoading(true);
    axios
      .get(`users/${id}/teacher/subjects`, {
        params: {
          semesterId: currentSemester?.id,
        },
      })
      .then((response: AxiosResponse<SubjectPreviewProps[]>) => {
        const subjects: SubjectPreviewProps[] = response.data;
        setCurrentTaughtSubjects(subjects);
        setSubjectsLoading(false);
      })
      .catch((error_) => {
        setSubjectsLoading(false);
        setError(error_);
      });
  }, [currentSemester]);

  //const canDelete = loggedInUser.roles.includes(UserRole.admin);

  return (
    <main className="main-content">
      <div className="main-content-container">
        {loading && <Loading />}
        {error && <NoConnection />}
        {!error && !loading && (
          <div className="user-detail">
            <div className="user-detail__left-container">
              <img
                className="user-detail__picture"
                src={`data:;base64,${profilePicture}`}
                alt="profile picture"
              />
              <div className="user-detail__personal-info">
                <div>
                  <h1 className="user-detail__name">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <div className="user-detail__id">id: {user?.id}</div>
                </div>
                <div>
                  <div className="user-detail__semester">
                    Current semester: {semester?.semesterType} {semester?.year}
                  </div>
                  <div className="user-detail__faculty">
                    Faculty: {faculty?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="user-detail__right-container">
              <div className="user-detail__vertical-separator" />
              <div className="user-detail__secondary-info">
                <div className="user-detail__controls">
                  {canEdit && (
                    <Link className="user-detail__link" to={`/user/${id}/edit`}>
                      <button className="user-detail__button">
                        Edit profile
                      </button>
                    </Link>
                  )}
                  {loggedInUser?.roles.includes(UserRole.admin) && (
                    <Link
                      className="user-detail__link"
                      to={`/user/${id}/delete`}
                    >
                      <button className="user-detail__button">
                        Delete user
                      </button>
                    </Link>
                  )}
                </div>
                <div className="user-detail__mobile-info">
                  <div className="user-detail__mobile-container">
                    <div>Semester:</div>
                    <div className="user-detail__semester-mobile">
                      {semester?.semesterType} {semester?.year}
                    </div>
                  </div>

                  <div className="user-detail__mobile-container">
                    <div>Faculty:</div>
                    <div className="user-detail__faculty-mobile">
                      {faculty?.name}
                    </div>
                  </div>

                  <div className="user-detail__mobile-container">
                    <div>Email:</div>
                    <div className="user-detail__email-mobile">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="user-detail__email">Email: {user?.email}</div>
              </div>
            </div>
          </div>
        )}

        {subjectsLoading && <Loading />}
        {!subjectsLoading && (
          <SubjectPreviewList
            title={'Subjects taught by this person:'}
            subjects={currentTaughtSubjects}
          />
        )}
        {!subjectsLoading && (
          <SubjectPreviewList
            title={'Subjects this person has:'}
            subjects={currentSubjects}
          />
        )}
      </div>
    </main>
  );
};
