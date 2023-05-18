import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/confirm.css';
import { Confirm } from '../Confirm/Confirm';

export const SemGroupDeletePage = () => {
  const { id } = useParams();
  const {
    state: { courseId },
  } = useLocation() as any;
  const navigate = useNavigate();

  const handleDeleteSemGroup = (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => {
    axios
      .delete(`seminar-group/${id}`)
      .then(() => {
        navigate(`/subject/${courseId}`);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <main className="main-content">
      <div className="main-content-container">
        <Confirm
          itemId={Number(id)}
          itemTitle="seminar group"
          handler={handleDeleteSemGroup}
          returnPath={`/seminar/${id}`}
        />
      </div>
    </main>
  );
};
