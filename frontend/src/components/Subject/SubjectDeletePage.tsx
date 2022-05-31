import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/confirm.css';
import { Confirm } from '../Confirm/Confirm';

export const SubjectDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteSubject = (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => {
    axios
      .delete(`subjects/${id}`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          navigate('/subject');
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
          itemTitle="subject"
          handler={handleDeleteSubject}
          returnPath={`/subject/${id}`}
        />
      </div>
    </main>
  );
};
