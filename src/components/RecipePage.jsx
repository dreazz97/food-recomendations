import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeComp from './RecipeComp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import robotImg from '../images/robot-404.png'

const RecipePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataRecipes, setDataRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(location.state.inputValue)}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}`
            const responserecipes = await fetch(url);
            const datarecipes = await responserecipes.json();
            setDataRecipes(datarecipes.hits || []);
        }
        fetchData();
      }, [location.state.inputValue])

    const handleBackClick = () => {
        navigate('/');
      };
    
  return (
    <>
      <Grid container>
      <Grid item xs={1} sm={2} md={3} lg={4}>
      </Grid>
        <Grid item xs={1} sm={2}>
        <ArrowBackIosIcon id="Back-arrow" onClick={handleBackClick} />
      </Grid>
    </Grid>
    {dataRecipes && dataRecipes.length > 0 ? (
    dataRecipes.map((el, index) => (
        <RecipeComp key={index} label={el.recipe.label} image={el.recipe.image} calories={el.recipe.calories} source={el.recipe.url} prepartime={el.recipe.totalTime}
        dietLabels={el.recipe.dietLabels} ingredients={el.recipe.ingredientLines}
        />
        ))
      ) : (
        <>
        <p id='no-results' className='descriptions'>Oops... Seems like your query didn't match any results</p>
        <img id='robot-img' src={robotImg} alt="robot" />
        </>
      )}
    </>
  );
}

export default RecipePage