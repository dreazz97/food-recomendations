import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeComp from './RecipeComp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Grid from '@mui/material/Grid';
import robotImg from '../images/robot-404.png'
import loading from '../images/loading.png'

const RecipePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dataRecipes, setDataRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(location.state.inputValue)}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}`
            const responserecipes = await fetch(url);
            const datarecipes = await responserecipes.json();
            setDataRecipes(datarecipes.hits || []);
            setIsLoading(false);
        }
        fetchData();
      }, [location.state.inputValue])

    const handleBackClick = () => {
        navigate('/');
      };
    
  return (
    <>
      <Grid container>
      <Grid item xs={1} sm={2} md={3} lg={2}>
      </Grid>
        <Grid item xs={1} sm={2}>
        <ArrowBackIosIcon id="Back-arrow" onClick={handleBackClick} />
      </Grid>
    </Grid>
    {isLoading ? (
      <img id='loading' src={loading} alt="loading" />
    ) : dataRecipes && dataRecipes.length > 0 ? (
    <div id='main-container'>
      <Grid container justifyContent="center">
        {dataRecipes.map((el, index) => (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <div style={{ maxWidth: '345px', margin: 'auto' }}>
              <RecipeComp key={index} label={el.recipe.label} image={el.recipe.image} calories={el.recipe.calories} source={el.recipe.url} prepartime={el.recipe.totalTime}
              dietLabels={el.recipe.dietLabels} ingredients={el.recipe.ingredientLines} />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
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