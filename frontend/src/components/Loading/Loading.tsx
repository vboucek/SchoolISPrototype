import React from 'react';
import '../../styles/loading.css';

export const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <span className="loading__message">Loading...</span>
    </div>
  );
};

export default Loading;
