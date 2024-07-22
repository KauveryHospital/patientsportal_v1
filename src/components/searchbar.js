import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '100%', // Ensure the wrapper takes full width
  justifyContent: 'flex-end', // Align items to the end (right side)
});

const Label = styled('div')({
  marginBottom: '8px',
  fontSize: '14px',
  color: '#666666',
});

const SearchBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width:'20%', // Adjust width as needed
  height:'30px',
  backgroundColor: 'lightgrey',
  borderRadius: '24px',
  padding: '4px 8px',
  marginLeft: 'auto', 
});

const Input = styled(InputBase)({
  border: 'none',
  outline: 'none',
  padding: '4px 8px',
  borderRadius: '16px',
  flex: 1,
  '&::placeholder': {
    color: '#cccccc',
  },
  fontSize:'15px',
});

const SearchButton = styled(IconButton)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  marginLeft: '4px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

const FilterButton = styled(IconButton)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  marginLeft: '8px', // Adjust spacing as needed
  border: '1px solid #cccccc',
  borderRadius: '50%', // Rounded small button
  background: 'none',
  cursor: 'pointer',
});

const SearchIconStyled = styled(SearchIcon)({
  width: '24px',
  height: '24px',
  fill: '#666666',
});

const FilterIconStyled = styled(FilterAltIcon)({
  width: '20px',
  height: '20px',
  fill: '#666666',
});

const SearchBar = () => {
  return (
    <Wrapper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <SearchBarContainer>
          <Input
            id="searchQueryInput"
            type="text"
            name="searchQueryInput"
            placeholder="Search for health records"
          />
          <SearchButton id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <SearchIconStyled />
          </SearchButton>
          <FilterButton id="filterButton" aria-label="filter">
            <FilterIconStyled />
          </FilterButton>
        </SearchBarContainer>
      </Box>
    </Wrapper>
  );
};

export default SearchBar;
