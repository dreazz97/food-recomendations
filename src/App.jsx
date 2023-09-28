import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BegPage from './components/BegPage';
import RecipePage from './components/RecipePage';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {

  const handleGithubRedi = () => {
    window.location.href = "https://github.com/dreazz97"
  }

  const handleLinkedinRedi = () => {
    window.location.href = "https://www.linkedin.com/in/iuri-peniche/"
  }

  return (
    <Router>
      <div className="App">
      <Grid id="social-container" container justifyContent="flex-end">
      <Grid item xs={10} sm={10} md={10} lg={10}>
      </Grid>
        <Grid item xs={1} sm={1}>
        <LinkedInIcon onClick={handleLinkedinRedi} sx={{ marginRight: 0, fontSize: 40, color: "#0e76a8",':hover':{color: '#094c6b', cursor: "pointer"} }}/>
      </Grid>
      <Grid item xs={1} sm={1}>
      <GitHubIcon onClick={handleGithubRedi} sx={{ marginRight: 0, fontSize: 40,':hover':{color: 'grey', cursor: "pointer"} }}/>
      </Grid>
    </Grid>
        <Routes>
          <Route path="/" element={<BegPage />} />
          <Route path="/recipe" element={<RecipePage />} /> {/* Define a route for the other component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;