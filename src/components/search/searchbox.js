import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Searchbox = ({ searchfield, searchChange, locations, search, searchClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchChange(event.target.value);
    }
  };

  const handleSearchClick = () => {
    searchChange(search);
  };

  const getOptionLabel = (option) => {
    if (search.trim() === '') {
      return `${option.LocalizedName}, ${option.Country.LocalizedName}`;
    } else {
      return `${option.name}, ${option.country}`;
    }
  };

  return (
    <div className="searchbox">
      <Autocomplete
        disableClearable
        freeSolo
        disablePortal
        options={locations}
        getOptionLabel={getOptionLabel}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="filled-basic fullwidth"
            label="Search for places"
            variant="filled"
            color="secondary"
            focused
            onKeyDown={handleKeyDown}
            onChange={searchClick}
          />
        )}
      />
      <IconButton color="secondary" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Searchbox;

