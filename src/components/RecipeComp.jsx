import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import loading from '../images/loading.png'

const RecipeComp = ({label, image, calories, source, prepartime, ingredients, dietLabels}) => {

    const [isImageLoading, setIsImageLoading] = useState(true);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      const [expanded, setExpanded] = React.useState(false);

      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  return (
    <Card id="Card" sx={{ maxWidth: 345, }}>
      <CardHeader
        title={label}
        titleTypographyProps={{variant:'h5', sx:{fontFamily:"Martian Mono", fontWeight: 800}}}
      />
      {isImageLoading && <img id='loading-img' src={loading} alt="loading" />}
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="imgs"
        style={{ display: isImageLoading ? 'none' : 'block' }}
        onLoad={() => setIsImageLoading(false)}
      />
      <CardContent>
      <Typography variant="body2" color="black" fontFamily="Martian Mono">
        <strong>Calories:</strong> {Math.round(calories)} Kcal <br />
        <br />
        <strong>Recipe link:</strong> <a href={source}>Link</a> <br />
        <br />
        <strong>Time to make:</strong> {prepartime !== 0 ? prepartime + " mins" : "No info"} <br />
        <br />
        <strong>Diet Labels:</strong> {dietLabels.length > 0 ? dietLabels + "" : 'No labels available'}
    </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
      <Typography paragraph fontFamily="Martian Mono" fontSize="14px">
          {ingredients.map((ingredient, index) => (
            <p key={index}>{ingredient}</p>
          ))}
      </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RecipeComp