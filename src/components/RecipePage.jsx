import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeComp from './RecipeComp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';

const RecipePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataRecipes, setDataRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(location.state.inputValue)}&app_id=daf72077&app_key=0ee1183d87b5902ce2069947ce94b7c1`
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
    {dataRecipes.map((el, index) => (
        <RecipeComp key={index} label={el.recipe.label} image={el.recipe.image} calories={el.recipe.calories} source={el.recipe.url} prepartime={el.recipe.totalTime}
        dietLabels={el.recipe.dietLabels} ingredients={el.recipe.ingredientLines} />
    ))}
    </>
  )
}

export default RecipePage