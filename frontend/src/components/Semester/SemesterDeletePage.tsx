import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/confirm.css';
import { Confirm } from '../Confirm/Confirm';
import { useRecoilState } from 'recoil';
import { semestersAtom } from '../../state/atoms';

export const SemesterDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [semesters, setSemesters] = useRecoilState(semestersAtom);

  const handleDeleteSemester = (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => {
    axios
      .delete(`semesters/${id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setSemesters(semesters.filter((f) => f.id != Number(id)));
          navigate('/admin');
        }
      })
      .catch((error_) => {
        setError(error_);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <Confirm
          itemId={Number(id)}
          itemTitle="semester"
          handler={handleDeleteSemester}
          returnPath={`/admin`}
        />
      </div>
    </main>
  );
};
