import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/confirm.css';
import { Confirm } from '../Confirm/Confirm';
import { useRecoilState } from 'recoil';
import { facultiesAtom } from '../../state/atoms';

export const FacultyDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculties, setFaculties] = useRecoilState(facultiesAtom);

  const handleDeleteFaculty = (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => {
    axios
      .delete(`faculties/${id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setFaculties(faculties.filter((f) => f.id != Number(id)));
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
          itemTitle="faculty"
          handler={handleDeleteFaculty}
          returnPath={`/admin`}
        />
      </div>
    </main>
  );
};
