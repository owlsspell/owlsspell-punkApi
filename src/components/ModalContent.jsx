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
    padding: 20,
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
    width: "100%",
    paddingRight: 20,
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
    alignItems: "center",
    transition: "all .5s",
  },
  tagline: {
    fontFamily: "'Caveat',cursive",
    fontStyle: "italic",
  },
  cardContent:{
    width:'100%',
  },
  description: {
    // maxHeight: 800,
    // transition: "all 1s",
    // overflow: "auto",
    // animation: "all 1s",
    // overflowY: "hidden",
  
    maxHeight: '80px',
  height: 'auto',
  overflow: 'hidden',
  transition:'max-height 0.8s ease',
  overflow: "hidden",
  },

  description__hidden: {
    maxHeight: '1000px',
    transition: 'max-height 0.8s ease',
    overflow: "hidden",
    // maxHeight: 50,
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // display: "-webkit-box",
    // WebkitLineClamp: "2",
    // WebkitBoxOrient: "vertical",
    // transition: "all 1s ",
    // animation: "1s all",
  },
};

const Modal = (props) => {
  const { classes, beer } = props;

  let styleText = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    height: 50,
  };
  let scrollText = {
    height: "100%",
  };
  let styleArrow = {
    animation: 'rotation 8s infinite linear'
  };

  const [isActiveStyleDescr, changeActiveStyleDesc] = useState(false);
  const [isActiveStyleFood, changeActiveStyleFood] = useState(false);
  let showDescription = () => {
    if (!isActiveStyleDescr) {
      changeActiveStyleDesc(true);
    } else {
      changeActiveStyleDesc(false);
    }
  };
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

          <CardContent className={classes.cardContent} >
            <Typography gutterBottom variant="h5" component="div">
              {beer.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <p className={classes.tagline}> {beer.tagline}</p>
            </Typography>
            <p>{beer.abv} %</p>
            <div>
              <div />
              <div className={classes.cursor}>
                {/* <h4>Description :</h4> */}

                <div
                  className={
                    isActiveStyleDescr
                      ? classes.description
                      : classes.description__hidden
                  }
                  // style={isActiveStyleDescr ? scrollText : styleText}
                  // onClick={showDescription}
                >
                  {/* {beer.description + (isActiveStyleDescr ? '...':"")}  */}
                  {isActiveStyleDescr ? (beer.description.slice(0, 100) +'...'): beer.description} 
                </div>
                <ArrowCircleDownIcon style={styleArrow} onClick={()=>changeActiveStyleDesc(false)}
                  sx={{ color: colorPalette[3], fontSize: "2em" }}
                />
                <ArrowCircleUpIcon onClick={()=>changeActiveStyleDesc(true)}
                  sx={{ color: colorPalette[3], fontSize: "2em" }}
                />
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
    </Card>
  );
};

export default withStyles(styles)(Modal);
