import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/confirm.css';
import { Confirm } from '../Confirm/Confirm';

export const UserDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteUser = (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => {
    axios
      .delete(`/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
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
          itemTitle="user"
          handler={handleDeleteUser}
          returnPath={`/user/${id}`}
        />
      </div>
    </main>
  );
};
