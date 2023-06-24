import React, { useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Searchbox = ({ searchfield, searchChange, locations, search, searchClick }) => {

  const [inputValue, setInputValue] = useState('');
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchChange(inputValue);
    }
  };

  const handleSearchClick = () => {
    searchChange(inputValue);
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

  const getOptionLabel = (option) => {
    if (search.trim() === '') {
      return option ? `${option?.LocalizedName || ''}, ${option?.Country?.LocalizedName || ''}` : '';
    } else {
      return option ? `${option?.name || ''}, ${option?.country || ''}` : '';
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
        inputValue={inputValue}
        onInputChange={handleInputChange}
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

