import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/confirm.css';
import { useState } from 'react';

export interface ConfirmationProps {
  itemId: number;
  itemTitle: string;
  handler: (
    id: number,
    setError: (
      value:
        | ((prevState: AxiosError | undefined) => AxiosError | undefined)
        | AxiosError
        | undefined,
    ) => void,
  ) => void;
  returnPath: string;
}

export const Confirm = ({
  itemId,
  itemTitle,
  handler,
  returnPath,
}: ConfirmationProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<AxiosError>();

  return (
    <div className="confirm-container">
      <h1 className="confirm__header">
        Do you really want to delete this {itemTitle}?
      </h1>
      <div className="confirm__controls">
        <button
          onClick={() => handler(itemId, setError)}
          className="confirm__button"
        >
          Yes
        </button>
        <button
          onClick={() => navigate(returnPath)}
          className="confirm__button"
        >
          No
        </button>
      </div>
      {error && (
        <div className="confirm__error">
          Error occurred while removing {itemTitle}.
        </div>
      )}
    </div>
  );
};
