import React, { useRef } from 'react';
import recipeimage from '../images/recipes.png'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BegPage = () => {
    const inputRef = useRef();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        const inputValue = inputRef.current.value;
        navigate('/recipe', { state: { inputValue } });
    };

  return (
    <>
    <h1 id='title'>Foodie Helper</h1>
    <img id='recipe-img' src={recipeimage} alt="recipe img" />
    <div id='search-container'>
    <input ref={inputRef} id='search-bar' type="text" />
    <SearchIcon id='search-icon' onClick={handleSearchClick} />
    </div>
    <p id='description-usage'>Search for any recipe based on its name or the ingredients</p>
    </>
  )
}

export default BegPage