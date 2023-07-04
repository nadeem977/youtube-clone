import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm('');
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        display:"flex",
        border: '1px solid #e3e3e3',
        boxShadow: 'none',
        mr: { sm: 5 },
        alignItems:'center',
        height:'fit-content',
        pr:2,
        maxWidth:'300px'
      }}
    >
      <input
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{padding:'10px',borderRadius:'10px',background:'transparent',width:'100%'}}
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'red' ,padding:'0px'}} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;