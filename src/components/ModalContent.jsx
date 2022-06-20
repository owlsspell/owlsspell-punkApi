import { useState } from "react";
import notImg from "../assets/image.png";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { withStyles } from "@mui/styles";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { colorPalette } from "./color";

const styles = {
  Card: {
    padding: '0 20px 20px 0',
    width:'100%',
    "& *": {
      fontFamily: "'Redressed', cursive",
    },
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    overflowY: "auto"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  cardImgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "40%",
    padding: "20px!important",
    ['@media (max-width:500px)']: {
      display:'none!important'
    },
  },
  image: {
    objectFit: "contain!important",
    height: "auto",
    minWidth: "130px",
    maxHeight: 500,
  },
  cursor: {
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-start",
    transition: "all .5s",
  },
  tagline: {
    fontFamily: "'Caveat',cursive",
    fontStyle: "italic",
  },
  cardContent: {
    width: "auto",
    padding: '5px 16px 16px 25px!important',
  },
  description__hidden: {
    maxHeight: "100px",
    height: "auto",
    overflow: "hidden",
    transition: "max-height 0.8s ease",
  },

  description: {
    maxHeight: "1000px",
    transition: "max-height 0.8s ease",
    overflow: "hidden",
  },
  title_container:{
    backgroundColor: colorPalette[2],
    padding: '5px 10px 5px 25px',
    color: '#ffff',
    borderRadius: '0 0 100px 0'
  },
  abv:{
    padding: '6px 8px',
    backgroundColor: colorPalette[1],
    width: 'max-content',
    color: '#ffff',
    borderRadius: '50%'
  },
  textColumn :{
    width: '140%',
  }
};

const Modal = (props) => {
  const { classes, beer } = props;

  let styleArrow = {
    animation: "rotation 8s infinite linear",
  };

  const [isActiveStyleDescr, changeActiveStyleDesc] = useState(false);
  const [isActiveStyleFood, changeActiveStyleFood] = useState(false);
  // let showDescription = () => {
  //   if (!isActiveStyleDescr) {
  //     changeActiveStyleDesc(true);
  //   } else {
  //     changeActiveStyleDesc(false);
  //   }
  // };
  let showFoodPairing = () => {
    if (!isActiveStyleFood) {
      changeActiveStyleFood(true);
    } else {
      changeActiveStyleFood(false);
    }
  };
  
  return (
    <Card key={beer.id} className={classes.Card}>
      <div className={classes.cardActionArea}>
        <div className={classes.cardContainer}>
          <CardActions className={classes.cardImgContainer}>
            {beer.image_url === null ? (
              <img
                src={notImg}
                style={{ width: 40 + "%" }}
                alt={beer.name}
              ></img>
            ) : (
              <CardMedia
                className={classes.image}
                component="img"
                height="140px"
                width="auto"
                image={beer.image_url}
                alt="beer"
              />
            )}
          </CardActions>
          <div className={classes.textColumn}>
          <Typography gutterBottom variant="h5" component="div" className={classes.title_container}>
              {beer.name}
            </Typography>
          <CardContent className={classes.cardContent}>
           
            <Typography
              sx={{ fontSize: 14 }}
              color={colorPalette[0]}
              gutterBottom
            >
              <span className={classes.tagline}> {beer.tagline}</span>
            </Typography>
            <p className={classes.abv}>{beer.abv} %</p>
            <div>
              <div />
              <div className={classes.cursor}>
                <div
                  className={
                    isActiveStyleDescr
                      ? classes.description
                      : classes.description__hidden
                  }
                >
                  {isActiveStyleDescr ||  beer.description.split(" ").join('').length <=100
                    ? beer.description:
                    beer.description.slice(0, 100) + "..."}
                </div>
                {beer.description.split(" ").join('').length <=100 ? "" : !isActiveStyleDescr ? (
                  <ArrowCircleDownIcon
                    style={styleArrow}
                    onClick={() => changeActiveStyleDesc(true)}
                    sx={{ color: colorPalette[3], fontSize: "2em" }}
                  />
                ) : (
                  <ArrowCircleUpIcon
                    onClick={() => changeActiveStyleDesc(false)}
                    sx={{ color: colorPalette[3], fontSize: "2em" }}
                  />
                )}
              </div>
              {/* {      isActiveStyleDescr? null : <span>...</span>        } */}
              <h4>Food pairing :</h4>
              <div className={classes.cursor}>
                <p
                  // style={isActiveStyleFood ? null : styleText}
                  className={
                    isActiveStyleFood
                      ? classes.description
                      : classes.description__hidden
                  }
                  onClick={showFoodPairing}
                >
                  {beer.food_pairing
                    ? beer.food_pairing.map((i) => {
                        return <li key={i}>{i}</li>;
                      })
                    : ""}
                </p>
              </div>
            </div>
          </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default withStyles(styles)(Modal);
