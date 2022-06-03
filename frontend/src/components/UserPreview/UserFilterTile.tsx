import React from 'react';

export interface UserFilterTileProps {
  letter: string;
  selectedLetter: string | undefined;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserFilterTile = ({
  letter,
  selectedLetter,
  setSelectedLetter,
}: UserFilterTileProps) => {
  function selectTile() {
    setSelectedLetter(letter);
  }

  return (
    <div
      onClick={selectTile}
      className={`filter-tile ${
        selectedLetter === letter ? 'selected-tile' : ''
      }`}
    >
      <div className="filter-tile__letter">{letter}</div>
    </div>
  );
};

export default UserFilterTile;
